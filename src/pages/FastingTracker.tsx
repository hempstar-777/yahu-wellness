import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Clock, Droplets, Play, Square, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface FastingSession {
  id: string;
  fasting_type: string;
  start_time: string;
  end_time: string | null;
  goal_hours: number;
  water_intake_ml: number;
  notes: string | null;
  completed: boolean;
}

const FastingTracker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<FastingSession[]>([]);
  const [activeFast, setActiveFast] = useState<FastingSession | null>(null);
  const [showNewFast, setShowNewFast] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newFast, setNewFast] = useState({
    fasting_type: "water_only",
    goal_hours: 24,
    notes: ""
  });

  useEffect(() => {
    loadFastingSessions();
    const interval = setInterval(loadFastingSessions, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const loadFastingSessions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('fasting_tracker')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSessions(data || []);
      const active = data?.find(s => !s.completed && !s.end_time);
      setActiveFast(active || null);

    } catch (error) {
      console.error('Error loading fasting sessions:', error);
      toast({
        title: "Error",
        description: "Failed to load fasting sessions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const startFast = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('fasting_tracker')
        .insert({
          user_id: user.id,
          fasting_type: newFast.fasting_type,
          start_time: new Date().toISOString(),
          goal_hours: newFast.goal_hours,
          notes: newFast.notes || null
        });

      if (error) throw error;

      toast({
        title: "Fast Started! 🙏",
        description: `Your ${newFast.goal_hours}-hour ${newFast.fasting_type.replace('_', ' ')} fast has begun`
      });

      setShowNewFast(false);
      setNewFast({ fasting_type: "water_only", goal_hours: 24, notes: "" });
      loadFastingSessions();

    } catch (error) {
      console.error('Error starting fast:', error);
      toast({
        title: "Error",
        description: "Failed to start fast",
        variant: "destructive"
      });
    }
  };

  const endFast = async (fastId: string) => {
    try {
      const { error } = await supabase
        .from('fasting_tracker')
        .update({
          end_time: new Date().toISOString(),
          completed: true
        })
        .eq('id', fastId);

      if (error) throw error;

      toast({
        title: "Fast Completed! 🎉",
        description: "May Yahuah bless your dedication and discipline"
      });

      loadFastingSessions();

    } catch (error) {
      console.error('Error ending fast:', error);
      toast({
        title: "Error",
        description: "Failed to end fast",
        variant: "destructive"
      });
    }
  };

  const updateWaterIntake = async (fastId: string, amount: number) => {
    try {
      const session = sessions.find(s => s.id === fastId);
      if (!session) return;

      const { error } = await supabase
        .from('fasting_tracker')
        .update({
          water_intake_ml: session.water_intake_ml + amount
        })
        .eq('id', fastId);

      if (error) throw error;

      loadFastingSessions();

    } catch (error) {
      console.error('Error updating water intake:', error);
    }
  };

  const getElapsedHours = (startTime: string) => {
    const start = new Date(startTime).getTime();
    const now = Date.now();
    return ((now - start) / (1000 * 60 * 60)).toFixed(1);
  };

  const getProgress = (session: FastingSession) => {
    const elapsed = parseFloat(getElapsedHours(session.start_time));
    return Math.min((elapsed / session.goal_hours) * 100, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 flex items-center justify-center">
        <Card className="p-8"><p>Loading...</p></Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto">
        <Button onClick={() => navigate('/dashboard')} variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Fasting Tracker</h1>
          <p className="text-muted-foreground">Track your spiritual fasting journey</p>
        </div>

        {/* Active Fast */}
        {activeFast && (
          <Card className="p-6 mb-6 bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Active Fast</h2>
                <p className="text-sm text-muted-foreground capitalize">
                  {activeFast.fasting_type.replace('_', ' ')}
                </p>
              </div>
              <Button onClick={() => endFast(activeFast.id)} variant="destructive">
                <Square className="mr-2 h-4 w-4" />
                End Fast
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>{getElapsedHours(activeFast.start_time)} hrs elapsed</span>
                  <span>{activeFast.goal_hours} hrs goal</span>
                </div>
                <Progress value={getProgress(activeFast)} className="h-3" />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold">{activeFast.water_intake_ml} ml</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => updateWaterIntake(activeFast.id, 250)}>
                    +250ml
                  </Button>
                  <Button size="sm" onClick={() => updateWaterIntake(activeFast.id, 500)}>
                    +500ml
                  </Button>
                </div>
              </div>

              {activeFast.notes && (
                <p className="text-sm bg-secondary/20 p-3 rounded">{activeFast.notes}</p>
              )}
            </div>
          </Card>
        )}

        {/* Start New Fast */}
        {!activeFast && !showNewFast && (
          <Card className="p-6 mb-6">
            <Button onClick={() => setShowNewFast(true)} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Start New Fast
            </Button>
          </Card>
        )}

        {showNewFast && (
          <Card className="p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Start New Fast</h3>
            <div className="space-y-4">
              <div>
                <Label>Fasting Type</Label>
                <Select value={newFast.fasting_type} onValueChange={(value) => setNewFast({...newFast, fasting_type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="water_only">Water Only</SelectItem>
                    <SelectItem value="daniel_fast">Daniel Fast</SelectItem>
                    <SelectItem value="partial">Partial Fast</SelectItem>
                    <SelectItem value="absolute">Absolute (No Food/Water)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Goal (Hours)</Label>
                <Input
                  type="number"
                  value={newFast.goal_hours}
                  onChange={(e) => setNewFast({...newFast, goal_hours: parseInt(e.target.value)})}
                  min="1"
                />
              </div>

              <div>
                <Label>Notes (Optional)</Label>
                <Textarea
                  value={newFast.notes}
                  onChange={(e) => setNewFast({...newFast, notes: e.target.value})}
                  placeholder="Prayer focus, scripture, intentions..."
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={startFast} className="flex-1">
                  <Play className="mr-2 h-4 w-4" />
                  Begin Fast
                </Button>
                <Button onClick={() => setShowNewFast(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* History */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Fasting History</h3>
          <div className="space-y-3">
            {sessions.filter(s => s.completed).slice(0, 10).map((session) => (
              <div key={session.id} className="p-4 bg-secondary/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold capitalize">{session.fasting_type.replace('_', ' ')}</span>
                  <Badge>{session.goal_hours} hours</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {new Date(session.start_time).toLocaleDateString()}
                </div>
              </div>
            ))}
            {sessions.filter(s => s.completed).length === 0 && (
              <p className="text-center text-muted-foreground">No completed fasts yet</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FastingTracker;
