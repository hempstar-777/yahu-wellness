import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Flame, Clock, Coffee, Droplets, Moon, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FastingGuide = () => {
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
              <h1 className="font-serif text-2xl md:text-3xl font-bold">Biblical Fasting for Spiritual Breakthrough</h1>
              <p className="text-sm text-muted-foreground">Combining prayer with fasting for deliverance power</p>
            </div>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 bg-gradient-spiritual border-primary/30 shadow-glow">
          <Flame className="w-12 h-12 text-primary-foreground mb-4" />
          <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">When Prayer Needs Reinforcement</h2>
          <div className="space-y-4 text-primary-foreground/90">
            <p className="text-lg">
              <strong>Matthew 17:21:</strong> "But this kind does not go out except by prayer and fasting."
            </p>
            <p>
              Some demons are so deeply entrenched that they require more than basic deliverance prayers. 
              Fasting combined with prayer releases supernatural power that breaks stubborn strongholds, 
              generational curses, and territorial assignments that resist normal spiritual warfare.
            </p>
            <p>
              Fasting is not about earning God's favor—you already have it through Yahusha. 
              Rather, fasting is a spiritual weapon that <strong>sharpens your spiritual authority</strong>, 
              <strong>breaks demonic resistance</strong>, and <strong>accelerates breakthrough</strong>.
            </p>
          </div>
        </Card>
      </section>

      {/* Biblical Foundation */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl font-bold text-center">Biblical Foundation for Fasting</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-primary/20 shadow-elevated">
              <h3 className="font-serif text-xl font-semibold mb-3">Old Testament Examples</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex flex-col gap-1">
                  <strong>Moses (Exodus 34:28):</strong>
                  <span className="text-muted-foreground">40-day fast before receiving the Law—intimacy with Yahuah</span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong>Esther (Esther 4:16):</strong>
                  <span className="text-muted-foreground">3-day fast to break national curse—deliverance from genocide</span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong>Daniel (Daniel 10:2-3):</strong>
                  <span className="text-muted-foreground">21-day partial fast—breakthrough against territorial princes</span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong>Jehoshaphat (2 Chronicles 20:3):</strong>
                  <span className="text-muted-foreground">National fast before battle—supernatural victory</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-primary/20 shadow-elevated">
              <h3 className="font-serif text-xl font-semibold mb-3">New Testament Examples</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex flex-col gap-1">
                  <strong>Yahusha (Matthew 4:1-11):</strong>
                  <span className="text-muted-foreground">40-day fast before public ministry—defeated Satan in wilderness</span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong>Anna (Luke 2:37):</strong>
                  <span className="text-muted-foreground">Lifelong fasting and prayer—prophetic revelation</span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong>Early Church (Acts 13:2-3):</strong>
                  <span className="text-muted-foreground">Fasting before major decisions—Holy Spirit guidance</span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong>Paul & Barnabas (Acts 14:23):</strong>
                  <span className="text-muted-foreground">Fasting when appointing elders—spiritual discernment</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Types of Fasts */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl font-bold text-center mb-8">Types of Biblical Fasts</h2>

          <div className="space-y-6">
            <Card className="p-6 border-primary/20 shadow-elevated">
              <div className="flex items-start gap-4">
                <Coffee className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-semibold">1. Partial Fast (Daniel Fast)</h3>
                  <p className="text-muted-foreground">
                    Abstaining from choice foods—meats, sweets, caffeine, alcohol. Focus on vegetables, fruits, water, and simple grains.
                  </p>
                  <div className="bg-accent/30 rounded-lg p-4 text-sm space-y-2">
                    <p><strong>Best For:</strong> Beginners, extended periods (21-40 days), maintaining work/life responsibilities</p>
                    <p><strong>Spiritual Focus:</strong> Breaking addictions, renewing discipline, general spiritual sharpening</p>
                    <p><strong>Example:</strong> Daniel 10:2-3 - "I ate no choice food; no meat or wine touched my lips"</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-primary/20 shadow-elevated">
              <div className="flex items-start gap-4">
                <Droplets className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-semibold">2. Water Fast</h3>
                  <p className="text-muted-foreground">
                    Abstaining from all food, consuming only water. This is the standard biblical fast.
                  </p>
                  <div className="bg-accent/30 rounded-lg p-4 text-sm space-y-2">
                    <p><strong>Best For:</strong> Intermediate fasters, stubborn strongholds, seeking major breakthrough</p>
                    <p><strong>Duration:</strong> 1-7 days typically (consult physician for longer periods)</p>
                    <p><strong>Spiritual Power:</strong> High—breaks resistant demonic assignments, heightens spiritual sensitivity</p>
                    <p><strong>Example:</strong> Esther 4:16 - "Do not eat or drink for three days"</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-primary/20 shadow-elevated">
              <div className="flex items-start gap-4">
                <Moon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-semibold">3. Absolute Fast</h3>
                  <p className="text-muted-foreground">
                    No food or water. <strong className="text-destructive">DANGEROUS</strong> if extended beyond 3 days without medical supervision.
                  </p>
                  <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-sm space-y-2">
                    <p><strong>Best For:</strong> Extreme spiritual emergencies only</p>
                    <p><strong>Maximum Duration:</strong> 3 days (Esther's example)</p>
                    <p><strong>Warning:</strong> Can cause serious dehydration. Only undertake with clear direction from Yahuah</p>
                    <p><strong>Example:</strong> Esther 4:16, Acts 9:9 (Paul after Damascus road)</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-primary/20 shadow-elevated">
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-semibold">4. Intermittent/Sunrise-to-Sunset Fast</h3>
                  <p className="text-muted-foreground">
                    No food from sunrise to sunset (typically 6am-6pm). Drink water freely. Eat simple meals in evening.
                  </p>
                  <div className="bg-accent/30 rounded-lg p-4 text-sm space-y-2">
                    <p><strong>Best For:</strong> Extended seasons, building spiritual stamina, working professionals</p>
                    <p><strong>Duration:</strong> 7-40 days easily sustainable</p>
                    <p><strong>Spiritual Benefit:</strong> Consistent daily denial of flesh, increased prayer focus</p>
                    <p><strong>Note:</strong> Common in early church and Middle Eastern Christian practice</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Practical Guidelines */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 border-primary/20 shadow-elevated">
          <h2 className="font-serif text-2xl font-bold mb-6">Practical Guidelines for Safe & Effective Fasting</h2>
          
          <div className="space-y-6 text-sm">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Before You Begin:</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Pray for direction:</strong> Ask Yahuah what type of fast and duration He's calling you to</li>
                <li><strong>Medical clearance:</strong> If you have health conditions, consult a physician</li>
                <li><strong>Set a clear purpose:</strong> What specific breakthrough are you seeking?</li>
                <li><strong>Prepare mentally:</strong> Fast is spiritual warfare—expect resistance</li>
                <li><strong>Clean your space:</strong> Remove junk food temptations from home</li>
              </ul>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">During the Fast:</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Increase prayer & Bible reading:</strong> Fasting without prayer is just dieting</li>
                <li><strong>Stay hydrated:</strong> Drink plenty of water (unless absolute fast)</li>
                <li><strong>Expect symptoms:</strong> Headaches, weakness, irritability days 1-3 are normal</li>
                <li><strong>Avoid strenuous activity:</strong> Your body is in detox mode</li>
                <li><strong>Don't broadcast it:</strong> Matthew 6:16-18 - fast in secret, Yahuah rewards openly</li>
                <li><strong>Journal insights:</strong> Yahuah often speaks powerfully during fasts</li>
                <li><strong>Rebuke demons:</strong> They will intensify attacks during fasting—stand firm</li>
              </ul>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Breaking the Fast:</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Break slowly:</strong> Start with small amounts of fruit, broth, or juice</li>
                <li><strong>Avoid heavy foods:</strong> No meat, dairy, or large meals for first 24 hours</li>
                <li><strong>Longer fasts require longer re-entry:</strong> 7-day fast = 2-3 day gentle eating</li>
                <li><strong>Listen to your body:</strong> Digestive system needs time to reactivate</li>
                <li><strong>Maintain spiritual gains:</strong> Don't immediately return to old patterns</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Fasting & Deliverance */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 bg-gradient-divine border-primary/30">
          <Shield className="w-12 h-12 text-primary-foreground mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-4 text-primary-foreground">Combining Fasting with Deliverance</h2>
          
          <div className="space-y-4 text-primary-foreground/90 text-sm">
            <p>
              When facing resistant strongholds, combine fasting with deliverance for maximum power:
            </p>

            <div className="bg-primary-foreground/10 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-lg text-primary-foreground">Strategic Approach:</h3>
              <ol className="space-y-3 list-decimal list-inside">
                <li>
                  <strong>Days 1-3:</strong> Begin fast with Courts of Heaven prayers—establish legal freedom, 
                  revoke enemy rights, receive divine verdicts
                </li>
                <li>
                  <strong>Mid-fast:</strong> Pray through assessments, renounce specific strongholds, 
                  break generational curses with bloodline prayers
                </li>
                <li>
                  <strong>Peak spiritual sensitivity (Days 3-5):</strong> Command stubborn spirits to leave, 
                  expect manifestations, press through resistance
                </li>
                <li>
                  <strong>Final day:</strong> Fill with Holy Spirit, seal freedom with worship, 
                  declare new identity in Christ
                </li>
                <li>
                  <strong>Breaking the fast:</strong> Celebrate communion, thank Yahuah for breakthrough, 
                  commit to staying-free practices
                </li>
              </ol>
            </div>

            <Alert className="border-primary-foreground/30 bg-primary-foreground/10">
              <AlertDescription className="text-primary-foreground">
                <strong>Power Principle:</strong> Fasting doesn't convince God to act—He already wants you free. 
                Fasting weakens demonic strongholds, sharpens your spiritual weapons, and removes natural 
                distractions so you can fight effectively in the spirit realm.
              </AlertDescription>
            </Alert>
          </div>
        </Card>
      </section>

      {/* Common Mistakes */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 border-destructive/30 bg-destructive/5">
          <h2 className="font-serif text-2xl font-bold mb-4 text-destructive">Common Fasting Mistakes to Avoid</h2>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-background/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">❌ Fasting to manipulate God</h4>
              <p className="text-muted-foreground">God isn't impressed by hunger strikes. Fast with faith, not bargaining.</p>
            </div>
            <div className="bg-background/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">❌ Neglecting prayer</h4>
              <p className="text-muted-foreground">Fasting without prayer is just skipping meals. The power is in the combination.</p>
            </div>
            <div className="bg-background/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">❌ Broadcasting your fast</h4>
              <p className="text-muted-foreground">Yahusha said to fast in secret (Matthew 6). Pride cancels the spiritual benefit.</p>
            </div>
            <div className="bg-background/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">❌ Unrealistic expectations</h4>
              <p className="text-muted-foreground">Some breakthroughs take time. Don't quit if results aren't immediate.</p>
            </div>
            <div className="bg-background/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">❌ Ignoring medical conditions</h4>
              <p className="text-muted-foreground">Diabetics, pregnant women, and those with conditions should modify or skip fasting.</p>
            </div>
            <div className="bg-background/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">❌ Making rash vows</h4>
              <p className="text-muted-foreground">Don't vow 40 days if Yahuah only called you to 3. Finish what you start.</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Recommended Fasts for Specific Issues */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl font-bold text-center mb-8">Recommended Fasts for Specific Strongholds</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-primary/20 shadow-elevated">
              <h3 className="font-semibold mb-3">Sexual Bondage & Soul Ties</h3>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Recommended:</strong> 3-day water fast
              </p>
              <p className="text-sm">
                Sexual demons are deeply rooted. Fasting breaks their grip on your body and emotions. 
                Combine with forgiveness prayers and soul tie renunciations.
              </p>
            </Card>

            <Card className="p-6 border-primary/20 shadow-elevated">
              <h3 className="font-semibold mb-3">Generational Curses</h3>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Recommended:</strong> 7-day partial fast (Daniel Fast)
              </p>
              <p className="text-sm">
                Bloodline bondages require sustained warfare. The 7-day fast (biblical completion) 
                provides time to systematically address each family pattern.
              </p>
            </Card>

            <Card className="p-6 border-primary/20 shadow-elevated">
              <h3 className="font-semibold mb-3">Witchcraft & Occult</h3>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Recommended:</strong> 7-21 day water fast (with breaks)
              </p>
              <p className="text-sm">
                High-level demonic covenants need extended fasting. Daniel's 21-day fast broke 
                territorial princes—your case may require similar duration.
              </p>
            </Card>

            <Card className="p-6 border-primary/20 shadow-elevated">
              <h3 className="font-semibold mb-3">Chronic Disease (Spiritual Root)</h3>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Recommended:</strong> 3-5 day water fast
              </p>
              <p className="text-sm">
                Spirits of infirmity often break during fasting as your body detoxes and spiritual 
                authority increases. Pray specifically for healing daily.
              </p>
            </Card>

            <Card className="p-6 border-primary/20 shadow-elevated">
              <h3 className="font-semibold mb-3">Financial Curses & Poverty</h3>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Recommended:</strong> 21-day partial fast
              </p>
              <p className="text-sm">
                Fasting demonstrates you trust God more than provision. Combined with tithes and 
                offerings, it breaks Mammon's grip and releases blessing.
              </p>
            </Card>

            <Card className="p-6 border-primary/20 shadow-elevated">
              <h3 className="font-semibold mb-3">Addiction (Drugs, Alcohol, Porn)</h3>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Recommended:</strong> 3-day water fast, repeat monthly
              </p>
              <p className="text-sm">
                Addictions are body-soul bondages. Regular fasting retrains your flesh to submit to 
                your spirit. Expect strong cravings—this is the demon fighting back.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="max-w-4xl mx-auto p-6 border-primary/20 shadow-elevated">
          <h2 className="font-serif text-2xl font-bold mb-4 text-center">Ready to Add Fasting to Your Arsenal?</h2>
          <p className="text-center text-muted-foreground mb-6">
            Fasting isn't optional for serious spiritual warfare—it's essential. When demons won't budge, 
            it's time to fast and pray.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-spiritual shadow-elevated">
              <Link to="/prayers">View Deliverance Prayers</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30">
              <Link to="/staying-free">Post-Deliverance Guide</Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default FastingGuide;
