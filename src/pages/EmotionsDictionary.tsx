import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChevronLeft, Heart, Brain, Sparkles, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const EmotionsDictionary = () => {
  const positiveEmotions = [
    {
      name: "Joy",
      spiritual: "Gift from the Holy Spirit (Galatians 5:22). Opens the heart to God's presence",
      mind: "Releases dopamine and serotonin, enhances cognitive function and creativity",
      body: "Strengthens immune system, improves cardiovascular health, reduces inflammation",
      soul: "Cultivates peace, gratitude, and connection with divine purpose",
      herbs: "St. John's Wort, Rhodiola, Ashwagandha for sustained positive mood",
      practice: "Gratitude journaling, worship, praise, thanksgiving prayers"
    },
    {
      name: "Peace",
      spiritual: "Fruit of the Spirit. Reflects God's shalom—wholeness and completeness",
      mind: "Reduces stress hormones, improves focus and decision-making clarity",
      body: "Lowers blood pressure, improves sleep quality, reduces muscle tension",
      soul: "Aligns will with God's will, brings rest from striving",
      herbs: "Chamomile, Lavender, Holy Basil, Passionflower for calming",
      practice: "Meditation on Scripture, deep breathing, Sabbath rest"
    },
    {
      name: "Love (Agape)",
      spiritual: "The essence of God's nature (1 John 4:8). Perfect love casts out fear",
      mind: "Activates reward centers, releases oxytocin, improves social bonding",
      body: "Heals emotional wounds, reduces inflammation, strengthens heart health",
      soul: "Foundation of all virtue, connects us to God and others",
      herbs: "Rose, Hawthorn berry, Motherwort for heart opening",
      practice: "Loving-kindness meditation, serving others, forgiveness work"
    },
    {
      name: "Gratitude",
      spiritual: "Enters God's gates with thanksgiving (Psalm 100:4)",
      mind: "Rewires brain for positivity, increases resilience and optimism",
      body: "Improves sleep, reduces pain perception, boosts immune function",
      soul: "Combats entitlement and pride, cultivates humility",
      herbs: "Tulsi (Holy Basil), Milky Oats for nervous system support",
      practice: "Daily gratitude lists, thanksgiving prayers, counting blessings"
    },
    {
      name: "Faith/Trust",
      spiritual: "Pleases God (Hebrews 11:6). Opens the door to miracles",
      mind: "Reduces anxiety, increases sense of security and hope",
      body: "Lowers cortisol levels, improves healing response",
      soul: "Anchors identity in God's promises, not circumstances",
      herbs: "Gotu Kola, Brahmi for clarity and spiritual connection",
      practice: "Declaring God's promises, testimony sharing, trust-building exercises"
    },
    {
      name: "Hope",
      spiritual: "Anchor for the soul (Hebrews 6:19). Expectation of God's goodness",
      mind: "Motivates goal-directed behavior, combats depression",
      body: "Improves vitality, energy levels, and longevity",
      soul: "Prevents despair, maintains vision for the future",
      herbs: "Lemon Balm, Damiana for uplifting spirit",
      practice: "Vision boarding, prophetic declarations, hope scriptures"
    },
    {
      name: "Contentment",
      spiritual: "Great gain when combined with godliness (1 Timothy 6:6)",
      mind: "Reduces comparison and envy, increases satisfaction",
      body: "Reduces stress-related illness, improves digestion",
      soul: "Breaks the spirit of poverty and lack, cultivates abundance mindset",
      herbs: "Oatstraw, Ashwagandha for grounding and satisfaction",
      practice: "Simplicity practices, fasting from media, celebrate small wins"
    },
    {
      name: "Compassion",
      spiritual: "Reflects Christ's heart. Moves God to action on behalf of others",
      mind: "Activates empathy centers, reduces self-centeredness",
      body: "Lowers inflammation, improves heart rate variability",
      soul: "Breaks hardness of heart, opens to God's love flow",
      herbs: "Rose, Hawthorn for heart softening",
      practice: "Intercessory prayer, acts of kindness, volunteer service"
    }
  ];

  const negativeEmotions = [
    {
      name: "Fear",
      spiritual: "Spirit of fear is not from God (2 Timothy 1:7). Opens door to torment and control spirits",
      mind: "Activates amygdala, impairs rational thinking, creates anxiety loops",
      body: "Weakens immune system, causes chronic stress response, digestive issues",
      soul: "Blocks faith, creates unbelief, leads to isolation and withdrawal",
      doorway: "Gives legal ground to spirits of fear, panic, anxiety, and phobias",
      parasites: "Chronic fear weakens gut health, creating environment for parasites",
      herbs: "Valerian Root, Skullcap, Kava Kava for calming nervous system",
      deliverance: "Renounce all fear, command spirit of fear to leave, receive spirit of power, love, sound mind"
    },
    {
      name: "Anger/Rage",
      spiritual: "Gives the devil a foothold (Ephesians 4:26-27). Opens door to violence and murder spirits",
      mind: "Releases cortisol and adrenaline, impairs judgment, creates reactivity",
      body: "Raises blood pressure, increases inflammation, damages cardiovascular system",
      soul: "Hardens heart, breaks relationships, leads to bitterness and unforgiveness",
      doorway: "Legal ground for spirits of rage, violence, murder, retaliation",
      parasites: "Inflammation from chronic anger creates breeding ground for pathogens",
      herbs: "Passionflower, Wood Betony, Chamomile for calming anger",
      deliverance: "Forgive offenders, renounce anger and rage, break spirit of violence"
    },
    {
      name: "Depression",
      spiritual: "Heavy spirit that oppresses (Isaiah 61:3). Blocks joy and hope",
      mind: "Depletes neurotransmitters, creates negative thought patterns, hopelessness",
      body: "Chronic fatigue, weight changes, weakened immune function, pain",
      soul: "Loss of vision and purpose, spiritual numbness, withdrawal from God",
      doorway: "Opens to spirits of hopelessness, despair, suicide, death",
      parasites: "Depression linked to gut parasites and bacterial imbalances",
      herbs: "St. John's Wort, Saffron, SAMe for mood support",
      deliverance: "Break agreement with hopelessness, receive garment of praise, cast out spirit of heaviness"
    },
    {
      name: "Shame/Guilt",
      spiritual: "Tool of the accuser (Revelation 12:10). Blocks receiving God's grace",
      mind: "Creates self-hatred, perfectionism, and toxic self-talk",
      body: "Hunched posture, low energy, autoimmune issues from self-attack",
      soul: "Prevents intimacy with God and others, creates hiding and performance",
      doorway: "Legal ground for condemnation, self-hatred, self-harm spirits",
      parasites: "Chronic stress from shame weakens immunity, allows infections",
      herbs: "Milky Oats, Tulsi, Rose for nervous system repair and self-love",
      deliverance: "Receive Jesus' finished work, break shame off bloodline, renounce self-condemnation"
    },
    {
      name: "Anxiety/Worry",
      spiritual: "Rooted in lack of trust in God's provision (Matthew 6:25-34)",
      mind: "Racing thoughts, inability to focus, catastrophic thinking",
      body: "Digestive problems, insomnia, headaches, muscle tension",
      soul: "Blocks peace, prevents rest, creates control and manipulation",
      doorway: "Opens to spirits of fear, control, insomnia, torment",
      parasites: "Anxiety depletes magnesium, creating environment for parasites",
      herbs: "Ashwagandha, Holy Basil, Lemon Balm for stress adaptation",
      deliverance: "Cast cares on Jesus, renounce worry, break spirit of anxiety"
    },
    {
      name: "Bitterness/Unforgiveness",
      spiritual: "Root that defiles (Hebrews 12:15). Blocks God's forgiveness of you",
      mind: "Creates resentment, revenge fantasies, rehearsal of offenses",
      body: "Chronic inflammation, autoimmune disease, cancer risk",
      soul: "Poisons relationships, hardens heart, blocks love",
      doorway: "Major legal ground for infirmity, hatred, revenge spirits",
      parasites: "Bitter root creates toxic internal environment for disease",
      herbs: "Milk Thistle (liver support), Dandelion root, Burdock for detox",
      deliverance: "Forgive from the heart, release judgment to God, break bitter root judgments"
    },
    {
      name: "Pride/Arrogance",
      spiritual: "God opposes the proud (James 4:6). Original sin of Lucifer",
      mind: "Superiority complex, inability to receive correction, blind spots",
      body: "Rigid posture, tension from maintaining image, stress",
      soul: "Blocks intimacy with God, prevents growth, leads to fall",
      doorway: "Opens to spirits of rebellion, independence, Jezebel, antichrist",
      parasites: "Pride creates spiritual blindness to physical health issues",
      herbs: "Humility herbs don't exist—must humble self before God",
      deliverance: "Repent of pride, humble self, break Leviathan spirit, receive grace"
    },
    {
      name: "Lust/Sexual Sin",
      spiritual: "Sins against own body (1 Corinthians 6:18). Joins to harlot spirits",
      mind: "Addictive thought patterns, objectification, obsession",
      body: "STDs, erectile dysfunction, hormonal imbalances, exhaustion",
      soul: "Creates soul ties with partners, fragments personality, shame cycles",
      doorway: "Major doorway for perversion, porn, incubus/succubus spirits",
      parasites: "Sexual sin linked to candida, parasites in reproductive system",
      herbs: "Saw Palmetto, Chaste Tree berry for hormonal balance",
      deliverance: "Renounce all sexual sin, break soul ties, cast out lust and perversion"
    },
    {
      name: "Jealousy/Envy",
      spiritual: "Rottenness to the bones (Proverbs 14:30). Witchcraft root",
      mind: "Comparison trap, covetousness, never satisfied",
      body: "Bone diseases, arthritis, weakened skeletal system",
      soul: "Blocks contentment, creates competition, destroys community",
      doorway: "Opens to spirits of witchcraft, control, manipulation",
      parasites: "Envy creates acidic environment for bone parasites",
      herbs: "Nettles for bone health, Alfalfa for mineral support",
      deliverance: "Repent of jealousy, bless those envied, break witchcraft assignment"
    },
    {
      name: "Rejection",
      spiritual: "Orphan spirit—blocks knowing God as Father",
      mind: "Fear of abandonment, people-pleasing, performance mentality",
      body: "Autoimmune issues (body rejects self), chronic fatigue",
      soul: "Prevents receiving love, creates false identity, self-sabotage",
      doorway: "Legal ground for abandonment, loneliness, isolation spirits",
      parasites: "Rejection trauma linked to autoimmune and gut issues",
      herbs: "Rose, Motherwort for heart healing, Tulsi for self-acceptance",
      deliverance: "Receive Father's love, break orphan spirit, heal rejection wounds"
    },
    {
      name: "Grief/Sorrow",
      spiritual: "Valid emotion but can become a stronghold if prolonged",
      mind: "Memory loops, inability to move forward, despair",
      body: "Weakened immune system, heart problems, fatigue",
      soul: "Can open to death wishes, withdrawal from life",
      doorway: "If unprocessed, opens to spirits of death, hopelessness",
      parasites: "Prolonged grief depletes vital force, lowers immunity",
      herbs: "Hawthorn for broken heart, Rose for grief processing",
      deliverance: "Process grief healthily, reject spirit of death, receive comfort from Holy Spirit"
    },
    {
      name: "Victim Mentality",
      spiritual: "Blocks taking responsibility, prevents breakthrough",
      mind: "Learned helplessness, blaming others, powerlessness",
      body: "Chronic illness patterns, pain syndromes, weakness",
      soul: "Prevents growth, attracts abuse, creates dependency",
      doorway: "Opens to spirits of self-pity, infirmity, poverty",
      parasites: "Victim mentality linked to chronic fatigue and parasites",
      herbs: "Eleuthero, Rhodiola for empowerment and resilience",
      deliverance: "Renounce victim mentality, take authority, break poverty spirit"
    }
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
              <h1 className="font-serif text-2xl md:text-3xl font-bold">Emotions & Spiritual Health Dictionary</h1>
              <p className="text-sm text-muted-foreground">Understanding the mind-body-soul-spirit connection</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <Card className="max-w-6xl mx-auto mb-8 p-6 md:p-8 border-primary/20 shadow-elevated">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold">How Emotions Affect Your Whole Being</h2>
            <p className="text-foreground/80 leading-relaxed">
              Every emotion has a spiritual root, mental effect, physical manifestation, and impact on your soul. 
              This comprehensive guide helps you understand the complete picture of emotional and spiritual health, 
              including natural remedies and deliverance strategies.
            </p>
            <div className="grid md:grid-cols-4 gap-4 mt-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold text-sm">Spiritual</p>
                  <p className="text-xs text-muted-foreground">Root cause and spiritual dynamics</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold text-sm">Mental</p>
                  <p className="text-xs text-muted-foreground">Mind and thought patterns</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold text-sm">Physical</p>
                  <p className="text-xs text-muted-foreground">Body and health effects</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Leaf className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold text-sm">Natural</p>
                  <p className="text-xs text-muted-foreground">Herbs and remedies</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="positive" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 h-auto p-2 bg-muted/50">
            <TabsTrigger value="positive" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Positive Emotions
            </TabsTrigger>
            <TabsTrigger value="negative" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Negative Emotions
            </TabsTrigger>
          </TabsList>

          {/* Positive Emotions */}
          <TabsContent value="positive" className="space-y-6 mt-6">
            <div className="grid gap-6">
              {positiveEmotions.map((emotion, index) => (
                <Card key={index} className="border-primary/20 shadow-sm hover:shadow-elevated transition-shadow">
                  <CardHeader className="bg-gradient-spiritual text-primary-foreground">
                    <CardTitle className="text-2xl">{emotion.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-accent/20">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Spiritual
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/80">{emotion.spiritual}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-accent/20">
                            <Brain className="w-3 h-3 mr-1" />
                            Mental
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/80">{emotion.mind}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-accent/20">
                            <Heart className="w-3 h-3 mr-1" />
                            Physical
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/80">{emotion.body}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-accent/20">
                            Soul
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/80">{emotion.soul}</p>
                      </div>
                    </div>

                    <div className="border-t border-border/50 pt-4 space-y-3">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Leaf className="w-4 h-4 text-primary" />
                          Natural Support:
                        </p>
                        <p className="text-sm text-foreground/80">{emotion.herbs}</p>
                      </div>
                      
                      <div className="bg-accent/20 p-4 rounded-lg">
                        <p className="font-semibold text-sm mb-2">Spiritual Practice:</p>
                        <p className="text-sm text-foreground/80">{emotion.practice}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Negative Emotions */}
          <TabsContent value="negative" className="space-y-6 mt-6">
            <Card className="p-6 border-destructive/30 bg-destructive/5">
              <p className="text-sm text-foreground/80">
                <strong>⚠️ Important:</strong> Negative emotions can open spiritual doorways and affect physical health. 
                Understanding the complete picture—spiritual root, mental pattern, physical symptom, and deliverance strategy—is 
                essential for complete freedom.
              </p>
            </Card>

            <div className="grid gap-6">
              {negativeEmotions.map((emotion, index) => (
                <Card key={index} className="border-destructive/20 shadow-sm hover:shadow-elevated transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-destructive/80 to-destructive/60 text-destructive-foreground">
                    <CardTitle className="text-2xl">{emotion.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/30">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Spiritual Root
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/80">{emotion.spiritual}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/30">
                            <Brain className="w-3 h-3 mr-1" />
                            Mental Effect
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/80">{emotion.mind}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/30">
                            <Heart className="w-3 h-3 mr-1" />
                            Physical Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/80">{emotion.body}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/30">
                            Soul Damage
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/80">{emotion.soul}</p>
                      </div>
                    </div>

                    <div className="border-t border-border/50 pt-4 space-y-3">
                      <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                        <p className="font-semibold text-sm mb-2 text-destructive">🚪 Spiritual Doorway:</p>
                        <p className="text-sm text-foreground/80">{emotion.doorway}</p>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="font-semibold text-sm mb-2">🦠 Parasite/Physical Connection:</p>
                        <p className="text-sm text-foreground/80">{emotion.parasites}</p>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Leaf className="w-4 h-4 text-primary" />
                          Natural Support:
                        </p>
                        <p className="text-sm text-foreground/80">{emotion.herbs}</p>
                      </div>
                      
                      <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                        <p className="font-semibold text-sm mb-2 text-primary">✨ Deliverance Strategy:</p>
                        <p className="text-sm text-foreground/80">{emotion.deliverance}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Disclaimer */}
        <Card className="max-w-6xl mx-auto mt-8 p-6 bg-accent/20">
          <p className="text-sm text-foreground/80">
            <strong>Medical Disclaimer:</strong> This information is for educational purposes only and is not intended 
            to replace professional medical or psychological care. Herbal remedies can interact with medications. 
            Always consult healthcare providers before starting supplements. For severe emotional or mental health issues, 
            seek professional help immediately.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default EmotionsDictionary;