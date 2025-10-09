import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClipboardCheck, BookOpen, Shield, Heart, TrendingUp, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  const { t } = useTranslation();
  
  const quickStartCards = [
    {
      icon: ClipboardCheck,
      title: t('home.takeAssessment'),
      description: t('home.takeAssessmentDesc'),
      href: "/assessments",
      variant: "primary" as const,
    },
    {
      icon: Shield,
      title: t('home.startDeliverance'),
      description: t('home.startDeliveranceDesc'),
      href: "/deliverance",
      variant: "secondary" as const,
    },
    {
      icon: BookOpen,
      title: t('home.viewPrayers'),
      description: t('home.viewPrayersDesc'),
      href: "/prayers",
      variant: "accent" as const,
    },
    {
      icon: Heart,
      title: t('home.moreResources'),
      description: t('home.moreResourcesDesc'),
      href: "/resources",
      variant: "muted" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-light">
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-spiritual opacity-5" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="flex justify-end mb-4">
            <LanguageSelector />
          </div>
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="font-serif text-5xl md:text-6xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              {t('home.subtitle')}
            </p>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              {t('home.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-gradient-spiritual shadow-elevated hover:shadow-glow transition-all duration-300">
                <Link to="/assessments">{t('home.beginJourney')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30 hover:border-primary/50 hover:bg-accent/50">
                <Link to="/deliverance">{t('home.learn5Steps')}</Link>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button asChild size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                <Link to="/pre-deliverance">Pre-Deliverance Prep</Link>
              </Button>
              <Button asChild size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                <Link to="/teachings">{t('home.spiritualTeachings')}</Link>
              </Button>
              <Button asChild size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                <Link to="/resources">{t('home.resourcesTools')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Safety Notice */}
      <div className="container mx-auto px-4 py-8">
        <Alert className="max-w-4xl mx-auto border-secondary/30 bg-secondary/5">
          <AlertCircle className="h-5 w-5 text-secondary" />
          <AlertDescription className="text-sm leading-relaxed">
            <strong>{t('home.safetyNotice')}</strong> {t('home.safetyText')}
          </AlertDescription>
        </Alert>
      </div>

      {/* Quick Start Cards */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
            {t('home.pathToFreedom')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {quickStartCards.map((card, index) => (
              <Card 
                key={index}
                className="group p-8 hover:shadow-elevated transition-all duration-300 border-border/50 hover:border-primary/30 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={card.href} className="block space-y-4">
                  <div className={`inline-flex p-4 rounded-xl ${
                    card.variant === 'primary' ? 'bg-gradient-spiritual text-primary-foreground' :
                    card.variant === 'secondary' ? 'bg-secondary text-secondary-foreground' :
                    card.variant === 'accent' ? 'bg-accent text-accent-foreground' :
                    'bg-muted text-muted-foreground'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Tracker Teaser */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-divine text-primary-foreground shadow-glow">
            <div className="flex items-center gap-4 mb-6">
              <TrendingUp className="w-10 h-10" />
              <div>
                <h3 className="font-serif text-2xl font-bold">{t('home.trackProgress')}</h3>
                <p className="text-primary-foreground/80">{t('home.trackProgressDesc')}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">0</div>
                <div className="text-sm text-primary-foreground/70">{t('home.assessments')}</div>
              </div>
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">0</div>
                <div className="text-sm text-primary-foreground/70">{t('home.sessions')}</div>
              </div>
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">0</div>
                <div className="text-sm text-primary-foreground/70">{t('home.days')}</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Scripture & Encouragement */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <blockquote className="font-serif text-2xl md:text-3xl italic text-foreground/90 leading-relaxed">
            "{t('home.scripture')}"
          </blockquote>
          <cite className="text-lg text-muted-foreground">— {t('home.scriptureRef')}</cite>
          <p className="text-lg text-foreground/80 pt-6 max-w-2xl mx-auto">
            {t('home.encouragement')}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground space-y-3">
            <p>
              {t('home.footerInspired')}
            </p>
            <p>
              {t('home.footerMission')}
            </p>
            <p className="text-xs">
              {t('home.footerDisclaimer')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
