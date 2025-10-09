import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, Lock, CheckCircle, Award, GraduationCap, Leaf, Brain, Heart, Scale } from 'lucide-react';

const Courses = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState({
    deliverance: { currentLevel: 1, completedLevels: [], testsPassed: 0 },
    intercessors: { currentLevel: 1, completedLevels: [], testsPassed: 0 },
    trauma: { currentLevel: 1, completedLevels: [], testsPassed: 0 },
    naturalHealing: { currentLevel: 1, completedLevels: [], testsPassed: 0 },
    tribunals: { currentLevel: 1, completedLevels: [], testsPassed: 0 },
  });

  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user]);

  const loadProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('course_progress')
        .select('*')
        .eq('user_id', user!.id);

      if (error) throw error;

      const progressMap: any = {
        deliverance: { currentLevel: 1, completedLevels: [], testsPassed: 0 },
        intercessors: { currentLevel: 1, completedLevels: [], testsPassed: 0 },
        trauma: { currentLevel: 1, completedLevels: [], testsPassed: 0 },
        naturalHealing: { currentLevel: 1, completedLevels: [], testsPassed: 0 },
        tribunals: { currentLevel: 1, completedLevels: [], testsPassed: 0 },
      };

      data?.forEach(item => {
        if (item.completed && item.course_id in progressMap) {
          progressMap[item.course_id].completedLevels.push(item.level_index);
          progressMap[item.course_id].testsPassed++;
        }
      });

      setUserProgress(progressMap);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const enrollInCourse = async (courseId: string, levelIndex: number) => {
    if (!user) {
      toast.error("Please login to enroll in courses");
      navigate('/auth');
      return;
    }

    try {
      const { error } = await supabase
        .from('course_progress')
        .insert({
          user_id: user.id,
          course_id: courseId,
          level_index: levelIndex,
          completed: false,
        });

      if (error) throw error;

      toast.success("Enrolled in course!");
      await loadProgress();
    } catch (error) {
      console.error('Error enrolling:', error);
      toast.error("Failed to enroll. Please try again.");
    }
  };

  const courseCategories = [
    {
      id: 'deliverance',
      title: 'School of Deliverance',
      icon: GraduationCap,
      color: 'text-blue-600',
      description: 'Comprehensive training in spiritual deliverance ministry from beginner to advanced practitioner',
      levels: [
        {
          level: 1,
          title: 'Foundations of Deliverance',
          topics: ['Biblical basis for deliverance', 'Understanding spiritual authority', 'Legal grounds and rights', 'The five-step process', 'Personal preparation'],
          duration: '4 weeks',
          difficulty: 'Beginner'
        },
        {
          level: 2,
          title: 'Identifying Spiritual Bondages',
          topics: ['Discernment of spirits', 'Common doorways and entry points', 'Generational bondages', 'Soul ties and covenants', 'Assessment techniques'],
          duration: '6 weeks',
          difficulty: 'Intermediate'
        },
        {
          level: 3,
          title: 'Advanced Deliverance Ministry',
          topics: ['Handling manifestations', 'Territorial spirits', 'Complex cases', 'Team ministry', 'Post-deliverance care'],
          duration: '8 weeks',
          difficulty: 'Advanced'
        },
        {
          level: 4,
          title: 'Master Practitioner',
          topics: ['Training others', 'Building deliverance teams', 'Church integration', 'Legal and ethical considerations', 'Crisis intervention'],
          duration: '12 weeks',
          difficulty: 'Expert'
        }
      ]
    },
    {
      id: 'intercessors',
      title: 'School of Intercession',
      icon: Heart,
      color: 'text-purple-600',
      description: 'Develop powerful intercessory prayer skills and learn to stand in the gap for others',
      levels: [
        {
          level: 1,
          title: 'Prayer Warrior Foundations',
          topics: ['Types of prayer', 'Praying Scripture', 'Spiritual armor', 'Prayer journaling', 'Building consistency'],
          duration: '4 weeks',
          difficulty: 'Beginner'
        },
        {
          level: 2,
          title: 'Strategic Intercession',
          topics: ['Targeted prayer strategies', 'Spiritual mapping', 'Breaking strongholds', 'Corporate intercession', 'Prophetic intercession'],
          duration: '6 weeks',
          difficulty: 'Intermediate'
        },
        {
          level: 3,
          title: 'Advanced Intercessory Warfare',
          topics: ['Binding and loosing', 'Governmental intercession', 'Intercession for nations', 'Warfare praise', 'Fasting and prayer'],
          duration: '8 weeks',
          difficulty: 'Advanced'
        }
      ]
    },
    {
      id: 'trauma',
      title: 'Spiritual Trauma & Inner Healing',
      icon: Brain,
      color: 'text-rose-600',
      description: 'Understanding and healing from spiritual, emotional, and generational trauma',
      levels: [
        {
          level: 1,
          title: 'Understanding Spiritual Trauma',
          topics: [
            'Biblical foundation for inner healing',
            'Types of spiritual trauma (abuse, rejection, abandonment)',
            'Mind-body-spirit connection in trauma',
            'The role of the Holy Spirit in healing',
            'Safe processing and creating emotional safety'
          ],
          duration: '5 weeks',
          difficulty: 'Beginner'
        },
        {
          level: 2,
          title: 'Holy Spirit-Led Inner Healing',
          topics: [
            'Inviting the Holy Spirit into traumatic memories',
            'Healing prayer and Spirit-led ministry',
            'Breaking trauma bonds through the power of God',
            'Renewing the mind (Romans 12:2)',
            'Forgiveness work empowered by the Spirit'
          ],
          duration: '7 weeks',
          difficulty: 'Intermediate'
        },
        {
          level: 3,
          title: 'Complex Trauma & Deliverance Ministry',
          topics: [
            'PTSD and spiritual warfare connection',
            'Dissociation and fragmentation healing',
            'Ritual abuse and satanic trauma recovery',
            'The Comforter\'s role in deep healing',
            'Professional boundaries and referral protocols'
          ],
          duration: '10 weeks',
          difficulty: 'Advanced'
        }
      ]
    },
    {
      id: 'naturalHealing',
      title: 'Natural & Holistic Healing',
      icon: Leaf,
      color: 'text-green-600',
      description: 'Biblical natural healing, herbs, essential oils, nutrition, and suppressed remedies',
      levels: [
        {
          level: 1,
          title: 'Biblical Healing & Alkaline Nutrition',
          topics: [
            'God\'s original diet (Genesis 1:29)',
            'Intracellular detoxification principles',
            'Alkaline vs acidic foods',
            'Wild crafted herbs foundation',
            'Cellular regeneration basics (Yahki Awakened methodology)'
          ],
          duration: '4 weeks',
          difficulty: 'Beginner'
        },
        {
          level: 2,
          title: 'Herbal Medicine & Anti-Parasitic Protocols',
          topics: [
            'Biblical herbs and their healing properties',
            'The 3Bitters herbal blend approach',
            'Anti-parasitic herbs and protocols',
            'System-specific herbal therapies (cardiovascular, digestive, nervous)',
            'Creating custom herbal formulas'
          ],
          duration: '6 weeks',
          difficulty: 'Intermediate'
        },
        {
          level: 3,
          title: 'Advanced Natural Remedies & Detoxification',
          topics: [
            'Advanced parasite cleansing (spiritual-physical connection)',
            'Borax and mineral therapy protocols',
            'Heavy metal detoxification',
            'Suppressed natural cancer treatments',
            'Holistic revitalization techniques'
          ],
          duration: '8 weeks',
          difficulty: 'Advanced'
        },
        {
          level: 4,
          title: 'Master Healer Training',
          topics: [
            'How parasites open spiritual doorways',
            'Emotional-spiritual roots of disease',
            'Complete mind-body-spirit healing protocols',
            'Building natural healing programs',
            'Teaching others holistic wellness (Yahki Awakened model)'
          ],
          duration: '10 weeks',
          difficulty: 'Expert'
        }
      ]
    },
    {
      id: 'tribunals',
      title: 'Courts of Heaven',
      icon: Scale,
      color: 'text-amber-600',
      description: 'Operating in the heavenly courts to overturn legal accusations and obtain divine verdicts',
      levels: [
        {
          level: 1,
          title: 'Introduction to Heavenly Courts',
          topics: ['Biblical basis for courts', 'Understanding legal realms', 'The accuser\'s role', 'Your advocate Jesus', 'Basic court protocol'],
          duration: '5 weeks',
          difficulty: 'Beginner'
        },
        {
          level: 2,
          title: 'Presenting Your Case',
          topics: ['Identifying accusations', 'Gathering evidence', 'The blood of Jesus', 'Repentance and restitution', 'Receiving verdicts'],
          duration: '7 weeks',
          difficulty: 'Intermediate'
        },
        {
          level: 3,
          title: 'Advanced Court Proceedings',
          topics: ['Generational cases', 'Corporate cases', 'Territorial cases', 'Appealing verdicts', 'Enforcing judgments'],
          duration: '9 weeks',
          difficulty: 'Advanced'
        }
      ]
    }
  ];

  const isLevelLocked = (courseId: string, level: number) => {
    const progress = userProgress[courseId as keyof typeof userProgress];
    return level > 1 && !progress.completedLevels.includes(level - 1);
  };

  const isLevelCompleted = (courseId: string, level: number) => {
    const progress = userProgress[courseId as keyof typeof userProgress];
    return progress.completedLevels.includes(level);
  };

  const getLevelProgress = (courseId: string) => {
    const progress = userProgress[courseId as keyof typeof userProgress];
    const totalLevels = courseCategories.find(c => c.id === courseId)?.levels.length || 0;
    return (progress.completedLevels.length / totalLevels) * 100;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-12 w-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">Spiritual University</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive modular courses from beginner to expert level. Complete exams to unlock advanced modules and grow in your spiritual calling.
          </p>
        </div>

        <Tabs defaultValue="deliverance" className="space-y-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 h-auto p-2 bg-muted/50">
            {courseCategories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-background"
                >
                  <Icon className={`h-5 w-5 ${category.color}`} />
                  <span className="text-xs font-medium text-center">{category.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {courseCategories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsContent key={category.id} value={category.id} className="space-y-6">
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Icon className={`h-10 w-10 ${category.color}`} />
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{category.title}</CardTitle>
                        <CardDescription className="text-base">{category.description}</CardDescription>
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Overall Progress</span>
                            <span className="text-sm text-muted-foreground">
                              {userProgress[category.id as keyof typeof userProgress].completedLevels.length} / {category.levels.length} levels
                            </span>
                          </div>
                          <Progress value={getLevelProgress(category.id)} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <div className="grid gap-6">
                  {category.levels.map((level) => {
                    const locked = isLevelLocked(category.id, level.level);
                    const completed = isLevelCompleted(category.id, level.level);
                    
                    return (
                      <Card
                        key={level.level}
                        className={`border-2 transition-all ${
                          locked ? 'opacity-60' : 'hover:shadow-lg'
                        } ${completed ? 'border-green-500 bg-green-50/50' : ''}`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg">
                                {locked ? <Lock className="h-5 w-5" /> : level.level}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <CardTitle className="text-xl">{level.title}</CardTitle>
                                  {completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                  <Badge className={getDifficultyColor(level.difficulty)}>
                                    {level.difficulty}
                                  </Badge>
                                  <Badge variant="outline">
                                    <BookOpen className="h-3 w-3 mr-1" />
                                    {level.duration}
                                  </Badge>
                                </div>
                                <CardDescription className="text-base mb-3">
                                  Topics covered:
                                </CardDescription>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {level.topics.map((topic, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm">
                                      <span className="text-primary mt-0.5">•</span>
                                      <span>{topic}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-3">
                            <Button
                              disabled={locked}
                              className="flex-1"
                              variant={completed ? "outline" : "default"}
                              onClick={() => {
                                if (category.id === 'naturalHealing') {
                                  window.location.href = '/natural-healing';
                                } else if (category.id === 'trauma') {
                                  window.location.href = '/spiritual-trauma';
                                } else {
                                  enrollInCourse(category.id, level.level);
                                }
                              }}
                            >
                              {completed ? 'Review Course' : locked ? 'Complete Previous Level First' : 'Start Course'}
                            </Button>
                            {!locked && !completed && (
                              <Button variant="outline" disabled={locked}>
                                <Award className="h-4 w-4 mr-2" />
                                Take Exam
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
      </div>
    </ProtectedRoute>
  );
};

export default Courses;
