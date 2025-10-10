import { Award, Download, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface CertificateProps {
  certificateType: string;
  courseName: string;
  levelName?: string;
  issuedAt: string;
  userName?: string;
}

export const Certificate = ({ 
  certificateType, 
  courseName, 
  levelName, 
  issuedAt,
  userName = "Student"
}: CertificateProps) => {
  
  const handleDownload = () => {
    toast.success('Certificate download feature coming soon!');
  };

  const handleShare = () => {
    toast.success('Certificate sharing feature coming soon!');
  };

  const isDiploma = certificateType === 'full_course_diploma';

  return (
    <Card className="border-4 border-primary/20 bg-gradient-to-br from-background via-primary/5 to-secondary/10 overflow-hidden">
      <CardContent className="p-8 relative">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary/30" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary/30" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary/30" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary/30" />

        <div className="text-center space-y-6 relative">
          {/* Header */}
          <div className="space-y-2">
            <Award className="h-16 w-16 mx-auto text-primary" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              {isDiploma ? 'Diploma of Completion' : 'Certificate of Achievement'}
            </h2>
            <div className="h-1 w-32 bg-primary/30 mx-auto" />
          </div>

          {/* Body */}
          <div className="space-y-4 py-6">
            <p className="text-lg text-muted-foreground">This certifies that</p>
            <p className="text-3xl font-serif font-bold text-foreground">{userName}</p>
            <p className="text-lg text-muted-foreground">has successfully completed</p>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">{courseName}</p>
              {levelName && !isDiploma && (
                <p className="text-xl text-foreground">{levelName}</p>
              )}
              {isDiploma && (
                <p className="text-lg font-semibold text-primary/80">Full Course Diploma</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Issued on {format(new Date(issuedAt), 'MMMM dd, yyyy')}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleDownload} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button onClick={handleShare} variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};