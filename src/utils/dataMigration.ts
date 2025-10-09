// Data Migration Utility for Narrative Adventure System
// Ensures existing user progress and challenge data is preserved

import { UserProfile, UserChallenge, Badge, Voucher, PointTransaction } from '../types/gamification';
import { NarrativeUserProfile, UserJourney, DiaryEntry, UserArchetype, ARCHETYPES } from '../types/narrativeAdventure';
import { CHALLENGE_TO_JOURNEY_MAPPING } from '../data/narrativeAdventureData';

export interface MigrationResult {
  success: boolean;
  migratedUsers: number;
  preservedChallenges: number;
  createdJourneys: number;
  errors: string[];
}

/**
 * Migrates existing user profile to narrative adventure system
 */
export function migrateUserProfile(
  oldProfile: UserProfile,
  selectedArchetype?: UserArchetype
): NarrativeUserProfile {
  // Determine archetype based on user's completed challenges or use selected one
  const archetype = selectedArchetype || determineArchetypeFromHistory(oldProfile);
  
  const narrativeProfile: NarrativeUserProfile = {
    ...oldProfile,
    archetype,
    currentJourney: null,
    completedJourneys: [],
    completedChapters: [],
    personalDiary: [],
    souvenirCards: [],
    titles: [],
    onboardingCompleted: !!selectedArchetype,
    onboardingResponses: []
  };

  return narrativeProfile;
}

/**
 * Converts existing user challenges to journey progress
 */
export function migrateUserChallenges(
  userChallenges: UserChallenge[],
  userProfile: UserProfile
): UserJourney[] {
  const journeyMap = new Map<string, UserJourney>();

  userChallenges.forEach(challenge => {
    const journeyMapping = CHALLENGE_TO_JOURNEY_MAPPING[challenge.challengeId];
    if (!journeyMapping) return;

    const journeyId = `${journeyMapping.archetype}_journey`;
    
    if (!journeyMap.has(journeyId)) {
      journeyMap.set(journeyId, {
        id: journeyId,
        userId: userProfile.id,
        journeyId: journeyMapping.archetype + '_journey',
        status: 'not_started',
        currentChapter: 0,
        startedAt: challenge.startedAt || new Date(),
        completedAt: challenge.status === 'completed' ? challenge.completedAt : undefined,
        completedChapters: [],
        diaryEntries: []
      });
    }

    const userJourney = journeyMap.get(journeyId)!;
    
    // Update journey progress based on challenge status
    if (challenge.status === 'completed') {
      userJourney.completedChapters.push(challenge.challengeId);
      
      // Create diary entry from challenge completion
      const diaryEntry: DiaryEntry = {
        id: `diary_${challenge.id}`,
        chapterId: challenge.challengeId,
        text: `Hoàn thành thử thách: ${challenge.challengeId}`,
        timestamp: challenge.completedAt || new Date(),
        mood: 'accomplished'
      };
      
      userJourney.diaryEntries.push(diaryEntry);
    } else if (challenge.status === 'in_progress') {
      userJourney.status = 'in_progress';
      userJourney.currentChapter = Math.max(
        userJourney.currentChapter,
        userJourney.completedChapters.length
      );
    }
  });

  return Array.from(journeyMap.values());
}

/**
 * Preserves existing badges and vouchers in narrative context
 */
export function migrateBadgesAndVouchers(
  badges: Badge[],
  vouchers: Voucher[]
): { narrativeBadges: Badge[], narrativeVouchers: Voucher[] } {
  // Add narrative context to existing badges
  const narrativeBadges = badges.map(badge => ({
    ...badge,
    category: mapBadgeCategoryToNarrative(badge.category),
    description: `${badge.description} - Đạt được trong hành trình khám phá`
  }));

  // Add storytelling elements to vouchers
  const narrativeVouchers = vouchers.map(voucher => ({
    ...voucher,
    description: `${voucher.description} - Phần thưởng từ hành trình của bạn`
  }));

  return { narrativeBadges, narrativeVouchers };
}

/**
 * Creates diary entries from point transaction history
 */
export function createDiaryFromHistory(
  transactions: PointTransaction[],
  userId: string
): DiaryEntry[] {
  return transactions
    .filter(t => t.type === 'earn' && t.source === 'challenge_complete')
    .map(transaction => ({
      id: `diary_${transaction.id}`,
      chapterId: transaction.sourceId || 'unknown',
      text: `Hoàn thành hoạt động: ${transaction.description}`,
      timestamp: transaction.timestamp,
      mood: 'accomplished'
    }));
}

/**
 * Determines user archetype based on their challenge completion history
 */
function determineArchetypeFromHistory(profile: UserProfile): UserArchetype {
  const badges = profile.badges;
  
  // Analyze badge categories to determine archetype
  const categoryCount = badges.reduce((acc, badge) => {
    acc[badge.category] = (acc[badge.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Map badge categories to archetypes
  if (categoryCount.environmental > categoryCount.community) {
    return ARCHETYPES.find(a => a.id === 'protector') || ARCHETYPES[0];
  } else if (categoryCount.photographer > categoryCount.explorer) {
    return ARCHETYPES.find(a => a.id === 'observer') || ARCHETYPES[0];
  } else if (categoryCount.cultural > categoryCount.community) {
    return ARCHETYPES.find(a => a.id === 'storyteller') || ARCHETYPES[0];
  } else {
    return ARCHETYPES.find(a => a.id === 'creator') || ARCHETYPES[0];
  }
}

/**
 * Maps existing badge categories to narrative adventure categories
 */
function mapBadgeCategoryToNarrative(
  category: 'explorer' | 'photographer' | 'community' | 'environmental' | 'cultural'
): 'explorer' | 'photographer' | 'community' | 'environmental' | 'cultural' {
  // Keep the same categories but add narrative context
  return category;
}

/**
 * Validates migration data integrity
 */
export function validateMigration(
  originalProfile: UserProfile,
  migratedProfile: NarrativeUserProfile,
  originalChallenges: UserChallenge[],
  migratedJourneys: UserJourney[]
): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];

  // Check if points are preserved
  if (originalProfile.totalPoints !== migratedProfile.totalPoints) {
    issues.push('Points mismatch during migration');
  }

  // Check if badges are preserved
  if (originalProfile.badges.length !== migratedProfile.badges.length) {
    issues.push('Badge count mismatch during migration');
  }

  // Check if completed challenges are reflected in journeys
  const completedChallenges = originalChallenges.filter(c => c.status === 'completed');
  const totalCompletedInJourneys = migratedJourneys.reduce(
    (sum, journey) => sum + journey.completedChapters.length, 0
  );

  if (completedChallenges.length > totalCompletedInJourneys) {
    issues.push('Some completed challenges may not be reflected in journeys');
  }

  return {
    isValid: issues.length === 0,
    issues
  };
}

/**
 * Performs complete data migration
 */
export async function performMigration(
  users: UserProfile[],
  userChallenges: UserChallenge[][],
  transactions: PointTransaction[][]
): Promise<MigrationResult> {
  const result: MigrationResult = {
    success: true,
    migratedUsers: 0,
    preservedChallenges: 0,
    createdJourneys: 0,
    errors: []
  };

  try {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const challenges = userChallenges[i] || [];
      const userTransactions = transactions[i] || [];

      // Migrate user profile
      const migratedProfile = migrateUserProfile(user);
      
      // Migrate challenges to journeys
      const migratedJourneys = migrateUserChallenges(challenges, user);
      
      // Create diary entries from history
      const diaryEntries = createDiaryFromHistory(userTransactions, user.id);
      
      // Validate migration
      const validation = validateMigration(user, migratedProfile, challenges, migratedJourneys);
      
      if (!validation.isValid) {
        result.errors.push(`User ${user.id}: ${validation.issues.join(', ')}`);
      }

      result.migratedUsers++;
      result.preservedChallenges += challenges.length;
      result.createdJourneys += migratedJourneys.length;
    }
  } catch (error) {
    result.success = false;
    result.errors.push(`Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return result;
}