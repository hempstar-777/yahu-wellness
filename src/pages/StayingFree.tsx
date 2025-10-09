import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Home, Shield, Book, Users, AlertTriangle, Flame, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

const StayingFree = () => {
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
              <h1 className="font-serif text-2xl md:text-3xl font-bold">Staying Free After Deliverance</h1>
              <p className="text-sm text-muted-foreground">Maintaining your freedom and preventing re-entry</p>
            </div>
          </div>
        </div>
      </header>

      {/* Critical Warning */}
      <section className="container mx-auto px-4 py-8">
        <Alert className="max-w-4xl mx-auto border-destructive/50 bg-destructive/10">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <AlertDescription className="leading-relaxed">
            <strong className="text-destructive">Matthew 12:43-45 Warning:</strong> When an unclean spirit goes out of a man, 
            it passes through waterless places seeking rest, but finds none. Then it says, 'I will return to my house from which I came.' 
            And when it comes, it finds the house empty, swept, and put in order. Then it goes and brings with it seven other spirits 
            more evil than itself, and they enter and dwell there, and <strong>the last state of that person is worse than the first.</strong>
          </AlertDescription>
        </Alert>
      </section>

      {/* The Empty House Problem */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 bg-gradient-spiritual border-primary/30 shadow-glow">
          <div className="space-y-4">
            <Home className="w-12 h-12 text-primary-foreground" />
            <h2 className="font-serif text-3xl font-bold text-primary-foreground">Don't Leave Your House Empty!</h2>
            <p className="text-primary-foreground/90 leading-relaxed">
              Deliverance removes demons, but it leaves a void. If you don't fill that void with the Ruach HaKodesh (Holy Spirit), 
              demons will return with reinforcements. This is not optional—it's the difference between freedom and worse bondage.
            </p>
            <div className="bg-primary-foreground/10 rounded-lg p-4 border border-primary-foreground/20">
              <h3 className="font-semibold text-primary-foreground mb-2">Immediately After Deliverance:</h3>
              <pre className="whitespace-pre-wrap font-sans text-sm text-primary-foreground/90">
{`Father Yahuah, I invite Your Ruach HaKodesh to fill every place that was occupied by demons.

Fill my mind, my will, my emotions, my body, my spirit—fill every room of my house.

I surrender these areas to You completely. Take full ownership.

Ruach HaKodesh, make Your home in me. Seal me, guard me, and keep me from evil.

I receive Your love, Your peace, Your joy, Your power.

Thank you for filling me to overflowing with Your presence.`}
              </pre>
            </div>
          </div>
        </Card>
      </section>

      {/* Daily Spiritual Disciplines */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl font-bold text-center mb-8">Daily Spiritual Disciplines</h2>
          
          <Card className="p-6 border-primary/20 shadow-elevated">
            <div className="flex items-start gap-4">
              <Book className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-semibold">1. Daily Bible Reading (Non-Negotiable)</h3>
                <p className="text-muted-foreground">
                  Demons return when the Word of Yahuah is not present. Read Scripture out loud daily—it's your spiritual food and weapon.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Minimum:</strong> 1 chapter per day (Psalms, Proverbs, New Testament)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Ideal:</strong> 30-60 minutes of reading and meditation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Power move:</strong> Memorize verses that specifically counter your past bondages</span>
                  </li>
                </ul>
                <div className="bg-accent/50 rounded p-3 text-sm">
                  <strong>Key verses to memorize:</strong> Psalm 23, Psalm 91, Ephesians 6:10-18, Romans 8:1-2, 1 John 4:4
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-primary/20 shadow-elevated">
            <div className="flex items-start gap-4">
              <Flame className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-semibold">2. Prayer & Worship</h3>
                <p className="text-muted-foreground">
                  Maintain intimate communication with Yahuah. Demons flee from sustained worship and prayer.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Morning:</strong> Put on spiritual armor (Ephesians 6) and dedicate the day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Throughout day:</strong> Practice His presence—talk to Him constantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Worship:</strong> Play anointed worship music in your home daily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Evening:</strong> Review the day, confess any sin, thank Him for victories</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-primary/20 shadow-elevated">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-semibold">3. Guard Your Gates (Eyes, Ears, Mind)</h3>
                <p className="text-muted-foreground">
                  Demons re-enter through the same gates they used before. Close and guard every entrance.
                </p>
                <div className="space-y-4 text-sm">
                  <div className="bg-muted/30 rounded p-3">
                    <strong className="text-foreground">Eyes:</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• No pornography, horror movies, or occult content</li>
                      <li>• Unfollow social media accounts that trigger temptation</li>
                      <li>• Install accountability software if needed</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded p-3">
                    <strong className="text-foreground">Ears:</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• Delete music with demonic themes, profanity, or sexual content</li>
                      <li>• Be selective about podcasts and teaching (test everything)</li>
                      <li>• Listen to Scripture audio, worship, and anointed teachings</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded p-3">
                    <strong className="text-foreground">Mind:</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• Take every thought captive (2 Corinthians 10:5)</li>
                      <li>• Reject intrusive thoughts immediately—don't entertain them</li>
                      <li>• Renew your mind daily with Scripture (Romans 12:2)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-primary/20 shadow-elevated">
            <div className="flex items-start gap-4">
              <Users className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-semibold">4. Biblical Community & Accountability</h3>
                <p className="text-muted-foreground">
                  Lone sheep get picked off by wolves. You need spiritual family to stay strong.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Find a Bible-believing fellowship</strong> that preaches the full gospel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Get an accountability partner</strong>—someone you can confess struggles to</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Avoid toxic relationships</strong> that pull you back into old patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Serve others</strong>—use your freedom to help set others free</span>
                  </li>
                </ul>
                <div className="bg-accent/50 rounded p-3 text-sm">
                  <strong>James 5:16:</strong> "Confess your sins to one another and pray for one another, that you may be healed."
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-primary/20 shadow-elevated">
            <div className="flex items-start gap-4">
              <Heart className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-semibold">5. Walk in Love & Forgiveness</h3>
                <p className="text-muted-foreground">
                  Unforgiveness and bitterness reopen doors. Keep short accounts with Yahuah and people.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Daily forgiveness:</strong> Release anyone who offends you immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Confess sin quickly:</strong> Don't let sin accumulate—repent immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Love your enemies:</strong> Pray for those who persecute you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Walk in humility:</strong> Pride opens the door to every demon</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Warning Signs of Re-Entry */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 border-destructive/30 bg-destructive/5">
          <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-4 text-destructive">Warning Signs of Demonic Re-Entry</h2>
          <p className="text-muted-foreground mb-4">
            If you notice these symptoms returning, demons may be attempting re-entry. Address immediately!
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold">Mental/Emotional:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Intrusive thoughts returning</li>
                <li>• Anxiety, depression, or fear patterns</li>
                <li>• Sudden rage or uncontrollable anger</li>
                <li>• Suicidal thoughts reappearing</li>
                <li>• Obsessive thoughts</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Spiritual:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Bible reading feels impossible</li>
                <li>• Prayer feels blocked</li>
                <li>• Old temptations intensifying</li>
                <li>• Blasphemous thoughts</li>
                <li>• Desire to return to old sins</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Physical:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Unexplained pain returning</li>
                <li>• Sleep disturbances</li>
                <li>• Nightmares restarting</li>
                <li>• Fatigue without cause</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Behavioral:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Avoiding prayer/Bible</li>
                <li>• Isolating from believers</li>
                <li>• Returning to old places/people</li>
                <li>• Justifying sin</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 bg-background/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-destructive">What to Do Immediately:</h4>
            <ol className="space-y-1 text-sm text-muted-foreground">
              <li>1. Confess any sin that may have opened the door</li>
              <li>2. Repent and close the door with the blood of Yahusha</li>
              <li>3. Rebuke the spirits attempting re-entry</li>
              <li>4. Fill with the Ruach HaKodesh again</li>
              <li>5. Increase prayer, fasting, and Bible reading</li>
              <li>6. Get support from mature believers</li>
            </ol>
          </div>
        </Card>
      </section>

      {/* The Power of Testimony */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 bg-primary/5 border-primary/30">
          <h2 className="font-serif text-2xl font-bold mb-4">The Power of Your Testimony</h2>
          <p className="text-muted-foreground mb-4">
            <strong>Revelation 12:11:</strong> "They overcame him by the blood of the Lamb and by the word of their testimony."
          </p>
          <p className="text-muted-foreground mb-4">
            Your testimony has power. When you share how Yahusha set you free, it:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Strengthens your own faith and reminds you of His faithfulness</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Gives hope to others still in bondage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Defeats the accuser (Satan) who tries to shame you</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Glorifies Yahuah and advances His kingdom</span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Don't hide your freedom. Share it wisely with those who need it. You are living proof that Yahusha Ha Mashiach still sets captives free!
          </p>
        </Card>
      </section>

      {/* Action Buttons */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="max-w-4xl mx-auto p-6 border-primary/20 shadow-elevated">
          <h3 className="font-serif text-xl font-semibold mb-4 text-center">Continue Your Journey</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-spiritual shadow-elevated">
              <Link to="/resources">Explore Resources</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30">
              <Link to="/teachings">Spiritual Teachings</Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default StayingFree;
