import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Flame, Trophy, Zap } from "lucide-react";

interface UserStreak {
  current_streak: number;
  longest_streak: number;
  total_xp: number;
  level: number;
}

export const XPDisplay = () => {
  const [streak, setStreak] = useState<UserStreak | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStreakData();
  }, []);

  const loadStreakData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading streak:', error);
        return;
      }

      if (data) {
        setStreak(data);
      } else {
        // Initialize streak for new user
        const { data: newStreak } = await supabase
          .from('user_streaks')
          .insert({
            user_id: user.id,
            current_streak: 0,
            longest_streak: 0,
            total_xp: 0,
            level: 1
          })
          .select()
          .single();
        
        if (newStreak) setStreak(newStreak);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getXPForNextLevel = (level: number) => {
    return Math.pow(level, 2) * 100;
  };

  const getProgressToNextLevel = () => {
    if (!streak) return 0;
    const currentLevelXP = Math.pow(streak.level - 1, 2) * 100;
    const nextLevelXP = getXPForNextLevel(streak.level);
    const xpInCurrentLevel = streak.total_xp - currentLevelXP;
    const xpNeededForLevel = nextLevelXP - currentLevelXP;
    return (xpInCurrentLevel / xpNeededForLevel) * 100;
  };

  if (loading || !streak) {
    return null;
  }

  return (
    <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <span className="font-bold">Level {streak.level}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold">{streak.current_streak} day streak</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold">{streak.total_xp} XP</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress to Level {streak.level + 1}</span>
          <span>{Math.round(getProgressToNextLevel())}%</span>
        </div>
        <Progress value={getProgressToNextLevel()} className="h-2" />
      </div>

      {streak.longest_streak > streak.current_streak && (
        <div className="mt-2 text-xs text-muted-foreground">
          🏆 Best streak: {streak.longest_streak} days
        </div>
      )}
    </Card>
  );
};
