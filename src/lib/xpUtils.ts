import { supabase } from "@/integrations/supabase/client";

export const XP_REWARDS = {
  daily_prayer: 50,
  complete_assessment: 100,
  complete_course_level: 150,
  prayer_journal_entry: 30,
  testimony_shared: 75,
  roadmap_day_complete: 40,
  course_exam_passed: 200,
};

export const awardXP = async (activityType: keyof typeof XP_REWARDS, metadata: Record<string, any> = {}) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const xpEarned = XP_REWARDS[activityType];

    // Record the XP activity
    await supabase.from('xp_activities').insert({
      user_id: user.id,
      activity_type: activityType,
      xp_earned: xpEarned,
      metadata
    });

    // Get current streak data
    const { data: currentStreak } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (currentStreak) {
      const today = new Date().toISOString().split('T')[0];
      const lastActivity = currentStreak.last_activity_date;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

      let newCurrentStreak = currentStreak.current_streak;
      
      // Update streak logic
      if (lastActivity === today) {
        // Same day, just add XP
      } else if (lastActivity === yesterday) {
        // Consecutive day
        newCurrentStreak++;
      } else {
        // Streak broken
        newCurrentStreak = 1;
      }

      const newLongestStreak = Math.max(currentStreak.longest_streak, newCurrentStreak);
      const newTotalXP = currentStreak.total_xp + xpEarned;

      await supabase
        .from('user_streaks')
        .update({
          current_streak: newCurrentStreak,
          longest_streak: newLongestStreak,
          total_xp: newTotalXP,
          last_activity_date: today
        })
        .eq('user_id', user.id);
    } else {
      // Initialize streak
      await supabase.from('user_streaks').insert({
        user_id: user.id,
        current_streak: 1,
        longest_streak: 1,
        total_xp: xpEarned,
        last_activity_date: new Date().toISOString().split('T')[0]
      });
    }

    return { success: true, xpEarned };
  } catch (error) {
    console.error('Error awarding XP:', error);
    return { success: false, error };
  }
};
