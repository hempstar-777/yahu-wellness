import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, BookOpen, Video, MessageCircle, ExternalLink, Heart, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import BibleAudioPlayer from "@/components/BibleAudioPlayer";
import PrayerAudioPlayer from "@/components/PrayerAudioPlayer";
import AIDeliveranceChat from "@/components/AIDeliveranceChat";
import HebrewNamesGlossary from "@/components/HebrewNamesGlossary";

const Resources = () => {
  const teachings = [
    {
      title: "The Holy Blood of Yahusha",
      description: "Understanding the power, protection, and deliverance through the blood of Messiah",
      duration: "18 min read",
      link: "/teaching/blood-of-messiah"
    },
    {
      title: "The Holy Fire of the Spirit",
      description: "How the consuming fire of the Ruach HaKodesh defeats darkness and purifies believers",
      duration: "14 min read",
      link: "/teaching/holy-fire"
    },
    {
      title: "The Power of Fasting",
      description: "Physical, emotional, and spiritual breakthroughs through biblical fasting",
      duration: "16 min read",
      link: "/teaching/fasting-importance"
    },
    {
      title: "The Authority of Prayer",
      description: "Understanding how prayer activates heavenly authority and brings transformation",
      duration: "12 min read",
      link: "/teaching/prayer-power"
    },
    {
      title: "Handling Trauma: Forgive & Heal",
      description: "Break victimhood agreements and address secondary effects like bitterness and addiction",
      duration: "15 min read",
      link: "/teaching/trauma-healing"
    },
    {
      title: "Generational Freedom",
      description: "Understanding and confessing bloodline iniquities to break spiritual strongholds",
      duration: "12 min read",
      link: "/teaching/generational-freedom"
    },
    {
      title: "Post-Deliverance Filling",
      description: "Why inviting the Ruach HaKodesh is crucial—avoiding spiritual voids",
      duration: "8 min read",
      link: "/teaching/post-deliverance"
    },
  ];

  const testimonials = [
    {
      quote: "Burping and overwhelming joy after renouncing my New Age tattoo. The freedom is real!",
      context: "Surface Issues Assessment",
    },
    {
      quote: "For molestation trauma: I forgave, broke victim agreements—the secondary bitterness just vanished.",
      context: "Trauma & Soul Wounds",
    },
    {
      quote: "I prayed daily for three weeks. Persistence broke through longstanding resistance. Don't give up!",
      context: "Advanced Strongholds",
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
              <h1 className="font-serif text-2xl md:text-3xl font-bold">Resources</h1>
              <p className="text-sm text-muted-foreground">Teachings, testimonials, and deeper guidance</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hebrew Names Glossary */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-serif text-3xl font-bold mb-2">Hebrew Names Study</h2>
            <p className="text-muted-foreground">
              Discover the true meanings of sacred names (transliterated, not translated)
            </p>
          </div>
          <HebrewNamesGlossary />
        </div>
      </section>

      {/* Quick Links to New Features */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-elevated transition-all border-primary/20">
            <Link to="/intercession" className="block space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-gradient-spiritual text-primary-foreground">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-semibold">Intercession Hub</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Learn strategic prayer, warfare intercession, and standing in the gap for others
              </p>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow">
                Explore Intercession →
              </Button>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-elevated transition-all border-primary/20">
            <Link to="/assessments/altars" className="block space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-gradient-divine text-primary-foreground">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-semibold">Altars Assessment</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Identify and demolish spiritual altars giving demons legal access to your life
              </p>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow">
                Take Assessment →
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* AI & Audio Tools */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold mb-2">AI & Audio Tools</h2>
            <p className="text-muted-foreground">Interactive assistance and 24/7 spiritual reinforcement</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <AIDeliveranceChat />
            <div className="space-y-6">
              <BibleAudioPlayer />
              <PrayerAudioPlayer />
            </div>
          </div>
        </div>
      </section>

      {/* Video Library Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl font-bold">Video Library</h2>
            <p className="text-muted-foreground">Step-by-step guidance from deliverance experts</p>
          </div>

          <Card className="p-8 border-primary/20 shadow-elevated">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-lg bg-gradient-spiritual text-primary-foreground">
                <Video className="w-8 h-8" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold mb-2">Deliverance 101 Walkthrough</h3>
                    <p className="text-muted-foreground">
                      Complete video guide walking through all 5 steps with real-time prayer demonstration
                    </p>
                  </div>
                  <Badge variant="secondary">10 min</Badge>
                </div>
                <Button variant="default" className="gap-2" asChild>
                  <a href="https://www.youtube.com/watch?v=example" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Watch on YouTube
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Note: Replace with actual deliverance video URL when available
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Teachings Hub */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl font-bold">Teachings Hub</h2>
            <p className="text-muted-foreground">Biblical foundations for lasting freedom</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {teachings.map((teaching, index) => (
              <Card
                key={index}
                className="p-6 space-y-4 hover:shadow-elevated transition-all duration-300 border-border/50 hover:border-primary/30"
              >
                <div className="p-3 rounded-lg bg-accent text-accent-foreground inline-flex">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-semibold">{teaching.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {teaching.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">{teaching.duration}</span>
                  <Button size="sm" variant="default" asChild>
                    <Link to={teaching.link}>
                      Read Now
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-12 pb-16">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl font-bold">Testimonials</h2>
            <p className="text-muted-foreground">Real stories of breakthrough and freedom</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 space-y-4 bg-gradient-divine text-primary-foreground border-0 shadow-glow"
              >
                <MessageCircle className="w-8 h-8 opacity-80" />
                <blockquote className="text-sm leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
                <Badge variant="secondary" className="text-xs">
                  {testimonial.context}
                </Badge>
              </Card>
            ))}
          </div>

          <Card className="p-6 text-center bg-muted/30 border-border/50">
            <p className="text-muted-foreground mb-4">
              Have a testimony to share? Your story could encourage others on their journey.
            </p>
            <Button variant="outline" asChild className="gap-2">
              <Link to="/testimonies">
                <MessageCircle className="w-4 h-4" />
                Share Your Story
              </Link>
            </Button>
          </Card>
        </div>
      </section>

      {/* Biblical Foundation */}
      <section className="container mx-auto px-4 py-12 pb-16">
        <Card className="max-w-4xl mx-auto p-8 border-primary/20 shadow-elevated">
          <h3 className="font-serif text-2xl font-bold mb-4">Biblical Foundation</h3>
          <div className="space-y-3 text-foreground/80">
            <p className="leading-relaxed">
              This app is built on biblical principles and guided by the Ruach HaKodesh (Holy Spirit). 
              All teachings and prayers are rooted in Scripture and focus on helping believers walk in freedom through Yeshua.
            </p>
            <p className="leading-relaxed">
              We combine timeless biblical truths with modern AI technology to provide personalized guidance 
              and support for your deliverance journey. Our approach emphasizes personal relationship with the Holy Spirit 
              and the authority believers have through Messiah.
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Resources;
