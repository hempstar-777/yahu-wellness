import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Copy, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ProtectedRoute from "@/components/ProtectedRoute";

const DoorwaysAssessment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const doorwayCategories = [
    {
      title: "Sexual Sin Doorways",
      description: "Sexual immorality creates powerful soul ties and demonic access",
      items: [
        "Pornography (any type: videos, images, magazines, hentai, anime)",
        "Masturbation with lustful fantasy",
        "Fornication (sex before marriage)",
        "Adultery (sex outside marriage)",
        "Prostitution (paying for or being paid for sex)",
        "One night stands / hookup culture",
        "Friends with benefits",
        "Oral sex outside marriage",
        "Sexting / sending nude photos",
        "Phone sex / cybersex / cam sites",
        "Sex toys",
        "BDSM / dominance & submission",
        "Homosexuality (same-sex attraction or activity)",
        "Lesbianism",
        "Bisexuality",
        "Transgenderism / gender confusion",
        "Bestiality (sex with animals)",
        "Pedophilia / child sexual abuse (victim or perpetrator)",
        "Incest (sexual activity with family members)",
        "Voyeurism (watching others without consent)",
        "Exhibitionism (exposing oneself)",
        "Sexual fantasies about someone other than spouse",
        "Rape (victim or perpetrator)",
        "Molestation (victim or perpetrator)",
        "Strip clubs / gentlemen's clubs",
        "Erotic massage parlors",
        "OnlyFans / adult content creation",
        "Virtual sex / VR porn",
        "Sex addiction",
        "Romance novels with explicit content",
        "Lust toward celebrities, coworkers, neighbors",
      ],
    },
    {
      title: "Witchcraft & Divination",
      description: "Occult practices that open direct channels to demonic spirits",
      items: [
        "Tarot card reading (receiving or giving)",
        "Palm reading / palmistry",
        "Fortune telling",
        "Crystal ball gazing",
        "Pendulum dowsing",
        "Ouija board / spirit board",
        "Séances / contacting the dead",
        "Channeling spirits",
        "Automatic writing",
        "Table tipping / levitation",
        "Mediumship (talking to dead)",
        "Psychic readings",
        "Astrology / reading horoscopes",
        "Zodiac sign obsession / compatibility charts",
        "Numerology / angel numbers",
        "Rune stones",
        "I Ching",
        "Tea leaf reading",
        "Blood rituals / blood oaths",
        "Curses, hexes, or spells (casting or receiving)",
        "Voodoo / hoodoo / santeria",
        "Wicca / white magic",
        "Black magic / dark magic",
        "Pagan rituals",
        "Witchcraft books / grimoires",
        "Spell jars / potion making",
        "Candle magic / color magic",
        "Moon rituals / lunar magic",
        "Manifesting rituals",
        "Sigil magic",
        "Familiar spirits (spirit guides)",
        "Ancestor worship",
        "Asking deceased loved ones for help",
        "Paranormal investigation",
        "Ghost hunting",
      ],
    },
    {
      title: "New Age & Eastern Mysticism",
      description: "Practices marketed as wellness but rooted in demonic spirituality",
      items: [
        "Yoga (especially with chakra work, chanting Om, or spiritual focus)",
        "Kundalini awakening",
        "Chakra meditation / balancing",
        "Transcendental Meditation (TM)",
        "Mindfulness meditation (emptying the mind)",
        "Reiki energy healing",
        "Crystal healing / crystal grids",
        "Sage smudging / energy cleansing",
        "Burning palo santo",
        "Sound healing / singing bowls",
        "Tuning forks / frequency healing",
        "Astral projection / out of body experiences",
        "Lucid dreaming techniques",
        "Third eye opening",
        "Law of Attraction teachings",
        "Manifestation boards / vision boards",
        "Universe worship ('The Universe has your back')",
        "Speaking things into existence (outside Biblical context)",
        "Positive affirmations as spiritual practice",
        "Energy work / aura cleansing",
        "Shamanism",
        "Spirit animals / totem animals",
        "Ayahuasca ceremonies",
        "DMT or other psychedelics for 'spiritual awakening'",
        "Breathwork for altered states",
        "Tantra",
        "Qi Gong",
        "Tai Chi (with spiritual intent)",
        "Acupuncture (with chi/energy beliefs)",
        "Aromatherapy with spiritual intent",
        "Essential oils for spiritual purposes",
        "Hypnosis / self-hypnosis",
        "Past life regression",
        "Akashic records",
        "Light body activation",
        "DNA activation / starseed beliefs",
        "Quantum healing",
      ],
    },
    {
      title: "False Religions & Cults",
      description: "Religions and organizations that deny Yahusha as the only way to salvation",
      items: [
        "Islam / Muslim faith",
        "Buddhism / Buddhist meditation",
        "Hinduism / worship of Hindu gods",
        "Mormonism / Church of Latter-day Saints",
        "Jehovah's Witnesses",
        "Christian Science",
        "Scientology",
        "Unitarian Universalism",
        "Baha'i Faith",
        "Hare Krishna",
        "Transcendental Meditation (TM) organization",
        "Kabbalah (mystical Judaism)",
        "Talmudic Judaism (rejecting Messiah)",
        "Catholicism (if involved in Mary worship, praying to saints, works-based salvation)",
        "Praying the rosary",
        "Worshipping or praying to Mary",
        "Praying to dead saints",
        "Purgatory belief",
        "Infant baptism for salvation",
        "Attending Mass as a work for salvation",
        "Freemasonry / Masonic lodge",
        "Eastern Star",
        "Shriners",
        "Knights of Columbus",
        "Rosicrucians",
        "Theosophy",
        "Anthroposophy",
        "New Thought movement",
        "Unity Church",
        "Unitarianism",
        "Swedenborgianism",
        "Gnosticism",
        "Syncretism (mixing Christianity with other religions)",
        "Hebrew Roots movement (if adding law for salvation)",
        "Sacred Name movement (if making name pronunciation a salvation issue)",
      ],
    },
    {
      title: "Entertainment & Media Doorways",
      description: "Movies, music, games, and content that glorify evil or the occult",
      items: [
        "Horror movies (especially with demons, possession, witches)",
        "Slasher films / torture porn",
        "Occult TV shows (Supernatural, Sabrina, Lucifer, etc.)",
        "Vampire movies or books (Twilight, True Blood, etc.)",
        "Werewolf / shapeshifter content",
        "Witchcraft shows (Charmed, The Craft, etc.)",
        "Ouija board movies",
        "Demon possession movies (The Exorcist, Conjuring, etc.)",
        "Occult anime (Death Note, Tokyo Ghoul, etc.)",
        "Video games with occult themes (Witcher, Diablo, Dark Souls, etc.)",
        "Dungeons & Dragons / tabletop RPGs with magic",
        "Pokemon (if treated as real spirits)",
        "Yu-Gi-Oh (summoning spirits in game)",
        "Magic: The Gathering (if spiritual connection made)",
        "Violent first-person shooters (obsessive playing)",
        "Grand Theft Auto / crime simulation games",
        "Heavy metal music with satanic lyrics",
        "Death metal / black metal",
        "Rap music glorifying violence, drugs, sex",
        "Music mocking God or promoting rebellion",
        "Attending concerts with occult imagery",
        "Gothic / emo culture obsession",
        "Dark poetry or writing",
        "Reading occult fiction (Harry Potter if treated as real magic)",
        "Twilight / vampire romance obsession",
        "Fifty Shades of Grey / erotic fiction",
        "Graphic novels with occult themes",
        "True crime obsession",
        "Morbid curiosity about serial killers",
        "Dark web exploration",
        "Gore websites",
      ],
    },
    {
      title: "Substance Abuse & Addiction",
      description: "Mind-altering substances that open spiritual doors and create bondage",
      items: [
        "Alcohol abuse / drunkenness",
        "Alcoholism",
        "Marijuana / weed / cannabis",
        "Cocaine",
        "Methamphetamine / meth / crystal",
        "Heroin",
        "Prescription drug abuse (opioids, benzos, stimulants)",
        "Fentanyl",
        "Ecstasy / MDMA / Molly",
        "LSD / acid",
        "Mushrooms / psilocybin",
        "DMT",
        "Ayahuasca",
        "Peyote",
        "Ketamine",
        "PCP",
        "Synthetic drugs (spice, bath salts, etc.)",
        "Inhalants / huffing",
        "Nitrous oxide (whippets)",
        "Adderall abuse",
        "Xanax or benzodiazepine abuse",
        "Smoking cigarettes (stronghold/bondage)",
        "Vaping / e-cigarettes",
        "Kratom",
        "Salvia",
        "Mixing drugs (polysubstance use)",
        "Using substances for spiritual experiences",
        "Tobacco in ritual context",
        "Attending drug-fueled parties / raves",
      ],
    },
    {
      title: "Anger, Violence & Murder",
      description: "Hatred, rage, and violence that give demonic spirits legal access",
      items: [
        "Uncontrolled rage / anger outbursts",
        "Violent thoughts toward others",
        "Fantasies of harming someone",
        "Road rage",
        "Domestic violence (victim or perpetrator)",
        "Physical abuse (victim or perpetrator)",
        "Child abuse",
        "Animal abuse / cruelty to animals",
        "Fighting / brawling",
        "Bullying others",
        "Threatening violence",
        "Owning weapons with intent to harm",
        "Murder (actual or attempted)",
        "Abortion (having or performing)",
        "Encouraging someone to abort",
        "Assisted suicide",
        "Contemplating suicide",
        "Attempted suicide",
        "Self-harm / cutting",
        "Burning oneself",
        "Hitting oneself",
        "Hatred toward specific person",
        "Wishing someone dead",
        "Celebrating someone's death or suffering",
        "Enjoying violent content",
        "Sadistic thoughts",
        "Desiring revenge",
        "Planning retaliation",
        "Holding grudges for years",
        "Bitterness that won't let go",
      ],
    },
    {
      title: "Fear, Anxiety & Trauma Spirits",
      description: "Spirits that enter through trauma, fear, and mental torment",
      items: [
        "Chronic anxiety / panic disorder",
        "Panic attacks",
        "Phobias (specific fears that control you)",
        "Fear of death / thanatophobia",
        "Fear of people / social anxiety",
        "Fear of the future",
        "Agoraphobia (fear of leaving home)",
        "Paranoia",
        "Intrusive thoughts",
        "Obsessive-compulsive disorder (OCD)",
        "Germophobia / contamination fears",
        "Fear of abandonment",
        "Fear of rejection",
        "Performance anxiety",
        "Post-traumatic stress disorder (PTSD)",
        "Complex PTSD (from prolonged abuse)",
        "Night terrors / nightmares (recurring)",
        "Sleep paralysis with demonic presence",
        "Fear of the dark",
        "Fear of ghosts or demons",
        "Hypervigilance (always on guard)",
        "Inability to trust anyone",
        "Fear of intimacy",
        "Fear of confrontation",
        "People-pleasing out of fear",
        "Perfectionism (driven by fear)",
        "Fear of failure",
        "Imposter syndrome",
        "Fear of success",
        "Worrying constantly",
      ],
    },
    {
      title: "Pride, Rebellion & Control",
      description: "Pride is the root sin that opened Satan's fall and keeps doors open",
      items: [
        "Arrogance / thinking you're better than others",
        "Pride in appearance / vanity",
        "Pride in intelligence / being a know-it-all",
        "Refusing to admit when wrong",
        "Never apologizing",
        "Blaming others for your problems",
        "Refusing correction or instruction",
        "Unteachable spirit",
        "Rebellion against authority (parents, government, church)",
        "Stubbornness / hardness of heart",
        "Self-righteousness / judgmentalism",
        "Legalism (earning salvation through works)",
        "Religious pride / Pharisee spirit",
        "Thinking you don't need deliverance",
        "Mocking those who need help",
        "Control and manipulation of others",
        "Domineering / controlling personality",
        "Manipulation through guilt or fear",
        "Witchcraft prayers (praying to control others)",
        "Jezebel spirit (control through seduction or intimidation)",
        "Using sex to manipulate",
        "Using tears or emotions to manipulate",
        "Gaslighting others",
        "Playing the victim to control",
        "Silent treatment / stonewalling",
        "Refusing to submit to authority",
        "Independent spirit ('I don't need anyone')",
        "Self-sufficiency ('I can handle it myself')",
        "Refusing to ask for help",
        "Hating accountability",
      ],
    },
    {
      title: "Unforgiveness, Bitterness & Offense",
      description: "Unforgiveness is a major demonic doorway that torments the soul",
      items: [
        "Unforgiveness toward parents",
        "Unforgiveness toward spouse / ex-spouse",
        "Unforgiveness toward siblings",
        "Unforgiveness toward children",
        "Unforgiveness toward church leaders",
        "Unforgiveness toward God (blaming Him)",
        "Unforgiveness toward yourself",
        "Bitterness that won't go away",
        "Resentment toward someone",
        "Holding grudges",
        "Rehearsing offenses mentally",
        "Talking about your offender constantly",
        "Desire for revenge",
        "Celebrating when offender suffers",
        "Refusing to reconcile when possible",
        "Cutting people off completely",
        "Cursing someone in your heart",
        "Wishing evil on someone",
        "Offense (easily offended spirit)",
        "Taking everything personally",
        "Victim mentality",
        "Blaming others for your misery",
        "Jealousy / envy of others",
        "Coveting what others have",
        "Gossip about those who hurt you",
        "Slander / ruining someone's reputation",
        "Seeking to turn others against your offender",
        "Using social media to blast someone",
        "Passive-aggressive behavior",
        "Quietly sabotaging someone",
      ],
    },
    {
      title: "Generational & Bloodline Curses",
      description: "Sins and curses passed down through family lines that need to be broken",
      items: [
        "Family history of Freemasonry",
        "Family involvement in Eastern Star, Shriners",
        "Ancestors involved in witchcraft",
        "Family curses spoken over you",
        "Dedications to false gods at birth",
        "Baby dedications in occult religions",
        "Bloodline oaths / blood covenants",
        "Family involved in secret societies",
        "Generational poverty spirit",
        "Generational debt and financial failure",
        "Pattern of divorce in family",
        "Pattern of adultery in family",
        "Pattern of sexual abuse in family",
        "Pattern of addiction in family (alcohol, drugs)",
        "Generational mental illness",
        "Pattern of suicide in family",
        "Pattern of early death in family",
        "Pattern of miscarriages or infertility",
        "Generational anger / rage",
        "Pattern of violence or abuse in family",
        "Generational fear or anxiety",
        "Pattern of depression in family",
        "Generational pride",
        "Pattern of rebellion in family",
        "Generational witchcraft (family of witches)",
        "Curses from Freemason ancestors",
        "Curses from Native American ancestors (if involved in shamanism)",
        "Curses from African ancestors (if involved in voodoo/witchcraft)",
        "Family involved in false religions (Islam, Buddhism, Hinduism, etc.)",
        "Idolatry in family line",
      ],
    },
  ];

  const handleCheckboxChange = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const copyResults = () => {
    if (selectedItems.length === 0) {
      toast.error("No items selected!");
      return;
    }
    const text = selectedItems.join("\n");
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${selectedItems.length} items to clipboard!`);
  };

  const saveResults = async () => {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item");
      return;
    }
    
    if (!user) {
      toast.error("Please login to save your assessment");
      navigate('/auth');
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('assessment_results')
        .insert({
          user_id: user.id,
          assessment_type: 'doorways',
          responses: { selected_items: selectedItems },
          score: selectedItems.length,
        });

      if (error) throw error;

      toast.success("Assessment saved successfully!");
      setTimeout(() => navigate("/prayers"), 1500);
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast.error("Failed to save assessment. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const totalItems = doorwayCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-light">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/assessments">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold">Comprehensive Doorways Assessment</h1>
                <p className="text-sm text-muted-foreground">Identify specific sin doorways that gave demons legal access</p>
              </div>
            </div>
            {selectedItems.length > 0 && (
              <Button onClick={copyResults} size="sm" className="flex-shrink-0">
                <Copy className="w-4 h-4 mr-2" />
                Copy ({selectedItems.length})
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Instructions */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 bg-primary/5 border-primary/30">
          <div className="flex items-start gap-4">
            <Lock className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h2 className="font-serif text-xl font-semibold">Closing Demonic Doorways</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                This assessment contains <strong>{totalItems}+ specific doorways</strong> organized by category. 
                Check everything that applies to you—past or present. Be ruthlessly honest; demons hide in secrets. 
                Your selections will be copied to use in your deliverance prayer.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Remember:</strong> Checking these items doesn't define you—it identifies what Yahusha will set you free from!
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Assessment Categories */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="max-w-4xl mx-auto space-y-4">
          <Accordion type="multiple" className="space-y-4">
            {doorwayCategories.map((category, catIndex) => {
              const categoryCheckedCount = category.items.filter(item => 
                selectedItems.includes(item)
              ).length;

              return (
                <AccordionItem key={catIndex} value={`category-${catIndex}`} className="border-none">
                  <Card className="border-primary/20 shadow-elevated overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-accent/50 transition-colors">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="text-left">
                          <h3 className="font-serif text-lg font-semibold">{category.title}</h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                        {categoryCheckedCount > 0 && (
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                            {categoryCheckedCount}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-2">
                      <div className="space-y-3">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-3 p-2 rounded hover:bg-accent/30 transition-colors">
                            <Checkbox
                              id={`${catIndex}-${itemIndex}`}
                              checked={selectedItems.includes(item)}
                              onCheckedChange={() => handleCheckboxChange(item)}
                              className="mt-1"
                            />
                            <label
                              htmlFor={`${catIndex}-${itemIndex}`}
                              className="text-sm leading-relaxed cursor-pointer flex-1"
                            >
                              {item}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* Results Card */}
          {selectedItems.length > 0 && (
            <Card className="p-6 bg-gradient-spiritual border-primary/30 shadow-glow sticky bottom-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary-foreground">
                    {selectedItems.length} Doorways Identified
                  </h3>
                  <p className="text-sm text-primary-foreground/80">
                    Copy your list and use it in the Core Deliverance Prayer
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button onClick={copyResults} size="lg" variant="secondary" disabled={isSaving}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy List
                  </Button>
                  <Button onClick={saveResults} size="lg" className="bg-background text-foreground hover:bg-background/90" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save & Continue"}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>
      </div>
    </ProtectedRoute>
  );
};

export default DoorwaysAssessment;
