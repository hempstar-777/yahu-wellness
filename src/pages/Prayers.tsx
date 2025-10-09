import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, BookOpen, Copy, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Prayers = () => {
  const corePrayer = `Father Yahuah, I come before you in the mighty name of Yahusha Ha Mashiach because your word says if we confess our sins, you are faithful and just to forgive us our sins and to cleanse us from all unrighteousness.

I confess that I have (harbored/engaged in/committed) [INSERT YOUR LIST FROM ASSESSMENT].

I repent for [INSERT YOUR LIST] and I receive your grace to not turn back.

I renounce [INSERT YOUR LIST] and break all agreement with it, its fruit, its children, and its presence in my life.

I now bind in chains and fetters of iron every evil spirit that has been at work in and around my life because of what I have renounced.

I declare that you are severed from my life, fired, and escorted to wherever the True Yahusha Ha Mashiach sends you. Now get out!

I speak that any spirits attempting to linger or resist removal are now brutally assaulted with the sword of Yahuah, arrows, the hot thunderbolt of Yahuah, hailstones, tsunamis of living water, engines of war, trampling by the war horses of heaven, instruments of war, instruments of death, and the all-consuming fire of Yahuah until you relinquish your positions in and around my life.

Thank you, Yahusha Ha Mashiach, for setting me free.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(corePrayer);
    toast.success("Prayer copied to clipboard!");
  };

  const prayerCategories = [
    {
      title: "Core Deliverance Prayer",
      icon: BookOpen,
      description: "The foundational 5-step prayer with blanks for your assessment lists",
      available: true,
    },
    {
      title: "Forgiveness & Healing",
      icon: Heart,
      description: "Prayers for releasing offenders and inviting Yahusha to mend soul wounds",
      available: true,
      link: "/expanded-prayers",
    },
    {
      title: "Bloodline Confession",
      icon: Users,
      description: "Advanced prayers for generational iniquities and family sins",
      available: true,
      link: "/expanded-prayers",
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
              <h1 className="font-serif text-2xl md:text-3xl font-bold">Prayer Library</h1>
              <p className="text-sm text-muted-foreground">Templates for renunciation and spiritual freedom</p>
            </div>
          </div>
        </div>
      </header>

      {/* Prayer Categories */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {prayerCategories.map((category, index) => (
            <Link 
              key={index} 
              to={category.link || "#"}
              className={!category.available ? "pointer-events-none" : ""}
            >
              <Card
                className={`p-6 text-center space-y-3 transition-all duration-300 ${
                  category.available
                    ? 'border-primary/30 shadow-elevated hover:shadow-glow cursor-pointer'
                    : 'opacity-60 border-border/30'
                }`}
              >
                <div className={`inline-flex p-4 rounded-full ${
                  category.available
                    ? 'bg-gradient-spiritual text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-semibold">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
                {!category.available && (
                  <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Core Prayer */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <Card className="max-w-4xl mx-auto p-8 border-primary/20 shadow-elevated">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-2">Core Deliverance Prayer</h2>
                <p className="text-muted-foreground">
                  Insert your assessment results into the bracketed sections below
                </p>
              </div>
              <Button onClick={copyToClipboard} size="sm" variant="outline" className="flex-shrink-0">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 border border-border/30">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                {corePrayer}
              </pre>
            </div>

            <div className="bg-accent/50 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-accent-foreground">How to Use:</h3>
              <ul className="space-y-1 text-sm text-accent-foreground/80">
                <li>1. Complete an assessment to generate your personalized list</li>
                <li>2. Replace <strong>[INSERT YOUR LIST]</strong> with your specific items</li>
                <li>3. Speak the entire prayer out loud in a safe, private setting</li>
                <li>4. After completing, invite the Ruach HaKodesh to fill you</li>
              </ul>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-spiritual shadow-elevated">
                <Link to="/assessments">Take Assessment</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30">
                <Link to="/deliverance">Learn the 5 Steps</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Prayers;
