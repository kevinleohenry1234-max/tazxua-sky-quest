import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Types
export interface SkyQuestMode {
  id: string;
  key: 'calm' | 'energetic';
  name: string;
  description: string;
  theme: {
    primary: string;
    secondary: string;
    gradientStart: string;
    gradientEnd: string;
    accent: string;
  };
  created_at: string;
}

export interface SkyQuestStep {
  id: string;
  mode_id: string;
  order_index: number;
  title: string;
  description: string;
  type: 'journal' | 'photo' | 'action' | 'interview' | 'social';
  points: number;
  proof_required: boolean;
  proof_type?: 'photo' | 'gps' | 'text' | 'link';
  created_at: string;
}

export interface SkyQuestUserSession {
  id: string;
  user_id: string;
  mode_id: string;
  status: 'active' | 'completed' | 'abandoned';
  started_at: string;
  completed_at?: string;
  total_points: number;
  exp: number;
  created_at: string;
  updated_at: string;
}

export interface SkyQuestUserProgress {
  id: string;
  session_id: string;
  step_id: string;
  status: 'locked' | 'available' | 'in_progress' | 'done' | 'verified';
  proof_url?: string;
  note?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface SkyQuestReward {
  id: string;
  name: string;
  type: 'voucher' | 'badge' | 'souvenir';
  threshold_points: number;
  meta?: Record<string, unknown>;
  created_at: string;
}

export interface SkyQuestUserReward {
  id: string;
  user_id: string;
  reward_id: string;
  session_id?: string;
  unlocked_at: string;
}

export interface SessionWithDetails {
  session: SkyQuestUserSession;
  mode: SkyQuestMode;
  steps: (SkyQuestStep & { status: SkyQuestUserProgress['status'] })[];
  totals: {
    points: number;
    exp: number;
    completed: number;
    total: number;
  };
}

// API Functions
export class SkyQuestAPI {
  // Get all available modes
  static async getModes(): Promise<SkyQuestMode[]> {
    // If Supabase is not configured, return fallback data immediately
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, using fallback SkyQuest modes');
      return [
        {
          id: 'fallback-calm',
          key: 'calm',
          name: 'Hành trình tĩnh lặng',
          description: 'Khám phá vẻ đẹp yên bình của Tà Xùa',
          theme: {
            primary: '#4F46E5',
            secondary: '#E0E7FF',
            gradientStart: '#667EEA',
            gradientEnd: '#764BA2',
            accent: '#F59E0B'
          },
          created_at: new Date().toISOString()
        },
        {
          id: 'fallback-energetic',
          key: 'energetic',
          name: 'Hành trình năng động',
          description: 'Trải nghiệm phiêu lưu đầy thử thách',
          theme: {
            primary: '#DC2626',
            secondary: '#FEE2E2',
            gradientStart: '#F093FB',
            gradientEnd: '#F5576C',
            accent: '#059669'
          },
          created_at: new Date().toISOString()
        }
      ];
    }

    try {
      const { data, error } = await supabase
        .from('skyquest_modes')
        .select('*')
        .order('key');

      if (error) {
        console.error('Error fetching SkyQuest modes:', error);
        // Return fallback data instead of throwing error
        return [
          {
            id: 'fallback-calm',
            key: 'calm',
            name: 'Hành trình tĩnh lặng',
            description: 'Khám phá vẻ đẹp yên bình của Tà Xùa',
            theme: {
              primary: '#4F46E5',
              secondary: '#E0E7FF',
              gradientStart: '#667EEA',
              gradientEnd: '#764BA2',
              accent: '#F59E0B'
            },
            created_at: new Date().toISOString()
          },
          {
            id: 'fallback-energetic',
            key: 'energetic',
            name: 'Hành trình năng động',
            description: 'Trải nghiệm phiêu lưu đầy thử thách',
            theme: {
              primary: '#DC2626',
              secondary: '#FEE2E2',
              gradientStart: '#F093FB',
              gradientEnd: '#F5576C',
              accent: '#059669'
            },
            created_at: new Date().toISOString()
          }
        ];
      }
      return data || [];
    } catch (error) {
      console.error('Unexpected error in getModes:', error);
      // Return fallback data instead of empty array
      return [
        {
          id: 'fallback-calm',
          key: 'calm',
          name: 'Hành trình tĩnh lặng',
          description: 'Khám phá vẻ đẹp yên bình của Tà Xùa',
          theme: {
            primary: '#4F46E5',
            secondary: '#E0E7FF',
            gradientStart: '#667EEA',
            gradientEnd: '#764BA2',
            accent: '#F59E0B'
          },
          created_at: new Date().toISOString()
        },
        {
          id: 'fallback-energetic',
          key: 'energetic',
          name: 'Hành trình năng động',
          description: 'Trải nghiệm phiêu lưu đầy thử thách',
          theme: {
            primary: '#DC2626',
            secondary: '#FEE2E2',
            gradientStart: '#F093FB',
            gradientEnd: '#F5576C',
            accent: '#059669'
          },
          created_at: new Date().toISOString()
        }
      ];
    }
  }

  // Start a new journey session
  static async startSession(modeKey: 'calm' | 'energetic'): Promise<SessionWithDetails> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get mode details
      const { data: mode, error: modeError } = await supabase
        .from('skyquest_modes')
        .select('*')
        .eq('key', modeKey)
        .single();

      if (modeError) {
        console.error('Error fetching mode:', modeError);
        throw new Error(`Failed to fetch mode: ${modeKey}`);
      }

      // Close any existing active sessions
      const { error: closeError } = await supabase
        .from('skyquest_user_sessions')
        .update({ status: 'abandoned' })
        .eq('user_id', user.id)
        .eq('status', 'active');

      if (closeError) {
        console.warn('Error closing existing sessions:', closeError);
        // Continue anyway, this is not critical
      }

      // Create new session
      const { data: session, error: sessionError } = await supabase
        .from('skyquest_user_sessions')
        .insert({
          user_id: user.id,
          mode_id: mode.id,
          status: 'active'
        })
        .select()
        .single();

      if (sessionError) {
        console.error('Error creating session:', sessionError);
        throw new Error('Failed to create new session');
      }

      // Get steps for this mode
      const { data: steps, error: stepsError } = await supabase
        .from('skyquest_steps')
        .select('*')
        .eq('mode_id', mode.id)
        .order('order_index');

      if (stepsError) {
        console.error('Error fetching steps:', stepsError);
        throw new Error('Failed to fetch quest steps');
      }

      // Initialize progress for all steps
      const progressData = steps.map((step, index) => ({
        session_id: session.id,
        step_id: step.id,
        status: index === 0 ? 'available' : 'locked' as const
      }));

      const { error: progressError } = await supabase
        .from('skyquest_user_progress')
        .insert(progressData);

      if (progressError) {
        console.error('Error initializing progress:', progressError);
        throw new Error('Failed to initialize quest progress');
      }

      // Return session with details
      return this.getSession(session.id);
    } catch (error) {
      console.error('Error in startSession:', error);
      throw error;
    }
  }

  // Get session details
  static async getSession(sessionId: string): Promise<SessionWithDetails> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get session with mode
      const { data: sessionData, error: sessionError } = await supabase
        .from('skyquest_user_sessions')
        .select(`
          *,
          skyquest_modes (*)
        `)
        .eq('id', sessionId)
        .eq('user_id', user.id)
        .single();

      if (sessionError) {
        console.error('Error fetching session:', sessionError);
        throw new Error('Failed to fetch session details');
      }

      // Get steps with progress
      const { data: stepsData, error: stepsError } = await supabase
        .from('skyquest_steps')
        .select(`
          *,
          skyquest_user_progress!inner (status, proof_url, note, completed_at)
        `)
        .eq('mode_id', sessionData.mode_id)
        .eq('skyquest_user_progress.session_id', sessionId)
        .order('order_index');

      if (stepsError) {
        console.error('Error fetching steps:', stepsError);
        throw new Error('Failed to fetch quest steps');
      }

      // Format steps with status
      const steps = stepsData.map(step => ({
        ...step,
        status: step.skyquest_user_progress[0]?.status || 'locked'
      }));

      // Calculate totals
      const completed = steps.filter(s => s.status === 'done' || s.status === 'verified').length;
      const totals = {
        points: sessionData.total_points,
        exp: sessionData.exp,
        completed,
        total: steps.length
      };

      return {
        session: sessionData,
        mode: sessionData.skyquest_modes,
        steps,
        totals
      };
    } catch (error) {
      console.error('Error in getSession:', error);
      throw error;
    }
  }

  // Update step progress
  static async updateProgress(
    sessionId: string,
    stepId: string,
    status: SkyQuestUserProgress['status'],
    proofUrl?: string,
    note?: string
  ): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Verify session belongs to user
      const { data: session, error: sessionError } = await supabase
        .from('skyquest_user_sessions')
        .select('id, total_points, exp')
        .eq('id', sessionId)
        .eq('user_id', user.id)
        .single();

      if (sessionError) {
        console.error('Error verifying session:', sessionError);
        throw new Error('Session not found or access denied');
      }

      // Get step details
      const { data: step, error: stepError } = await supabase
        .from('skyquest_steps')
        .select('points, title')
        .eq('id', stepId)
        .single();

      if (stepError) {
        console.error('Error fetching step details:', stepError);
        throw new Error('Step not found');
      }

      // Get current progress
      const { data: currentProgress, error: progressError } = await supabase
        .from('skyquest_user_progress')
        .select('status')
        .eq('session_id', sessionId)
        .eq('step_id', stepId)
        .single();

      if (progressError) {
        console.error('Error fetching current progress:', progressError);
        throw new Error('Progress record not found');
      }

      // Prepare update data
      const updateData: {
        status: SkyQuestUserProgress['status'];
        proof_url?: string;
        note?: string;
        completed_at?: string;
      } = {
        status,
        proof_url: proofUrl,
        note,
        completed_at: (status === 'done' || status === 'verified') ? new Date().toISOString() : undefined
      };

      // Update progress
      const { error: updateError } = await supabase
        .from('skyquest_user_progress')
        .update(updateData)
        .eq('session_id', sessionId)
        .eq('step_id', stepId);

      if (updateError) {
        console.error('Error updating progress:', updateError);
        throw new Error('Failed to update progress');
      }

      // If step is completed, update session points and check for rewards
      if (status === 'done' || status === 'verified') {
        const wasCompleted = currentProgress.status === 'done' || currentProgress.status === 'verified';
        
        if (!wasCompleted) {
          const newTotalPoints = session.total_points + step.points;
          const newExp = session.exp + Math.floor(step.points * 1.5);

          const { error: sessionUpdateError } = await supabase
            .from('skyquest_user_sessions')
            .update({
              total_points: newTotalPoints,
              exp: newExp
            })
            .eq('id', sessionId);

          if (sessionUpdateError) {
            console.warn('Error updating session totals:', sessionUpdateError);
            // Don't throw here, progress was already saved
          }

          // Check for reward unlocks and unlock next step
          try {
            await this.checkRewardUnlocks(user.id, sessionId, newTotalPoints);
            await this.unlockNextStep(sessionId, stepId);
          } catch (error) {
            console.warn('Error in post-completion tasks:', error);
            // Don't throw here, main progress was saved
          }
        }
      }
    } catch (error) {
      console.error('Error in updateProgress:', error);
      throw error;
    }
  }

  // Check and unlock rewards
  private static async checkRewardUnlocks(userId: string, sessionId: string, totalPoints: number): Promise<void> {
    // Get available rewards that user hasn't unlocked yet
    const { data: availableRewards, error } = await supabase
      .from('skyquest_rewards')
      .select('*')
      .lte('threshold_points', totalPoints)
      .not('id', 'in', `(
        SELECT reward_id FROM skyquest_user_rewards WHERE user_id = '${userId}'
      )`);

    if (error || !availableRewards?.length) return;

    // Unlock rewards
    const rewardUnlocks = availableRewards.map(reward => ({
      user_id: userId,
      reward_id: reward.id,
      session_id: sessionId
    }));

    await supabase
      .from('skyquest_user_rewards')
      .insert(rewardUnlocks);
  }

  // Unlock next step in sequence
  private static async unlockNextStep(sessionId: string, completedStepId: string): Promise<void> {
    // Get completed step order
    const { data: completedStep, error: stepError } = await supabase
      .from('skyquest_steps')
      .select('order_index, mode_id')
      .eq('id', completedStepId)
      .single();

    if (stepError) return;

    // Find next step
    const { data: nextStep, error: nextStepError } = await supabase
      .from('skyquest_steps')
      .select('id')
      .eq('mode_id', completedStep.mode_id)
      .eq('order_index', completedStep.order_index + 1)
      .single();

    if (nextStepError || !nextStep) return;

    // Unlock next step
    await supabase
      .from('skyquest_user_progress')
      .update({ status: 'available' })
      .eq('session_id', sessionId)
      .eq('step_id', nextStep.id)
      .eq('status', 'locked');
  }

  // Get user rewards
  static async getUserRewards(userId?: string): Promise<{
    unlocked: (SkyQuestUserReward & { reward: SkyQuestReward })[];
    nextRewards: SkyQuestReward[];
  }> {
    const { data: { user } } = await supabase.auth.getUser();
    const targetUserId = userId || user?.id;
    
    if (!targetUserId) throw new Error('User not authenticated');

    // Get unlocked rewards
    const { data: unlockedRewards, error: unlockedError } = await supabase
      .from('skyquest_user_rewards')
      .select(`
        *,
        skyquest_rewards (*)
      `)
      .eq('user_id', targetUserId)
      .order('unlocked_at', { ascending: false });

    if (unlockedError) throw unlockedError;

    // Get user's total points
    const { data: sessionData, error: sessionError } = await supabase
      .from('skyquest_user_sessions')
      .select('total_points')
      .eq('user_id', targetUserId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const totalPoints = sessionData?.total_points || 0;

    // Get next available rewards
    const unlockedRewardIds = unlockedRewards?.map(ur => ur.reward_id) || [];
    
    const { data: nextRewards, error: nextError } = await supabase
      .from('skyquest_rewards')
      .select('*')
      .gt('threshold_points', totalPoints)
      .not('id', 'in', `(${unlockedRewardIds.map(id => `'${id}'`).join(',') || "''"})`)
      .order('threshold_points')
      .limit(3);

    if (nextError) throw nextError;

    return {
      unlocked: unlockedRewards || [],
      nextRewards: nextRewards || []
    };
  }

  // Switch mode (abandon current session and start new one)
  static async switchMode(targetModeKey: 'calm' | 'energetic'): Promise<SessionWithDetails> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Abandon current active session
    await supabase
      .from('skyquest_user_sessions')
      .update({ status: 'abandoned' })
      .eq('user_id', user.id)
      .eq('status', 'active');

    // Start new session
    return this.startSession(targetModeKey);
  }

  // Get user's active session
  static async getActiveSession(): Promise<SessionWithDetails | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: session, error } = await supabase
      .from('skyquest_user_sessions')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !session) return null;

    return this.getSession(session.id);
  }
}