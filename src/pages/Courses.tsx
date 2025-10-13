import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, Lock, CheckCircle, Award, GraduationCap, Leaf, Brain, Heart, Scale, DollarSign, ShoppingCart } from 'lucide-react';
import { coursePricing, calculateSavings } from '@/lib/courseData';
import { loadStripe } from '@stripe/stripe-js';

const Courses = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [isVIP, setIsVIP] = useState(false);
  const [userProgress, setUserProgress] = useState({
    deliverance: { currentLevel: 1, completedLevels: [], testsPassed: 0 },
    intercessors: { currentLevel: 1, completedLevels: [], testsPassed: 0 },
    trauma: { currentLevel: 1, completedLevels: [], testsPassed: 0 },
    naturalHealing: { currentLevel: 1, completedLevels: [], testsPassed: 0 },
    tribunals: { currentLevel: 1, completedLevels: [], testsPassed: 0 },
  });
  const [purchases, setPurchases] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user) {
      loadProgress();
      loadPurchases();
      checkVIPStatus();
    }
  }, [user]);

  useEffect(() => {
    // Check for successful payment
    const success = searchParams.get('success');
    const sessionId = searchParams.get('session_id');
    
    if (success === 'true' && sessionId) {
      toast.success('Payment successful! You now have access to the course.');
      // Reload purchases and progress
      loadPurchases();
      loadProgress();
    }

    if (searchParams.get('canceled') === 'true') {
      toast.error('Payment was canceled');
    }
  }, [searchParams]);

  const loadPurchases = async () => {
    try {
      const { data, error } = await supabase
        .from('course_purchases')
        .select('*')
        .eq('user_id', user!.id);

      if (error) throw error;
      setPurchases(data || []);
    } catch (error) {
      console.error('Error loading purchases:', error);
    }
  };

  const checkVIPStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('vip_users' as any)
        .select('is_active')
        .eq('user_id', user!.id)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      setIsVIP(!!data);
    } catch (error) {
      console.error('Error checking VIP status:', error);
    }
  };

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

  const hasPurchased = (courseId: string, levelIndex?: number) => {
    if (!purchases.length) return false;
    
    // Check if full course was purchased
    const fullCoursePurchase = purchases.find(
      p => p.course_id === courseId && p.purchase_type === 'full_course'
    );
    if (fullCoursePurchase) return true;

    // Check if specific module was purchased
    if (levelIndex) {
      return purchases.some(
        p => p.course_id === courseId && 
        p.level_index === levelIndex && 
        p.purchase_type === 'module'
      );
    }

    return false;
  };

  const handlePurchase = async (
    courseId: string, 
    courseName: string,
    levelIndex: number | null,
    levelName: string,
    purchaseType: 'module' | 'full_course'
  ) => {
    if (!user) {
      toast.error("Please login to purchase courses");
      navigate('/auth');
      return;
    }

    setIsProcessing(true);

    try {
      const pricing = coursePricing[courseId as keyof typeof coursePricing];
      const price = purchaseType === 'full_course' 
        ? pricing.fullCourse 
        : pricing.modules[(levelIndex || 1) - 1];

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          courseId,
          levelIndex,
          purchaseType,
          courseName,
          levelName,
          price,
        }
      });

      if (error) throw error;

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast.error("Failed to initiate purchase. Please try again.");
    } finally {
      setIsProcessing(false);
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
          topics: ['Biblical basis for courts', 'Understanding legal realms', 'The accuser\'s role', 'Your advocate Yahusha', 'Basic court protocol'],
          duration: '5 weeks',
          difficulty: 'Beginner'
        },
        {
          level: 2,
          title: 'Presenting Your Case',
          topics: ['Identifying accusations', 'Gathering evidence', 'The blood of Yahusha', 'Repentance and restitution', 'Receiving verdicts'],
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
            const pricing = coursePricing[category.id as keyof typeof coursePricing];
            const { savings, savingsPercent } = calculateSavings(category.id as keyof typeof coursePricing);
            const hasFullAccess = hasPurchased(category.id);

            return (
              <TabsContent key={category.id} value={category.id} className="space-y-6">
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Icon className={`h-10 w-10 ${category.color}`} />
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{category.title}</CardTitle>
                        <CardDescription className="text-base">{category.description}</CardDescription>
                        
                        {/* Pricing Summary */}
                        <div className="mt-4 p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/20">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Full Course Price</p>
                              {isVIP ? (
                                <div>
                                  <Badge className="bg-gradient-spiritual text-primary-foreground mb-2">
                                    VIP - FREE
                                  </Badge>
                                  <p className="text-sm text-muted-foreground line-through">
                                    Regular: ${pricing.fullCourse}
                                  </p>
                                </div>
                              ) : (
                                <p className="text-3xl font-bold text-primary">${pricing.fullCourse}</p>
                              )}
                            </div>
                            {!isVIP && (
                              <div className="text-right">
                                <Badge className="bg-green-100 text-green-800 mb-1">
                                  Save {savingsPercent}%
                                </Badge>
                                <p className="text-sm text-muted-foreground">
                                  vs ${calculateSavings(category.id as keyof typeof coursePricing).moduleTotal} for individual modules
                                </p>
                              </div>
                            )}
                          </div>
                          {!hasFullAccess && (
                            isVIP ? (
                              <Button
                                onClick={() => enrollInCourse(category.id, 1)}
                                className="w-full bg-gradient-spiritual"
                                size="lg"
                              >
                                Start Full Course (VIP Access)
                              </Button>
                            ) : (
                              <Button
                                onClick={() => handlePurchase(
                                  category.id,
                                  category.title,
                                  null,
                                  'Full Course',
                                  'full_course'
                                )}
                                disabled={isProcessing}
                                className="w-full bg-gradient-spiritual"
                                size="lg"
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                {isProcessing ? "Processing..." : `Purchase Full Course - $${pricing.fullCourse}`}
                              </Button>
                            )
                          )}
                          {hasFullAccess && (
                            <div className="flex items-center justify-center gap-2 text-green-600">
                              <CheckCircle className="h-5 w-5" />
                              <span className="font-semibold">You own the full course!</span>
                            </div>
                          )}
                        </div>

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
                    const isPurchased = hasPurchased(category.id, level.level) || hasFullAccess;
                    const pricing = coursePricing[category.id as keyof typeof coursePricing];
                    const modulePrice = pricing.modules[level.level - 1];
                    
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
                          <div className="space-y-3">
                            {/* Pricing info for individual module */}
                            {!isPurchased && !locked && (
                              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <span className="text-sm font-medium">Module Price:</span>
                                <div className="flex items-center gap-2">
                                  {isVIP ? (
                                    <div className="text-right">
                                      <Badge className="bg-gradient-spiritual text-primary-foreground">
                                        VIP - FREE
                                      </Badge>
                                      <div className="text-xs text-muted-foreground line-through mt-1">
                                        Regular: ${modulePrice}
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <DollarSign className="h-4 w-4 text-primary" />
                                      <span className="text-xl font-bold text-primary">${modulePrice}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            )}

                            {isPurchased && (
                              <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg">
                                <CheckCircle className="h-5 w-5" />
                                <span className="font-semibold">Purchased</span>
                              </div>
                            )}

                            <div className="flex gap-3">
                              {!isPurchased && !locked ? (
                                isVIP ? (
                                  <Button
                                    onClick={() => enrollInCourse(category.id, level.level)}
                                    className="flex-1 bg-gradient-spiritual"
                                  >
                                    Start Course (VIP Access)
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => handlePurchase(
                                      category.id,
                                      category.title,
                                      level.level,
                                      level.title,
                                      'module'
                                    )}
                                    disabled={isProcessing}
                                    className="flex-1"
                                    variant="default"
                                  >
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    {isProcessing ? "Processing..." : `Purchase Module - $${modulePrice}`}
                                  </Button>
                                )
                              ) : isPurchased ? (
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
                                  {completed ? 'Review Course' : 'Start Course'}
                                </Button>
                              ) : (
                                <Button disabled className="flex-1">
                                  {locked ? 'Complete Previous Level First' : 'Purchase Required'}
                                </Button>
                              )}
                              {isPurchased && !completed && (
                                <Button 
                                  variant="outline" 
                                  disabled={locked}
                                  onClick={() => navigate(`/course-exam?courseId=${category.id}&level=${level.level}&courseName=${encodeURIComponent(category.title)}&levelName=${encodeURIComponent(level.title)}`)}
                                >
                                  <Award className="h-4 w-4 mr-2" />
                                  Take Exam
                                </Button>
                              )}
                            </div>
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
