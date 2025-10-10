import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { VIPStatus } from '@/components/VIPStatus';
import { UserBadge } from '@/components/UserBadge';
import { XPDisplay } from '@/components/XPDisplay';
import { 
  ClipboardCheck, 
  GraduationCap, 
  BookHeart, 
  MessageSquare, 
  TrendingUp,
  ChevronLeft,
  Calendar,
  Award,
  Video,
  Users,
  Briefcase
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AssessmentResult {
  id: string;
  assessment_type: string;
  completed_at: string;
  score: number;
}

interface CourseProgress {
  id: string;
  course_id: string;
  level_index: number;
  completed: boolean;
  completed_at: string | null;
}

interface PrayerEntry {
  id: string;
  title: string;
  created_at: string;
  is_answered: boolean;
}

interface Testimony {
  id: string;
  title: string;
  created_at: string;
  is_public: boolean;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [prayers, setPrayers] = useState<PrayerEntry[]>([]);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    setIsLoading(true);

    try {
      // Fetch assessments
      const { data: assessmentData } = await supabase
        .from('assessment_results')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(5);

      if (assessmentData) setAssessments(assessmentData);

      // Fetch course progress
      const { data: progressData } = await supabase
        .from('course_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (progressData) setCourseProgress(progressData);

      // Fetch prayers
      const { data: prayerData } = await supabase
        .from('prayer_journal')
        .select('id, title, created_at, is_answered')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (prayerData) setPrayers(prayerData);

      // Fetch testimonies
      const { data: testimonyData } = await supabase
        .from('testimonies')
        .select('id, title, created_at, is_public')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (testimonyData) setTestimonies(testimonyData);

      // Fetch badges
      const { data: badgeData } = await supabase
        .from('user_badges' as any)
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false })
        .limit(5);

      if (badgeData) setBadges(badgeData);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAssessmentType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const completedCourses = courseProgress.filter(p => p.completed).length;
  const totalCourseModules = courseProgress.length;
  const courseCompletion = totalCourseModules > 0 
    ? (completedCourses / totalCourseModules) * 100 
    : 0;

  const answeredPrayers = prayers.filter(p => p.is_answered).length;
  const prayerAnswerRate = prayers.length > 0 
    ? (answeredPrayers / prayers.length) * 100 
    : 0;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-light">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold">Your Spiritual Journey</h1>
            <p className="text-muted-foreground mt-2">Track your progress and stay encouraged</p>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* VIP Status */}
          <VIPStatus />

          {/* XP and Streak Display */}
          <div className="mt-6">
            <XPDisplay />
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Your Badges
                  </CardTitle>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/achievements">View All</Link>
                  </Button>
                </div>
                <CardDescription>Recent achievements and accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {badges.map((badge) => (
                    <UserBadge
                      key={badge.id}
                      badgeType={badge.badge_type}
                      badgeCategory={badge.badge_category}
                      badgeLevel={badge.badge_level}
                      badgeData={badge.badge_data}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-4 mb-8 mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-primary" />
                  Assessments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{assessments.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  Course Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{Math.round(courseCompletion)}%</div>
                <Progress value={courseCompletion} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BookHeart className="w-4 h-4 text-primary" />
                  Prayer Journal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{prayers.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {answeredPrayers} answered
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Testimonies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{testimonies.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Shared</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Assessments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5" />
                  Recent Assessments
                </CardTitle>
                <CardDescription>Your latest spiritual assessments</CardDescription>
              </CardHeader>
              <CardContent>
                {assessments.length === 0 ? (
                  <Alert>
                    <TrendingUp className="h-4 w-4" />
                    <AlertDescription>
                      No assessments completed yet. Start your journey!
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3">
                    {assessments.map((assessment) => (
                      <div key={assessment.id} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                        <div>
                          <p className="font-medium">{formatAssessmentType(assessment.assessment_type)}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(assessment.completed_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="secondary">{assessment.score} items</Badge>
                      </div>
                    ))}
                  </div>
                )}
                <Button asChild className="w-full mt-4" variant="outline">
                  <Link to="/assessments">Take New Assessment</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Prayer Journal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookHeart className="w-5 h-5" />
                  Prayer Journal
                </CardTitle>
                <CardDescription>Your recent prayer requests</CardDescription>
              </CardHeader>
              <CardContent>
                {prayers.length === 0 ? (
                  <Alert>
                    <BookHeart className="h-4 w-4" />
                    <AlertDescription>
                      Start journaling your prayers and track answered prayers.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3">
                    {prayers.map((prayer) => (
                      <div key={prayer.id} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{prayer.title}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(prayer.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        {prayer.is_answered && (
                          <Badge className="ml-2">Answered</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <Button asChild className="w-full mt-4" variant="outline">
                  <Link to="/prayer-journal">Open Journal</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Continue Your Journey</CardTitle>
              <CardDescription>Quick actions to keep growing spiritually</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                <Button asChild variant="outline" className="h-auto py-4">
                  <Link to="/assessments" className="flex flex-col items-center gap-2">
                    <ClipboardCheck className="w-6 h-6" />
                    <span>Take Assessment</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4">
                  <Link to="/courses" className="flex flex-col items-center gap-2">
                    <GraduationCap className="w-6 h-6" />
                    <span>Study Courses</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4">
                  <Link to="/prayers" className="flex flex-col items-center gap-2">
                    <BookHeart className="w-6 h-6" />
                    <span>Pray</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4">
                  <Link to="/testimonies" className="flex flex-col items-center gap-2">
                    <MessageSquare className="w-6 h-6" />
                    <span>Share Testimony</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4">
                  <Link to="/prayer-videos" className="flex flex-col items-center gap-2">
                    <Video className="w-6 h-6" />
                    <span>Prayer Videos</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4">
                  <Link to="/group-prayer" className="flex flex-col items-center gap-2">
                    <Users className="w-6 h-6" />
                    <span>Group Prayer</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4">
                  <Link to="/forums" className="flex flex-col items-center gap-2">
                    <MessageSquare className="w-6 h-6" />
                    <span>Forums</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4">
                  <Link to="/minister-toolkit" className="flex flex-col items-center gap-2">
                    <Briefcase className="w-6 h-6" />
                    <span>Minister Toolkit</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
