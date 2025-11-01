import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Brain, Shield, Radio, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const EmotionalResonance = () => {
  return (
    <div className="min-h-screen bg-gradient-light">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/resources">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Resources
              </Link>
            </Button>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold">Emotional Resonance</h1>
              <p className="text-sm text-muted-foreground">Master the invisible force that shapes your life</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Introduction */}
        <Card className="mb-8 border-primary/20 shadow-elevated">
          <CardHeader>
            <CardTitle className="font-serif text-3xl">What Is Emotional Resonance?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90 leading-relaxed">
              <strong>Emotional resonance</strong> is the phenomenon where one person's emotional state "tunes" or 
              synchronizes with another's, like two strings on a guitar vibrating in harmony when one is plucked. 
              It's the invisible bridge that lets us <em>feel</em> what someone else feels—joy, grief, anger, calm—without words. 
              This happens through <strong>mirror neurons</strong>, subtle cues (tone, posture, micro-expressions), and shared context.
            </p>
            <Card className="bg-muted/50 border-primary/10 p-4">
              <p className="text-sm italic text-muted-foreground">
                <strong>Example:</strong> You walk into a room where someone is laughing uncontrollably. 
                Within seconds, you're smiling—even if you don't know the joke. That's resonance in action.
              </p>
            </Card>
          </CardContent>
        </Card>

        {/* How It Affects Us */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="font-serif text-2xl flex items-center gap-3">
              <Brain className="w-6 h-6 text-primary" />
              How It Affects Us (The Invisible Force)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">1. In Relationships</h3>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Positive resonance</strong> builds intimacy. Couples who "vibe" emotionally stay connected longer.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Negative resonance</strong> creates toxicity. One partner's anxiety can trigger the other's, spiraling into conflict.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">2. In Leadership & Influence</h3>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Charismatic leaders use resonance to move masses. Their calm conviction makes <em>you</em> feel capable.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Toxic bosses spread dread. One bad mood can tank team morale for days.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">3. In Self-Perception</h3>
              <p className="text-foreground/80">
                You absorb the emotional "frequency" of people around you. Hang out with complainers → you start 
                seeing problems everywhere. Surround yourself with builders → you feel unstoppable.
              </p>
            </div>

            <Card className="bg-accent/50 border-accent p-4">
              <p className="text-sm text-foreground/80">
                <strong>Science:</strong> Studies (Hatfield et al., 1993) show emotional contagion spreads faster 
                than facts. Your brain mirrors emotions in <strong>0.3 seconds</strong>—faster than conscious thought.
              </p>
            </Card>
          </CardContent>
        </Card>

        {/* Hidden Dangers */}
        <Card className="mb-8 border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">The Hidden Dangers of Uncontrolled Resonance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-destructive">Emotional Burnout</h4>
                  <p className="text-sm text-foreground/80">Absorbing others' stress without boundaries</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-destructive">Loss of Self</h4>
                  <p className="text-sm text-foreground/80">Becoming a "sponge" for everyone's feelings</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-destructive">Decision Paralysis</h4>
                  <p className="text-sm text-foreground/80">Letting others' fear/anxiety override your judgment</p>
                </div>
              </div>
              <Card className="bg-background border-destructive/30 p-4 mt-4">
                <p className="text-sm italic text-muted-foreground">
                  <strong>Real case:</strong> Therapists who don't manage resonance suffer <strong>compassion fatigue</strong>
                  —numbness despite caring deeply.
                </p>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Mastery Framework */}
        <Card className="mb-8 border-primary/30 bg-gradient-spiritual/5">
          <CardHeader>
            <CardTitle className="font-serif text-3xl text-center mb-2">
              How to Master Emotional Resonance
            </CardTitle>
            <p className="text-center text-muted-foreground">The 4-Level Framework</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Level 1 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                  1
                </div>
                <h3 className="font-serif text-xl font-semibold">AWARENESS – Know When It's Happening</h3>
              </div>
              <Card className="bg-muted/30 border-primary/20 p-4">
                <p className="font-semibold mb-2 text-primary">Tool: The 3-Second Pause</p>
                <p className="text-sm text-foreground/80 mb-3">
                  When you feel a sudden mood shift, ask:<br />
                  <em>"Is this <strong>my</strong> emotion… or theirs?"</em>
                </p>
                <p className="text-sm text-foreground/80">
                  Label it: <em>"I'm picking up their anxiety."</em> Naming breaks the spell.
                </p>
              </Card>
            </div>

            <Separator />

            {/* Level 2 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                  2
                </div>
                <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  BOUNDARIES – Protect Your Frequency
                </h3>
              </div>
              <Card className="bg-muted/30 border-primary/20 p-4 space-y-4">
                <div>
                  <p className="font-semibold mb-2 text-primary">Technique: The "Emotional Shield"</p>
                  <p className="text-sm text-foreground/80">
                    Visualize a transparent shield around your chest. It lets empathy <em>in</em> but blocks overwhelm.
                  </p>
                  <p className="text-sm text-foreground/80 mt-2">
                    <strong>Practice:</strong> Before entering a tense meeting, imagine zipping up an emotional wetsuit.
                  </p>
                </div>
                <div className="border-t border-border/50 pt-4">
                  <p className="font-semibold mb-2 text-primary">Pro Move: Use Grounding</p>
                  <ul className="text-sm space-y-1 text-foreground/80">
                    <li>• Press feet into floor</li>
                    <li>• Hold a cold object</li>
                    <li>• Name 3 things you see (anchors you in <em>your</em> body)</li>
                  </ul>
                </div>
              </Card>
            </div>

            <Separator />

            {/* Level 3 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                  3
                </div>
                <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                  <Radio className="w-5 h-5" />
                  INTENTIONAL TUNING – Choose Your Frequency
                </h3>
              </div>
              <Card className="bg-muted/30 border-primary/20 p-4 space-y-4">
                <div>
                  <p className="font-semibold text-primary mb-2">Law of Resonance:</p>
                  <p className="text-sm italic text-foreground/80 mb-3">
                    "You don't rise to the level of your goals; you fall to the level of your environment."
                  </p>
                  <p className="font-semibold mb-2">Action: Curate your "emotional diet"</p>
                  <ul className="text-sm space-y-1 text-foreground/80">
                    <li>• Follow 5 high-vibe people online</li>
                    <li>• Limit time with energy vampires</li>
                    <li>• Consume art/music that uplifts (your brain syncs to it)</li>
                  </ul>
                </div>
                <div className="border-t border-border/50 pt-4">
                  <p className="font-semibold mb-2 text-primary">Exercise: The 7-Day Resonance Reset</p>
                  <div className="space-y-2 text-sm text-foreground/80">
                    <p><strong>Days 1-3:</strong> Avoid news/social media. Only consume content that feels expansive</p>
                    <p><strong>Days 4-7:</strong> Journal: <em>"What emotion do I want to broadcast today?"</em> Then act "as if"</p>
                  </div>
                </div>
              </Card>
            </div>

            <Separator />

            {/* Level 4 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                  4
                </div>
                <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                  <Waves className="w-5 h-5" />
                  BROADCASTING – Become the Source
                </h3>
              </div>
              <Card className="bg-gradient-divine/10 border-primary/30 p-4 space-y-4">
                <p className="font-semibold text-lg text-primary">
                  Mastery = Leading the resonance, not following it.
                </p>
                <div>
                  <p className="font-semibold mb-2">Techniques:</p>
                  <ul className="text-sm space-y-2 text-foreground/80">
                    <li><strong>1. State Induction:</strong> Enter a room in a deliberate emotion (calm, curious, warm). Others sync to <em>you</em>.</li>
                    <li><strong>2. Vocal Resonance:</strong> Speak slower + lower pitch = instant calm in others.</li>
                    <li><strong>3. Micro-Acts:</strong> One genuine smile can shift a group's mood in 10 seconds.</li>
                  </ul>
                </div>
                <div className="border-t border-border/50 pt-4">
                  <p className="font-semibold mb-2 text-primary">Experiment:</p>
                  <p className="text-sm text-foreground/80">
                    Next time someone's upset, don't fix it—just <strong>match their energy, then slowly raise it</strong>.<br />
                    <em>"Yeah, this sucks… but remember last time we turned it around?"</em> (Mirror → Lead)
                  </p>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Daily Practices */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Daily Practices to Own Your Resonance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="font-bold text-primary min-w-20">Morning</div>
                <div className="text-foreground/80">
                  <strong>2-min "Emotional Set Point":</strong> Visualize the feeling you want to carry
                </div>
              </div>
              <Separator />
              <div className="flex gap-4 items-start">
                <div className="font-bold text-primary min-w-20">Midday</div>
                <div className="text-foreground/80">
                  <strong>30-sec "Resonance Scan":</strong> Who am I syncing with? Adjust if needed
                </div>
              </div>
              <Separator />
              <div className="flex gap-4 items-start">
                <div className="font-bold text-primary min-w-20">Night</div>
                <div className="text-foreground/80">
                  <strong>"Emotional Dump":</strong> Write 3 things you absorbed that weren't yours. Rip up the page
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ultimate Truth */}
        <Card className="mb-8 border-primary/30 bg-gradient-spiritual text-primary-foreground shadow-glow">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-center">The Ultimate Truth</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-xl font-semibold leading-relaxed">
              You don't control <em>what</em> emotions come at you.<br />
              You control <em>which ones you amplify</em>.
            </p>
            <p className="text-lg">
              Master resonance, and you master influence—over yourself, your relationships, and your destiny.
            </p>
          </CardContent>
        </Card>

        {/* Final Challenge */}
        <Card className="border-primary/20 shadow-elevated">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Final Challenge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/80">
              For the next 24 hours, treat every emotion you feel as a <em>radio station</em>. Ask:
            </p>
            <Card className="bg-muted/50 border-primary/20 p-4">
              <p className="text-center font-semibold italic text-primary">
                "Am I tuning in… or changing the channel?"
              </p>
            </Card>
            <div className="text-center pt-4 space-y-2">
              <p className="text-lg font-semibold">You're not a victim of vibes.</p>
              <p className="text-2xl font-bold text-primary">You're the DJ.</p>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link to="/resources">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmotionalResonance;
