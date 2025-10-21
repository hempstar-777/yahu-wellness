import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, MessageSquare, RotateCcw, Ban, Link2, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

const Deliverance = () => {
  const { t } = useTranslation();
  const steps = [
    {
      number: 1,
      title: "Confess",
      icon: MessageSquare,
      description: "Acknowledge your sins before Yahuah. Speak them out loud from your assessment list.",
      example: '"Father Yahuah, I confess that I have harbored anger and unforgiveness..."',
      scripture: "1 John 1:9",
    },
    {
      number: 2,
      title: "Repent",
      icon: RotateCcw,
      description: "Turn away from sin and receive grace. For non-consensual issues, focus on breaking victim agreements.",
      example: '"I repent for [list items] and receive Your grace to not turn back."',
      scripture: "Acts 3:19",
    },
    {
      number: 3,
      title: "Renounce",
      icon: Ban,
      description: "Break all agreements with the sin, its fruit, its children, and its presence in your life.",
      example: '"I renounce anger and break all agreement with it, its fruit, its children..."',
      scripture: "2 Corinthians 4:2",
    },
    {
      number: 4,
      title: "Bind",
      icon: Link2,
      description: "Bind every evil spirit that has operated in your life because of what you renounced.",
      example: '"I bind you in chains and fetters of iron..."',
      scripture: "Matthew 18:18",
    },
    {
      number: 5,
      title: "Cast Out",
      icon: Zap,
      description: "Command spirits to leave. If resistance, use brutal assault declarations with Yahuah's weapons.",
      example: '"You are severed, fired, and escorted to wherever Yahusha sends you. Get out!"',
      scripture: "Mark 16:17",
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
              <h1 className="font-serif text-2xl md:text-3xl font-bold">Deliverance 101</h1>
              <p className="text-sm text-muted-foreground">The 5-Step Process to Freedom</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
            Walk in Yahusha's Victory
          </h2>
          <p className="text-xl text-foreground/80 leading-relaxed">
            Deliverance is simple and faith-enforced. Speak everything out loud and follow these 5 steps 
            to break agreements with every bondage identified in your assessments.
          </p>
          <Alert className="border-secondary/30 bg-secondary/5 text-left">
            <AlertDescription>
              <strong>Remember:</strong> After completing the steps, invite the Ruach HaKodesh (Holy Spirit) 
              to fill you. Avoid leaving a void. For longstanding issues, you may need to repeat the process.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Strongman Identification */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-8 bg-gradient-divine text-primary-foreground shadow-glow">
          <div className="flex items-start gap-4">
            <Shield className="w-10 h-10 flex-shrink-0" />
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold">Step 0: Identify the Strongman</h3>
              <p className="text-primary-foreground/90 leading-relaxed">
                <strong>Mark 3:27</strong> - "No one can enter a strong man's house and plunder his goods, unless he first binds 
                the strong man. Then indeed he may plunder his house."
              </p>
              <p className="text-sm text-primary-foreground/80">
                Before the 5 steps, identify the <strong>chief demon</strong> (strongman) ruling over your primary issue. 
                This spirit oversees lesser demons and must be bound first for effective deliverance.
              </p>
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-lg">Common Strongmen:</h4>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-primary-foreground">•</span>
                    <span><strong>Spirit of Fear</strong> - anxiety, phobias, panic</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary-foreground">•</span>
                    <span><strong>Spirit of Infirmity</strong> - chronic illness, disease</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary-foreground">•</span>
                    <span><strong>Spirit of Addiction</strong> - substances, behaviors</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary-foreground">•</span>
                    <span><strong>Spirit of Perversion</strong> - sexual bondage, lust</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary-foreground">•</span>
                    <span><strong>Spirit of Heaviness</strong> - depression, despair</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary-foreground">•</span>
                    <span><strong>Spirit of Divination</strong> - witchcraft, occult</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary-foreground">•</span>
                    <span><strong>Spirit of Pride</strong> - arrogance, rebellion</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary-foreground">•</span>
                    <span><strong>Spirit of Rejection</strong> - wounds, bitterness</span>
                  </div>
                </div>
              </div>
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm font-semibold mb-2">Prayer to Bind the Strongman:</p>
                <p className="text-xs font-mono italic">
                  "I identify the strongman over my life as [SPIRIT NAME]. By the authority of Yahusha Ha Mashiach, 
                  I bind you in chains and fetters of iron. Your authority is REVOKED. I command you SILENT and POWERLESS 
                  while I dismantle your entire house. In Yahusha's name!"
                </p>
              </div>
              <p className="text-xs text-primary-foreground/70">
                <strong>Tip:</strong> Ask the Ruach HaKodesh to reveal the strongman's name through prayer, Scripture, or inner knowing.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* 5 Steps */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {steps.map((step, index) => (
            <Card
              key={step.number}
              className="group p-8 hover:shadow-elevated transition-all duration-300 border-border/50 hover:border-primary/30 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-spiritual flex items-center justify-center text-primary-foreground font-serif text-3xl font-bold shadow-glow group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                    <div className="absolute -bottom-2 -right-2 p-2 rounded-lg bg-accent text-accent-foreground">
                      <step.icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-3xl font-bold group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {step.scripture}
                    </Badge>
                  </div>

                  <p className="text-lg text-foreground/80 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="bg-muted/50 rounded-lg p-4 border border-border/30">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Example:</p>
                    <p className="italic text-foreground/90">{step.example}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Resistance Handling */}
      <section className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto p-8 bg-gradient-divine text-primary-foreground shadow-glow">
          <h3 className="font-serif text-2xl font-bold mb-4">Handling Resistance</h3>
          <p className="text-primary-foreground/90 leading-relaxed mb-6">
            If spirits linger or resist removal after Step 5, engage in brutal spiritual assault using Yahuah's weapons:
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            {[
              "The sword of Yahuah",
              "Arrows of fire",
              "Hot thunderbolts",
              "Hailstones of judgment",
              "Tsunamis of living water",
              "Engines of war",
              "War horses of heaven",
              "All-consuming fire of Yahuah"
            ].map((weapon, i) => (
              <div key={i} className="flex items-center gap-2 bg-background/10 backdrop-blur-sm rounded-lg p-3">
                <Zap className="w-4 h-4 flex-shrink-0" />
                <span>{weapon}</span>
              </div>
            ))}
          </div>
          <p className="text-primary-foreground/90 leading-relaxed mt-6 text-sm">
            Declare these weapons until all spirits relinquish their positions. Persistence is key!
          </p>
        </Card>
      </section>

      {/* Next Steps */}
      <section className="container mx-auto px-4 py-12 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="font-serif text-3xl font-bold">Ready to Begin?</h3>
          <p className="text-lg text-muted-foreground">
            Complete an assessment first, then return here to apply the 5-step process with your personalized list.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="bg-gradient-spiritual shadow-elevated">
              <Link to="/assessments">Take Assessment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 hover:border-primary/50">
              <Link to="/prayers">View Prayer Templates</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Deliverance;
