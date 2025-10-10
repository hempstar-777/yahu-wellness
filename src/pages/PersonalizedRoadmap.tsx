import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, CheckCircle2, AlertCircle, Flame, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Day {
  day: number;
  title: string;
  activities: string[];
  prayers: string[];
  scripture: string;
  fasting?: string;
  completed?: boolean;
}

interface Week {
  week: number;
  focus: string;
  days: Day[];
  milestone: string;
}

interface RoadmapData {
  title: string;
  overview: string;
  weeks: Week[];
  emergency_toolkit: {
    quick_prayers: string[];
    scriptures: string[];
    warning_signs: string[];
  };
}

const PersonalizedRoadmap = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [roadmapId, setRoadmapId] = useState<string | null>(null);

  const assessmentId = searchParams.get('assessmentId');
  const assessmentType = searchParams.get('type');

  useEffect(() => {
    loadOrGenerateRoadmap();
  }, [assessmentId]);

  const loadOrGenerateRoadmap = async () => {
    if (!assessmentId) {
      toast({
        title: "Error",
        description: "No assessment ID provided",
        variant: "destructive"
      });
      navigate('/assessments');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check if roadmap already exists
      const { data: existingRoadmap } = await supabase
        .from('deliverance_roadmaps')
        .select('*')
        .eq('assessment_id', assessmentId)
        .single();

      if (existingRoadmap) {
        setRoadmap(existingRoadmap.roadmap_data as unknown as RoadmapData);
        setProgress((existingRoadmap.progress || {}) as Record<string, boolean>);
        setRoadmapId(existingRoadmap.id);
        setLoading(false);
      } else {
        await generateNewRoadmap();
      }
    } catch (error) {
      console.error('Error loading roadmap:', error);
      setLoading(false);
    }
  };

  const generateNewRoadmap = async () => {
    setGenerating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get assessment results
      const { data: assessment } = await supabase
        .from('assessment_results')
        .select('*')
        .eq('id', assessmentId)
        .single();

      if (!assessment) throw new Error('Assessment not found');

      // Generate roadmap using AI
      const { data: roadmapResponse, error: functionError } = await supabase.functions.invoke('generate-roadmap', {
        body: {
          assessmentResults: assessment.responses,
          assessmentType: assessment.assessment_type
        }
      });

      if (functionError) throw functionError;

      // Save roadmap to database
      const { data: savedRoadmap, error: saveError } = await supabase
        .from('deliverance_roadmaps')
        .insert({
          user_id: user.id,
          assessment_id: assessmentId,
          roadmap_data: roadmapResponse.roadmap,
          progress: {}
        })
        .select()
        .single();

      if (saveError) throw saveError;

      setRoadmap(roadmapResponse.roadmap);
      setRoadmapId(savedRoadmap.id);
      
      toast({
        title: "Roadmap Generated! 🎯",
        description: "Your personalized 30-day freedom journey is ready"
      });
    } catch (error) {
      console.error('Error generating roadmap:', error);
      toast({
        title: "Error",
        description: "Failed to generate roadmap. Please try again.",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
      setLoading(false);
    }
  };

  const toggleDayCompletion = async (weekNum: number, dayNum: number) => {
    const key = `week${weekNum}_day${dayNum}`;
    const newProgress = { ...progress, [key]: !progress[key] };
    setProgress(newProgress);

    if (roadmapId) {
      await supabase
        .from('deliverance_roadmaps')
        .update({ progress: newProgress })
        .eq('id', roadmapId);
    }
  };

  const calculateOverallProgress = () => {
    if (!roadmap) return 0;
    const totalDays = roadmap.weeks.reduce((sum, week) => sum + week.days.length, 0);
    const completedDays = Object.values(progress).filter(Boolean).length;
    return (completedDays / totalDays) * 100;
  };

  if (loading || generating) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Flame className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
          <h2 className="text-2xl font-bold mb-2">
            {generating ? "Creating Your Roadmap..." : "Loading..."}
          </h2>
          <p className="text-muted-foreground">
            {generating ? "The Holy Spirit is guiding your personalized journey" : "Please wait"}
          </p>
        </Card>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
        <Button onClick={() => navigate(-1)} variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Card className="p-8 text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
          <h2 className="text-2xl font-bold mb-2">Roadmap Not Found</h2>
          <p className="text-muted-foreground mb-4">Unable to load your personalized roadmap</p>
          <Button onClick={() => navigate('/assessments')}>Back to Assessments</Button>
        </Card>
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

        {/* Header */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-start gap-4">
            <Calendar className="w-12 h-12 text-primary" />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{roadmap.title}</h1>
              <p className="text-muted-foreground mb-4">{roadmap.overview}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-semibold">{Math.round(calculateOverallProgress())}%</span>
                </div>
                <Progress value={calculateOverallProgress()} className="h-2" />
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="roadmap" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="roadmap">30-Day Roadmap</TabsTrigger>
            <TabsTrigger value="toolkit">Emergency Toolkit</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="space-y-4">
            {roadmap.weeks.map((week) => (
              <Card key={week.week} className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">Week {week.week}: {week.focus}</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong>Milestone:</strong> {week.milestone}
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {week.days.map((day) => {
                    const dayKey = `week${week.week}_day${day.day}`;
                    const isCompleted = progress[dayKey] || false;

                    return (
                      <AccordionItem key={day.day} value={`day-${day.day}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3 w-full">
                            <Checkbox
                              checked={isCompleted}
                              onCheckedChange={() => toggleDayCompletion(week.week, day.day)}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <span className={`flex-1 text-left ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                              Day {day.day}: {day.title}
                            </span>
                            {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-10 space-y-4">
                          {day.activities.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Flame className="w-4 h-4" />
                                Activities
                              </h4>
                              <ul className="list-disc pl-6 space-y-1">
                                {day.activities.map((activity, idx) => (
                                  <li key={idx} className="text-sm">{activity}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {day.prayers.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2">🙏 Prayers</h4>
                              <ul className="list-disc pl-6 space-y-1">
                                {day.prayers.map((prayer, idx) => (
                                  <li key={idx} className="text-sm">{prayer}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {day.scripture && (
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Scripture Reading
                              </h4>
                              <p className="text-sm bg-secondary/30 p-3 rounded">{day.scripture}</p>
                            </div>
                          )}

                          {day.fasting && (
                            <div>
                              <h4 className="font-semibold mb-2">⏰ Fasting</h4>
                              <p className="text-sm bg-primary/10 p-3 rounded">{day.fasting}</p>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="toolkit">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-destructive" />
                Emergency Spiritual Toolkit
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">🚨 Quick Prayers for Crisis Moments</h3>
                  <div className="space-y-2">
                    {roadmap.emergency_toolkit.quick_prayers.map((prayer, idx) => (
                      <Card key={idx} className="p-4 bg-destructive/10">
                        <p className="text-sm">{prayer}</p>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">📖 Power Scriptures</h3>
                  <div className="space-y-2">
                    {roadmap.emergency_toolkit.scriptures.map((scripture, idx) => (
                      <Card key={idx} className="p-4 bg-primary/10">
                        <p className="text-sm font-medium">{scripture}</p>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">⚠️ Warning Signs to Watch For</h3>
                  <ul className="space-y-2">
                    {roadmap.emergency_toolkit.warning_signs.map((sign, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PersonalizedRoadmap;
