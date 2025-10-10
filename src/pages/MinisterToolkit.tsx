import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { ArrowLeft, Plus, Users, FileText, BookOpen } from "lucide-react";

export default function MinisterToolkit() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [newClientDialog, setNewClientDialog] = useState(false);
  const [newSessionDialog, setNewSessionDialog] = useState(false);

  // Fetch clients
  const { data: clients = [] } = useQuery({
    queryKey: ["minister-clients", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("minister_clients")
        .select("*")
        .eq("minister_id", user?.id)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch sessions for selected client
  const { data: sessions = [] } = useQuery({
    queryKey: ["minister-sessions", selectedClient],
    queryFn: async () => {
      if (!selectedClient) return [];
      const { data, error } = await supabase
        .from("minister_sessions")
        .select("*")
        .eq("client_id", selectedClient)
        .order("session_date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!selectedClient,
  });

  // Add client mutation
  const addClientMutation = useMutation({
    mutationFn: async (formData: any) => {
      const { data, error } = await supabase
        .from("minister_clients")
        .insert({
          minister_id: user?.id,
          ...formData,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["minister-clients"] });
      toast.success("Client added successfully");
      setNewClientDialog(false);
    },
    onError: () => toast.error("Failed to add client"),
  });

  // Add session mutation
  const addSessionMutation = useMutation({
    mutationFn: async (formData: any) => {
      const { data, error } = await supabase
        .from("minister_sessions")
        .insert({
          minister_id: user?.id,
          client_id: selectedClient,
          ...formData,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["minister-sessions"] });
      queryClient.invalidateQueries({ queryKey: ["minister-clients"] });
      toast.success("Session recorded successfully");
      setNewSessionDialog(false);
    },
    onError: () => toast.error("Failed to record session"),
  });

  const handleAddClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addClientMutation.mutate({
      client_name: formData.get("client_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      initial_concerns: formData.get("initial_concerns"),
      status: "active",
    });
  };

  const handleAddSession = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addSessionMutation.mutate({
      session_type: formData.get("session_type"),
      duration_minutes: parseInt(formData.get("duration_minutes") as string),
      prayer_points: formData.get("prayer_points"),
      breakthrough_moments: formData.get("breakthrough_moments"),
      next_steps: formData.get("next_steps"),
      private_notes: formData.get("private_notes"),
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Minister Toolkit</h1>
          <p className="text-muted-foreground">
            Track your ministry work, record sessions, and manage client progress
          </p>
        </div>

        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList>
            <TabsTrigger value="clients">
              <Users className="mr-2 h-4 w-4" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="sessions">
              <FileText className="mr-2 h-4 w-4" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="resources">
              <BookOpen className="mr-2 h-4 w-4" />
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">My Clients</h2>
              <Dialog open={newClientDialog} onOpenChange={setNewClientDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Client
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Client</DialogTitle>
                    <DialogDescription>
                      Record information about someone you're ministering to
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddClient} className="space-y-4">
                    <div>
                      <Label htmlFor="client_name">Name</Label>
                      <Input id="client_name" name="client_name" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input id="email" name="email" type="email" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input id="phone" name="phone" type="tel" />
                    </div>
                    <div>
                      <Label htmlFor="initial_concerns">Initial Concerns</Label>
                      <Textarea id="initial_concerns" name="initial_concerns" rows={4} />
                    </div>
                    <Button type="submit" className="w-full">Add Client</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {clients.map((client: any) => (
                <Card
                  key={client.id}
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => {
                    setSelectedClient(client.id);
                    setNewSessionDialog(true);
                  }}
                >
                  <CardHeader>
                    <CardTitle>{client.client_name}</CardTitle>
                    <CardDescription>
                      Status: <span className="capitalize">{client.status}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {client.initial_concerns || "No initial concerns recorded"}
                    </p>
                    {client.last_session_date && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Last session: {new Date(client.last_session_date).toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <div className="space-y-4">
              <Label>Select Client</Label>
              <Select value={selectedClient || ""} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client: any) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.client_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedClient && (
              <>
                <Dialog open={newSessionDialog} onOpenChange={setNewSessionDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Record Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Record Ministry Session</DialogTitle>
                      <DialogDescription>
                        Document your session notes and next steps
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddSession} className="space-y-4">
                      <div>
                        <Label htmlFor="session_type">Session Type</Label>
                        <Select name="session_type" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prayer">Prayer</SelectItem>
                            <SelectItem value="counseling">Counseling</SelectItem>
                            <SelectItem value="deliverance">Deliverance</SelectItem>
                            <SelectItem value="follow-up">Follow-up</SelectItem>
                            <SelectItem value="teaching">Teaching</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="duration_minutes">Duration (minutes)</Label>
                        <Input id="duration_minutes" name="duration_minutes" type="number" />
                      </div>
                      <div>
                        <Label htmlFor="prayer_points">Prayer Points</Label>
                        <Textarea id="prayer_points" name="prayer_points" rows={3} />
                      </div>
                      <div>
                        <Label htmlFor="breakthrough_moments">Breakthrough Moments</Label>
                        <Textarea id="breakthrough_moments" name="breakthrough_moments" rows={3} />
                      </div>
                      <div>
                        <Label htmlFor="next_steps">Next Steps</Label>
                        <Textarea id="next_steps" name="next_steps" rows={3} />
                      </div>
                      <div>
                        <Label htmlFor="private_notes">Private Notes</Label>
                        <Textarea id="private_notes" name="private_notes" rows={3} />
                      </div>
                      <Button type="submit" className="w-full">Save Session</Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <div className="space-y-4">
                  {sessions.map((session: any) => (
                    <Card key={session.id}>
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          <span className="capitalize">{session.session_type}</span>
                          <span className="text-sm font-normal text-muted-foreground">
                            {new Date(session.session_date).toLocaleDateString()}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {session.duration_minutes && (
                          <p className="text-sm">
                            <strong>Duration:</strong> {session.duration_minutes} minutes
                          </p>
                        )}
                        {session.prayer_points && (
                          <div>
                            <strong className="text-sm">Prayer Points:</strong>
                            <p className="text-sm text-muted-foreground mt-1">{session.prayer_points}</p>
                          </div>
                        )}
                        {session.breakthrough_moments && (
                          <div>
                            <strong className="text-sm">Breakthrough Moments:</strong>
                            <p className="text-sm text-muted-foreground mt-1">{session.breakthrough_moments}</p>
                          </div>
                        )}
                        {session.next_steps && (
                          <div>
                            <strong className="text-sm">Next Steps:</strong>
                            <p className="text-sm text-muted-foreground mt-1">{session.next_steps}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ministry Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">• Always pray before and after sessions</p>
                  <p className="text-sm">• Maintain confidentiality at all times</p>
                  <p className="text-sm">• Document breakthrough moments</p>
                  <p className="text-sm">• Set clear next steps with each client</p>
                  <p className="text-sm">• Follow up regularly</p>
                  <p className="text-sm">• Refer to professional help when needed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Prayer Points</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">• Breaking generational curses</p>
                  <p className="text-sm">• Freedom from trauma bonds</p>
                  <p className="text-sm">• Healing from spiritual wounds</p>
                  <p className="text-sm">• Deliverance from strongholds</p>
                  <p className="text-sm">• Restoration of identity in Christ</p>
                  <p className="text-sm">• Breaking addiction cycles</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm"><strong>Prayer:</strong> Intercession and spiritual warfare</p>
                  <p className="text-sm"><strong>Counseling:</strong> Guidance and support</p>
                  <p className="text-sm"><strong>Deliverance:</strong> Breaking spiritual bondages</p>
                  <p className="text-sm"><strong>Follow-up:</strong> Checking progress and accountability</p>
                  <p className="text-sm"><strong>Teaching:</strong> Biblical instruction and discipleship</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best Practices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">• Schedule regular check-ins</p>
                  <p className="text-sm">• Create safe, confidential space</p>
                  <p className="text-sm">• Listen actively without judgment</p>
                  <p className="text-sm">• Speak truth with love and grace</p>
                  <p className="text-sm">• Encourage personal responsibility</p>
                  <p className="text-sm">• Celebrate victories, no matter how small</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}