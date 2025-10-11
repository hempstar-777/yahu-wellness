import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, FileText, Heart, Users, Sparkles, Target, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Assessments = () => {
  const assessments = [
    {
      id: 1,
      title: "Surface Issues",
      description: "Basic checklist for common sins and bondages. Perfect starting point if you're unsure where to begin.",
      icon: FileText,
      difficulty: "Beginner",
      duration: "10-15 min",
      available: true,
      path: "/assessments/surface-issues",
    },
    {
      id: 2,
      title: "Bondages & Habits",
      description: "Deeper dive into patterns like pharmakia, illicit relationships, and addictive behaviors.",
      icon: Target,
      difficulty: "Intermediate",
      duration: "15-20 min",
      available: true,
      path: "/assessments/bondages",
    },
    {
      id: 3,
      title: "Trauma & Soul Wounds",
      description: "Address molestation, abuse, and their effects: bitterness, dissociation, and victimhood.",
      icon: Heart,
      difficulty: "Advanced",
      duration: "20-30 min",
      available: true,
      path: "/assessments/trauma",
    },
    {
      id: 4,
      title: "Generational Iniquities",
      description: "Identify and confess family bloodline sins including occult involvement.",
      icon: Users,
      difficulty: "Advanced",
      duration: "20-25 min",
      available: true,
      path: "/assessments/generational",
    },
    {
      id: 5,
      title: "New Age Influences",
      description: "Covers tattoos, ascended masters, and spiritual pathways requiring renunciation.",
      icon: Sparkles,
      difficulty: "Intermediate",
      duration: "15-20 min",
      available: true,
      path: "/assessments/new-age",
    },
    {
      id: 6,
      title: "Advanced Strongholds",
      description: "For alters, integration, vows, and persistent spiritual resistance.",
      icon: Lock,
      difficulty: "Expert",
      duration: "30+ min",
      available: true,
      path: "/assessments/advanced",
    },
    {
      id: 7,
      title: "Doorways Assessment",
      description: "Comprehensive list of 600+ specific doorways across all categories.",
      icon: FileText,
      difficulty: "Comprehensive",
      duration: "20-30 min",
      available: true,
      path: "/assessments/doorways",
    },
    {
      id: 8,
      title: "Altars & Evil Dedications",
      description: "Identify spiritual altars and demonic dedication points requiring demolition.",
      icon: Sparkles,
      difficulty: "Advanced",
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
                Back
              </Link>
            </Button>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold">Assessments</h1>
              <p className="text-sm text-muted-foreground">Identify bondages through guided self-evaluation</p>
            </div>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 border-primary/20 shadow-elevated">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold">How Assessments Work</h2>
            <p className="text-foreground/80 leading-relaxed">
              These interactive evaluations help you identify specific sins, bondages, and spiritual doorways in your life. 
              Your responses generate personalized lists that you'll use in renunciation prayers during the 5-step deliverance process.
            </p>
            <div className="bg-accent/50 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-accent-foreground">Tips for Success:</h3>
              <ul className="space-y-1 text-sm text-accent-foreground/80">
                <li>• Be honest and thorough - Yahuah sees your heart</li>
                <li>• Results can be saved in-app or emailed to you</li>
                <li>• Retake assessments anytime as you grow</li>
                <li>• You can "lump under unrighteousness" for lengthy lists</li>
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
                  <Badge variant={
                    assessment.difficulty === 'Beginner' ? 'secondary' :
                    assessment.difficulty === 'Intermediate' ? 'default' :
                    'outline'
                  } className="text-xs">
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
                      Start →
                    </Button>
                  ) : (
                    <span className="text-xs font-semibold text-muted-foreground">Coming Soon</span>
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
