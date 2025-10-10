import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserBadge } from '@/components/UserBadge';
import { Certificate } from '@/components/Certificate';
import { ArrowLeft, Award, Trophy } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

const Achievements = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [badges, setBadges] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAchievements();
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user!.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadAchievements = async () => {
    try {
      setLoading(true);
      
      // Load badges
      const { data: badgesData, error: badgesError } = await supabase
        .from('user_badges' as any)
        .select('*')
        .eq('user_id', user!.id)
        .order('earned_at', { ascending: false });

      if (badgesError) throw badgesError;
      setBadges(badgesData || []);

      // Load certificates
      const { data: certsData, error: certsError } = await supabase
        .from('user_certificates' as any)
        .select('*')
        .eq('user_id', user!.id)
        .order('issued_at', { ascending: false });

      if (certsError) throw certsError;
      setCertificates(certsData || []);
    } catch (error) {
      console.error('Error loading achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBadgesByType = (type: string) => {
    return badges.filter(b => b.badge_type === type);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="h-12 w-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">My Achievements</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Track your badges, certificates, and accomplishments
            </p>
          </div>

          <Tabs defaultValue="badges" className="space-y-8">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
              <TabsTrigger value="badges">
                <Award className="h-4 w-4 mr-2" />
                Badges
              </TabsTrigger>
              <TabsTrigger value="certificates">
                <Trophy className="h-4 w-4 mr-2" />
                Certificates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="badges" className="space-y-6">
              {loading ? (
                <p className="text-center text-muted-foreground">Loading badges...</p>
              ) : badges.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Award className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No badges earned yet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Complete courses to earn badges!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Member Badge */}
                  {getBadgesByType('member').length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Membership</CardTitle>
                        <CardDescription>Your community status</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {getBadgesByType('member').map((badge) => (
                            <UserBadge
                              key={badge.id}
                              badgeType={badge.badge_type}
                              badgeCategory={badge.badge_category}
                              badgeLevel={badge.badge_level}
                              badgeData={badge.badge_data}
                              size="lg"
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Course Completion Badges */}
                  {getBadgesByType('course_completion').length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Course Completions</CardTitle>
                        <CardDescription>Modules you've completed</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {getBadgesByType('course_completion').map((badge) => (
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

                  {/* Subject Expert Badges */}
                  {getBadgesByType('subject_expert').length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Subject Expertise</CardTitle>
                        <CardDescription>Areas where you excel</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {getBadgesByType('subject_expert').map((badge) => (
                            <UserBadge
                              key={badge.id}
                              badgeType={badge.badge_type}
                              badgeCategory={badge.badge_category}
                              badgeLevel={badge.badge_level}
                              badgeData={badge.badge_data}
                              size="lg"
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Full Course Diplomas */}
                  {getBadgesByType('full_course_diploma').length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Course Diplomas</CardTitle>
                        <CardDescription>Full courses you've completed</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {getBadgesByType('full_course_diploma').map((badge) => (
                            <UserBadge
                              key={badge.id}
                              badgeType={badge.badge_type}
                              badgeCategory={badge.badge_category}
                              badgeLevel={badge.badge_level}
                              badgeData={badge.badge_data}
                              size="lg"
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="certificates" className="space-y-6">
              {loading ? (
                <p className="text-center text-muted-foreground">Loading certificates...</p>
              ) : certificates.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No certificates earned yet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Complete courses to earn certificates!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {certificates.map((cert) => (
                    <Certificate
                      key={cert.id}
                      certificateType={cert.certificate_type}
                      courseName={cert.course_name}
                      levelName={cert.level_name}
                      issuedAt={cert.issued_at}
                      userName={profile?.full_name || 'Student'}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Achievements;