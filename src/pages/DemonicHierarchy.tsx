import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Shield, AlertTriangle, Skull } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Spirit {
  name: string;
  dangerLevel: number;
  tier: string;
  purpose: string;
  entry: string;
  biblical: string;
  details: string;
}

const spirits: Spirit[] = [
  {
    name: "Unclean/Foul Spirits",
    dangerLevel: 1,
    tier: "Bottom Tier",
    purpose: "Cause immoral thoughts, depression, basic possession, or physical uncleanness (e.g., lustful impulses, minor oppression). They 'occupy space' and amplify sin but flee quickly under basic rebuke.",
    entry: "Casual sin or environment. Common in early bondage.",
    biblical: "1 Corinthians 6:18-20",
    details: "Lowest foot soldiers; basic evil influences that defile the body/soul as God's temple."
  },
  {
    name: "Familiar Spirits",
    dangerLevel: 2,
    tier: "Bottom Tier",
    purpose: "Divination, fortune-telling, or ancestral mimicry to deceive and bind generations. They reveal 'hidden' info to build trust, leading to occult dependency and ritual uncleanness.",
    entry: "Witchcraft, mediums, or inherited family altars. Weak but persistent in dreams/visions.",
    biblical: "Leviticus 19:31; Deuteronomy 18:10-12",
    details: "Low-level 'family' demons mimicking loved ones or providing false knowledge."
  },
  {
    name: "Lying/Deaf-and-Dumb Spirits",
    dangerLevel: 2,
    tier: "Bottom Tier",
    purpose: "Spread deception, muteness, or hearing loss; hinder prayer/communication with God, fostering isolation or false beliefs.",
    entry: "Lies, unbelief, or trauma. Often expelled in one session but recur if lies aren't renounced.",
    biblical: "Mark 9:17-29",
    details: "Basic tormentors blocking truth or senses."
  },
  {
    name: "Spirits of Infirmity/Oppression",
    dangerLevel: 3,
    tier: "Mid-Low Tier",
    purpose: "Cause chronic sickness, pain, or fatigue to wear down faith and productivity. They lodge in organs (e.g., spine for crippling, eyes for blindness) as 'messengers of Satan'.",
    entry: "Unforgiveness, curses, or accidents. Require healing prayer alongside casting out.",
    biblical: "Luke 13:11; Acts 10:38; 2 Corinthians 12:7",
    details: "Mid-low attackers on the body; cluster under stronger rulers."
  },
  {
    name: "Seducing Spirits",
    dangerLevel: 3,
    tier: "Mid-Low Tier",
    purpose: "Entice into cults, idolatry, or immorality; sear consciences, promote false Christs/teachers, and block spiritual discernment.",
    entry: "Doubt or exposure to error. Dangerous in groups but vulnerable to truth-testing.",
    biblical: "1 Timothy 4:1; 1 John 4:1",
    details: "Temptation-focused; allure to false doctrines."
  },
  {
    name: "Spirits of Fear/Rejection",
    dangerLevel: 4,
    tier: "Mid-Low Tier",
    purpose: "Torment with anxiety, low self-esteem, or isolation; open doors to suicide, addiction, or relational breakdown via unforgiveness roots.",
    entry: "Trauma, abandonment, or curses. Mid-resistance; need repentance for full freedom.",
    biblical: "2 Timothy 1:7; Hebrews 12:15",
    details: "Emotional strongmen; rule personal clusters like anger or loneliness."
  },
  {
    name: "Jezebel Spirit",
    dangerLevel: 6,
    tier: "Mid-High Tier",
    purpose: "Dominate via manipulation, witchcraft, or immorality; destroy families, leadership, and purity by promoting rebellion and false prophecy. Works with Ahab (passivity).",
    entry: "Pride, sexual sin, or occult. High retaliation; affects churches/institutions.",
    biblical: "Revelation 2:20; 1 Kings 16-21",
    details: "Mid-high ruling female principality; commands seduction and control."
  },
  {
    name: "Leviathan Spirit",
    dangerLevel: 7,
    tier: "High Tier",
    purpose: "Harden hearts, twist words, and sow division; causes arrogance, confusion, and spiritual blockage, ruling over haughtiness and violence.",
    entry: "Pride curses or idolatry. Territorial; resists with backlash but breaks via humility.",
    biblical: "Job 41:34; Isaiah 27:1",
    details: "High principality; sea serpent ruler of pride."
  },
  {
    name: "Principalities/Powers",
    dangerLevel: 8,
    tier: "Mid-Top Tier",
    purpose: "Infiltrate governments, businesses, or cultures; enforce systemic evil like injustice or false religion, commanding legions for widespread oppression.",
    entry: "Corporate sin or altars. Broad influence; warfare involves intercession.",
    biblical: "Ephesians 6:12",
    details: "Mid-top territorial forces; oversee cities or sectors."
  },
  {
    name: "Rulers of Darkness/Thrones",
    dangerLevel: 9,
    tier: "Near-Top Tier",
    purpose: "Worshipped as idols (e.g., Baal, Molech); rule global spheres like politics or ethnicity, promoting child sacrifice, war, or ancestral bondage.",
    entry: "National idolatry. Extreme danger; require prophetic confrontation.",
    biblical: "Daniel 10:13; Colossians 1:16",
    details: "Near-top dominions; 'gods' over nations."
  },
  {
    name: "Satan/Beelzebub (Prince of Demons)",
    dangerLevel: 10,
    tier: "Apex",
    purpose: "Oversee all deception, accusation, and destruction; blind minds to truth, coordinate hierarchies for eternal separation from God.",
    entry: "Unbelief or high rebellion. Ultimate foe; defeated at the cross but active until final judgment.",
    biblical: "John 12:31; Matthew 12:24; 2 Corinthians 4:4; John 1:5",
    details: "Apex ruler; 'god of this world' with ultimate command."
  }
];

const getDangerColor = (level: number) => {
  if (level <= 2) return "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30";
  if (level <= 4) return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30";
  if (level <= 6) return "bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/30";
  if (level <= 8) return "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30";
  return "bg-destructive/20 text-destructive border-destructive/30";
};

const getDangerIcon = (level: number) => {
  if (level <= 4) return <Shield className="w-4 h-4" />;
  if (level <= 7) return <AlertTriangle className="w-4 h-4" />;
  return <Skull className="w-4 h-4" />;
};

const DemonicHierarchy = () => {
  return (
    <div className="min-h-screen bg-gradient-light">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="font-serif text-2xl font-bold">Demonic Hierarchy</h1>
              <p className="text-sm text-muted-foreground">Understanding Spiritual Warfare</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
        {/* Introduction */}
        <Card className="p-6 border-primary/20">
          <h2 className="font-serif text-2xl font-bold mb-4">Understanding the Hierarchy</h2>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              From a Christian deliverance ministry perspective, the concept of a demonic hierarchy is drawn from biblical passages like <strong>Ephesians 6:12</strong> ("For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places") and <strong>Colossians 1:16</strong>, which describe an organized structure of evil spiritual forces under Satan's command.
            </p>
            <p>
              This isn't a rigid, universally agreed-upon system in Scripture, but deliverance teachings portray demons as fallen angels or unclean spirits operating in ranks, with lower-level ones being more numerous and focused on individual torment, while higher ones exert broader influence over regions, institutions, or generations.
            </p>
            <p>
              They form "family groupings" or clusters under ruling spirits, entering through sin, curses, trauma, or occult involvement, and their ultimate purpose is to <strong>steal, kill, and destroy</strong> (John 10:10) by opposing God's kingdom—afflicting minds, bodies, relationships, and destinies to keep people in bondage.
            </p>
          </div>
        </Card>

        {/* Hierarchy Overview */}
        <Card className="p-6 bg-gradient-divine text-primary-foreground">
          <h2 className="font-serif text-2xl font-bold mb-6">Hierarchical Structure Overview</h2>
          <div className="space-y-4">
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="destructive" className="text-sm">Danger 8-10</Badge>
                <h3 className="font-semibold text-lg">Top Tier</h3>
              </div>
              <p className="text-sm text-primary-foreground/90">
                Thrones/Dominions/Princes — Territorial rulers over nations/cities (e.g., "prince of Persia" in Daniel 10; global idolatry)
              </p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-sm">Danger 5-7</Badge>
                <h3 className="font-semibold text-lg">Mid-High Tier</h3>
              </div>
              <p className="text-sm text-primary-foreground/90">
                Principalities/Powers/Rulers of Darkness — Influence institutions, families, or regions; command clusters of lesser demons
              </p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-sm">Danger 3-4</Badge>
                <h3 className="font-semibold text-lg">Mid-Low Tier</h3>
              </div>
              <p className="text-sm text-primary-foreground/90">
                Strongmen/Ruling Spirits — Oversee personal bondages like addiction or fear; enter via trauma
              </p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-sm">Danger 1-2</Badge>
                <h3 className="font-semibold text-lg">Bottom Tier</h3>
              </div>
              <p className="text-sm text-primary-foreground/90">
                Spiritual Wickedness/Unclean Spirits — Foot soldiers; possess or oppress individuals, feed on sin
              </p>
            </div>
          </div>
        </Card>

        {/* Important Notice */}
        <Alert className="border-secondary/30 bg-secondary/5">
          <Shield className="h-5 w-5 text-secondary" />
          <AlertDescription className="text-sm leading-relaxed">
            <strong>Remember:</strong> All demons are subject to Jesus' authority (Philippians 2:9-11; Mark 16:17). No demon is invincible—light always overcomes darkness (John 1:5). In deliverance, start by addressing lower levels (they often hold "ground" for higher ones), confess sins, forgive, and command out in Jesus' name. Stronger ones may need fasting or team ministry.
          </AlertDescription>
        </Alert>

        {/* Spirits List */}
        <div className="space-y-6">
          <h2 className="font-serif text-3xl font-bold text-center">Complete Hierarchy: Weakest to Strongest</h2>
          
          {spirits.map((spirit, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-elevated transition-all duration-300 border-border/50"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-2xl font-bold mb-2">{spirit.name}</h3>
                    <p className="text-sm text-muted-foreground italic">{spirit.details}</p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge className={`${getDangerColor(spirit.dangerLevel)} px-3 py-1 text-sm font-semibold flex items-center gap-2`}>
                      {getDangerIcon(spirit.dangerLevel)}
                      Danger Level: {spirit.dangerLevel}/10
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {spirit.tier}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm text-primary mb-1">Purpose & Operation</h4>
                      <p className="text-sm text-foreground/80 leading-relaxed">{spirit.purpose}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-primary mb-1">Entry Points</h4>
                      <p className="text-sm text-foreground/80 leading-relaxed">{spirit.entry}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm text-primary mb-1">Biblical References</h4>
                      <p className="text-sm text-foreground/80 leading-relaxed font-mono">{spirit.biblical}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Deliverance Guidelines */}
        <Card className="p-6 bg-accent/30 border-accent">
          <h2 className="font-serif text-2xl font-bold mb-4">Deliverance Approach</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              <strong>Strategic Order:</strong> Start by addressing lower-level spirits first, as they often hold "ground" for higher ones. Once the foot soldiers are removed, stronger spirits lose their support structure.
            </p>
            <p>
              <strong>Essential Steps:</strong> Confess the specific sins that opened the door, genuinely repent (turn away), verbally renounce the spirit and its works in Jesus' name, forgive yourself and others involved, and command it to leave.
            </p>
            <p>
              <strong>For Stronger Spirits:</strong> Higher-ranking demons (danger level 6+) may require fasting, extended prayer, prophetic insight, or ministry from an experienced deliverance team. They often retaliate or resist longer.
            </p>
            <p>
              <strong>Authority in Christ:</strong> Remember that you operate in Jesus' authority, not your own strength. His name, His blood, and His finished work on the cross have already defeated every demonic power (Colossians 2:15).
            </p>
          </div>
        </Card>

        {/* Next Steps */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="bg-gradient-spiritual">
            <Link to="/pre-deliverance">Pre-Deliverance Preparation</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/deliverance">Learn the 5 Steps</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/assessments">Take an Assessment</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemonicHierarchy;