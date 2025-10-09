import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Shield, Heart, Lock, Flame, BookOpen, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PreDeliverance = () => {
  const preparationSteps = [
    {
      title: "Spiritual Armor - Ephesians 6:10-18",
      icon: Shield,
      description: "Put on the full armor of Elohim before engaging in spiritual warfare",
      content: {
        declaration: `I put on the full armor of Elohim:
• Belt of Truth - I gird my waist with Your truth
• Breastplate of Righteousness - I protect my heart with the righteousness of Yahusha
• Shoes of Peace - My feet are fitted with readiness from the gospel of peace
• Shield of Faith - I take up faith to quench all fiery darts of the evil one
• Helmet of Salvation - I protect my mind with the assurance of salvation
• Sword of the Spirit - I wield Your Word as my offensive weapon
• Prayer in the Spirit - I pray at all times in the Ruach`,
        scripture: "Ephesians 6:10-18 - Finally, be strong in Yahuah and in the strength of His might. Put on the full armor of Elohim..."
      }
    },
    {
      title: "Fasting Guidelines",
      icon: Flame,
      description: "Fasting weakens demonic strongholds and increases spiritual sensitivity",
      content: {
        types: [
          "**Water Fast** - Water only for 1-3 days (most powerful)",
          "**Partial Fast** - One meal per day or specific foods (Daniel fast)",
          "**Intermittent Fast** - Skip breakfast/lunch, eat dinner only",
          "**Media Fast** - Abstain from TV, social media, entertainment"
        ],
        guidelines: [
          "Pray and ask the Ruach how long to fast",
          "Break fast gently with light foods",
          "Increase Bible reading and prayer during fast",
          "Expect spiritual breakthrough on day 3",
          "Medical conditions: consult physician first"
        ],
        scripture: "Matthew 17:21 - This kind does not go out except by prayer and fasting"
      }
    },
    {
      title: "Breaking Soul Ties",
      icon: Heart,
      description: "Sever ungodly spiritual connections that give demons legal access",
      content: {
        types: [
          "**Sexual Soul Ties** - Past sexual partners (fornication, adultery)",
          "**Parental Soul Ties** - Unhealthy control, manipulation, codependency",
          "**Friendship Soul Ties** - Toxic relationships, ungodly covenants",
          "**Authority Soul Ties** - Spiritual abuse, false prophets, cult leaders",
          "**Occult Soul Ties** - Witches, mediums, tarot readers, yoga instructors"
        ],
        prayer: `Father Yahuah, I confess that I formed an ungodly soul tie with [NAME].

I repent for [sexual sin/codependency/occult involvement] that created this bond.

I renounce this soul tie and I cut, sever, and dissolve it by the sword of Yahusha Ha Mashiach.

I command every part of my soul (mind, will, emotions) that was tied to [NAME] to return to me now, cleansed by the blood of Yahusha.

I release every part of [NAME]'s soul back to them.

I close this door and break all demonic assignments attached to this relationship.

Thank you Yahusha for setting me free.`,
        scripture: "1 Corinthians 6:16 - Do you not know that he who joins himself to a prostitute is one body with her?"
      }
    },
    {
      title: "Closing Occult Doorways",
      icon: Lock,
      description: "Identify and renounce specific occult practices that opened doors",
      content: {
        doorways: [
          "**Divination** - Tarot cards, palm reading, fortune telling, pendulums, dowsing",
          "**Witchcraft** - Spells, curses, hexes, potions, candle magic, manifesting",
          "**Spiritism** - Ouija boards, séances, channeling, mediums, talking to the dead",
          "**Eastern Mysticism** - Yoga (not just exercise), transcendental meditation, chakras, kundalini, reiki",
          "**New Age** - Crystals, sage smudging, vision boards, law of attraction, astral projection",
          "**Astrology** - Horoscopes, zodiac signs, birth charts, planetary alignments",
          "**False Religions** - Freemasonry, Mormonism, Jehovah's Witnesses, Islam, Buddhism, Hinduism",
          "**Entertainment** - Horror movies, occult video games, heavy metal music with demonic themes",
          "**Secret Societies** - Skull & Bones, Eastern Star, Shriners, fraternities/sororities with rituals"
        ],
        prayer: `Father Yahuah, I confess and repent for opening doors through [SPECIFIC PRACTICE].

I renounce [PRACTICE] and I break all agreements, covenants, and dedications made through it.

I renounce every spirit that entered through this door: 
[Spirit of divination, witchcraft, python, antichrist, deception, etc.]

I close this door by the blood of Yahusha and I command it sealed permanently.

I break all curses, hexes, spells, and assignments sent through this door.

Every demon that entered must leave NOW in Yahusha's name.`,
        scripture: "Deuteronomy 18:10-12 - There shall not be found among you anyone who practices divination or sorcery..."
      }
    },
    {
      title: "Object Cleansing",
      icon: BookOpen,
      description: "Remove and destroy objects that carry demonic attachment",
      content: {
        items: [
          "**Religious Items** - Buddha statues, Hindu gods, dream catchers, rosaries (if used superstitiously)",
          "**Occult Objects** - Tarot decks, ouija boards, crystals, sage bundles, occult books",
          "**Jewelry** - Masonic rings, ankh symbols, pentagram, all-seeing eye, yin-yang",
          "**Art & Media** - Paintings/posters of false gods, horror movies, occult music albums",
          "**Gifts from Practitioners** - Items from witches, mediums, or people in occult",
          "**Souvenirs** - Objects from temples, shrines, graveyards, haunted locations",
          "**Inherited Items** - Antiques from family involved in occult, Freemasonry"
        ],
        actions: [
          "1. Ask the Ruach HaKodesh to reveal what needs to go",
          "2. Do not sell or donate - demons transfer with objects",
          "3. Destroy by burning, breaking, or disposing in trash",
          "4. Pray over your home after removing items"
        ],
        prayer: `Father Yahuah, I ask You to reveal any object in my possession that is cursed, dedicated to demons, or carrying occult power.

I renounce ownership of [ITEM] and I break all curses and demonic assignments attached to it.

As I destroy this object, I command every spirit attached to it to leave my home and my life now.

I invite the Ruach HaKodesh to fill my home and I dedicate my dwelling to Yahusha Ha Mashiach.`,
        scripture: "Acts 19:19 - Many who had practiced magic brought their books together and burned them"
      }
    },
    {
      title: "Pre-Deliverance Checklist",
      icon: Clock,
      description: "Complete these steps before your deliverance session",
      content: {
        checklist: [
          "☐ Fast for 1-3 days (if medically able)",
          "☐ Complete all relevant assessments",
          "☐ Write out your confession list",
          "☐ Identify and list all soul ties to break",
          "☐ List all occult doorways to close",
          "☐ Remove/destroy cursed objects from home",
          "☐ Confess and repent of all known sin",
          "☐ Forgive everyone who has hurt you",
          "☐ Put on spiritual armor daily",
          "☐ Find a quiet, private place for deliverance",
          "☐ Have water nearby (may cough/need hydration)",
          "☐ Play worship music or Bible audio after",
          "☐ Optional: Have a mature believer present for support"
        ],
        warning: "⚠️ **IMPORTANT**: Do not attempt deliverance if you are unwilling to give up your sin. Demons will not leave if you still want them there. Repentance must be genuine."
      }
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
              <h1 className="font-serif text-2xl md:text-3xl font-bold">Pre-Deliverance Preparation</h1>
              <p className="text-sm text-muted-foreground">Essential steps before your deliverance session</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 bg-gradient-spiritual border-primary/30 shadow-glow">
          <div className="space-y-4 text-center">
            <Shield className="w-16 h-16 mx-auto text-primary-foreground" />
            <h2 className="font-serif text-3xl font-bold text-primary-foreground">Prepare for Battle</h2>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Deliverance is spiritual warfare. Proper preparation weakens demonic strongholds and positions you for complete freedom. 
              Follow these steps carefully before engaging in deliverance ministry.
            </p>
          </div>
        </Card>
      </section>

      {/* Preparation Steps */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            {preparationSteps.map((step, index) => (
              <AccordionItem key={index} value={`step-${index}`} className="border-none">
                <Card className="border-primary/20 shadow-elevated overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4 text-left">
                      <div className="flex-shrink-0 p-3 rounded-full bg-gradient-spiritual">
                        <step.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    <div className="space-y-6">
                      {/* Declaration */}
                      {step.content.declaration && (
                        <div className="bg-muted/50 rounded-lg p-4 border border-border/30">
                          <h4 className="font-semibold mb-2">Declaration:</h4>
                          <pre className="whitespace-pre-wrap font-sans text-sm text-foreground/90">
                            {step.content.declaration}
                          </pre>
                        </div>
                      )}

                      {/* Types/Doorways */}
                      {(step.content.types || step.content.doorways) && (
                        <div>
                          <h4 className="font-semibold mb-3">
                            {step.content.types ? "Types:" : "Common Doorways:"}
                          </h4>
                          <ul className="space-y-2">
                            {(step.content.types || step.content.doorways)?.map((item, i) => (
                              <li key={i} className="text-sm leading-relaxed pl-4 border-l-2 border-primary/30">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Guidelines */}
                      {step.content.guidelines && (
                        <div>
                          <h4 className="font-semibold mb-3">Guidelines:</h4>
                          <ul className="space-y-2">
                            {step.content.guidelines.map((guideline, i) => (
                              <li key={i} className="text-sm leading-relaxed flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{guideline}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Items/Actions */}
                      {step.content.items && (
                        <div>
                          <h4 className="font-semibold mb-3">Items to Remove:</h4>
                          <ul className="space-y-2">
                            {step.content.items.map((item, i) => (
                              <li key={i} className="text-sm leading-relaxed pl-4 border-l-2 border-primary/30">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {step.content.actions && (
                        <div className="bg-accent/50 rounded-lg p-4">
                          <h4 className="font-semibold mb-3 text-accent-foreground">Action Steps:</h4>
                          <ul className="space-y-2">
                            {step.content.actions.map((action, i) => (
                              <li key={i} className="text-sm text-accent-foreground/90">
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Checklist */}
                      {step.content.checklist && (
                        <div>
                          <ul className="space-y-2">
                            {step.content.checklist.map((item, i) => (
                              <li key={i} className="text-sm font-mono bg-muted/30 p-2 rounded">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Warning */}
                      {step.content.warning && (
                        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                          <p className="text-sm font-semibold text-destructive">{step.content.warning}</p>
                        </div>
                      )}

                      {/* Prayer */}
                      {step.content.prayer && (
                        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                          <h4 className="font-semibold mb-2 text-primary">Prayer Template:</h4>
                          <pre className="whitespace-pre-wrap font-sans text-sm text-foreground/90">
                            {step.content.prayer}
                          </pre>
                        </div>
                      )}

                      {/* Scripture */}
                      {step.content.scripture && (
                        <div className="border-t border-border/30 pt-4">
                          <p className="text-sm italic text-muted-foreground">{step.content.scripture}</p>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Next Steps */}
          <Card className="p-6 border-primary/20 shadow-elevated">
            <h3 className="font-serif text-xl font-semibold mb-4">Ready to Begin?</h3>
            <p className="text-muted-foreground mb-6">
              Once you've completed these preparation steps, you're ready to take the assessments and begin your deliverance journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-spiritual shadow-elevated">
                <Link to="/assessments">Take Assessments</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30">
                <Link to="/deliverance">Learn the 5 Steps</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default PreDeliverance;
