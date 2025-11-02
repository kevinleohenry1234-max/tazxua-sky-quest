import { supabase } from '@/lib/supabase';
import { 
  SkyQuestMember, 
  UserRankProgress, 
  PointActivity, 
  RankCelebration,
  SkyQuestRewardClaim,
  RankLevel 
} from '@/types/ranking';
import { getRankByPoints, calculateProgressToNext } from '@/data/rankingData';

// API functions cho hệ thống thăng hạng
export class RankingApi {
  
  // Lấy thông tin cấp bậc của user
  static async getUserRanking(userId: string): Promise<UserRankProgress | null> {
    try {
      const { data: member, error } = await supabase
        .from('skyquest_members')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (!member) {
        // Tạo member mới nếu chưa tồn tại
        return await this.createNewMember(userId);
      }

      // Lấy lịch sử thăng hạng
      const { data: history } = await supabase
        .from('skyquest_rank_history')
        .select('*')
        .eq('user_id', userId)
        .order('achieved_at', { ascending: false });

      const progressData = calculateProgressToNext(member.sky_points);
      const currentRank = getRankByPoints(member.sky_points);

      return {
        userId: member.user_id,
        currentRank: currentRank,
        currentPoints: member.sky_points,
        totalPoints: member.sky_points,
        nextRank: progressData.next || null,
        pointsToNext: progressData.pointsToNext,
        progressToNext: progressData.progressPercentage,
        progressPercentage: progressData.progressPercentage,
        rankAchievedAt: new Date(member.rank_achieved_at),
        totalPointsEarned: member.total_points_earned,
        rankHistory: history?.map(h => ({
          id: h.id,
          userId: h.user_id,
          fromRank: h.from_rank,
          toRank: h.to_rank,
          achievedAt: new Date(h.achieved_at),
          pointsAtTime: h.points_at_time,
          celebrationShown: h.celebration_shown
        })) || []
      };

    } catch (error) {
      console.error('Error getting user ranking:', error);
      throw new Error('Không thể lấy thông tin cấp bậc');
    }
  }

  // Tạo member mới
  static async createNewMember(userId: string): Promise<UserRankProgress> {
    try {
      const newMember: Partial<SkyQuestMember> = {
        user_id: userId,
        sky_points: 0,
        rank: 'Explorer',
        rank_achieved_at: new Date(),
        total_points_earned: 0
      };

      const { data, error } = await supabase
        .from('skyquest_members')
        .insert([newMember])
        .select()
        .single();

      if (error) throw error;

      // Tạo lịch sử thăng hạng đầu tiên
      await supabase
        .from('skyquest_rank_history')
        .insert([{
          user_id: userId,
          from_rank: null,
          to_rank: 'Explorer',
          points_at_time: 0,
          celebration_shown: true
        }]);

      const explorerRank = getRankByPoints(0);
      const inspirationRank = calculateProgressToNext(0).next;

      return {
        userId,
        currentRank: explorerRank,
        currentPoints: 0,
        totalPoints: 0,
        nextRank: inspirationRank,
        pointsToNext: inspirationRank ? inspirationRank.minPoints : 0,
        progressToNext: 0,
        progressPercentage: 0,
        rankAchievedAt: new Date(),
        totalPointsEarned: 0,
        rankHistory: []
      };

    } catch (error) {
      console.error('Error creating new member:', error);
      throw new Error('Không thể tạo thành viên mới');
    }
  }

  // Thêm điểm cho user
  static async addPoints(
    userId: string, 
    points: number, 
    activityType: string,
    description: string,
    metadata?: Record<string, any>
  ): Promise<{ newRank?: RankLevel; rankUp: boolean }> {
    try {
      // Lấy thông tin hiện tại
      const currentProgress = await this.getUserRanking(userId);
      if (!currentProgress) {
        throw new Error('Không tìm thấy thông tin thành viên');
      }

      const newTotalPoints = currentProgress.currentPoints + points;
      const newRank = getRankByPoints(newTotalPoints);
      const rankUp = newRank.level !== currentProgress.currentRank.level;

      // Cập nhật điểm trong database
      const { error: updateError } = await supabase
        .from('skyquest_members')
        .update({
          sky_points: newTotalPoints,
          total_points_earned: currentProgress.totalPointsEarned + points,
          rank: newRank.level,
          rank_achieved_at: rankUp ? new Date().toISOString() : undefined,
          last_updated: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (updateError) throw updateError;

      // Ghi log điểm
      await supabase
        .from('skyquest_point_logs')
        .insert([{
          user_id: userId,
          delta: points,
          reason: description,
          activity_type: activityType,
          metadata
        }]);

      // Nếu thăng hạng, ghi lịch sử
      if (rankUp) {
        await supabase
          .from('skyquest_rank_history')
          .insert([{
            user_id: userId,
            from_rank: currentProgress.currentRank,
            to_rank: newRank.level,
            points_at_time: newTotalPoints,
            celebration_shown: false
          }]);

        // Tự động unlock rewards
        await this.unlockRankRewards(userId, newRank.level);
      }

      return { newRank: rankUp ? newRank.level : undefined, rankUp };

    } catch (error) {
      console.error('Error adding points:', error);
      throw new Error('Không thể cập nhật điểm');
    }
  }

  // Unlock rewards khi thăng hạng
  static async unlockRankRewards(userId: string, rank: RankLevel): Promise<void> {
    try {
      const rankData = getRankByPoints(0); // Sẽ được cập nhật với logic đúng
      
      // Tạo voucher codes và unlock rewards
      const rewardClaims = rankData.rewards.map(reward => ({
        user_id: userId,
        reward_id: reward.id,
        rank: rank,
        voucher_code: reward.type === 'voucher' ? this.generateVoucherCode() : null,
        is_redeemed: false,
        expires_at: reward.type === 'voucher' ? 
          new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : // 1 năm
          null
      }));

      const { error } = await supabase
        .from('skyquest_reward_claims')
        .insert(rewardClaims);

      if (error) throw error;

    } catch (error) {
      console.error('Error unlocking rank rewards:', error);
      // Không throw error để không ảnh hưởng đến quá trình thăng hạng
    }
  }

  // Lấy lịch sử hoạt động
  static async getActivityHistory(userId: string, limit = 50): Promise<PointActivity[]> {
    try {
      const { data, error } = await supabase
        .from('skyquest_point_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data?.map(log => ({
        id: log.id,
        userId: log.user_id,
        activityType: log.activity_type,
        points: log.delta,
        description: log.reason,
        metadata: log.metadata,
        createdAt: new Date(log.created_at),
        questId: log.quest_id,
        sessionId: log.session_id
      })) || [];

    } catch (error) {
      console.error('Error getting activity history:', error);
      return [];
    }
  }

  // Lấy rewards đã unlock
  static async getUserRewards(userId: string): Promise<SkyQuestRewardClaim[]> {
    try {
      const { data, error } = await supabase
        .from('skyquest_reward_claims')
        .select('*')
        .eq('user_id', userId)
        .order('claimed_at', { ascending: false });

      if (error) throw error;

      return data || [];

    } catch (error) {
      console.error('Error getting user rewards:', error);
      return [];
    }
  }

  // Redeem voucher
  static async redeemVoucher(userId: string, rewardClaimId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('skyquest_reward_claims')
        .update({ 
          is_redeemed: true,
          redeemed_at: new Date().toISOString()
        })
        .eq('id', rewardClaimId)
        .eq('user_id', userId)
        .eq('is_redeemed', false);

      if (error) throw error;
      return true;

    } catch (error) {
      console.error('Error redeeming voucher:', error);
      return false;
    }
  }

  // Đánh dấu celebration đã hiển thị
  static async markCelebrationShown(userId: string, rankHistoryId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('skyquest_rank_history')
        .update({ celebration_shown: true })
        .eq('id', rankHistoryId)
        .eq('user_id', userId);

      if (error) throw error;

    } catch (error) {
      console.error('Error marking celebration shown:', error);
    }
  }

  // Lấy leaderboard
  static async getLeaderboard(limit = 100): Promise<Array<{
    userId: string;
    rank: RankLevel;
    points: number;
    username?: string;
  }>> {
    try {
      const { data, error } = await supabase
        .from('skyquest_members')
        .select(`
          user_id,
          rank,
          sky_points,
          profiles:user_id (username, full_name)
        `)
        .order('sky_points', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data?.map(member => ({
        userId: member.user_id,
        rank: member.rank,
        points: member.sky_points,
        username: (member.profiles as any)?.username || (member.profiles as any)?.full_name
      })) || [];

    } catch (error) {
      console.error('Error getting leaderboard:', error);
      return [];
    }
  }

  // Helper: Generate voucher code
  private static generateVoucherCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'SKY-';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}