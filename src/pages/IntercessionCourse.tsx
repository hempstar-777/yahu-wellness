import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Video, FileText, CheckCircle, Lock, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const IntercessionCourse = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const levelParam = searchParams.get('level');
  const currentLevel = levelParam ? parseInt(levelParam) : 1;
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

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
        .eq('user_id', user!.id)
        .eq('course_id', 'intercessors')
        .eq('level_index', currentLevel);

      if (error) throw error;
      
      if (data && data.length > 0) {
        const lessonData = data[0].notes ? JSON.parse(data[0].notes) : { completedLessons: [] };
        setCompletedLessons(lessonData.completedLessons || []);
        const totalLessons = courseLevels.find(l => l.level === currentLevel)?.lessons.length || 0;
        setProgress((lessonData.completedLessons?.length || 0) / totalLessons * 100);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const markLessonComplete = async (lessonIndex: number) => {
    if (!completedLessons.includes(lessonIndex)) {
      const newCompleted = [...completedLessons, lessonIndex];
      setCompletedLessons(newCompleted);
      
      const totalLessons = courseLevels.find(l => l.level === currentLevel)?.lessons.length || 0;
      setProgress(newCompleted.length / totalLessons * 100);

      try {
        await supabase
          .from('course_progress')
          .upsert({
            user_id: user!.id,
            course_id: 'intercessors',
            level_index: currentLevel,
            notes: JSON.stringify({ completedLessons: newCompleted }),
            completed: newCompleted.length === totalLessons
          }, {
            onConflict: 'user_id,course_id,level_index'
          });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  };

  const courseLevels = [
    {
      level: 1,
      title: 'Prayer Warrior Foundations',
      lessons: [
        {
          title: 'Types of Prayer',
          type: 'video',
          duration: '40 min',
          content: {
            description: 'Understanding the different types of prayer and when to use each one',
            topics: [
              'Petition - asking for personal needs',
              'Intercession - standing in the gap for others',
              'Warfare prayer - confronting spiritual enemies',
              'Thanksgiving and praise',
              'Worship and adoration',
              'Repentance and confession'
            ]
          }
        },
        {
          title: 'Praying Scripture',
          type: 'practical',
          duration: '35 min',
          content: {
            description: 'How to pray God\'s Word with power and authority',
            topics: [
              'Why praying Scripture is powerful',
              'Finding relevant scriptures for situations',
              'Personalizing Bible prayers',
              'Praying prophetic promises',
              'Declaring God\'s Word over circumstances'
            ]
          }
        },
        {
          title: 'Spiritual Armor',
          type: 'reading',
          duration: '30 min',
          content: {
            description: 'Understanding and putting on the full armor of God (Ephesians 6:10-18)',
            armor: [
              'Belt of Truth - living in integrity',
              'Breastplate of Righteousness - right standing with God',
              'Shoes of Peace - readiness to share the gospel',
              'Shield of Faith - deflecting fiery darts',
              'Helmet of Salvation - protecting your mind',
              'Sword of the Spirit - the Word of God'
            ]
          }
        },
        {
          title: 'Prayer Journaling',
          type: 'practical',
          duration: '25 min',
          content: {
            description: 'Building a systematic approach to tracking prayers and answers',
            elements: [
              'Why keep a prayer journal?',
              'What to record',
              'Tracking answered prayers',
              'Recognizing patterns',
              'Building faith through documentation'
            ]
          }
        },
        {
          title: 'Building Prayer Consistency',
          type: 'video',
          duration: '30 min',
          content: {
            description: 'Developing a sustainable daily prayer life',
            topics: [
              'Setting realistic prayer goals',
              'Creating a prayer schedule',
              'Overcoming distractions',
              'Prayer environments',
              'Accountability partners'
            ]
          }
        }
      ]
    },
    {
      level: 2,
      title: 'Strategic Intercession',
      lessons: [
        {
          title: 'Targeted Prayer Strategies',
          type: 'video',
          duration: '50 min',
          content: {
            description: 'Developing strategic prayer plans for specific situations',
            strategies: [
              'Praying for family members',
              'Praying for your church',
              'Praying for your city',
              'Praying for government leaders',
              'Praying for unreached people groups'
            ]
          }
        },
        {
          title: 'Spiritual Mapping',
          type: 'reading',
          duration: '45 min',
          content: {
            description: 'Identifying spiritual strongholds over territories',
            topics: [
              'What is spiritual mapping?',
              'Researching your region\'s history',
              'Identifying territorial strongholds',
              'Mapping prayer needs',
              'Creating a strategic prayer plan'
            ]
          }
        },
        {
          title: 'Breaking Strongholds',
          type: 'video',
          duration: '55 min',
          content: {
            description: 'How to tear down spiritual fortresses through prayer',
            process: [
              'Identifying the stronghold',
              'Research and gather intelligence',
              'Assemble prayer teams',
              'Focused persistent prayer',
              'Proclaiming truth over lies',
              'Maintaining the breakthrough'
            ]
          }
        },
        {
          title: 'Corporate Intercession',
          type: 'practical',
          duration: '40 min',
          content: {
            description: 'Leading and participating in group prayer',
            topics: [
              'Benefits of corporate prayer',
              'Leading prayer meetings effectively',
              'Unity in prayer',
              'Agreement in the Spirit',
              'Prayer concerts and marathons'
            ]
          }
        },
        {
          title: 'Prophetic Intercession',
          type: 'video',
          duration: '50 min',
          content: {
            description: 'Praying according to God\'s prophetic word',
            elements: [
              'What is prophetic intercession?',
              'Hearing God\'s heart',
              'Praying God\'s timing and seasons',
              'Partnering with prophetic revelation',
              'Birthing God\'s purposes through prayer'
            ]
          }
        }
      ]
    },
    {
      level: 3,
      title: 'Advanced Intercessory Warfare',
      lessons: [
        {
          title: 'Binding and Loosing',
          type: 'video',
          duration: '60 min',
          content: {
            description: 'Understanding the authority to bind and loose (Matthew 16:19)',
            topics: [
              'Biblical basis for binding and loosing',
              'What can be bound and loosed?',
              'Timing and discernment',
              'Warfare declarations',
              'Maintaining spiritual victories'
            ]
          }
        },
        {
          title: 'Governmental Intercession',
          type: 'reading',
          duration: '45 min',
          content: {
            description: 'Praying for leaders and governmental systems',
            areas: [
              'Biblical mandate to pray for leaders (1 Timothy 2:1-2)',
              'Praying for wisdom and righteousness',
              'Exposing corruption',
              'Prophetic declarations over nations',
              'Influencing policy through prayer'
            ]
          }
        },
        {
          title: 'Intercession for Nations',
          type: 'video',
          duration: '55 min',
          content: {
            description: 'Standing in the gap for countries and people groups',
            topics: [
              'Adopting nations to pray for',
              'Understanding cultural strongholds',
              'Praying for revival and awakening',
              'Prayer for persecuted church',
              'Prophetic declarations over nations'
            ]
          }
        },
        {
          title: 'Warfare Praise and Worship',
          type: 'practical',
          duration: '50 min',
          content: {
            description: 'Using worship as a weapon of warfare',
            principles: [
              'Biblical examples of warfare worship',
              'Praise that confuses the enemy',
              'Worship that shifts atmospheres',
              'Declaring victory through song',
              'Creating a worship arsenal'
            ]
          }
        },
        {
          title: 'Fasting and Prayer',
          type: 'reading',
          duration: '40 min',
          content: {
            description: 'Combining fasting with intercession for breakthrough',
            topics: [
              'Biblical fasting principles',
              'Types of fasts for intercessors',
              'Preparing for a fast',
              'Prayers that require fasting (Matthew 17:21)',
              'Breaking fasts properly'
            ]
          }
        }
      ]
    }
  ];

  const selectedLevel = courseLevels.find(l => l.level === currentLevel);

  if (!selectedLevel) {
    return <div>Level not found</div>;
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'reading': return <BookOpen className="h-4 w-4" />;
      case 'practical': return <FileText className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      video: 'bg-blue-100 text-blue-800',
      reading: 'bg-green-100 text-green-800',
      practical: 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/courses')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>

        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Heart className="h-10 w-10 text-purple-600" />
                <h1 className="text-4xl font-bold">School of Intercession</h1>
              </div>
              <h2 className="text-2xl text-muted-foreground">{selectedLevel.title}</h2>
              <p className="text-sm text-muted-foreground mt-2">Level {currentLevel} of 3</p>
            </div>
            <Badge className="text-lg px-4 py-2">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {completedLessons.length} of {selectedLevel.lessons.length} lessons completed
          </p>
        </div>

        <Tabs defaultValue="lessons" className="space-y-6">
          <TabsList>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="overview">Course Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-4">
            {selectedLevel.lessons.map((lesson, idx) => {
              const isCompleted = completedLessons.includes(idx);
              
              return (
                <Card key={idx} className={`border-2 ${isCompleted ? 'border-green-500 bg-green-50/50' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getTypeIcon(lesson.type)}
                          <CardTitle className="text-xl">{lesson.title}</CardTitle>
                          {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getTypeBadge(lesson.type)}>
                            {lesson.type}
                          </Badge>
                          <Badge variant="outline">{lesson.duration}</Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => markLessonComplete(idx)}
                        variant={isCompleted ? "outline" : "default"}
                        disabled={isCompleted}
                      >
                        {isCompleted ? 'Completed' : 'Mark Complete'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{lesson.content.description}</p>
                    
                    {lesson.content.topics && (
                      <div>
                        <h4 className="font-semibold mb-2">Topics Covered:</h4>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {lesson.content.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2 text-sm">
                              <span className="text-primary mt-1">•</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {lesson.content.armor && (
                      <div>
                        <h4 className="font-semibold mb-2">Armor Pieces:</h4>
                        <div className="space-y-2">
                          {lesson.content.armor.map((piece, pIdx) => (
                            <div key={pIdx} className="p-3 bg-muted rounded-lg text-sm">
                              {piece}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {lesson.content.strategies && (
                      <div>
                        <h4 className="font-semibold mb-2">Prayer Strategies:</h4>
                        <ul className="space-y-2">
                          {lesson.content.strategies.map((strategy, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2 text-sm p-2 bg-muted rounded">
                              <span className="text-primary mt-1">✓</span>
                              <span>{strategy}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {lesson.content.process && (
                      <div>
                        <h4 className="font-semibold mb-2">Process:</h4>
                        <ol className="space-y-2">
                          {lesson.content.process.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-3 text-sm">
                              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">
                                {sIdx + 1}
                              </span>
                              <span className="pt-0.5">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}

            <Card className="border-2 border-primary">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Ready to Test Your Knowledge?</h3>
                  <p className="text-muted-foreground mb-6">
                    Complete all lessons to unlock the certification exam
                  </p>
                  <Button
                    size="lg"
                    onClick={() => navigate(`/course-exam?course=intercessors&level=${currentLevel}`)}
                    disabled={completedLessons.length < selectedLevel.lessons.length}
                  >
                    {completedLessons.length < selectedLevel.lessons.length ? (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Complete All Lessons to Unlock
                      </>
                    ) : (
                      'Take Certification Exam'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Course Overview</CardTitle>
                <CardDescription>
                  Complete all levels to become a certified intercessor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courseLevels.map((level) => (
                  <div
                    key={level.level}
                    className={`p-4 border-2 rounded-lg ${
                      level.level === currentLevel ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">
                        Level {level.level}: {level.title}
                      </h3>
                      {level.level === currentLevel && (
                        <Badge>Current Level</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {level.lessons.length} lessons
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IntercessionCourse;
