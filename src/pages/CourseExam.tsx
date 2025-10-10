import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  awardCourseCompletionBadge, 
  awardCourseCertificate,
  checkAndAwardDiploma,
  checkAndAwardExpertBadge
} from '@/lib/badgeUtils';

const CourseExam = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId') || '';
  const levelIndex = parseInt(searchParams.get('level') || '1');
  const courseName = searchParams.get('courseName') || '';
  const levelName = searchParams.get('levelName') || '';

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample exam questions
  const questions = [
    {
      id: 1,
      question: "What is the most important preparation for deliverance ministry?",
      options: [
        "Personal relationship with Jesus Christ",
        "Advanced theological training",
        "Natural counseling skills",
        "Many years of experience"
      ],
      correct: 0
    },
    {
      id: 2,
      question: "What should always be the foundation of spiritual warfare?",
      options: [
        "Our own strength and knowledge",
        "Prayer and God's Word",
        "Ritual formulas",
        "Special techniques"
      ],
      correct: 1
    },
    {
      id: 3,
      question: "How should we approach those needing deliverance?",
      options: [
        "With judgment and condemnation",
        "With fear and hesitation",
        "With love, compassion, and authority in Christ",
        "With curiosity about their issues"
      ],
      correct: 2
    }
  ];

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error('Please answer all questions before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate score
      const correctAnswers = questions.filter((q, idx) => parseInt(answers[idx]) === q.correct).length;
      const passingScore = Math.ceil(questions.length * 0.7); // 70% to pass

      if (correctAnswers >= passingScore) {
        // Mark level as completed
        const { error: progressError } = await supabase
          .from('course_progress')
          .upsert({
            user_id: user!.id,
            course_id: courseId,
            level_index: levelIndex,
            completed: true,
            completed_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,course_id,level_index'
          });

        if (progressError) throw progressError;

        // Award badge
        await awardCourseCompletionBadge(user!.id, courseId, levelIndex);
        
        // Award certificate
        await awardCourseCertificate(user!.id, courseId, levelIndex, levelName);
        
        // Check for diploma
        await checkAndAwardDiploma(user!.id, courseId);
        
        // Check for expert badge
        await checkAndAwardExpertBadge(user!.id, courseId);

        toast.success(`Congratulations! You passed with ${correctAnswers}/${questions.length} correct!`);
        
        // Redirect to achievements page
        setTimeout(() => {
          navigate('/achievements');
        }, 2000);
      } else {
        toast.error(`You need ${passingScore} correct answers to pass. You got ${correctAnswers}/${questions.length}. Please try again.`);
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
      toast.error('Failed to submit exam. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/courses')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{courseName} - Level {levelIndex} Exam</CardTitle>
              <CardDescription>{levelName}</CardDescription>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <CheckCircle className="inline h-4 w-4 mr-2" />
                  You need 70% or higher to pass and earn your certificate and badge.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {questions.map((q, idx) => (
                <div key={q.id} className="space-y-4">
                  <h3 className="font-semibold text-lg">
                    {idx + 1}. {q.question}
                  </h3>
                  <RadioGroup
                    value={answers[idx]?.toString()}
                    onValueChange={(value) => setAnswers({ ...answers, [idx]: value })}
                  >
                    {q.options.map((option, optIdx) => (
                      <div key={optIdx} className="flex items-center space-x-2">
                        <RadioGroupItem value={optIdx.toString()} id={`q${idx}-opt${optIdx}`} />
                        <Label htmlFor={`q${idx}-opt${optIdx}`} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Exam'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CourseExam;