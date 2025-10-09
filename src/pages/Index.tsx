import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClipboardCheck, BookOpen, Shield, Heart, TrendingUp, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const quickStartCards = [
    {
      icon: ClipboardCheck,
      title: "Take Assessment",
      description: "Identify bondages and doorways through guided self-evaluation",
      href: "/assessments",
      variant: "primary" as const,
    },
    {
      icon: Shield,
      title: "Start Deliverance 101",
      description: "Follow the 5-step process to walk in freedom",
      href: "/deliverance",
      variant: "secondary" as const,
    },
    {
      icon: BookOpen,
      title: "View Prayers",
      description: "Access customizable prayers for renunciation and healing",
      href: "/prayers",
      variant: "accent" as const,
    },
    {
      icon: Heart,
      title: "More Resources",
      description: "Teachings, testimonials, and advanced guidance",
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
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="font-serif text-5xl md:text-6xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
              Deliverance Freedom
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Walk in the authority Yahusha Ha Mashiach purchased for you
            </p>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Deliverance ministry is not taboo. We believe that healing is the children's bread, and we make these 
              resources accessible to all believers seeking freedom in Yahusha Ha Mashiach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-gradient-spiritual shadow-elevated hover:shadow-glow transition-all duration-300">
                <Link to="/assessments">Begin Your Journey</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30 hover:border-primary/50 hover:bg-accent/50">
                <Link to="/deliverance">Learn the 5 Steps</Link>
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
            <strong>Important Safety Notice:</strong> These prayers are powerful and may cause manifestations, memories, 
            or emotional releases. Use in safe, private settings only—not while driving or operating machinery. 
            This resource is not a substitute for medical or psychological care. By proceeding, you agree to hold 
            this ministry harmless for any adverse effects from self-deliverance. Governed by Texas law.
          </AlertDescription>
        </Alert>
      </div>

      {/* Quick Start Cards */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
            Your Path to Freedom
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
                <h3 className="font-serif text-2xl font-bold">Track Your Progress</h3>
                <p className="text-primary-foreground/80">Your journey to freedom, step by step</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">0</div>
                <div className="text-sm text-primary-foreground/70">Assessments</div>
              </div>
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">0</div>
                <div className="text-sm text-primary-foreground/70">Sessions</div>
              </div>
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">0</div>
                <div className="text-sm text-primary-foreground/70">Days</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Scripture & Encouragement */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <blockquote className="font-serif text-2xl md:text-3xl italic text-foreground/90 leading-relaxed">
            "If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness."
          </blockquote>
          <cite className="text-lg text-muted-foreground">— 1 John 1:9</cite>
          <p className="text-lg text-foreground/80 pt-6 max-w-2xl mx-auto">
            Deliverance is simple, voluntary, and rooted in Yahusha Ha Mashiach's victory on the cross. 
            Christians can have demons (see Acts 8:13-23), and biblical deliverance is the pathway to lasting freedom.
            Speak everything out loud and invite the Ruach HaKodesh to fill you afterward.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground space-y-3">
            <p>
              This app is inspired by <strong>Bride Ministries International</strong> and the deliverance teachings of 
              Dan Duval, Amanda Buys, and other anointed ministers committed to setting captives free.
            </p>
            <p>
              We believe in making cutting-edge deliverance resources accessible to millions worldwide. 
              All content is for educational and spiritual purposes only.
            </p>
            <p className="text-xs">
              Governed by Texas law. Not a substitute for medical or psychological care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
