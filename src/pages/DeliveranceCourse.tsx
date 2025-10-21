import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Video, FileText, CheckCircle, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const DeliveranceCourse = () => {
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
        .eq('course_id', 'deliverance')
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
            course_id: 'deliverance',
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
      title: 'Foundations of Deliverance',
      lessons: [
        {
          title: 'Biblical Basis for Deliverance',
          type: 'video',
          duration: '45 min',
          content: {
            description: 'Comprehensive study of Jesus\' deliverance ministry and the scriptural foundation for spiritual warfare',
            keyVerses: [
              'Luke 4:18 - "The Spirit of the Lord is upon me...to set the captives free"',
              'Mark 16:17 - "In my name they will cast out demons"',
              'Ephesians 6:12 - "For we do not wrestle against flesh and blood"'
            ],
            topics: [
              'Jesus as our model for deliverance',
              'The Great Commission includes deliverance',
              'Authority given to believers',
              'Old Testament precedents',
              'New Testament church practice'
            ]
          }
        },
        {
          title: 'Understanding Spiritual Authority',
          type: 'reading',
          duration: '30 min',
          content: {
            description: 'Learn the principles of spiritual authority and how to exercise it properly',
            topics: [
              'Authority vs. power - understanding the difference',
              'Positional authority in Messiah',
              'Growing in spiritual authority through obedience',
              'The role of faith and prayer',
              'Common mistakes that compromise authority'
            ]
          }
        },
        {
          title: 'Legal Grounds and Rights',
          type: 'video',
          duration: '50 min',
          content: {
            description: 'Understanding how demons gain legal access and how to revoke their rights',
            topics: [
              'What gives demons legal ground?',
              'Sin doors and entry points',
              'Generational curses and bloodline issues',
              'Soul ties and ungodly covenants',
              'Closing legal doors through repentance'
            ]
          }
        },
        {
          title: 'The Five-Step Deliverance Process',
          type: 'practical',
          duration: '60 min',
          content: {
            description: 'Step-by-step protocol for conducting effective deliverance ministry',
            steps: [
              '1. Interview & Assessment - Identifying root issues',
              '2. Teaching & Preparation - Educating the person',
              '3. Renunciation & Repentance - Closing legal doors',
              '4. Command to Leave - Exercising authority',
              '5. Filling & Sealing - Preventing reentry'
            ]
          }
        },
        {
          title: 'Personal Preparation for Ministry',
          type: 'reading',
          duration: '25 min',
          content: {
            description: 'How to prepare yourself spiritually before engaging in deliverance',
            topics: [
              'Maintaining your own freedom',
              'Fasting and prayer preparation',
              'Putting on spiritual armor',
              'Discernment and sensitivity to the Spirit',
              'Knowing when NOT to minister'
            ]
          }
        }
      ]
    },
    {
      level: 2,
      title: 'Identifying Spiritual Bondages',
      lessons: [
        {
          title: 'Discernment of Spirits',
          type: 'video',
          duration: '55 min',
          content: {
            description: 'Developing and operating in the gift of discerning of spirits',
            topics: [
              'Biblical foundation for discernment',
              'Recognizing demonic manifestations',
              'Distinguishing between flesh, demons, and Holy Spirit',
              'Increasing your spiritual sensitivity',
              'Testing the spirits'
            ]
          }
        },
        {
          title: 'Common Doorways and Entry Points',
          type: 'reading',
          duration: '40 min',
          content: {
            description: 'Comprehensive list of how demons gain access to lives',
            categories: [
              'Occult involvement (ouija boards, tarot, witchcraft)',
              'Sexual sin (fornication, pornography, perversion)',
              'Unforgiveness and bitterness',
              'Trauma and abuse',
              'Addictions and compulsive behaviors',
              'False religions and cults',
              'Word curses and vows'
            ]
          }
        },
        {
          title: 'Generational Bondages',
          type: 'video',
          duration: '60 min',
          content: {
            description: 'Understanding and breaking generational curses and patterns',
            topics: [
              'Biblical basis for generational curses (Exodus 20:5)',
              'Identifying family patterns',
              'Breaking bloodline covenants',
              'Renouncing ancestral sins',
              'Claiming freedom through Messiah\'s blood'
            ]
          }
        },
        {
          title: 'Soul Ties and Covenants',
          type: 'practical',
          duration: '45 min',
          content: {
            description: 'Breaking ungodly soul ties and covenants',
            types: [
              'Sexual soul ties',
              'Emotional/codependent ties',
              'Occult blood covenants',
              'Masonic and secret society oaths',
              'Prayer protocol for breaking ties'
            ]
          }
        },
        {
          title: 'Assessment Techniques',
          type: 'reading',
          duration: '35 min',
          content: {
            description: 'How to conduct thorough spiritual assessments',
            tools: [
              'Deliverance questionnaires',
              'Family history evaluation',
              'Symptom recognition',
              'Listening to the Holy Spirit',
              'Documenting findings'
            ]
          }
        }
      ]
    },
    {
      level: 3,
      title: 'Advanced Deliverance Ministry',
      lessons: [
        {
          title: 'Handling Manifestations',
          type: 'video',
          duration: '65 min',
          content: {
            description: 'How to handle various demonic manifestations safely and effectively',
            scenarios: [
              'Violent manifestations - safety protocols',
              'Screaming and vocalizations',
              'Physical contortions',
              'Fainting or loss of consciousness',
              'When to stop and regroup'
            ]
          }
        },
        {
          title: 'Territorial Spirits',
          type: 'reading',
          duration: '50 min',
          content: {
            description: 'Understanding and confronting territorial principalities',
            topics: [
              'Biblical evidence for territorial spirits',
              'Spiritual mapping of regions',
              'Corporate warfare strategies',
              'Binding strongmen',
              'Maintaining spiritual breakthroughs'
            ]
          }
        },
        {
          title: 'Complex and Extreme Cases',
          type: 'video',
          duration: '70 min',
          content: {
            description: 'Dealing with severe demonization and difficult cases',
            cases: [
              'Multiple personality disorder (DID)',
              'Ritual abuse survivors',
              'Severe mental illness with demonic component',
              'Kundalini and New Age spirits',
              'When professional help is needed'
            ]
          }
        },
        {
          title: 'Team Ministry Approach',
          type: 'practical',
          duration: '55 min',
          content: {
            description: 'Building and leading effective deliverance teams',
            topics: [
              'Team roles and responsibilities',
              'Protecting team members',
              'Coordinated warfare strategies',
              'Communication during sessions',
              'Post-ministry debriefing'
            ]
          }
        },
        {
          title: 'Post-Deliverance Care',
          type: 'reading',
          duration: '40 min',
          content: {
            description: 'Essential follow-up care to maintain freedom',
            elements: [
              'Discipleship and accountability',
              'Filling the void - identity in Messiah',
              'Establishing spiritual disciplines',
              'Recognizing and resisting counter-attacks',
              'Long-term support systems'
            ]
          }
        }
      ]
    },
    {
      level: 4,
      title: 'Master Practitioner',
      lessons: [
        {
          title: 'Training Others in Deliverance',
          type: 'video',
          duration: '60 min',
          content: {
            description: 'How to equip and train others for deliverance ministry',
            topics: [
              'Selecting and screening trainees',
              'Creating training curriculum',
              'Hands-on supervised practice',
              'Impartation and mentoring',
              'Certifying ministers'
            ]
          }
        },
        {
          title: 'Building Deliverance Teams',
          type: 'practical',
          duration: '55 min',
          content: {
            description: 'Establishing and leading deliverance ministries',
            components: [
              'Recruiting team members',
              'Training protocols',
              'Ministry policies and procedures',
              'Safety guidelines',
              'Ongoing development'
            ]
          }
        },
        {
          title: 'Church Integration',
          type: 'reading',
          duration: '45 min',
          content: {
            description: 'Integrating deliverance ministry into church life',
            topics: [
              'Gaining pastoral support',
              'Teaching the congregation',
              'Establishing ministry protocols',
              'Handling controversy',
              'Maintaining balance'
            ]
          }
        },
        {
          title: 'Legal and Ethical Considerations',
          type: 'video',
          duration: '50 min',
          content: {
            description: 'Protecting yourself and ministry legally and ethically',
            areas: [
              'Liability and insurance',
              'Informed consent',
              'Confidentiality requirements',
              'Mandatory reporting laws',
              'Documentation best practices'
            ]
          }
        },
        {
          title: 'Crisis Intervention',
          type: 'practical',
          duration: '65 min',
          content: {
            description: 'Emergency deliverance protocols for crisis situations',
            scenarios: [
              'Suicidal ideation during session',
              'Severe manifestations in public',
              'Medical emergencies',
              'When to involve authorities',
              'Crisis hotline resources'
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
              <h1 className="text-4xl font-bold mb-2">School of Deliverance</h1>
              <h2 className="text-2xl text-muted-foreground">{selectedLevel.title}</h2>
              <p className="text-sm text-muted-foreground mt-2">Level {currentLevel} of 4</p>
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
                    
                    {lesson.content.keyVerses && (
                      <div>
                        <h4 className="font-semibold mb-2">Key Scriptures:</h4>
                        <ul className="space-y-1">
                          {lesson.content.keyVerses.map((verse, vIdx) => (
                            <li key={vIdx} className="text-sm pl-4 border-l-2 border-primary">
                              {verse}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
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

                    {lesson.content.steps && (
                      <div>
                        <h4 className="font-semibold mb-2">Process Steps:</h4>
                        <div className="space-y-2">
                          {lesson.content.steps.map((step, sIdx) => (
                            <div key={sIdx} className="p-3 bg-muted rounded-lg text-sm">
                              {step}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {lesson.content.categories && (
                      <div>
                        <h4 className="font-semibold mb-2">Categories:</h4>
                        <ul className="space-y-2">
                          {lesson.content.categories.map((cat, cIdx) => (
                            <li key={cIdx} className="flex items-start gap-2 text-sm p-2 bg-muted rounded">
                              <span className="text-primary mt-1">✓</span>
                              <span>{cat}</span>
                            </li>
                          ))}
                        </ul>
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
                    onClick={() => navigate(`/course-exam?course=deliverance&level=${currentLevel}`)}
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
                  Complete all levels to become a certified deliverance minister
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

export default DeliveranceCourse;
