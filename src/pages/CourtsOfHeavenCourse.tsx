import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Video, FileText, CheckCircle, Lock, Scale } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const CourtsOfHeavenCourse = () => {
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
        .eq('course_id', 'tribunals')
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
            course_id: 'tribunals',
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
      title: 'Introduction to Heavenly Courts',
      lessons: [
        {
          title: 'Biblical Basis for the Courts',
          type: 'video',
          duration: '50 min',
          content: {
            description: 'Understanding the scriptural foundation for operating in heavenly courts',
            scriptures: [
              'Isaiah 43:26 - "Present your case...that you may be proved right"',
              'Daniel 7:9-10 - Vision of the Ancient of Days and the court',
              'Revelation 12:10 - The accuser who brings charges',
              'Hebrews 12:22-24 - Coming to God the Judge of all'
            ],
            topics: [
              'The legal nature of spiritual warfare',
              'God as the righteous Judge',
              'Satan as the prosecuting attorney',
              'Yahusha as our Advocate',
              'The role of angels and witnesses'
            ]
          }
        },
        {
          title: 'Understanding Legal Realms',
          type: 'reading',
          duration: '40 min',
          content: {
            description: 'How spiritual laws and legal principles govern the spirit realm',
            concepts: [
              'The law of sowing and reaping',
              'Legal rights and permissions',
              'Covenants and contracts',
              'Blood and its legal significance',
              'Authority and jurisdiction'
            ]
          }
        },
        {
          title: 'The Accuser\'s Role',
          type: 'video',
          duration: '45 min',
          content: {
            description: 'Understanding how Satan brings accusations before God',
            topics: [
              'Job\'s story - Satan\'s accusations',
              'Joshua the high priest (Zechariah 3)',
              'How the enemy builds legal cases',
              'Common accusations against believers',
              'Breaking the power of accusation'
            ]
          }
        },
        {
          title: 'Your Advocate - Yahusha',
          type: 'reading',
          duration: '35 min',
          content: {
            description: 'Understanding Messiah\'s role as our defense attorney',
            truths: [
              '1 John 2:1 - We have an advocate with the Father',
              'Hebrews 7:25 - He intercedes for us',
              'Romans 8:34 - Christ intercedes at God\'s right hand',
              'The blood of Yahusha speaks better things',
              'His finished work as our defense'
            ]
          }
        },
        {
          title: 'Basic Court Protocol',
          type: 'practical',
          duration: '55 min',
          content: {
            description: 'How to properly approach and operate in heavenly courts',
            steps: [
              '1. Enter with thanksgiving and worship',
              '2. Acknowledge your advocate Yahusha',
              '3. Present your petition clearly',
              '4. Repent of any giving the enemy legal ground',
              '5. Plead the blood of Yahusha',
              '6. Wait for the verdict',
              '7. Receive and enforce the judgment'
            ]
          }
        }
      ]
    },
    {
      level: 2,
      title: 'Presenting Your Case',
      lessons: [
        {
          title: 'Identifying Accusations',
          type: 'video',
          duration: '50 min',
          content: {
            description: 'Recognizing what charges the enemy has brought against you',
            indicators: [
              'Persistent problems despite prayer',
              'Recurring patterns and cycles',
              'Feeling blocked or hindered',
              'Prophetic words that don\'t manifest',
              'Generational issues'
            ],
            questions: [
              'What keeps happening in your life?',
              'What promises haven\'t been fulfilled?',
              'What doors won\'t open?',
              'What freedom eludes you?'
            ]
          }
        },
        {
          title: 'Gathering Evidence',
          type: 'practical',
          duration: '45 min',
          content: {
            description: 'Building your case with scriptural and prophetic evidence',
            evidence: [
              'God\'s promises to you',
              'Prophetic words spoken over you',
              'Scripture confirming your calling',
              'God\'s character and faithfulness',
              'Testimonies of His past faithfulness'
            ]
          }
        },
        {
          title: 'The Blood of Yahusha',
          type: 'video',
          duration: '60 min',
          content: {
            description: 'Understanding the legal power of the blood',
            teachings: [
              'Hebrews 12:24 - The blood speaks',
              'Revelation 12:11 - Overcoming by the blood',
              'The blood removes guilt and shame',
              'The blood silences accusations',
              'How to properly plead the blood'
            ]
          }
        },
        {
          title: 'Repentance and Restitution',
          type: 'reading',
          duration: '40 min',
          content: {
            description: 'Removing legal grounds through genuine repentance',
            process: [
              'Honest confession of sin',
              'Genuine sorrow and turning',
              'Making restitution where possible',
              'Forgiving others',
              'Breaking agreements with darkness',
              'Closing all legal doors'
            ]
          }
        },
        {
          title: 'Receiving Verdicts',
          type: 'practical',
          duration: '50 min',
          content: {
            description: 'How to receive and recognize favorable judgments',
            signs: [
              'Peace that surpasses understanding',
              'Sudden breakthrough after long struggle',
              'Dreams or visions confirming release',
              'Prophetic confirmation',
              'Tangible changes in circumstances'
            ],
            actions: [
              'Document the verdict',
              'Decree and declare it',
              'Walk in the freedom',
              'Maintain vigilance'
            ]
          }
        }
      ]
    },
    {
      level: 3,
      title: 'Advanced Court Proceedings',
      lessons: [
        {
          title: 'Generational Cases',
          type: 'video',
          duration: '65 min',
          content: {
            description: 'Bringing generational issues before the heavenly courts',
            topics: [
              'Understanding generational curses legally',
              'Representing your family line',
              'Breaking ancestral covenants',
              'Redeeming your bloodline',
              'Cleansing family altars',
              'Securing verdicts for future generations'
            ]
          }
        },
        {
          title: 'Corporate Cases',
          type: 'reading',
          duration: '50 min',
          content: {
            description: 'Presenting cases on behalf of groups, churches, or organizations',
            applications: [
              'Church splits and divisions',
              'Ministry attacks and hindrances',
              'Business and financial blockages',
              'Community strongholds',
              'Organizational curses'
            ]
          }
        },
        {
          title: 'Territorial Cases',
          type: 'video',
          duration: '70 min',
          content: {
            description: 'Bringing regions and territories before the court',
            concepts: [
              'Spiritual jurisdiction over land',
              'Historical sins of a region',
              'Blood that cries from the ground',
              'Identifying territorial principalities',
              'Obtaining regional breakthrough',
              'Maintaining territorial freedom'
            ]
          }
        },
        {
          title: 'Appealing Verdicts',
          type: 'practical',
          duration: '55 min',
          content: {
            description: 'What to do when the verdict seems delayed or denied',
            reasons: [
              'Incomplete repentance',
              'Lack of evidence presented',
              'Wrong timing (God\'s calendar)',
              'Need for more intercession',
              'Hidden legal ground'
            ],
            appeal_process: [
              'Return to prayer and fasting',
              'Seek prophetic insight',
              'Check for hidden sin',
              'Strengthen your case',
              'Persist in faith'
            ]
          }
        },
        {
          title: 'Enforcing Judgments',
          type: 'video',
          duration: '60 min',
          content: {
            description: 'Taking heavenly verdicts and enforcing them on earth',
            enforcement: [
              'Matthew 18:18 - Binding and loosing',
              'Decreeing the verdict',
              'Walking in the freedom',
              'Resisting counter-attacks',
              'Establishing the breakthrough',
              'Training others in enforcement'
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
                <Scale className="h-10 w-10 text-amber-600" />
                <h1 className="text-4xl font-bold">Courts of Heaven</h1>
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
                    
                    {lesson.content.scriptures && (
                      <div>
                        <h4 className="font-semibold mb-2">Key Scriptures:</h4>
                        <div className="space-y-2">
                          {lesson.content.scriptures.map((verse, vIdx) => (
                            <div key={vIdx} className="p-3 bg-muted rounded-lg text-sm border-l-4 border-amber-600">
                              {verse}
                            </div>
                          ))}
                        </div>
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
                        <h4 className="font-semibold mb-2">Protocol Steps:</h4>
                        <ol className="space-y-2">
                          {lesson.content.steps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-3 text-sm">
                              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-amber-600 text-white text-xs">
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
                    onClick={() => navigate(`/course-exam?course=tribunals&level=${currentLevel}`)}
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
                  Complete all levels to master operating in heavenly courts
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

export default CourtsOfHeavenCourse;
