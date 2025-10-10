import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Users, Plus, Calendar, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PrayerSession {
  id: string;
  host_user_id: string;
  title: string;
  prayer_type: string | null;
  max_participants: number;
  is_active: boolean;
  scheduled_time: string | null;
  participant_count?: number;
}

const GroupPrayer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<PrayerSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newSession, setNewSession] = useState({
    title: "",
    prayer_type: "deliverance",
    max_participants: 10,
    scheduled_time: ""
  });

  useEffect(() => {
    loadSessions();

    const channel = supabase
      .channel('group_prayer_sessions')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'group_prayer_sessions' 
      }, loadSessions)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadSessions = async () => {
    try {
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('group_prayer_sessions')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (sessionsError) throw sessionsError;

      const sessionsWithCounts = await Promise.all(
        (sessionsData || []).map(async (session) => {
          const { count } = await supabase
            .from('group_prayer_participants')
            .select('*', { count: 'exact', head: true })
            .eq('session_id', session.id);

          return { ...session, participant_count: count || 0 };
        })
      );

      setSessions(sessionsWithCounts);
    } catch (error) {
      console.error('Error loading sessions:', error);
      toast({
        title: "Error",
        description: "Failed to load prayer sessions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createSession = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('group_prayer_sessions')
        .insert({
          host_user_id: user.id,
          title: newSession.title,
          prayer_type: newSession.prayer_type,
          max_participants: newSession.max_participants,
          scheduled_time: newSession.scheduled_time || null
        });

      if (error) throw error;

      toast({
        title: "Session Created! 🙏",
        description: "Your group prayer session is now live"
      });

      setShowCreate(false);
      setNewSession({ title: "", prayer_type: "deliverance", max_participants: 10, scheduled_time: "" });
      loadSessions();
    } catch (error) {
      console.error('Error creating session:', error);
      toast({
        title: "Error",
        description: "Failed to create session",
        variant: "destructive"
      });
    }
  };

  const joinSession = async (sessionId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('group_prayer_participants')
        .insert({
          session_id: sessionId,
          user_id: user.id
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already Joined",
            description: "You're already in this session",
            variant: "destructive"
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "Joined Session! 🙏",
        description: "You're now part of this prayer group"
      });

      loadSessions();
    } catch (error) {
      console.error('Error joining session:', error);
      toast({
        title: "Error",
        description: "Failed to join session",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto">
        <Button onClick={() => navigate('/dashboard')} variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Group Prayer Sessions</h1>
            <p className="text-muted-foreground">Pray together in real-time with other believers</p>
          </div>

          <Dialog open={showCreate} onOpenChange={setShowCreate}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Session
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Group Prayer Session</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Session Title</Label>
                  <Input
                    value={newSession.title}
                    onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                    placeholder="e.g., Evening Deliverance Prayer"
                  />
                </div>
                <div>
                  <Label>Prayer Type</Label>
                  <Select value={newSession.prayer_type} onValueChange={(value) => setNewSession({...newSession, prayer_type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deliverance">Deliverance</SelectItem>
                      <SelectItem value="healing">Healing</SelectItem>
                      <SelectItem value="intercession">Intercession</SelectItem>
                      <SelectItem value="warfare">Spiritual Warfare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Max Participants</Label>
                  <Input
                    type="number"
                    value={newSession.max_participants}
                    onChange={(e) => setNewSession({...newSession, max_participants: parseInt(e.target.value)})}
                    min="2"
                    max="50"
                  />
                </div>
                <div>
                  <Label>Scheduled Time (Optional)</Label>
                  <Input
                    type="datetime-local"
                    value={newSession.scheduled_time}
                    onChange={(e) => setNewSession({...newSession, scheduled_time: e.target.value})}
                  />
                </div>
                <Button onClick={createSession} className="w-full">Create Session</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <Card className="p-8 text-center">
            <p>Loading sessions...</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <Card key={session.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{session.title}</h3>
                      {session.prayer_type && (
                        <Badge className="capitalize">{session.prayer_type}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {session.participant_count} / {session.max_participants}
                      </div>
                      {session.scheduled_time && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(session.scheduled_time).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button 
                    onClick={() => joinSession(session.id)}
                    disabled={(session.participant_count || 0) >= session.max_participants}
                  >
                    Join Session
                  </Button>
                </div>
              </Card>
            ))}
            {sessions.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-4">No active sessions</p>
                <Button onClick={() => setShowCreate(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Session
                </Button>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupPrayer;