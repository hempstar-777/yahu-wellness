import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Copy, Heart, Users, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ExpandedPrayers = () => {
  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${name} copied to clipboard!`);
  };

  const forgivenessHealing = `Father Yahuah, I come before You in the name of Yahusha Ha Mashiach.

I choose to forgive [NAME OF PERSON] for [SPECIFIC OFFENSE].
I release them from my judgment and place them into Your hands.
I break all soul ties, ungodly bonds, and emotional entanglements with [NAME].

I renounce all bitterness, resentment, hatred, revenge, and unforgiveness.
I bind every spirit that entered through this wound and command you to leave now.

Father, I ask You to heal the wounds in my soul caused by this trauma.
I invite Yahusha to come into this memory and bring His healing light.
I receive Your love, comfort, and restoration.

Thank You for setting me free from the prison of unforgiveness.
I choose to walk in love and extend the mercy I have received. Amen.`;

  const bloodlineConfession = `Father Yahuah, I stand in the gap for my bloodline as a representative of my family.

I confess and repent for the sins of my ancestors going back to the beginning:
- Sexual immorality, adultery, fornication, perversion, incest, and all sexual sin
- Idolatry, witchcraft, divination, sorcery, and occult practices
- Murder, violence, abuse, and bloodshed
- Theft, fraud, dishonesty, and covenant breaking
- Pride, rebellion, and disobedience to Your commands
- Bitterness, unforgiveness, and hatred
- [ADD SPECIFIC KNOWN FAMILY SINS]

I break agreement with these iniquities and their consequences.
I renounce every generational curse, covenant, and dedication made to false gods.

By the Blood of Yahusha Ha Mashiach, I declare these bloodlines cleansed.
I cancel every demonic assignment passed down through my family line.
I command every generational spirit to loose my family and depart now.

I declare my family line is now under the New Covenant.
The curse is broken. The blessing is released.
I receive generational blessings and breakthrough for my children and descendants.

Thank You, Father, for the Blood that speaks better than Abel's blood. Amen.`;

  const courtsOfHeaven = `Father Yahuah, I enter Your Courts as the Judge of all the earth.
I come clothed in the righteousness of Yahusha Ha Mashiach.

I bring before You the accusations of the adversary against me:
[LIST SPECIFIC AREAS WHERE YOU EXPERIENCE OPPRESSION, BLOCKAGE, OR ATTACK]

I present the Blood of Yahusha as my defense against every charge.
The Blood declares: "Paid in Full."

I ask You to:
- Seal the books of my sin with the Blood
- Blot out all records of iniquity
- Open the books of my destiny
- Revoke all legal rights the enemy has claimed
- Issue verdicts of freedom, healing, breakthrough, and restoration

I receive Your favorable judgments now.
I ask that angels be commissioned to enforce these verdicts on earth.
I declare every demonic assignment is legally cancelled.

As a royal priest with authority, I now enforce heaven's verdict:
All spirits operating under revoked legal grounds must leave immediately.
You have no legal right, no access, and no authority.

I stand in agreement with heaven's ruling. It is finished. Amen.`;

  const innerHealing = `Yahusha Ha Mashiach, I invite You into the deepest places of my heart.

I specifically ask You to come into these areas of wounding:
[LIST TRAUMATIC MEMORIES, PAINFUL EXPERIENCES, LOSSES]

I acknowledge the pain, the fear, the shame, and the grief.
I give You permission to heal these broken places in my soul.

Where I believed lies because of trauma, speak Your truth to me now:
- "I am worthless" → You say I am precious and loved
- "I am abandoned" → You say You will never leave me
- "I am dirty" → You say I am washed clean by Your Blood
- "I am powerless" → You say I have authority in Your name
[ADD YOUR SPECIFIC LIES AND TRUTHS]

I break every victim agreement I made through trauma.
Even though it wasn't consensual, I take back the ground given to the enemy.
I renounce self-hatred, self-harm, self-sabotage, and self-rejection.

Holy Spirit, fill these healed places with Your presence.
Restore my soul like waters of refreshing.
Make me whole in spirit, soul, and body.

I receive Your healing now. Thank You, Yahusha. Amen.`;

  const newCovenant = `Father Yahuah, I thank You for the New Covenant established through Yahusha's Blood.

I renounce and break every covenant not made with You:
- Blood covenants with demonic powers
- Soul ties with past sexual partners
- Dedications made to false gods
- Oaths and vows made in ignorance
- Fraternal or occult organization commitments
- Witchcraft covenants and hexes
[ADD SPECIFIC COVENANTS YOU KNOW ABOUT]

I declare these covenants are null and void by the superior Blood of Yahusha.
I am under the New Covenant ONLY.

I renew my covenant with You today:
- You are my God, I am Your child
- I belong to Yahusha, purchased by His Blood
- I am sealed by the Holy Spirit
- I am in covenant with the Body of Christ

Release the covenant blessings over my life:
Protection, provision, peace, power, and purpose.
Let the Enemy see the mark of Your covenant on me and flee.

I walk in covenant relationship with You all my days. Amen.`;

  const warfare = `Father Yahuah, I take my stand in the heavenly places with Christ.

I declare that I am seated with Yahusha far above all principalities and powers.
Greater is He who is in me than he who is in the world.

I put on the full armor of God:
- Belt of Truth: I declare the Word of God over my life
- Breastplate of Righteousness: I walk in holiness and integrity
- Shoes of Peace: I stand firm in the Gospel
- Shield of Faith: I quench every fiery dart with unwavering belief
- Helmet of Salvation: I guard my mind with the knowledge of Christ
- Sword of the Spirit: I wield the Word offensively

I plead the Blood of Yahusha over:
- My spirit, soul, and body
- My family and home
- My finances and resources
- My relationships and ministry
- My thoughts, words, and actions

I bind and cast out:
Every spirit of [FEAR, DOUBT, CONFUSION, OPPRESSION, AFFLICTION, etc.]
Every assignment of witchcraft, hex, curse, or evil prayer
Every territorial spirit assigned to my region
Every generational spirit operating in my family

I cancel every demonic decree and reverse every curse.
No weapon formed against me shall prosper.
Every tongue that rises in judgment, I condemn.

I declare the victory of Yahusha over every enemy.
I am more than a conqueror through Christ who loves me.
I walk in dominion and authority today. Amen.`;

  return (
    <div className="min-h-screen bg-gradient-light">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/prayers">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold">Expanded Prayer Library</h1>
              <p className="text-sm text-muted-foreground">Comprehensive prayers for deep transformation</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="forgiveness" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 gap-2 h-auto p-2 bg-muted/50">
            <TabsTrigger value="forgiveness" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Forgiveness & Healing</span>
              <span className="sm:hidden">Forgiveness</span>
            </TabsTrigger>
            <TabsTrigger value="bloodline" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Bloodline Confession</span>
              <span className="sm:hidden">Bloodline</span>
            </TabsTrigger>
            <TabsTrigger value="courts" className="flex items-center gap-2">
              <Scale className="w-4 h-4" />
              <span className="hidden sm:inline">Courts of Heaven</span>
              <span className="sm:hidden">Courts</span>
            </TabsTrigger>
          </TabsList>

          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 gap-2 h-auto p-2 bg-muted/50 mt-2">
            <TabsTrigger value="inner" className="flex items-center gap-2">
              Inner Healing
            </TabsTrigger>
            <TabsTrigger value="covenant" className="flex items-center gap-2">
              New Covenant
            </TabsTrigger>
            <TabsTrigger value="warfare" className="flex items-center gap-2">
              Daily Warfare
            </TabsTrigger>
          </TabsList>

          {/* Forgiveness & Healing */}
          <TabsContent value="forgiveness" className="mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-3xl font-bold mb-2">Forgiveness & Soul Healing Prayer</h2>
                    <p className="text-muted-foreground">
                      Release offenders and receive deep healing for trauma wounds
                    </p>
                  </div>
                  <Button 
                    onClick={() => copyToClipboard(forgivenessHealing, "Forgiveness Prayer")} 
                    size="sm" 
                    variant="outline"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 border border-border/30">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                    {forgivenessHealing}
                  </pre>
                </div>

                <div className="bg-accent/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">When to Use:</h3>
                  <ul className="space-y-1 text-sm text-foreground/80 list-disc list-inside">
                    <li>When holding unforgiveness toward someone who hurt you</li>
                    <li>After identifying trauma wounds in assessment</li>
                    <li>When experiencing recurring painful memories</li>
                    <li>As part of breaking soul ties with past relationships</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Bloodline Confession */}
          <TabsContent value="bloodline" className="mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-3xl font-bold mb-2">Bloodline/Generational Confession</h2>
                    <p className="text-muted-foreground">
                      Stand in the gap for ancestral sins and break generational curses
                    </p>
                  </div>
                  <Button 
                    onClick={() => copyToClipboard(bloodlineConfession, "Bloodline Prayer")} 
                    size="sm" 
                    variant="outline"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 border border-border/30">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                    {bloodlineConfession}
                  </pre>
                </div>

                <div className="bg-accent/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">When to Use:</h3>
                  <ul className="space-y-1 text-sm text-foreground/80 list-disc list-inside">
                    <li>After completing the Generational Assessment</li>
                    <li>When patterns repeat across family generations</li>
                    <li>When facing stubborn strongholds resistant to deliverance</li>
                    <li>As part of comprehensive freedom process</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Courts of Heaven */}
          <TabsContent value="courts" className="mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-3xl font-bold mb-2">Courts of Heaven Access Prayer</h2>
                    <p className="text-muted-foreground">
                      Present your case before the Judge and receive divine verdicts
                    </p>
                  </div>
                  <Button 
                    onClick={() => copyToClipboard(courtsOfHeaven, "Courts Prayer")} 
                    size="sm" 
                    variant="outline"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 border border-border/30">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                    {courtsOfHeaven}
                  </pre>
                </div>

                <div className="bg-accent/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">When to Use:</h3>
                  <ul className="space-y-1 text-sm text-foreground/80 list-disc list-inside">
                    <li>When facing persistent blockages despite deliverance</li>
                    <li>Before engaging in major spiritual warfare</li>
                    <li>When dealing with curses or witchcraft attacks</li>
                    <li>To establish legal freedom in heaven's courts first</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Inner Healing */}
          <TabsContent value="inner" className="mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-3xl font-bold mb-2">Inner Healing Prayer</h2>
                    <p className="text-muted-foreground">
                      Invite Yahusha into painful memories for deep soul restoration
                    </p>
                  </div>
                  <Button 
                    onClick={() => copyToClipboard(innerHealing, "Inner Healing Prayer")} 
                    size="sm" 
                    variant="outline"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 border border-border/30">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                    {innerHealing}
                  </pre>
                </div>

                <div className="bg-accent/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">When to Use:</h3>
                  <ul className="space-y-1 text-sm text-foreground/80 list-disc list-inside">
                    <li>After completing the Trauma Assessment</li>
                    <li>When memories trigger emotional pain</li>
                    <li>As part of breaking victim agreements</li>
                    <li>In conjunction with forgiveness prayers</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* New Covenant */}
          <TabsContent value="covenant" className="mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-3xl font-bold mb-2">New Covenant Declaration</h2>
                    <p className="text-muted-foreground">
                      Break ungodly covenants and establish covenant relationship with Yahuah
                    </p>
                  </div>
                  <Button 
                    onClick={() => copyToClipboard(newCovenant, "New Covenant Prayer")} 
                    size="sm" 
                    variant="outline"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 border border-border/30">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                    {newCovenant}
                  </pre>
                </div>

                <div className="bg-accent/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">When to Use:</h3>
                  <ul className="space-y-1 text-sm text-foreground/80 list-disc list-inside">
                    <li>When renouncing occult or fraternal organization involvement</li>
                    <li>To break soul ties with past relationships</li>
                    <li>After identifying covenant-based bondages</li>
                    <li>As foundational prayer before deliverance</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Daily Warfare */}
          <TabsContent value="warfare" className="mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-3xl font-bold mb-2">Daily Spiritual Warfare Prayer</h2>
                    <p className="text-muted-foreground">
                      Maintain your freedom through daily declaration and protection
                    </p>
                  </div>
                  <Button 
                    onClick={() => copyToClipboard(warfare, "Warfare Prayer")} 
                    size="sm" 
                    variant="outline"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 border border-border/30">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                    {warfare}
                  </pre>
                </div>

                <div className="bg-accent/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">When to Use:</h3>
                  <ul className="space-y-1 text-sm text-foreground/80 list-disc list-inside">
                    <li>Every morning to put on spiritual armor</li>
                    <li>When experiencing spiritual attack or oppression</li>
                    <li>Before important decisions or ministry</li>
                    <li>To maintain freedom after deliverance</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="max-w-5xl mx-auto mt-8 text-center">
          <Button asChild size="lg" className="bg-gradient-spiritual">
            <Link to="/prayers">Back to Core Prayers</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpandedPrayers;