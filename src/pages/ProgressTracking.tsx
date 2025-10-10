import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, TrendingDown, TrendingUp, Calendar, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

interface AssessmentHistory {
  id: string;
  assessment_type: string;
  score: number;
  completed_at: string;
}

const ProgressTracking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentHistory[]>([]);
  const [currentScores, setCurrentScores] = useState<Record<string, number>>({});

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: history, error } = await supabase
        .from('assessment_results')
        .select('id, assessment_type, score, completed_at')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: true });

      if (error) throw error;

      setAssessmentHistory(history || []);

      // Calculate current scores (latest for each type)
      const scoreMap: Record<string, number> = {};
      history?.forEach(assessment => {
        scoreMap[assessment.assessment_type] = assessment.score || 0;
      });
      setCurrentScores(scoreMap);

    } catch (error) {
      console.error('Error loading progress:', error);
      toast({
        title: "Error",
        description: "Failed to load progress data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getTimelineData = () => {
    const timelineMap: Record<string, Record<string, number>> = {};
    
    assessmentHistory.forEach(assessment => {
      const date = new Date(assessment.completed_at).toLocaleDateString();
      if (!timelineMap[date]) {
        timelineMap[date] = {};
      }
      timelineMap[date][assessment.assessment_type] = assessment.score || 0;
    });

    return Object.entries(timelineMap).map(([date, scores]) => ({
      date,
      ...scores
    }));
  };

  const getRadarData = () => {
    return Object.entries(currentScores).map(([type, score]) => ({
      assessment: type.replace('_', ' '),
      score: score,
      fullMark: 100
    }));
  };

  const calculateImprovement = () => {
    const improvements: { type: string; change: number; trend: 'up' | 'down' | 'stable' }[] = [];
    
    Object.keys(currentScores).forEach(type => {
      const typeHistory = assessmentHistory
        .filter(a => a.assessment_type === type)
        .sort((a, b) => new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime());

      if (typeHistory.length >= 2) {
        const first = typeHistory[0].score || 0;
        const last = typeHistory[typeHistory.length - 1].score || 0;
        const change = last - first;
        improvements.push({
          type: type.replace('_', ' '),
          change: Math.abs(change),
          trend: change < 0 ? 'down' : change > 0 ? 'up' : 'stable'
        });
      }
    });

    return improvements;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 flex items-center justify-center">
        <Card className="p-8">
          <p>Loading progress data...</p>
        </Card>
      </div>
    );
  }

  const timelineData = getTimelineData();
  const radarData = getRadarData();
  const improvements = calculateImprovement();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="max-w-6xl mx-auto">
        <Button onClick={() => navigate('/dashboard')} variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Your Progress Journey</h1>
          <p className="text-muted-foreground">Track your spiritual freedom progress over time</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Assessments</p>
                <p className="text-2xl font-bold">{assessmentHistory.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Assessment Types</p>
                <p className="text-2xl font-bold">{Object.keys(currentScores).length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingDown className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Improvements</p>
                <p className="text-2xl font-bold">
                  {improvements.filter(i => i.trend === 'down').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline Chart */}
        {timelineData.length > 0 && (
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Assessment Scores Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(currentScores).map((type, idx) => (
                  <Line
                    key={type}
                    type="monotone"
                    dataKey={type}
                    stroke={`hsl(${idx * 50}, 70%, 50%)`}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Radar Chart */}
        {radarData.length > 0 && (
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Current Assessment Snapshot</h2>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="assessment" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Improvement Breakdown */}
        {improvements.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Your Improvements</h2>
            <div className="space-y-4">
              {improvements.map((improvement) => (
                <div key={improvement.type} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    {improvement.trend === 'down' ? (
                      <TrendingDown className="w-6 h-6 text-green-500" />
                    ) : improvement.trend === 'up' ? (
                      <TrendingUp className="w-6 h-6 text-destructive" />
                    ) : (
                      <div className="w-6 h-6" />
                    )}
                    <div>
                      <p className="font-semibold capitalize">{improvement.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {improvement.trend === 'down' 
                          ? `Score decreased by ${improvement.change} points (improvement!)` 
                          : improvement.trend === 'up'
                          ? `Score increased by ${improvement.change} points`
                          : 'No change'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {assessmentHistory.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No assessment history yet</p>
            <Button onClick={() => navigate('/assessments')}>
              Take Your First Assessment
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProgressTracking;
