import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, FileText, Heart, Users, Sparkles, Target, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Assessments = () => {
  const { t } = useTranslation();
  
  const getDifficultyVariant = (difficultyKey: string) => {
    if (difficultyKey.includes('beginner')) return 'secondary';
    if (difficultyKey.includes('intermediate')) return 'default';
    return 'outline';
  };
  
  const assessments = [
    {
      id: 1,
      title: t('assessments.surfaceTitle'),
      description: t('assessments.surfaceDesc'),
      icon: FileText,
      difficulty: t('assessments.beginner'),
      difficultyKey: 'beginner',
      duration: "10-15 min",
      available: true,
      path: "/assessments/surface-issues",
    },
    {
      id: 2,
      title: t('assessments.bondagesTitle'),
      description: t('assessments.bondagesDesc'),
      icon: Target,
      difficulty: t('assessments.intermediate'),
      difficultyKey: 'intermediate',
      duration: "15-20 min",
      available: true,
      path: "/assessments/bondages",
    },
    {
      id: 3,
      title: t('assessments.traumaTitle'),
      description: t('assessments.traumaDesc'),
      icon: Heart,
      difficulty: t('assessments.advanced'),
      difficultyKey: 'advanced',
      duration: "20-30 min",
      available: true,
      path: "/assessments/trauma",
    },
    {
      id: 4,
      title: t('assessments.generationalTitle'),
      description: t('assessments.generationalDesc'),
      icon: Users,
      difficulty: t('assessments.advanced'),
      difficultyKey: 'advanced',
      duration: "20-25 min",
      available: true,
      path: "/assessments/generational",
    },
    {
      id: 5,
      title: t('assessments.newAgeTitle'),
      description: t('assessments.newAgeDesc'),
      icon: Sparkles,
      difficulty: t('assessments.intermediate'),
      difficultyKey: 'intermediate',
      duration: "15-20 min",
      available: true,
      path: "/assessments/new-age",
    },
    {
      id: 6,
      title: t('assessments.advancedTitle'),
      description: t('assessments.advancedDesc'),
      icon: Lock,
      difficulty: t('assessments.expert'),
      difficultyKey: 'expert',
      duration: "30+ min",
      available: true,
      path: "/assessments/advanced",
    },
    {
      id: 7,
      title: t('assessments.doorwaysTitle'),
      description: t('assessments.doorwaysDesc'),
      icon: FileText,
      difficulty: t('assessments.comprehensive'),
      difficultyKey: 'comprehensive',
      duration: "20-30 min",
      available: true,
      path: "/assessments/doorways",
    },
    {
      id: 8,
      title: t('assessments.altarsTitle'),
      description: t('assessments.altarsDesc'),
      icon: Sparkles,
      difficulty: t('assessments.advanced'),
      difficultyKey: 'advanced',
      duration: "15-20 min",
      available: true,
      path: "/assessments/altars",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-light">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ChevronLeft className="w-4 h-4 mr-2" />
                {t('common.back')}
              </Link>
            </Button>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold">{t('assessments.title')}</h1>
              <p className="text-sm text-muted-foreground">{t('assessments.subtitle')}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 border-primary/20 shadow-elevated">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold">{t('assessments.howItWorks')}</h2>
            <p className="text-foreground/80 leading-relaxed">
              {t('assessments.description')}
            </p>
            <div className="bg-accent/50 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-accent-foreground">{t('assessments.tipsTitle')}</h3>
              <ul className="space-y-1 text-sm text-accent-foreground/80">
                <li>{t('assessments.tip1')}</li>
                <li>{t('assessments.tip2')}</li>
                <li>{t('assessments.tip3')}</li>
                <li>{t('assessments.tip4')}</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Assessment Cards */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment, index) => (
            <Link 
              to={assessment.path || "#"}
              className={assessment.available ? "" : "pointer-events-none"}
            >
              <Card
                key={assessment.id}
                className={`group p-6 hover:shadow-elevated transition-all duration-300 animate-fade-in ${
                  assessment.available 
                    ? 'border-border/50 hover:border-primary/30 cursor-pointer' 
                    : 'opacity-60 border-border/30'
                }`}
                style={{ animationDelay: `${index * 75}ms` }}
              >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${
                    assessment.available 
                      ? 'bg-gradient-spiritual text-primary-foreground group-hover:scale-110 transition-transform' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <assessment.icon className="w-6 h-6" />
                  </div>
                  <Badge variant={getDifficultyVariant(assessment.difficultyKey)} className="text-xs">
                    {assessment.difficulty}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-semibold group-hover:text-primary transition-colors">
                    {assessment.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {assessment.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">{assessment.duration}</span>
                  {assessment.available ? (
                    <Button size="sm" variant="ghost" className="text-primary hover:text-primary-glow">
                      {t('common.start')} →
                    </Button>
                  ) : (
                    <span className="text-xs font-semibold text-muted-foreground">{t('common.comingSoon')}</span>
                  )}
                </div>
              </div>
            </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Assessments;
