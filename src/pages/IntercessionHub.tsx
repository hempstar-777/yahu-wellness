import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Heart, Shield, Globe, Users, Sword, Crown, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const IntercessionHub = () => {
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
              <h1 className="font-serif text-2xl md:text-3xl font-bold">Intercession Hub</h1>
              <p className="text-sm text-muted-foreground">Standing in the gap through strategic prayer</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Heart className="w-16 h-16 mx-auto text-primary" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
            The Ministry of Intercession
          </h2>
          <p className="text-xl text-foreground/80 leading-relaxed">
            Intercession is standing in the gap between Yahuah and those in need, bringing heaven's will to earth 
            through persistent, targeted, and anointed prayer.
          </p>
          <Alert className="border-primary/30 bg-gradient-divine/10 text-left">
            <AlertDescription>
              <strong>Ezekiel 22:30</strong> - "I sought for a man among them who would make a wall, and stand in the gap 
              before Me on behalf of the land, that I should not destroy it; but I found no one."
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Main Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="types" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 h-auto p-2 bg-muted/50">
            <TabsTrigger value="types" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Types of Intercession</span>
              <span className="sm:hidden">Types</span>
            </TabsTrigger>
            <TabsTrigger value="strategic" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Strategic Prayer</span>
              <span className="sm:hidden">Strategic</span>
            </TabsTrigger>
            <TabsTrigger value="warfare" className="flex items-center gap-2">
              <Sword className="w-4 h-4" />
              <span className="hidden sm:inline">Warfare Intercession</span>
              <span className="sm:hidden">Warfare</span>
            </TabsTrigger>
            <TabsTrigger value="governmental" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              <span className="hidden sm:inline">Governmental</span>
              <span className="sm:hidden">Govern</span>
            </TabsTrigger>
          </TabsList>

          {/* Types of Intercession */}
          <TabsContent value="types" className="space-y-6 mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <h2 className="font-serif text-3xl font-bold mb-6">Types of Intercession</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-gradient-spiritual text-primary-foreground">
                  <div className="flex items-start gap-3 mb-3">
                    <Heart className="w-6 h-6 flex-shrink-0" />
                    <h3 className="font-semibold text-xl">Personal Intercession</h3>
                  </div>
                  <p className="text-sm mb-3">Praying for specific individuals—family, friends, leaders, or those in need.</p>
                  <div className="bg-background/10 rounded p-3 text-xs space-y-1">
                    <p><strong>Focus:</strong> Salvation, healing, breakthrough, protection</p>
                    <p><strong>Example:</strong> "Father, I stand in the gap for [NAME]. Break chains of [ISSUE]..."</p>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-divine text-primary-foreground">
                  <div className="flex items-start gap-3 mb-3">
                    <Users className="w-6 h-6 flex-shrink-0" />
                    <h3 className="font-semibold text-xl">Corporate Intercession</h3>
                  </div>
                  <p className="text-sm mb-3">Agreement prayer with other believers for collective breakthrough.</p>
                  <div className="bg-background/10 rounded p-3 text-xs space-y-1">
                    <p><strong>Focus:</strong> Churches, communities, movements, revival</p>
                    <p><strong>Power:</strong> "Where 2-3 gather in My name..." (Matt 18:20)</p>
                  </div>
                </Card>

                <Card className="p-6 bg-muted">
                  <div className="flex items-start gap-3 mb-3">
                    <Globe className="w-6 h-6 flex-shrink-0 text-primary" />
                    <h3 className="font-semibold text-xl">National/Territorial</h3>
                  </div>
                  <p className="text-sm mb-3">Praying for nations, cities, regions to break demonic strongholds over territories.</p>
                  <div className="bg-accent/30 rounded p-3 text-xs space-y-1">
                    <p><strong>Focus:</strong> Principalities over regions, governmental leaders, cultural transformation</p>
                    <p><strong>Example:</strong> Daniel's 21-day intercession for Israel (Dan 10)</p>
                  </div>
                </Card>

                <Card className="p-6 bg-muted">
                  <div className="flex items-start gap-3 mb-3">
                    <Shield className="w-6 h-6 flex-shrink-0 text-primary" />
                    <h3 className="font-semibold text-xl">Crisis Intercession</h3>
                  </div>
                  <p className="text-sm mb-3">Urgent prayer during emergencies, spiritual attacks, or critical situations.</p>
                  <div className="bg-accent/30 rounded p-3 text-xs space-y-1">
                    <p><strong>Triggers:</strong> Sudden illness, demonic assault, natural disasters</p>
                    <p><strong>Response:</strong> Immediate, intense, persistent prayer until breakthrough</p>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Strategic Prayer */}
          <TabsContent value="strategic" className="space-y-6 mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <h2 className="font-serif text-3xl font-bold mb-6">Strategic Intercession</h2>
              
              <div className="space-y-6">
                <div className="bg-accent/30 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">What is Strategic Prayer?</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Strategic intercession involves Holy Spirit-led, targeted prayer that identifies root issues, demonic strongholds, 
                    and specific strategies to dismantle enemy operations. It's warfare prayer with divine intelligence.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Step 1: Spiritual Mapping</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ask the Ruach HaKodesh to reveal territorial spirits, generational patterns, and demonic hierarchies 
                      operating in your target area (family, city, nation).
                    </p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sword className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Step 2: Target the Root</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Don't just pray against symptoms. Identify the strongman (chief demon) and legal grounds 
                      (sin, covenants, curses) giving it authority.
                    </p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Step 3: Decree Victory</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Speak Yahuah's verdict over the situation. Bind enemy forces, loose heaven's resources, 
                      and establish Kingdom authority.
                    </p>
                  </Card>
                </div>

                <Card className="p-6 bg-gradient-divine text-primary-foreground">
                  <h3 className="font-semibold text-xl mb-3">Strategic Prayer Template</h3>
                  <div className="space-y-2 text-sm font-mono bg-background/10 rounded p-4">
                    <p>"Father Yahuah, I ask for Your strategic intelligence on [SITUATION].</p>
                    <p>Reveal the strongman and legal grounds. Show me what to pray.</p>
                    <p>I bind [SPECIFIC PRINCIPALITY/SPIRIT] over [PERSON/PLACE].</p>
                    <p>I revoke all legal rights through [SIN/COVENANT/CURSE].</p>
                    <p>I loose Your angels to war on behalf of [TARGET].</p>
                    <p>I decree [SPECIFIC BIBLICAL PROMISE] over this situation.</p>
                    <p>Let Your Kingdom come and Your will be done. Amen."</p>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Warfare Intercession */}
          <TabsContent value="warfare" className="space-y-6 mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <h2 className="font-serif text-3xl font-bold mb-6">Warfare Intercession</h2>
              
              <div className="space-y-6">
                <Alert className="border-secondary/30 bg-secondary/5">
                  <AlertDescription>
                    <strong>Ephesians 6:12</strong> - We wrestle against principalities, powers, rulers of darkness, 
                    and spiritual wickedness in high places—not against flesh and blood.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-xl">Binding & Loosing</h3>
                    <p className="text-sm text-foreground/80">
                      <strong>Matthew 18:18</strong> - "Whatever you bind on earth is bound in heaven, and whatever you loose 
                      on earth is loosed in heaven."
                    </p>
                    <Card className="p-4 bg-muted/50">
                      <p className="text-sm mb-2"><strong>To Bind:</strong></p>
                      <ul className="text-xs space-y-1 list-disc list-inside">
                        <li>Enemy operations and assignments</li>
                        <li>Demonic princes and principalities</li>
                        <li>Curses, hexes, and witchcraft attacks</li>
                        <li>Spirits of fear, confusion, sickness</li>
                      </ul>
                    </Card>
                    <Card className="p-4 bg-muted/50">
                      <p className="text-sm mb-2"><strong>To Loose:</strong></p>
                      <ul className="text-xs space-y-1 list-disc list-inside">
                        <li>Healing, breakthrough, provision</li>
                        <li>Angelic reinforcement</li>
                        <li>Prophetic destiny and purpose</li>
                        <li>Blessings and favor</li>
                      </ul>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-xl">Fasting & Intercession</h3>
                    <p className="text-sm text-foreground/80">
                      <strong>Matthew 17:21</strong> - "This kind does not go out except by prayer and fasting."
                    </p>
                    <Card className="p-4 bg-gradient-spiritual text-primary-foreground">
                      <p className="text-sm mb-3">Combining fasting with warfare prayer:</p>
                      <ul className="text-xs space-y-2">
                        <li>✓ Weakens demonic strongholds</li>
                        <li>✓ Increases spiritual sensitivity</li>
                        <li>✓ Breaks stubborn bondages</li>
                        <li>✓ Amplifies prophetic clarity</li>
                        <li>✓ Releases breakthroughs faster</li>
                      </ul>
                    </Card>
                    <p className="text-xs text-muted-foreground">
                      <strong>Recommended:</strong> 1-3 day water fast before intense spiritual warfare sessions
                    </p>
                  </div>
                </div>

                <Card className="p-6 bg-muted/30">
                  <h3 className="font-semibold text-xl mb-4">Warfare Prayer Pattern</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-3">
                      <span className="font-bold text-primary">1.</span>
                      <div>
                        <p className="font-semibold">Put on Spiritual Armor</p>
                        <p className="text-xs text-muted-foreground">Ephesians 6:10-18 - Belt, breastplate, shoes, shield, helmet, sword</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary">2.</span>
                      <div>
                        <p className="font-semibold">Plead the Blood of Yahusha</p>
                        <p className="text-xs text-muted-foreground">Cover yourself, family, property with His victorious blood</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary">3.</span>
                      <div>
                        <p className="font-semibold">Identify the Enemy</p>
                        <p className="text-xs text-muted-foreground">Name specific spirits operating (fear, infirmity, confusion, etc.)</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary">4.</span>
                      <div>
                        <p className="font-semibold">Bind and Command</p>
                        <p className="text-xs text-muted-foreground">"I bind you [SPIRIT] in chains. You are FIRED and EVICTED now!"</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary">5.</span>
                      <div>
                        <p className="font-semibold">Release Heaven's Resources</p>
                        <p className="text-xs text-muted-foreground">Loose angels, fire, healing, peace—whatever is needed</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary">6.</span>
                      <div>
                        <p className="font-semibold">Worship & Thanksgiving</p>
                        <p className="text-xs text-muted-foreground">Seal the victory with praise (2 Chronicles 20:22)</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Governmental Intercession */}
          <TabsContent value="governmental" className="space-y-6 mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <h2 className="font-serif text-3xl font-bold mb-6">Governmental Intercession</h2>
              
              <div className="space-y-6">
                <div className="bg-accent/30 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">Praying from Heavenly Authority</h3>
                  <p className="text-foreground/80 leading-relaxed mb-3">
                    Governmental intercession operates from your position <strong>seated with Christ in heavenly places</strong> 
                    (Eph 2:6). You're not begging—you're decreeing Yahuah's will from a throne room perspective.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This level of prayer requires maturity, revelation of Kingdom authority, and alignment with Yahuah's heart.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <Crown className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold text-lg mb-2">Characteristics</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Decrees aligned with Scripture and prophecy</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Establishes heaven's rulings on earth</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Shifts atmospheres over regions/nations</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Often corporate—requires agreement of mature intercessors</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Prophetic in nature—speaks future realities into being</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <Clock className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold text-lg mb-2">When to Use</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Praying for national leaders and governments</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Breaking regional principalities</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Calling forth revival or reformation</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Decreeing prophetic promises over territories</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Countering societal lies and cultural darkness</span>
                      </li>
                    </ul>
                  </Card>
                </div>

                <Card className="p-6 bg-gradient-divine text-primary-foreground">
                  <h3 className="font-semibold text-xl mb-4">Governmental Prayer Template</h3>
                  <div className="space-y-2 text-sm font-mono bg-background/10 rounded p-4">
                    <p>"Father Yahuah, I come before Your throne as a citizen of heaven seated with Christ.</p>
                    <p>I decree that Your Kingdom come and Your will be done in [NATION/REGION].</p>
                    <p>I bind the principality of [NAME SPIRIT - e.g., Mammon, Jezebel, Antichrist] over this territory.</p>
                    <p>I revoke all legal grounds through national sins of [ABORTION, IDOLATRY, etc.].</p>
                    <p>I loose the Spirit of Yahuah to bring conviction, repentance, and reformation.</p>
                    <p>I decree [SPECIFIC PROMISE - e.g., 2 Chron 7:14] over this land.</p>
                    <p>Let righteous leaders arise and wicked counselors fall.</p>
                    <p>I establish the government of Yahusha over [TARGET]. Let it be done. Amen."</p>
                  </div>
                </Card>

                <Alert className="border-secondary/30 bg-secondary/5">
                  <AlertDescription>
                    <strong>1 Timothy 2:1-2</strong> - "I urge that supplications, prayers, intercessions, and thanksgivings 
                    be made for all people, for kings and all who are in high positions, that we may lead a peaceful and quiet 
                    life, godly and dignified in every way."
                  </AlertDescription>
                </Alert>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Action Buttons */}
      <section className="container mx-auto px-4 py-12 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="font-serif text-3xl font-bold">Start Your Intercession Journey</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="bg-gradient-spiritual shadow-elevated">
              <Link to="/group-prayer">Join Group Prayer</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 hover:border-primary/50">
              <Link to="/prayer-journal">Start Prayer Journal</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntercessionHub;
