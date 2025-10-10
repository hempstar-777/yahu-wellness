import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronLeft, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const teachings = {
  "blood-of-messiah": {
    title: "The Holy Blood of Yahusha Ha Mashiah",
    duration: "18 min read",
    content: [
      {
        section: "The Power of the Blood",
        text: "The blood of Yahusha (Jesus) is the most powerful weapon in spiritual warfare. It's not symbolic—it's the actual life force that purchased our redemption. Leviticus 17:11 declares that 'the life of the flesh is in the blood.' When Messiah shed His blood, He released divine life that defeats every work of darkness."
      },
      {
        section: "What the Blood Accomplishes",
        text: "The blood of Yahusha provides: complete forgiveness of sins (Ephesians 1:7), cleansing from all unrighteousness (1 John 1:7), redemption from the curse of the law (Galatians 3:13), victory over the accuser (Revelation 12:11), and access to the Father's presence (Hebrews 10:19). Every demonic claim is nullified by the blood."
      },
      {
        section: "How to Apply the Blood",
        text: "Applying the blood is done through faith-filled declaration. Speak aloud: 'I plead the blood of Yahusha over my mind, body, spirit, family, and home.' Visualize the blood covering you like a divine shield. This isn't ritual—it's activating what Messiah already accomplished. The enemy must flee from the blood."
      },
      {
        section: "The Blood and Deliverance",
        text: "In deliverance ministry, the blood is essential. Demons cannot stand against it. Before any deliverance session, declare: 'By the blood of Yahusha, every demonic assignment is broken. Every legal right is revoked. Every curse is dissolved.' The blood removes their legal ground and exposes their powerlessness."
      },
      {
        section: "Protection Through the Blood",
        text: "Like the Passover lamb's blood protected Israel from the destroyer (Exodus 12:13), Messiah's blood protects us. Daily declare the blood over yourself, family, home, and possessions. Say: 'I am covered by the blood of Yahusha. No weapon formed against me shall prosper.' This creates a supernatural barrier demons cannot cross."
      },
      {
        section: "The Blood Speaks",
        text: "Hebrews 12:24 reveals that Messiah's blood 'speaks better things than the blood of Abel.' Abel's blood cried for vengeance, but Yahusha's blood speaks mercy, forgiveness, and victory. When the enemy accuses you, the blood speaks louder—declaring you righteous, redeemed, and free."
      },
      {
        section: "Overcoming by the Blood",
        text: "Revelation 12:11 says believers overcome Satan 'by the blood of the Lamb and the word of their testimony.' This is a two-part strategy: the blood provides the legal authority, and your testimony (speaking it out) activates that authority. Declare what the blood has done for you."
      },
      {
        section: "Daily Application",
        text: "Start each day declaring: 'I am washed in the blood of Yahusha. Every sin is forgiven. Every chain is broken. Every demon must flee. I walk in divine protection and authority.' This isn't repetition—it's reinforcing spiritual reality and reminding the enemy of his defeat."
      }
    ]
  },
  "holy-fire": {
    title: "The Holy Fire of the Ruach HaKodesh",
    duration: "14 min read",
    content: [
      {
        section: "The Nature of Holy Fire",
        text: "The Ruach HaKodesh (Holy Spirit) is described as fire throughout Scripture. At Pentecost, tongues of fire rested on believers (Acts 2:3). Hebrews 12:29 declares 'our Elohim is a consuming fire.' This isn't metaphor—it's the purifying, destroying, empowering presence of the Spirit that burns away darkness."
      },
      {
        section: "Fire Consumes the Enemy",
        text: "Demonic spirits cannot withstand the fire of the Holy Spirit. Just as natural fire consumes wood, holy fire consumes spiritual darkness. When you invite the fire of the Spirit into a deliverance session, demons manifest in terror. They know fire means their destruction. Ask: 'Ruach HaKodesh, release Your consuming fire against every unclean spirit.'"
      },
      {
        section: "Fire Purifies Believers",
        text: "The fire of the Spirit doesn't harm believers—it purifies us. Malachi 3:2-3 describes Yahweh as a 'refiner's fire' that purifies like gold and silver. The fire burns away sin, shame, wounds, and defilement. What emerges is pure, holy, and powerful. Pray: 'Let Your fire purge everything that isn't of You.'"
      },
      {
        section: "Fire as Protection",
        text: "Like the pillar of fire protected Israel (Exodus 13:21), the fire of the Spirit creates a protective barrier. Demons cannot penetrate holy fire. Declare daily: 'I am surrounded by the fire of the Ruach HaKodesh. Every attack is consumed before it reaches me.' Visualize yourself encircled by divine flames."
      },
      {
        section: "Fire and Empowerment",
        text: "Acts 1:8 promises power when the Holy Spirit comes. This baptism of fire (Matthew 3:11) empowers believers for spiritual warfare, bold witness, and supernatural ministry. The fire ignites gifts, removes fear, and releases authority. Ask the Father to immerse you in Holy Spirit fire until you burn with His presence."
      },
      {
        section: "Invoking the Fire in Warfare",
        text: "During spiritual warfare, call down the fire: 'Father, release Your holy fire. Let it consume every demon assigned against me. Let it burn through every stronghold. Let it purify my mind, emotions, and will.' The fire is not symbolic—it's a real spiritual force that demons recognize and flee from."
      },
      {
        section: "Fire Tests Everything",
        text: "First Corinthians 3:13 says fire will test the quality of each person's work. The fire of the Spirit exposes what's truly of Elohim and what's flesh or demonic. Don't fear this testing—welcome it. What survives the fire is eternal. What burns away needed to go. Pray: 'Test me with Your fire. Expose what must be removed.'"
      },
      {
        section: "Living in the Fire",
        text: "Don't just invoke fire during crisis—live in it daily. Like the burning bush that wasn't consumed (Exodus 3:2), you can carry the fire without being destroyed. This requires holiness, surrender, and hunger for His presence. The more you carry His fire, the less the enemy can touch you. Be a burning one."
      }
    ]
  },
  "fasting-importance": {
    title: "The Power of Fasting",
    duration: "16 min read",
    content: [
      {
        section: "What Fasting Really Is",
        text: "Fasting is the voluntary abstinence from food (and sometimes drink) to seek Elohim with focused intensity. It's not about earning favor—it's about creating space for breakthrough. When your body is quieted, your spirit becomes more sensitive to the Ruach HaKodesh. Fasting is a weapon the enemy fears."
      },
      {
        section: "Physical Effects of Fasting",
        text: "Physically, fasting triggers autophagy—cellular cleansing where the body breaks down toxins and damaged cells. It reduces inflammation, resets insulin sensitivity, and sharpens mental clarity. Your body enters a healing mode. Many physical ailments improve during extended fasts as the body redirects energy from digestion to repair."
      },
      {
        section: "Emotional and Mental Benefits",
        text: "Fasting breaks emotional strongholds. The discipline required strengthens self-control, which is a fruit of the Spirit (Galatians 5:23). Addictions, anxiety, and depression often lift during fasting as the body's chemistry rebalances and the soul finds peace. Fasting creates emotional stability and mental resilience."
      },
      {
        section: "Spiritual Breakthrough",
        text: "The spiritual realm responds powerfully to fasting. Isaiah 58:6 lists fasting's effects: breaking yokes, freeing the oppressed, shattering bondages. Yahusha said some demons only come out through prayer and fasting (Matthew 17:21). Fasting weakens demonic grip and strengthens your spiritual authority. It's not magic—it's alignment with Kingdom principles."
      },
      {
        section: "Types of Fasts",
        text: "Biblical fasts include: Normal fast (no food, water allowed), Absolute fast (no food or water, short duration only like Esther's 3-day fast), Partial fast (Daniel fast—only vegetables and water), and Intermittent fasting (eating within limited hours). Choose based on your health, calling, and leading of the Spirit."
      },
      {
        section: "How to Fast Effectively",
        text: "Prepare your body by reducing caffeine and heavy foods beforehand. Set a clear spiritual goal: deliverance, breakthrough, guidance, etc. Spend the time you'd eat in prayer, worship, and Scripture reading. Break your fast gently with light foods. Don't fast for show—do it in secret before the Father (Matthew 6:16-18)."
      },
      {
        section: "Fasting and Deliverance",
        text: "Before major deliverance sessions, consider fasting. It sharpens spiritual discernment, weakens demonic strongholds, and increases your authority. The demons know when you've fasted—they sense the shift in spiritual atmosphere. Combine fasting with declaration of Scripture and the blood of Yahusha for maximum impact."
      },
      {
        section: "When NOT to Fast",
        text: "Don't fast if you're pregnant, nursing, diabetic, or have eating disorders without medical guidance. Fasting should be Spirit-led, not legalistic. If you cannot do a food fast, fast from media, entertainment, or other distractions. The heart posture matters more than the method. Seek Yahweh's face with whatever fast you can offer."
      },
      {
        section: "Corporate Fasting Power",
        text: "When believers fast together, the impact multiplies. Esther called a corporate fast that saved Israel (Esther 4:16). The early church fasted before major decisions (Acts 13:2-3). Consider fasting with your family, church, or online community for specific breakthroughs. Corporate fasting releases tsunami-level spiritual power."
      }
    ]
  },
  "prayer-power": {
    title: "The Authority of Prayer",
    duration: "12 min read",
    content: [
      {
        section: "Prayer Is Warfare",
        text: "Prayer isn't passive—it's the primary weapon of spiritual warfare. Ephesians 6:18 commands us to 'pray always' after describing the armor of Elohim. Prayer activates heavenly intervention, binds demonic activity, and releases angelic assistance. When you pray, you're not begging—you're enforcing Messiah's victory."
      },
      {
        section: "Authority in Prayer",
        text: "Yahusha gave believers authority to bind and loose (Matthew 18:18). When you pray in His name, you carry His authority. Demons must obey. Sickness must flee. Circumstances must shift. You're not asking permission—you're exercising delegated authority. Pray with confidence: 'In Yahusha's name, I command...'"
      },
      {
        section: "Different Types of Prayer",
        text: "Scripture reveals multiple prayer types: Supplication (requests), Intercession (standing in the gap), Thanksgiving (gratitude), Praise (worship), Declaration (speaking truth), Petition (asking), and Warfare (commanding). Use the right type for each situation. Don't just ask—sometimes you must decree and declare."
      },
      {
        section: "Praying in the Spirit",
        text: "Romans 8:26 says the Spirit helps us pray when we don't know how. Praying in tongues (if you have that gift) bypasses your limited understanding and prays perfect prayers. Even groaning in the Spirit releases intercession. Don't limit prayer to your intellect—let the Ruach HaKodesh pray through you for breakthrough you can't articulate."
      },
      {
        section: "Persistent Prayer",
        text: "Luke 18:1 teaches us to 'always pray and not give up.' Some breakthroughs require persistent, repeated prayer. This isn't because Elohim is reluctant—it's because spiritual resistance must be worn down. Daniel prayed 21 days before the angel broke through demonic opposition (Daniel 10:12-13). Don't quit too soon."
      },
      {
        section: "Praying Scripture",
        text: "The most powerful prayers declare Scripture back to Elohim. He watches over His word to perform it (Jeremiah 1:12). Instead of 'please help me,' pray: 'Father, Your word says no weapon formed against me shall prosper (Isaiah 54:17). I stand on this promise. I decree my protection.' Scripture-based prayer is unstoppable."
      },
      {
        section: "Corporate Prayer Power",
        text: "Matthew 18:19-20 promises that when two or three agree, it shall be done. Corporate prayer multiplies authority. Acts 4:31 records the place shaking when believers prayed together. Find prayer partners, join a prayer group, or pray with family. Unified, faith-filled agreement releases atomic-level spiritual power."
      },
      {
        section: "Prayer and Fasting Combined",
        text: "When prayer and fasting unite, breakthrough accelerates. The early church fasted and prayed before major decisions and missions (Acts 13:2-3). Combine these disciplines when facing stubborn strongholds, major life decisions, or intense spiritual warfare. This combination creates optimal conditions for miraculous intervention."
      },
      {
        section: "Living a Life of Prayer",
        text: "First Thessalonians 5:17 commands 'pray without ceasing.' This means cultivating constant God-awareness throughout your day. Talk to Him while driving, working, cooking. Make prayer your default response to every situation. Living prayerfully keeps you spiritually alert, discerning, and powerful. Prayer isn't an event—it's a lifestyle."
      }
    ]
  },
  "trauma-healing": {
    title: "Handling Trauma: Forgive & Heal",
    duration: "15 min read",
    content: [
      {
        section: "Understanding Trauma's Spiritual Impact",
        text: "Trauma creates legal ground for spirits of victimhood, bitterness, and fear. The enemy uses traumatic events to establish strongholds in our lives. However, Yahusha came to heal the brokenhearted and set captives free (Luke 4:18)."
      },
      {
        section: "The Power of Forgiveness",
        text: "Forgiveness is not optional—it's commanded (Colossians 3:13). When we refuse to forgive, we give the enemy legal access to torment us. Forgiveness doesn't minimize what happened; it releases you from spiritual bondage and transfers judgment to God."
      },
      {
        section: "Breaking Victim Agreements",
        text: "Often trauma causes us to make internal agreements: 'I'll never trust again,' 'I'm damaged goods,' 'I deserved this.' These agreements give demons legal access. You must verbally renounce these lies and declare the truth of who you are in Yahusha."
      },
      {
        section: "Addressing Secondary Effects",
        text: "Trauma often opens doors to secondary spirits: bitterness, self-hatred, addiction (as coping mechanisms), eating disorders, self-harm. Each must be addressed specifically through confession, renunciation, and commanding spirits to leave."
      },
      {
        section: "Prayer Strategy",
        text: "1. Forgive the perpetrator(s) from your heart\n2. Renounce all agreements made through trauma\n3. Break every curse and demonic assignment\n4. Command spirits of trauma, fear, and victimhood to leave\n5. Invite the Ruach HaKodesh to heal wounded areas\n6. Declare your true identity in Yahusha"
      }
    ]
  },
  "generational-freedom": {
    title: "Generational Freedom",
    duration: "12 min read",
    content: [
      {
        section: "Understanding Generational Iniquity",
        text: "Exodus 20:5 warns that iniquity passes down three to four generations. This isn't God punishing children for parents' sins—it's the spiritual consequence of opened doorways that demons exploit generationally until someone stands in the gap and breaks the cycle."
      },
      {
        section: "Identifying Bloodline Patterns",
        text: "Look for recurring patterns: addiction, divorce, financial ruin, premature death, specific diseases, occult involvement, mental illness. These patterns indicate generational curses that need breaking. The enemy establishes strongholds through bloodline agreements."
      },
      {
        section: "Confession on Behalf of Ancestors",
        text: "Like Nehemiah and Daniel, we can confess the sins of our fathers (Nehemiah 1:6, Daniel 9:20). This isn't taking on their guilt, but standing in the gap to break legal ground. Confess known sins of ancestors: idolatry, occult practices, sexual sin, violence, covenant breaking."
      },
      {
        section: "Breaking Generational Curses",
        text: "Through Yahusha's blood, all curses are broken (Galatians 3:13-14). You must verbally break curses by name, renounce all evil covenants made by ancestors, and command ancestral spirits to leave. Declare that you are a new creation in Mashiach—old bloodline curses have no power."
      },
      {
        section: "Establishing New Covenant",
        text: "After breaking curses, establish blessing. Declare that your bloodline is now under the New Covenant. Speak blessing over your children and future generations. Create a spiritual legacy of righteousness that will flow downstream instead of curses."
      }
    ]
  },
  "post-deliverance": {
    title: "Post-Deliverance Filling",
    duration: "8 min read",
    content: [
      {
        section: "The Danger of Empty Houses",
        text: "Matthew 12:43-45 warns about the swept house left empty. When demons leave, they seek to return with seven more wicked spirits. This is why many experience worse oppression after partial deliverance—they cleaned house but didn't fill it with the Ruach HaKodesh."
      },
      {
        section: "Inviting the Ruach HaKodesh",
        text: "Immediately after commanding spirits to leave, invite the Holy Spirit to fill every void. This isn't automatic—you must actively invite and welcome Him. Ask Him to flood your mind, emotions, body, and spirit. Receive the infilling by faith."
      },
      {
        section: "Maintaining Your Freedom",
        text: "Deliverance is the beginning, not the end. You must guard your gates: what you watch, read, listen to, who you spend time with. One compromised gate can undo deliverance. Build discipline around your thought life, entertainment, and relationships."
      },
      {
        section: "Building Spiritual Disciplines",
        text: "Freedom requires maintenance: daily prayer, Scripture reading, worship, fellowship with believers, Sabbath rest, fasting. These aren't legalistic rules—they're protective hedges that keep you filled with the Spirit and resistant to demonic re-entry."
      },
      {
        section: "Walking in Your Authority",
        text: "You have authority in Yahusha's name (Luke 10:19). When temptation or oppression returns, immediately resist it (James 4:7). Don't negotiate or engage—command it to leave. Remember who you are: seated with Mashiach in heavenly places (Ephesians 2:6)."
      }
    ]
  }
};

const TeachingContent = () => {
  const { id } = useParams<{ id: string }>();
  const teaching = id ? teachings[id as keyof typeof teachings] : null;

  if (!teaching) {
    return (
      <div className="min-h-screen bg-gradient-light flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <CardContent className="text-center space-y-4">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground" />
            <h2 className="font-serif text-2xl font-bold">Teaching Not Found</h2>
            <Button asChild>
              <Link to="/resources">Back to Resources</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-light">
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
              <h1 className="font-serif text-2xl md:text-3xl font-bold">{teaching.title}</h1>
              <p className="text-sm text-muted-foreground">{teaching.duration}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="bg-gradient-spiritual text-primary-foreground">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              <CardTitle className="text-3xl">{teaching.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            {teaching.content.map((section, index) => (
              <div key={index} className="space-y-3">
                <h2 className="font-serif text-2xl font-semibold text-primary">
                  {section.section}
                </h2>
                <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                  {section.text}
                </p>
              </div>
            ))}
            
            <div className="mt-12 p-6 bg-accent/20 rounded-lg border-l-4 border-primary">
              <p className="text-sm italic text-foreground/80">
                "If the Son sets you free, you will be free indeed." - John 8:36
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeachingContent;
