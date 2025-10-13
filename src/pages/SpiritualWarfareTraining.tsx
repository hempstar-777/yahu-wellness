import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Shield, Sword, Zap, Clock, Target, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const SpiritualWarfareTraining = () => {
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
              <h1 className="font-serif text-2xl md:text-3xl font-bold">Daily Spiritual Warfare Training</h1>
              <p className="text-sm text-muted-foreground">Practical strategies for living in victory</p>
            </div>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 bg-gradient-spiritual border-primary/30 shadow-glow">
          <Shield className="w-12 h-12 text-primary-foreground mb-4" />
          <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">You're in a War—Fight Like It</h2>
          <div className="space-y-4 text-primary-foreground/90">
            <p className="text-lg">
              <strong>Ephesians 6:12:</strong> "For we do not wrestle against flesh and blood, but against 
              principalities, against powers, against the rulers of the darkness of this age, against spiritual 
              hosts of wickedness in the heavenly places."
            </p>
            <p>
              Deliverance gets you free, but staying free requires daily spiritual warfare. The enemy doesn't 
              quit just because you got delivered—he looks for openings to return. This training equips you 
              with practical, battle-tested strategies to walk in daily victory.
            </p>
            <p className="font-semibold">
              You're not a victim. You're a warrior. Act like it.
            </p>
          </div>
        </Card>
      </section>

      {/* Morning Warfare Routine */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl font-bold text-center mb-8">Your Morning Warfare Routine (Non-Negotiable)</h2>
          
          <Card className="p-6 md:p-8 border-primary/20 shadow-elevated">
            <Clock className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-serif text-2xl font-semibold mb-4">Win the Morning, Win the Day</h3>
            
            <div className="space-y-6">
              <div className="bg-muted/30 p-5 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                  Wake Up & Declare Allegiance (30 seconds)
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Before your feet hit the floor, speak this out loud:
                </p>
                <div className="bg-background/50 p-4 rounded border border-border/30">
                  <p className="text-sm font-mono">
                    "Yahuah, this day belongs to You. I surrender my will, my plans, and my agenda. 
                    I choose to walk in Your Spirit today. I am Yours. You are mine. I will not be moved."
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 p-5 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                  Put On the Armor of God (2-3 minutes)
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Ephesians 6:10-18 - Declare each piece audibly as you get dressed:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="bg-background/50 p-3 rounded">
                    <strong>Belt of Truth:</strong> "I choose truth today. I reject lies, deception, and compromise. 
                    The Word of Yahuah is my standard."
                  </div>
                  <div className="bg-background/50 p-3 rounded">
                    <strong>Breastplate of Righteousness:</strong> "I walk in the righteousness of Yahusha. 
                    My heart is protected by His holiness. I will not entertain sin."
                  </div>
                  <div className="bg-background/50 p-3 rounded">
                    <strong>Shoes of Peace:</strong> "I stand firm in the Gospel. I will not be shaken. 
                    I carry peace wherever I go."
                  </div>
                  <div className="bg-background/50 p-3 rounded">
                    <strong>Shield of Faith:</strong> "I raise my shield against every lie, fear, and attack. 
                    I believe Yahuah's Word over my circumstances."
                  </div>
                  <div className="bg-background/50 p-3 rounded">
                    <strong>Helmet of Salvation:</strong> "I guard my mind. I take every thought captive. 
                    My identity is secure in Yahusha."
                  </div>
                  <div className="bg-background/50 p-3 rounded">
                    <strong>Sword of the Spirit:</strong> "The Word of God is my weapon. I wield it against 
                    every enemy. Yahusha is Lord."
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-5 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
                  Plead the Blood (1 minute)
                </h4>
                <div className="bg-background/50 p-4 rounded border border-border/30">
                  <p className="text-sm font-mono">
                    "I plead and apply the Blood of Yahusha Ha Mashiach over my spirit, soul, and body. 
                    I plead the Blood over my family, my home, my finances, and my day. 
                    By the Blood, I cancel every demonic assignment. 
                    By the Blood, I am protected, victorious, and free. 
                    No weapon formed against me shall prosper."
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 p-5 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">4</span>
                  Pre-Emptive Strike (1-2 minutes)
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Don't wait for attack—strike first:
                </p>
                <div className="bg-background/50 p-4 rounded border border-border/30">
                  <p className="text-sm font-mono">
                    "I bind every spirit assigned against me today—spirits of distraction, confusion, fear, 
                    lust, anger, discouragement, and delay. You have no access to me or my family. 
                    I command you to be silent and powerless in the name of Yahusha Ha Mashiach. 
                    I release angels to guard me and war on my behalf. 
                    I declare this day is under Yahuah's authority. Amen."
                  </p>
                </div>
              </div>

              <div className="bg-accent/30 p-5 rounded-lg border border-accent/30">
                <p className="text-sm">
                  <strong>Total Time Investment:</strong> 5-7 minutes.<br/>
                  <strong>Return on Investment:</strong> A victorious day instead of a defeated one.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Throughout the Day */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl font-bold text-center mb-8">Throughout the Day: Combat Tactics</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-primary/20 shadow-elevated">
              <Target className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-serif text-xl font-semibold mb-3">When Attacked by Intrusive Thoughts</h3>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Recognize them immediately—if the thought contradicts Scripture, it's demonic.
                </p>
                <div className="bg-accent/30 p-3 rounded">
                  <strong>Instant Counter:</strong>
                  <p className="mt-2">"I reject that thought in Yahusha's name. I take that thought captive 
                  and make it obedient to Christ. Get out."</p>
                </div>
                <p>Don't debate the thought—cast it out and replace it with Scripture.</p>
              </div>
            </Card>

            <Card className="p-6 border-primary/20 shadow-elevated">
              <Zap className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-serif text-xl font-semibold mb-3">When Temptation Hits</h3>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Don't entertain it for one second. The longer you think about sin, the stronger it gets.
                </p>
                <div className="bg-accent/30 p-3 rounded">
                  <strong>Battle Strategy:</strong>
                  <ol className="mt-2 space-y-1 list-decimal list-inside">
                    <li>Quote Scripture out loud (resist the devil - James 4:7)</li>
                    <li>Physically remove yourself from the situation</li>
                    <li>Call accountability partner immediately</li>
                    <li>Worship until the temptation breaks</li>
                  </ol>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-primary/20 shadow-elevated">
              <AlertTriangle className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-serif text-xl font-semibold mb-3">When Under Spiritual Attack</h3>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Signs: Sudden fear, oppression, heaviness, irrational anger, physical symptoms without cause
                </p>
                <div className="bg-accent/30 p-3 rounded">
                  <strong>Immediate Response:</strong>
                  <p className="mt-2">"Spirit of [name it - fear, oppression, etc.], you are exposed. 
                  I resist you in Yahusha's name. I plead the Blood. You must leave NOW. Angels, enforce this command."</p>
                </div>
                <p>Then worship, read Psalm 91, and don't give the attack any more attention.</p>
              </div>
            </Card>

            <Card className="p-6 border-primary/20 shadow-elevated">
              <Sword className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-serif text-xl font-semibold mb-3">Offensive Warfare</h3>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Don't just defend—attack enemy strongholds proactively.
                </p>
                <div className="bg-accent/30 p-3 rounded">
                  <strong>Daily Offensive:</strong>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Pray in tongues (if you have the gift)</li>
                    <li>Declare Scripture over your circumstances</li>
                    <li>Bind territorial spirits over your city</li>
                    <li>Intercede for others in bondage</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Evening Warfare */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 border-primary/20 shadow-elevated">
          <h2 className="font-serif text-2xl font-bold mb-6">Evening Warfare Routine: Secure Your Sleep</h2>
          
          <div className="space-y-6 text-sm">
            <p className="text-muted-foreground">
              Many spiritual attacks happen at night through dreams, nightmares, and sleep paralysis. 
              Don't go to bed unprotected.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted/30 p-5 rounded-lg">
                <h4 className="font-semibold mb-3">Before Bed Declaration:</h4>
                <div className="bg-background/50 p-4 rounded text-sm">
                  <p className="font-mono">
                    "I plead the Blood of Yahusha over my sleep tonight. I bind every spirit of nightmare, 
                    fear, and terror. I cancel every witchcraft assignment sent against my dreams. 
                    I command my sleep to be peaceful and guarded by angels. Holy Spirit, speak to me 
                    in dreams if You choose. But no demon has permission to torment me. 
                    I rest under the shadow of the Almighty. Amen."
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 p-5 rounded-lg">
                <h4 className="font-semibold mb-3">Cleanse Your Bedroom:</h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Remove any occult objects, statues, or questionable art</li>
                  <li>No TV shows or movies with demonic themes before bed</li>
                  <li>Play Bible audio or worship music softly overnight</li>
                  <li>Keep a Bible on your nightstand</li>
                  <li>Anoint doorposts with oil if led (Exodus 12 principle)</li>
                </ul>
              </div>
            </div>

            <div className="bg-accent/30 p-5 rounded-lg">
              <h4 className="font-semibold mb-3">If You Wake Up Under Attack:</h4>
              <ol className="space-y-2 list-decimal list-inside">
                <li>Speak the name "Yahusha" out loud—demons flee at His name</li>
                <li>Plead the Blood immediately</li>
                <li>Quote Psalm 91 or other memorized verses</li>
                <li>Turn on worship music</li>
                <li>Get up and pray if the attack persists</li>
              </ol>
            </div>
          </div>
        </Card>
      </section>

      {/* Weekly & Monthly Disciplines */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl font-bold text-center mb-8">Weekly & Monthly Warfare Disciplines</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-primary/20 shadow-elevated">
              <h3 className="font-semibold text-xl mb-4">Weekly (Choose at least 2):</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>24-hour fast:</strong> Sharpen your spiritual edge weekly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Extended prayer session:</strong> 1-2 hours of uninterrupted prayer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Assessment review:</strong> Check for any doors you've cracked open</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Confess to accountability:</strong> Don't let sin accumulate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Territorial warfare:</strong> Pray over your neighborhood/city</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-primary/20 shadow-elevated">
              <h3 className="font-semibold text-xl mb-4">Monthly (Non-Negotiable):</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>3-day fast:</strong> Major spiritual housecleaning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Full assessment retake:</strong> Identify any re-entry attempts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Courts of Heaven session:</strong> Present case, revoke legal grounds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Home cleansing:</strong> Pray through every room, anoint doorways</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Ministry to others:</strong> Use your freedom to help someone else get free</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Red Flags - When to Go Nuclear */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 border-destructive/30 bg-destructive/5">
          <h2 className="font-serif text-2xl font-bold mb-4 text-destructive">Red Flags: When to Go Nuclear with Warfare</h2>
          <p className="mb-4 text-sm">
            If you experience any of these, stop everything and enter intensive spiritual warfare mode:
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-background/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Spiritual</h4>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                <li>Can't pray or read Bible</li>
                <li>Blasphemous thoughts</li>
                <li>Hatred toward Yahuah</li>
                <li>Desire to quit faith</li>
              </ul>
            </div>
            <div className="bg-background/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Mental/Emotional</h4>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                <li>Suicidal thoughts</li>
                <li>Uncontrollable rage</li>
                <li>Paranoia or voices</li>
                <li>Severe depression</li>
              </ul>
            </div>
            <div className="bg-background/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Physical/Circumstantial</h4>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                <li>Sleep paralysis nightly</li>
                <li>Unexplained illnesses</li>
                <li>Series of "accidents"</li>
                <li>Financial collapse</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-background/50 p-5 rounded-lg">
            <h4 className="font-semibold mb-3 text-destructive">Nuclear Response Protocol:</h4>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li>Call mature believers for intercessory backup</li>
              <li>Begin extended fasting (3-7 days minimum)</li>
              <li>Retake all assessments—find the open door</li>
              <li>Pray through Courts of Heaven for verdicts</li>
              <li>Bind and cast out specific spirits daily</li>
              <li>Stay in worship and Scripture 24/7 if needed</li>
              <li>Don't quit until breakthrough comes</li>
            </ol>
          </div>
        </Card>
      </section>

      {/* Final Encouragement */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 bg-gradient-divine border-primary/30">
          <h2 className="font-serif text-2xl font-bold mb-4 text-primary-foreground text-center">You Were Made for This</h2>
          <div className="space-y-4 text-primary-foreground/90 text-center">
            <p>
              Spiritual warfare isn't for the weak—it's for warriors who understand their identity in Yahusha. 
              You have the same Spirit that raised Yahusha from the dead living inside you.
            </p>
            <p className="text-lg font-semibold">
              Greater is He who is in you than he who is in the world. (1 John 4:4)
            </p>
            <p>
              The demons know your authority—do you? Stop living defensively. You're not trying to survive, 
              you're called to dominate. Walk in your authority. Enforce heaven's victories. 
              Make hell regret the day it messed with you.
            </p>
            <p className="text-xl font-bold">
              Now go fight like you're already victorious—because you are.
            </p>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10">
              <Link to="/fasting-guide">Fasting Guide</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10">
              <Link to="/prayers">Prayer Arsenal</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10">
              <Link to="/staying-free">Staying Free</Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default SpiritualWarfareTraining;
