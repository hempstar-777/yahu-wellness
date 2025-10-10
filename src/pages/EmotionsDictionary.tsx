import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChevronLeft, Heart, Brain, Sparkles, Leaf, Scale, Flame, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const EmotionsDictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("All");

  const deadlySins = [
    {
      sin: "Pride",
      virtue: "Humility",
      sinSpiritual: "Root of all sin. Lucifer's original fall (Isaiah 14:12-15). God opposes the proud (James 4:6)",
      sinMind: "Superiority complex, unable to receive correction, blind to own faults, arrogance",
      sinBody: "Rigid posture, chronic tension from maintaining false image, stress-related illness",
      sinSoul: "Blocks intimacy with God, prevents growth, leads to isolation and eventual downfall",
      sinDoorway: "Major gateway for Leviathan spirit, rebellion, independence, Jezebel, antichrist spirit",
      sinParasites: "Pride creates spiritual blindness to physical issues, neglects body care",
      sinHerbs: "Pride must be broken through repentance—no herb can substitute humility",
      sinDeliverance: "Humble yourself before God, repent of pride and self-exaltation, break Leviathan, receive grace",
      virtueSpiritual: "God gives grace to the humble (James 4:6). Key to all other virtues and breakthrough",
      virtueMind: "Teachability, openness to correction, accurate self-assessment, gratitude",
      virtueBody: "Relaxed posture, reduced stress, better health from accepting limitations",
      virtueSoul: "Opens to God's presence, attracts divine favor, builds authentic relationships",
      virtueHerbs: "Ashwagandha for grounding, Holy Basil for surrender, Valerian for releasing control",
      virtuePractice: "Confession of faults, serving others, washing feet, accepting correction gracefully"
    },
    {
      sin: "Greed/Avarice",
      virtue: "Generosity/Charity",
      sinSpiritual: "Idolatry—making money your god (Colossians 3:5). Cannot serve God and mammon (Matthew 6:24)",
      sinMind: "Scarcity mindset, obsessive thoughts about money, hoarding, financial anxiety",
      sinBody: "Stress-related digestive issues, ulcers, heart problems from financial worry",
      sinSoul: "Loss of compassion, exploitation of others, spiritual emptiness despite material gain",
      sinDoorway: "Opens to mammon spirit, poverty spirit (ironically), greed demon, theft, corruption",
      sinParasites: "Chronic stress from greed creates gut parasites, digestive disorders",
      sinHerbs: "Dandelion (release bitterness), Milk Thistle (liver detox from toxic accumulation)",
      sinDeliverance: "Renounce mammon, break agreements with greed, give sacrificially, trust God's provision",
      virtueSpiritual: "God loves a cheerful giver (2 Corinthians 9:7). Generosity opens heaven's windows (Malachi 3:10)",
      virtueMind: "Abundance mindset, joy in giving, freedom from financial worry",
      virtueBody: "Reduced stress hormones, better sleep, improved cardiovascular health",
      virtueSoul: "Joy, freedom from bondage to money, trust in God's provision",
      virtueHerbs: "Hawthorn for open heart, Rose for unconditional giving",
      virtuePractice: "Tithing, almsgiving, radical generosity, supporting missions and the poor"
    },
    {
      sin: "Lust",
      virtue: "Chastity/Purity",
      sinSpiritual: "Fornication joins you to harlot spirit (1 Corinthians 6:16). Defiles temple of Holy Spirit",
      sinMind: "Obsessive sexual thoughts, objectification, pornographic addiction, fantasy bondage",
      sinBody: "STDs, erectile dysfunction, hormonal chaos, premature aging, chronic fatigue",
      sinSoul: "Creates soul ties with every partner, fragments personality, deep shame cycles",
      sinDoorway: "Gateway for perversion spirits, pornography, incubus/succubus, sexual abuse, adultery",
      sinParasites: "Sexual sin linked to candida overgrowth, parasites in reproductive organs, UTIs",
      sinHerbs: "Saw Palmetto, Chaste Tree berry for hormonal balance (but deliverance is primary)",
      sinDeliverance: "Renounce all sexual sin, break soul ties, cast out lust and perversion, receive purity",
      virtueSpiritual: "Your body is temple of Holy Spirit (1 Corinthians 6:19). Purity brings God's manifest presence",
      virtueMind: "Clean thought life, ability to see people as image-bearers, mental clarity",
      virtueBody: "Hormonal balance, sexual health, vitality, radiant countenance",
      virtueSoul: "Freedom from shame, capacity for true intimacy in marriage, wholeness",
      virtueHerbs: "White Peony for hormonal balance, Damiana for healthy sexuality in marriage",
      virtuePractice: "Guarding eyes and thoughts, accountability, fasting, worship, covenant marriage intimacy"
    },
    {
      sin: "Envy",
      virtue: "Kindness/Contentment",
      sinSpiritual: "Envy is rottenness to the bones (Proverbs 14:30). Root of witchcraft and murder (James 3:16)",
      sinMind: "Constant comparison, covetousness, resentment of others' blessings, never satisfied",
      sinBody: "Bone diseases, osteoporosis, arthritis, skeletal weakness, joint pain",
      sinSoul: "Destroys joy, prevents gratitude, creates competition rather than community",
      sinDoorway: "Opens to witchcraft, jealousy, murder, Jezebel spirit, cursing others",
      sinParasites: "Acidic internal environment from envy breeds bone parasites and calcium depletion",
      sinHerbs: "Nettles for bone health, Alfalfa for mineral restoration, Horsetail for skeletal support",
      sinDeliverance: "Repent of envy and jealousy, bless those you envied, break witchcraft, receive contentment",
      virtueSpiritual: "Contentment with godliness is great gain (1 Timothy 6:6). Blessing others multiplies blessing",
      virtueMind: "Celebrates others' victories, gratitude for own portion, peaceful satisfaction",
      virtueBody: "Strong bones, healthy skeletal system, reduced inflammation",
      virtueSoul: "Joy, peace, authentic community, freedom from comparison trap",
      virtueHerbs: "Oatstraw for contentment, Ashwagandha for grounding in present blessings",
      virtuePractice: "Gratitude journaling, celebrating others, blessing competitors, counting your blessings"
    },
    {
      sin: "Gluttony",
      virtue: "Temperance/Self-Control",
      sinSpiritual: "Belly becomes your god (Philippians 3:19). Excess reveals lack of Spirit control",
      sinMind: "Compulsive eating, food obsession, emotional eating, lack of self-regulation",
      sinBody: "Obesity, diabetes, heart disease, metabolic syndrome, digestive disorders, fatigue",
      sinSoul: "Using food to fill spiritual void, avoiding emotions, shame and self-hatred cycles",
      sinDoorway: "Opens to addiction spirits, compulsion, eating disorders, gluttony demon, sloth",
      sinParasites: "Overeating and sugar feed candida, parasites, harmful bacteria in gut",
      sinHerbs: "Gymnema (sugar blocker), Bitter Melon (blood sugar), Garcinia Cambogia (appetite control)",
      sinDeliverance: "Renounce gluttony, break agreement with food addiction, receive self-control from Holy Spirit",
      virtueSpiritual: "Self-control is fruit of the Spirit (Galatians 5:23). Fasting builds spiritual strength",
      virtueMind: "Mindful eating, emotional regulation, freedom from food obsession",
      virtueBody: "Healthy weight, balanced metabolism, strong digestion, high energy",
      virtueSoul: "Food in proper place, spiritual hunger satisfied in God, emotional maturity",
      virtueHerbs: "Fenugreek for appetite regulation, Cinnamon for blood sugar balance",
      virtuePractice: "Fasting, intermittent fasting, eating only when hungry, gratitude before meals, portion control"
    },
    {
      sin: "Wrath/Anger",
      virtue: "Patience/Meekness",
      sinSpiritual: "Anger gives devil a foothold (Ephesians 4:26-27). Leads to murder in heart (Matthew 5:22)",
      sinMind: "Hair-trigger temper, rage episodes, resentment, vengeful thoughts, explosive reactions",
      sinBody: "High blood pressure, cardiovascular disease, strokes, chronic inflammation, adrenal fatigue",
      sinSoul: "Destroys relationships, hardens heart, blocks love and compassion, creates isolation",
      sinDoorway: "Gateway for rage spirit, violence, murder, retaliation, unforgiveness, bitterness",
      sinParasites: "Chronic inflammation from anger creates breeding ground for all disease and pathogens",
      sinHerbs: "Passionflower for calming rage, Wood Betony for anger release, Chamomile for peace",
      sinDeliverance: "Forgive all offenders, renounce anger and wrath, break spirit of violence and rage",
      virtueSpiritual: "Meekness inherits the earth (Matthew 5:5). Slow to anger reflects God's character (Exodus 34:6)",
      virtueMind: "Calm responses, emotional regulation, ability to pause before reacting, understanding",
      virtueBody: "Normal blood pressure, cardiovascular health, reduced inflammation, longevity",
      virtueSoul: "Peace in relationships, strength under control, gentle influence, respect from others",
      virtueHerbs: "Lemon Balm for calm responses, Lavender for peace, Holy Basil for stress adaptation",
      virtuePractice: "Count to 10, walk away practice, forgiveness prayers, blessing enemies, anger journaling"
    },
    {
      sin: "Sloth/Acedia",
      virtue: "Diligence/Zeal",
      sinSpiritual: "Spiritual laziness—not pursuing God despite knowing truth. Lukewarm Christianity (Revelation 3:16)",
      sinMind: "Procrastination, apathy, inability to start or finish, decision paralysis, mental fog",
      sinBody: "Physical weakness, poor muscle tone, chronic fatigue, low vitality, lethargy",
      sinSoul: "Loss of vision and purpose, wasted calling, unfulfilled potential, regret",
      sinDoorway: "Opens to spirit of slumber, procrastination, poverty, death, heaviness, depression",
      sinParasites: "Sedentary lifestyle and poor circulation create stagnation for parasites and toxins",
      sinHerbs: "Ginseng for energy, Rhodiola for motivation, Guarana for alertness (address spiritual root first)",
      sinDeliverance: "Repent of sloth and spiritual laziness, break spirit of slumber, receive zeal and fire",
      virtueSpiritual: "Zeal for God's house consumes me (Psalm 69:9). Work as unto the Lord (Colossians 3:23)",
      virtueMind: "Clarity of purpose, motivation, follow-through, excellence mindset, creativity",
      virtueBody: "Physical strength, vitality, energy, robust health, strong immune function",
      virtueSoul: "Fulfillment of calling, sense of purpose, satisfaction in work, legacy building",
      virtueHerbs: "Eleuthero for sustained energy, Maca for vitality, Green Tea for focus",
      virtuePractice: "Daily disciplines, goal setting, accountability, work unto the Lord, pursuing excellence"
    }
  ];

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
    },
    {
      name: "Courage",
      spiritual: "Spirit of power, not fear (2 Timothy 1:7). Reflects God's strength",
      mind: "Activates prefrontal cortex, overrides fear response, builds confidence",
      body: "Increases adrenaline positively, strengthens nervous system",
      soul: "Conquers intimidation, builds spiritual authority",
      herbs: "Ginseng, Rhodiola for strength and resilience",
      practice: "Facing fears with prayer, bold declarations, faith actions"
    },
    {
      name: "Patience",
      spiritual: "Fruit of the Spirit (Galatians 5:22). Reflects God's long-suffering",
      mind: "Reduces impulsivity, improves emotional regulation",
      body: "Lowers cortisol, reduces inflammation, improves longevity",
      soul: "Builds character, increases capacity for endurance",
      herbs: "Chamomile, Lemon Balm for calm waiting",
      practice: "Waiting on God, delayed gratification exercises, silent prayer"
    },
    {
      name: "Kindness",
      spiritual: "God's kindness leads to repentance (Romans 2:4)",
      mind: "Activates reward centers, increases empathy and social connection",
      body: "Releases oxytocin, reduces blood pressure, improves immunity",
      soul: "Softens heart, attracts divine favor and blessing",
      herbs: "Rose, Lavender for gentleness",
      practice: "Random acts of kindness, speaking blessing, generous giving"
    },
    {
      name: "Gentleness",
      spiritual: "Strength under control. Reflects Christ's meekness",
      mind: "Calms reactivity, improves communication and relationships",
      body: "Reduces muscle tension, lowers blood pressure",
      soul: "Breaks cycles of aggression, attracts respect",
      herbs: "Chamomile, Lavender, Holy Basil for soft strength",
      practice: "Soft answers, controlled speech, tender touch"
    },
    {
      name: "Self-Control",
      spiritual: "Fruit of the Spirit. Mastery over flesh and impulses",
      mind: "Strengthens willpower, improves decision-making",
      body: "Balances hormones, supports healthy weight and habits",
      soul: "Builds discipline, prevents regret and shame",
      herbs: "Gymnema for sugar cravings, Ashwagandha for impulse control",
      practice: "Fasting, saying no, delaying gratification, accountability"
    },
    {
      name: "Humility",
      spiritual: "God gives grace to the humble (James 4:6)",
      mind: "Accurate self-assessment, teachability, openness to correction",
      body: "Reduces stress from maintaining false image, relaxed posture",
      soul: "Opens to God's presence, attracts favor, builds authenticity",
      herbs: "Holy Basil for surrender, Ashwagandha for grounding",
      practice: "Confession of faults, serving others, receiving correction"
    },
    {
      name: "Forgiveness",
      spiritual: "As God forgave you (Colossians 3:13). Releases divine mercy",
      mind: "Frees from resentment loops, improves mental health",
      body: "Reduces inflammation, lowers blood pressure, strengthens immunity",
      soul: "Breaks bitterness, heals relationships, attracts God's forgiveness",
      herbs: "Milk Thistle for liver/anger release, Rose for heart healing",
      practice: "Forgiving from the heart, releasing judgment, blessing enemies"
    },
    {
      name: "Awe/Wonder",
      spiritual: "Fear of the Lord is beginning of wisdom (Proverbs 9:10)",
      mind: "Expands perspective, reduces self-focus, inspires creativity",
      body: "Reduces inflammation, activates vagus nerve, improves immunity",
      soul: "Connects to God's majesty, cultivates worship",
      herbs: "Gotu Kola, Brahmi for spiritual perception",
      practice: "Creation observation, contemplative prayer, worship"
    },
    {
      name: "Serenity",
      spiritual: "Peace that surpasses understanding (Philippians 4:7)",
      mind: "Calms mental chatter, improves focus and clarity",
      body: "Deep relaxation, lowers cortisol, improves sleep",
      soul: "Rest in God's sovereignty, freedom from striving",
      herbs: "Passionflower, Skullcap, Lavender for deep peace",
      practice: "Contemplative prayer, stillness before God, Sabbath rest"
    },
    {
      name: "Enthusiasm",
      spiritual: "En-theos: God within. Reflects divine passion",
      mind: "Increases motivation, creativity, and engagement",
      body: "Boosts energy, strengthens immune system",
      soul: "Aligns with calling, ignites purpose",
      herbs: "Ginseng, Rhodiola for sustained enthusiasm",
      practice: "Pursuing calling, passionate worship, vision casting"
    },
    {
      name: "Delight",
      spiritual: "Delight in the Lord (Psalm 37:4). Receives heart's desires",
      mind: "Activates pleasure centers, increases satisfaction",
      body: "Releases endorphins, improves mood and energy",
      soul: "Celebrates God's goodness, attracts more blessing",
      herbs: "Damiana, Cacao for joy and pleasure",
      practice: "Enjoying God's gifts, celebration, savoring moments"
    },
    {
      name: "Confidence",
      spiritual: "Boldness through Christ (Hebrews 4:16). Access to God's throne",
      mind: "Reduces self-doubt, improves performance and decision-making",
      body: "Strong posture, reduced stress hormones",
      soul: "Knows identity in Christ, walks in authority",
      herbs: "Ginseng, Ashwagandha for inner strength",
      practice: "Identity declarations, bold prayer, faith risks"
    },
    {
      name: "Tenderness",
      spiritual: "God's tender mercies (Psalm 103:4)",
      mind: "Softens harsh responses, increases nurturing",
      body: "Releases oxytocin, calms nervous system",
      soul: "Opens to vulnerability, deepens intimacy",
      herbs: "Rose, Motherwort for heart softening",
      practice: "Gentle touch, soft words, nurturing care"
    },
    {
      name: "Playfulness",
      spiritual: "Joy of the Lord is your strength (Nehemiah 8:10)",
      mind: "Reduces stress, increases creativity and problem-solving",
      body: "Lowers cortisol, improves immune function",
      soul: "Breaks heaviness, cultivates childlike faith",
      herbs: "Lemon Balm, Damiana for lightness",
      practice: "Laughter, play, celebrating, not taking self too seriously"
    },
    {
      name: "Thankfulness",
      spiritual: "In everything give thanks (1 Thessalonians 5:18)",
      mind: "Rewires brain for positivity, combats negativity bias",
      body: "Improves sleep, reduces inflammation, boosts immunity",
      soul: "Opens gates to God's presence, attracts blessing",
      herbs: "Tulsi, Hawthorn for grateful heart",
      practice: "Thank-you prayers, gratitude lists, expressing appreciation"
    },
    {
      name: "Reverence",
      spiritual: "Holy fear of the Lord brings wisdom and life",
      mind: "Cultivates respect, reduces arrogance",
      body: "Humble posture, calm demeanor",
      soul: "Positions for divine encounter, attracts God's presence",
      herbs: "Frankincense, Myrrh for sacred awareness",
      practice: "Worship, honoring God, treating sacred things with respect"
    },
    {
      name: "Zeal",
      spiritual: "Zeal for God's house consumes me (Psalm 69:9)",
      mind: "Passionate focus, tireless pursuit of goals",
      body: "High energy, strong vitality, endurance",
      soul: "Burning heart for God's purposes, contagious passion",
      herbs: "Ginseng, Eleuthero for sustained zeal",
      practice: "Passionate worship, pursuing calling, holy ambition"
    },
    {
      name: "Mercy",
      spiritual: "Blessed are the merciful (Matthew 5:7). Receives God's mercy",
      mind: "Reduces judgment, increases empathy and compassion",
      body: "Lowers stress from holding grudges, improves heart health",
      soul: "Reflects God's nature, attracts divine favor",
      herbs: "Rose, Hawthorn for merciful heart",
      practice: "Showing mercy to offenders, giving second chances, compassionate acts"
    },
    {
      name: "Generosity",
      spiritual: "God loves a cheerful giver (2 Corinthians 9:7)",
      mind: "Abundance mindset, joy in giving",
      body: "Reduces stress, improves mood through giving",
      soul: "Breaks poverty spirit, opens heavens' windows",
      herbs: "Hawthorn for open heart, Rose for giving",
      practice: "Tithing, almsgiving, generous giving, blessing others"
    },
    {
      name: "Wisdom",
      spiritual: "Fear of the Lord is beginning of wisdom (Proverbs 9:10)",
      mind: "Discernment, good judgment, applied knowledge",
      body: "Reduces stress from foolish choices, better health decisions",
      soul: "Navigates life successfully, honors God",
      herbs: "Ginkgo, Gotu Kola, Brahmi for mental clarity",
      practice: "Seeking counsel, studying Scripture, learning from mistakes"
    },
    {
      name: "Admiration",
      spiritual: "Looking unto Jesus (Hebrews 12:2). Transforms into His image",
      mind: "Positive role modeling, inspiration, aspiration",
      body: "Releases positive hormones, motivates improvement",
      soul: "Becomes like what we behold, draws us higher",
      herbs: "Gotu Kola for clarity of vision",
      practice: "Studying heroes of faith, looking to Jesus, honoring mentors"
    },
    {
      name: "Affection",
      spiritual: "God's love poured out in our hearts (Romans 5:5)",
      mind: "Bonding, attachment, warm feelings toward others",
      body: "Releases oxytocin, improves immune function",
      soul: "Builds intimacy, expresses love tangibly",
      herbs: "Rose, Hawthorn for heart warmth",
      practice: "Physical touch, verbal affirmation, quality time"
    },
    {
      name: "Alertness",
      spiritual: "Watch and pray (Matthew 26:41). Spiritual vigilance",
      mind: "Heightened awareness, quick response, attentiveness",
      body: "Balanced adrenaline, strong nervous system",
      soul: "Discerns spirits, recognizes opportunities",
      herbs: "Green Tea, Ginseng for alertness",
      practice: "Prayer watching, spiritual discernment, staying awake"
    },
    {
      name: "Amazement",
      spiritual: "Marveling at God's works (Psalm 139:14)",
      mind: "Opens mind to possibilities, reduces cynicism",
      body: "Activates wonder response, improves well-being",
      soul: "Cultivates childlike faith, worship posture",
      herbs: "Gotu Kola for wonder",
      practice: "Noticing miracles, celebrating testimonies, wonder walks"
    },
    {
      name: "Anticipation",
      spiritual: "Eager expectation of glory (Romans 8:19)",
      mind: "Forward-looking, hopeful excitement",
      body: "Positive stress response, energizing",
      soul: "Builds faith, creates expectancy for God's goodness",
      herbs: "Damiana for joyful anticipation",
      practice: "Prophetic declarations, hopeful waiting, vision boards"
    },
    {
      name: "Appreciation",
      spiritual: "Recognizing God's blessings with thanksgiving",
      mind: "Values what is present, reduces taking for granted",
      body: "Releases gratitude hormones, improves mood",
      soul: "Cultivates contentment, honors relationships",
      herbs: "Rose, Tulsi for appreciation",
      practice: "Expressing thanks, noticing blessings, honoring others"
    },
    {
      name: "Assurance",
      spiritual: "Full assurance of faith (Hebrews 10:22)",
      mind: "Certainty, confidence in beliefs and promises",
      body: "Reduces anxiety, improves sleep",
      soul: "Stands firm, unshakeable faith",
      herbs: "Ashwagandha for inner certainty",
      practice: "Declaring God's promises, standing on Word, testimony"
    },
    {
      name: "Boldness",
      spiritual: "Boldness to enter holiest place (Hebrews 10:19)",
      mind: "Courage to act, confidence in expression",
      body: "Strong posture, clear voice, assertive presence",
      soul: "Spiritual authority, overcoming intimidation",
      herbs: "Ginseng, Rhodiola for courage",
      practice: "Bold prayer, faith risks, speaking truth"
    },
    {
      name: "Calmness",
      spiritual: "Peace, be still (Mark 4:39). Jesus' authority over storms",
      mind: "Composed mind, emotional stability",
      body: "Low cortisol, relaxed muscles, steady heart rate",
      soul: "Inner stillness, unmoved by circumstances",
      herbs: "Chamomile, Passionflower for calm",
      practice: "Deep breathing, stillness practice, trusting God"
    },
    {
      name: "Cheerfulness",
      spiritual: "A merry heart does good like medicine (Proverbs 17:22)",
      mind: "Optimistic outlook, positive attitude",
      body: "Boosts immune system, releases endorphins",
      soul: "Lightness of being, infectious joy",
      herbs: "St. John's Wort, Lemon Balm for cheer",
      practice: "Choosing joy, smiling, encouraging others"
    },
    {
      name: "Comfort",
      spiritual: "God of all comfort (2 Corinthians 1:3)",
      mind: "Emotional soothing, reassurance",
      body: "Relaxation response, oxytocin release",
      soul: "Receives divine consolation, peace in trials",
      herbs: "Chamomile, Lavender for comfort",
      practice: "Receiving God's comfort, comforting others, safe spaces"
    },
    {
      name: "Determination",
      spiritual: "Finishing the race (2 Timothy 4:7). Perseverance in faith",
      mind: "Resolute will, persistent effort",
      body: "Sustained energy, endurance",
      soul: "Refuses to quit, overcomes obstacles",
      herbs: "Ginseng, Rhodiola for stamina",
      practice: "Setting goals, enduring hardship, faith persistence"
    },
    {
      name: "Eagerness",
      spiritual: "Run with endurance (Hebrews 12:1). Passionate pursuit",
      mind: "Enthusiastic readiness, keen interest",
      body: "Energized, motivated movement",
      soul: "Hungry for God, zealous for righteousness",
      herbs: "Ginseng, Eleuthero for eagerness",
      practice: "Pursuing God, seeking first His kingdom, zealous service"
    },
    {
      name: "Elation",
      spiritual: "Rejoice in the Lord always (Philippians 4:4)",
      mind: "Extreme happiness, euphoria",
      body: "Endorphin surge, full-body joy",
      soul: "Celebrates God's goodness, overflowing praise",
      herbs: "St. John's Wort, Damiana for elation",
      practice: "Celebration, worship, testifying of God's goodness"
    },
    {
      name: "Empathy",
      spiritual: "Weep with those who weep (Romans 12:15)",
      mind: "Emotional attunement, understanding others",
      body: "Mirror neurons activate, oxytocin release",
      soul: "Compassionate connection, bearing burdens",
      herbs: "Rose, Motherwort for empathic heart",
      practice: "Active listening, feeling with others, compassionate presence"
    },
    {
      name: "Encouragement",
      spiritual: "Barnabas - son of encouragement. Builds others up",
      mind: "Uplifting thoughts and words toward others",
      body: "Releases positive hormones in giver and receiver",
      soul: "Strengthens others' faith, multiplies hope",
      herbs: "Hawthorn for encouraging heart",
      practice: "Speaking life, affirming others, prophetic encouragement"
    },
    {
      name: "Enlightenment",
      spiritual: "Eyes of understanding enlightened (Ephesians 1:18)",
      mind: "Spiritual illumination, revelation, aha moments",
      body: "Neural connections form, brain lights up",
      soul: "Sees truth clearly, receives divine wisdom",
      herbs: "Gotu Kola, Brahmi for mental clarity",
      practice: "Studying Scripture, meditation, asking for wisdom"
    },
    {
      name: "Euphoria",
      spiritual: "Joy unspeakable and full of glory (1 Peter 1:8)",
      mind: "Intense happiness, blissful state",
      body: "Endorphin flood, full-body bliss",
      soul: "Touched by God's presence, ecstatic worship",
      herbs: "Damiana, Cacao for euphoric states",
      practice: "Extended worship, encountering God's presence"
    },
    {
      name: "Excitement",
      spiritual: "Rejoicing in hope (Romans 12:12). Anticipation of goodness",
      mind: "Energized enthusiasm, heightened arousal",
      body: "Adrenaline release, increased heart rate",
      soul: "Expectant faith, joyful anticipation",
      herbs: "Ginseng, Rhodiola for positive excitement",
      practice: "Celebrating promises, testimonies, expectant prayer"
    },
    {
      name: "Fascination",
      spiritual: "Drawn to God's beauty and mysteries",
      mind: "Intense interest, captivated attention",
      body: "Focused energy, engaged senses",
      soul: "Pursuit of God, hunger for more",
      herbs: "Gotu Kola for focused fascination",
      practice: "Studying God's Word, exploring creation, seeking mysteries"
    },
    {
      name: "Fulfillment",
      spiritual: "My food is to do His will (John 4:34). Complete satisfaction",
      mind: "Deep satisfaction, sense of completion",
      body: "Relaxed contentment, balanced hormones",
      soul: "Walking in purpose, pleasing God",
      herbs: "Ashwagandha, Oatstraw for fulfillment",
      practice: "Living in calling, obedience, serving God's purposes"
    },
    {
      name: "Gladness",
      spiritual: "Make a joyful noise (Psalm 100:1). Vocal joy",
      mind: "Light-hearted happiness, cheerful mood",
      body: "Releases happy hormones, smiling",
      soul: "Celebrates life, expresses joy freely",
      herbs: "Lemon Balm, St. John's Wort for gladness",
      practice: "Praise, singing, declaring joy"
    },
    {
      name: "Gratification",
      spiritual: "Good and faithful servant (Matthew 25:21). Reward and satisfaction",
      mind: "Reward response, satisfaction from achievement",
      body: "Dopamine release, pleasure",
      soul: "Enjoys fruits of labor, receives God's approval",
      herbs: "Damiana for healthy pleasure",
      practice: "Celebrating wins, receiving God's pleasure"
    },
    {
      name: "Hopefulness",
      spiritual: "Hope does not disappoint (Romans 5:5)",
      mind: "Optimistic expectation, forward focus",
      body: "Energizing, motivating",
      soul: "Anchored in God's promises, unwavering expectation",
      herbs: "Lemon Balm, Damiana for hope",
      practice: "Declaring promises, vision casting, prophetic hope"
    },
    {
      name: "Inspiration",
      spiritual: "All Scripture is God-breathed (2 Timothy 3:16). Divine breath",
      mind: "Creative surge, motivated action",
      body: "Energized, awakened",
      soul: "Touched by divine ideas, co-creating with God",
      herbs: "Ginkgo, Gotu Kola for inspiration",
      practice: "Worship, prayer, creative expression"
    },
    {
      name: "Interest",
      spiritual: "Hunger for righteousness (Matthew 5:6)",
      mind: "Curiosity, engagement, attention",
      body: "Focused energy",
      soul: "Pursuit of God, seeking understanding",
      herbs: "Green Tea, Gotu Kola for focused interest",
      practice: "Bible study, asking questions, seeking God"
    },
    {
      name: "Intimacy",
      spiritual: "Abide in Me (John 15:4). Closeness with God and others",
      mind: "Deep connection, vulnerability, knowing and being known",
      body: "Oxytocin release, bonding",
      soul: "Union with God, covenant love",
      herbs: "Rose, Damiana for intimacy",
      practice: "Secret place prayer, covenant relationships, vulnerability"
    },
    {
      name: "Invigoration",
      spiritual: "Those who wait on the Lord renew strength (Isaiah 40:31)",
      mind: "Mental refreshment, renewed energy",
      body: "Physical vitality, renewed strength",
      soul: "Spiritual renewal, fresh anointing",
      herbs: "Ginseng, Maca, Eleuthero for vigor",
      practice: "Sabbath rest, waiting on God, renewing in His presence"
    },
    {
      name: "Jubilation",
      spiritual: "Shout for joy (Psalm 47:1). Exuberant celebration",
      mind: "Extreme joy, triumphant celebration",
      body: "Full-body expression of joy",
      soul: "Victory celebration, triumphant praise",
      herbs: "Damiana, Cacao for jubilation",
      practice: "Victory dances, shouting praise, celebrating breakthroughs"
    },
    {
      name: "Lightness",
      spiritual: "Cast burdens on the Lord (Psalm 55:22). Freedom from heaviness",
      mind: "Unburdened mind, carefree thoughts",
      body: "Relaxed, floating sensation",
      soul: "Freedom from oppression, joyful spirit",
      herbs: "Lemon Balm, Lavender for lightness",
      practice: "Releasing burdens, worship, laughter"
    },
    {
      name: "Liveliness",
      spiritual: "In Him we live and move (Acts 17:28). Animated by God's life",
      mind: "Energetic thoughts, quick wit",
      body: "High energy, vitality, animation",
      soul: "Abundant life flowing, contagious vitality",
      herbs: "Ginseng, Rhodiola for liveliness",
      practice: "Spirit-filled living, expressing life abundantly"
    },
    {
      name: "Longing",
      spiritual: "As deer pants for water (Psalm 42:1). Holy desire for God",
      mind: "Deep yearning, passionate desire",
      body: "Ache for fulfillment, restlessness until satisfied",
      soul: "Hunger for God, divine dissatisfaction with lesser things",
      herbs: "Rose, Hawthorn for holy longing",
      practice: "Fasting, seeking God, prayer for more of Him"
    },
    {
      name: "Openness",
      spiritual: "Open my eyes to see (Psalm 119:18). Receptivity to God",
      mind: "Receptive mindset, non-judgmental, teachable",
      body: "Relaxed, receptive posture",
      soul: "Available to God, surrendered",
      herbs: "Holy Basil, Gotu Kola for openness",
      practice: "Listening prayer, surrender, receiving correction"
    },
    {
      name: "Optimism",
      spiritual: "All things work together for good (Romans 8:28)",
      mind: "Positive expectation, hopeful outlook",
      body: "Reduces stress hormones, improves immunity",
      soul: "Trust in God's goodness despite circumstances",
      herbs: "St. John's Wort, Lemon Balm for optimism",
      practice: "Positive declarations, faith perspective, gratitude"
    },
    {
      name: "Passion",
      spiritual: "Fervent in spirit (Romans 12:11). Holy fire",
      mind: "Intense desire, powerful motivation",
      body: "Energized, burning with purpose",
      soul: "Consumed with zeal for God",
      herbs: "Ginseng, Damiana for healthy passion",
      practice: "Passionate worship, pursuing calling with fire"
    },
    {
      name: "Pleasure",
      spiritual: "In Your presence is fullness of joy, pleasures forevermore (Psalm 16:11)",
      mind: "Enjoyment, satisfaction, delight",
      body: "Releases dopamine and endorphins",
      soul: "Enjoys God's gifts rightly, holy pleasure",
      herbs: "Cacao, Damiana for pleasure",
      practice: "Enjoying God's presence, celebrating His gifts"
    },
    {
      name: "Pride (Holy)",
      spiritual: "Pride in Christ (Philippians 3:3). Boasting in the Lord",
      mind: "Confidence in God's work, celebration of victories in Christ",
      body: "Upright posture, dignified presence",
      soul: "Knows identity in Christ, celebrates God's work",
      herbs: "Ashwagandha for holy confidence",
      practice: "Testifying of God's goodness, celebrating victories"
    },
    {
      name: "Relief",
      spiritual: "Come to Me and I will give you rest (Matthew 11:28)",
      mind: "Release of worry, relaxation after tension",
      body: "Parasympathetic activation, muscle relaxation",
      soul: "Burden lifted, tension released",
      herbs: "Chamomile, Passionflower for relief",
      practice: "Casting cares on Jesus, releasing control"
    },
    {
      name: "Respect",
      spiritual: "Honor all people (1 Peter 2:17). Seeing image of God in others",
      mind: "Valuing others, esteeming worth",
      body: "Respectful posture and tone",
      soul: "Honors God by honoring His creation",
      herbs: "Rose for respectful heart",
      practice: "Honoring others, speaking respectfully, valuing all"
    },
    {
      name: "Satisfaction",
      spiritual: "Satisfied as with marrow and fatness (Psalm 63:5)",
      mind: "Deep contentment, needs met",
      body: "Fulfilled, satiated, complete",
      soul: "Satisfied in God, lacking nothing",
      herbs: "Oatstraw, Ashwagandha for satisfaction",
      practice: "Contentment in God, celebrating sufficiency"
    },
    {
      name: "Security",
      spiritual: "The Lord is my rock and fortress (Psalm 18:2)",
      mind: "Sense of safety, trust in protection",
      body: "Relaxed nervous system, reduced anxiety",
      soul: "Safe in God's hands, unshakeable foundation",
      herbs: "Ashwagandha, Holy Basil for inner security",
      practice: "Trusting God's protection, abiding in Christ"
    },
    {
      name: "Surprise (Positive)",
      spiritual: "God does exceedingly abundantly above (Ephesians 3:20)",
      mind: "Unexpected joy, delighted shock",
      body: "Quick arousal, excitement response",
      soul: "God's surprises, divine interruptions",
      herbs: "Damiana for joyful surprise",
      practice: "Expectant for God's surprises, celebrating unexpected blessings"
    },
    {
      name: "Sympathy",
      spiritual: "Touched with the feeling of our infirmities (Hebrews 4:15). Jesus sympathizes",
      mind: "Feeling for another's pain, compassionate understanding",
      body: "Empathic mirroring, tender feelings",
      soul: "Shares in others' suffering, offers comfort",
      herbs: "Rose, Motherwort for sympathetic heart",
      practice: "Compassionate presence, feeling with others"
    },
    {
      name: "Tranquility",
      spiritual: "Great peace have those who love Your law (Psalm 119:165)",
      mind: "Undisturbed calm, serene thoughts",
      body: "Complete relaxation, harmonious systems",
      soul: "Deep peace, unmoved by storms",
      herbs: "Passionflower, Lavender, Skullcap for tranquility",
      practice: "Meditation on Word, stillness, soaking in God's presence"
    },
    {
      name: "Triumph",
      spiritual: "Thanks be to God who gives us victory (1 Corinthians 15:57)",
      mind: "Victory mindset, overcoming",
      body: "Victorious posture, strength",
      soul: "More than conquerors, triumphant in Christ",
      herbs: "Ginseng, Rhodiola for victory strength",
      practice: "Declaring victory, testimonies, overcoming faith"
    },
    {
      name: "Trust",
      spiritual: "Trust in the Lord with all your heart (Proverbs 3:5)",
      mind: "Reliance on God, release of control",
      body: "Reduced cortisol, relaxation",
      soul: "Rests in God's faithfulness, unwavering confidence",
      herbs: "Ashwagandha, Holy Basil for trust",
      practice: "Surrender, letting go, trusting God's promises"
    },
    {
      name: "Warmth",
      spiritual: "Hearts burning within us (Luke 24:32). Divine warmth",
      mind: "Friendly disposition, welcoming thoughts",
      body: "Increased circulation, oxytocin release",
      soul: "Love flowing out, inviting presence",
      herbs: "Cinnamon, Ginger, Hawthorn for warmth",
      practice: "Hospitality, warm greetings, loving presence"
    },
    {
      name: "Wholesomeness",
      spiritual: "Be holy for I am holy (1 Peter 1:16). Complete purity",
      mind: "Pure thoughts, integrity",
      body: "Health, vitality, balanced systems",
      soul: "Undivided heart, complete devotion",
      herbs: "Holy Basil, Tulsi for wholeness",
      practice: "Holiness pursuit, purity, integration of life"
    },
    {
      name: "Wonder",
      spiritual: "Wonderful are Your works (Psalm 139:14)",
      mind: "Marveling, amazed curiosity",
      body: "Expansive feeling, awe response",
      soul: "Childlike faith, worshipful amazement",
      herbs: "Gotu Kola for wonder",
      practice: "Observing God's creation, testimonies, miracle watching"
    },
    {
      name: "Yearning",
      spiritual: "My soul thirsts for God (Psalm 63:1)",
      mind: "Deep longing, intense desire",
      body: "Ache for fulfillment",
      soul: "Holy hunger that drives us to God",
      herbs: "Rose, Hawthorn for holy yearning",
      practice: "Fasting, crying out to God, pursuing His presence"
    },
    {
      name: "Determination",
      spiritual: "Pressing toward the goal (Philippians 3:14)",
      mind: "Strong resolve, unwavering focus",
      body: "Firm jaw, steady stance",
      soul: "Persistence in calling",
      herbs: "Ginseng, Rhodiola for endurance",
      practice: "Goal setting, persistent prayer, discipline"
    },
    {
      name: "Curiosity",
      spiritual: "Seeking wisdom (Proverbs 2:1-5)",
      mind: "Active learning, questioning mind",
      body: "Alert posture, engaged senses",
      soul: "Hunger for knowledge of God",
      herbs: "Ginkgo, Bacopa for mental clarity",
      practice: "Scripture study, asking questions, exploration"
    },
    {
      name: "Inspiration",
      spiritual: "God-breathed revelation",
      mind: "Creative flow, new ideas",
      body: "Energized, alert",
      soul: "Connection to divine creativity",
      herbs: "Peppermint, Rosemary for mental stimulation",
      practice: "Worship, meditation, creative expression"
    },
    {
      name: "Relief",
      spiritual: "Burdens lifted by Yahusha (Matthew 11:28)",
      mind: "Release of tension, peace",
      body: "Relaxed muscles, deep breathing",
      soul: "Freedom from weight",
      herbs: "Chamomile, Passionflower for relaxation",
      practice: "Casting cares on God, resting in His provision"
    },
    {
      name: "Amazement",
      spiritual: "Marvel at God's works",
      mind: "Expanded awareness, wonder",
      body: "Wide eyes, open posture",
      soul: "Recognition of divine power",
      herbs: "Gotu Kola for spiritual perception",
      practice: "Observing creation, testimonies"
    },
    {
      name: "Eagerness",
      spiritual: "Zeal for the Lord",
      mind: "Anticipation, readiness",
      body: "Forward-leaning, energized",
      soul: "Hunger for more of God",
      herbs: "Green Tea, Guarana for alertness",
      practice: "Early morning prayer, fasting, pursuit"
    },
    {
      name: "Valor",
      spiritual: "Warrior spirit (Psalm 18:32-34)",
      mind: "Brave, strategic thinking",
      body: "Strong, prepared for battle",
      soul: "Courage in spiritual warfare",
      herbs: "Ginseng, Ashwagandha for strength",
      practice: "Spiritual warfare, bold faith actions"
    },
    {
      name: "Nobility",
      spiritual: "Royal priesthood (1 Peter 2:9)",
      mind: "Dignified thoughts, excellence",
      body: "Upright posture, grace",
      soul: "Knowing your identity in Mashiach",
      herbs: "Saffron for majesty",
      practice: "Walking in authority, representing the King"
    },
    {
      name: "Devotion",
      spiritual: "Wholehearted love for God",
      mind: "Single-minded focus on Yahusha",
      body: "Prostrate worship, lifted hands",
      soul: "Consecration, holy dedication",
      herbs: "Frankincense, Myrrh for worship",
      practice: "Daily sacrifice, worship, prayer"
    },
    {
      name: "Benevolence",
      spiritual: "Goodness of God flowing through you",
      mind: "Thoughts of others' welfare",
      body: "Gentle hands, soft expression",
      soul: "Desire to bless and help",
      herbs: "Rose, Hawthorn for kindness",
      practice: "Acts of service, generosity"
    },
    {
      name: "Triumph",
      spiritual: "Victory in Mashiach (1 Corinthians 15:57)",
      mind: "Confidence in God's promises",
      body: "Raised arms, strong stance",
      soul: "Overcoming spirit",
      herbs: "Ginger, Turmeric for victory",
      practice: "Declaring victory, celebrating breakthroughs"
    },
    {
      name: "Cheer",
      spiritual: "Joy of the Lord is strength",
      mind: "Lightness, positive outlook",
      body: "Smiling, laughter",
      soul: "Inner brightness",
      herbs: "Lemon Balm, St. John's Wort",
      practice: "Celebrating, laughter, fellowship"
    },
    {
      name: "Steadfastness",
      spiritual: "Unmovable in faith (1 Corinthians 15:58)",
      mind: "Consistency, reliability",
      body: "Firm foundation, stability",
      soul: "Loyal to God and His ways",
      herbs: "Eleuthero, Ashwagandha for endurance",
      practice: "Daily faithfulness, perseverance"
    },
    {
      name: "Elation",
      spiritual: "Rejoicing in the Lord always",
      mind: "Heightened joy, euphoria",
      body: "Energy, lightness",
      soul: "Overflow of gladness",
      herbs: "Damiana, Cacao for joy",
      practice: "Praise, thanksgiving, celebration"
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
    },
    {
      name: "Hatred",
      spiritual: "Murderer from the beginning (1 John 3:15). Opens to death spirits",
      mind: "Intense aversion, desire for harm to another",
      body: "Chronic inflammation, cardiovascular disease, toxicity",
      soul: "Destroys capacity to love, hardens heart beyond repair",
      doorway: "Opens to murder, violence, revenge, curses",
      parasites: "Hatred creates highly acidic, toxic environment",
      herbs: "Milk Thistle for liver detox, Rose for heart healing",
      deliverance: "Forgive enemies, renounce hatred, break murder spirits"
    },
    {
      name: "Despair",
      spiritual: "Loss of hope. Opens door to suicide spirits",
      mind: "Belief that nothing will improve, complete hopelessness",
      body: "Depletion of all systems, giving up on life",
      soul: "Soul death, spiritual paralysis",
      doorway: "Suicide, death wish, terminal hopelessness",
      parasites: "Complete depletion allows all pathogens to thrive",
      herbs: "St. John's Wort, Saffron (but deliverance is essential)",
      deliverance: "Break agreement with death, receive hope, cast out despair"
    },
    {
      name: "Terror",
      spiritual: "Extreme fear. Opens to panic and insanity",
      mind: "Overwhelming fear, loss of rational thought",
      body: "Panic attacks, heart palpitations, paralysis",
      soul: "Torment, loss of peace, mental breakdown",
      doorway: "Spirits of panic, insanity, terror, torment",
      parasites: "Extreme stress depletes all resources",
      herbs: "Valerian, Kava Kava for extreme fear",
      deliverance: "Renounce terror, receive perfect love that casts out fear"
    },
    {
      name: "Apathy",
      spiritual: "Lukewarm Christianity (Revelation 3:16). God will vomit out",
      mind: "No motivation, don't care, emotional numbness",
      body: "Low energy, weak systems, susceptibility to disease",
      soul: "Spiritual death, no passion for God or life",
      doorway: "Slumber, death, passivity, lukewarmness",
      parasites: "Apathy creates stagnation for parasites",
      herbs: "Ginseng, Rhodiola (but must break spiritual slumber)",
      deliverance: "Renounce apathy, receive fire of God, break spirit of slumber"
    },
    {
      name: "Confusion",
      spiritual: "God is not author of confusion (1 Corinthians 14:33)",
      mind: "Mental fog, inability to think clearly, disorientation",
      body: "Brain fog, dizziness, coordination issues",
      soul: "Cannot discern truth, lost direction",
      doorway: "Deception, delusion, double-mindedness",
      parasites: "Confusion linked to brain parasites and toxins",
      herbs: "Ginkgo, Gotu Kola for mental clarity",
      deliverance: "Break confusion, receive sound mind, cast out deception"
    },
    {
      name: "Hopelessness",
      spiritual: "Without hope and without God (Ephesians 2:12)",
      mind: "Belief nothing will change, no future expectation",
      body: "Chronic fatigue, giving up on health",
      soul: "Loss of vision, spiritual darkness",
      doorway: "Despair, suicide, death spirits",
      parasites: "Hopelessness depletes life force",
      herbs: "St. John's Wort, Lemon Balm",
      deliverance: "Receive living hope in Christ, break hopelessness"
    },
    {
      name: "Insecurity",
      spiritual: "Orphan spirit, not knowing Father's love",
      mind: "Self-doubt, constant need for validation",
      body: "Nervous system dysregulation, anxiety symptoms",
      soul: "False identity, performance-based worth",
      doorway: "Fear of man, people-pleasing, codependency",
      parasites: "Anxiety from insecurity weakens gut",
      herbs: "Ashwagandha, Tulsi for grounding",
      deliverance: "Receive Father's love, break orphan spirit, know true identity"
    },
    {
      name: "Restlessness",
      spiritual: "No rest apart from God. Driven by striving spirits",
      mind: "Cannot sit still, constant mental agitation",
      body: "Insomnia, fidgeting, exhaustion from constant motion",
      soul: "Cannot enter God's rest, works mentality",
      doorway: "Drivenness, anxiety, insomnia, control",
      parasites: "Restlessness depletes nervous system",
      herbs: "Passionflower, Valerian for rest",
      deliverance: "Enter God's rest, renounce striving, receive peace"
    },
    {
      name: "Dread",
      spiritual: "Anticipation of evil. Fear of the future",
      mind: "Catastrophic thinking about future events",
      body: "Chronic stress, anticipatory anxiety symptoms",
      soul: "Cannot trust God with future, expects worst",
      doorway: "Spirits of fear, anxiety, torment",
      parasites: "Dread creates constant stress response",
      herbs: "Ashwagandha, Holy Basil for anxiety",
      deliverance: "Cast cares on God, trust His plans, break spirit of dread"
    },
    {
      name: "Disgust",
      spiritual: "Can be righteous (hating sin) or demonic (hating people)",
      mind: "Revulsion, contempt, aversion",
      body: "Nausea, gagging, physical rejection response",
      soul: "Separates from others, creates judgment",
      doorway: "If toward people: hatred, murder, elitism",
      parasites: "Disgust creates rejection of good things body needs",
      herbs: "Peppermint for nausea, Rose for acceptance",
      deliverance: "If unrighteous disgust: renounce judgment, receive love"
    },
    {
      name: "Contempt",
      spiritual: "Looking down on others. Pharisee spirit",
      mind: "Scorn, disdain, viewing others as inferior",
      body: "Sneering facial expressions, closed posture",
      soul: "Separates from community, blocks mercy",
      doorway: "Judgment, pride, Pharisee spirit, elitism",
      parasites: "Contempt creates toxic internal environment",
      herbs: "Rose, Hawthorn for heart softening",
      deliverance: "Repent of judgment, receive mercy, break pride"
    },
    {
      name: "Scorn",
      spiritual: "Do not sit in seat of scoffers (Psalm 1:1)",
      mind: "Mocking, derision, treating with contempt",
      body: "Harsh facial expressions, dismissive gestures",
      soul: "Hardens heart, blocks wisdom",
      doorway: "Mockery, blasphemy, hardness of heart",
      parasites: "Scorn creates bitterness and toxicity",
      herbs: "Milk Thistle for bitterness, Rose for softening",
      deliverance: "Repent of mockery, receive teachable spirit"
    },
    {
      name: "Indifference",
      spiritual: "Lukewarm, neither hot nor cold (Revelation 3:16)",
      mind: "Lack of concern, emotional flatness",
      body: "Low energy, disconnection from body signals",
      soul: "Spiritual numbness, no passion",
      doorway: "Apathy, lukewarmness, hardness of heart",
      parasites: "Indifference allows disease to progress unchecked",
      herbs: "Ginseng, Rhodiola to awaken",
      deliverance: "Receive fire of God, break spiritual numbness"
    },
    {
      name: "Resentment",
      spiritual: "Holding grudges. Unforgiveness festering",
      mind: "Bitter thoughts toward specific person, rehearsing wrongs",
      body: "Chronic tension, inflammation, stress",
      soul: "Poisons heart, blocks love and joy",
      doorway: "Bitterness, revenge, hatred",
      parasites: "Resentment creates acidic, toxic environment",
      herbs: "Milk Thistle, Dandelion for liver/bitterness",
      deliverance: "Forgive specific offenses, release judgment, receive freedom"
    },
    {
      name: "Irritability",
      spiritual: "Fruit of unhealed wounds and unforgiveness",
      mind: "Easily annoyed, short fuse, impatient",
      body: "Muscle tension, headaches, digestive issues",
      soul: "Wounds others easily, blocks peace",
      doorway: "Anger, strife, division",
      parasites: "Irritability linked to gut imbalances",
      herbs: "Chamomile, Lemon Balm for calming",
      deliverance: "Heal inner wounds, receive patience, break anger"
    },
    {
      name: "Frustration",
      spiritual: "Often from trying to control what only God can control",
      mind: "Feeling blocked, unable to achieve goals",
      body: "Tension, clenched muscles, stress",
      soul: "Reveals lack of surrender, control issues",
      doorway: "Control, anger, impatience",
      parasites: "Frustration creates stress hormones",
      herbs: "Passionflower, Ashwagandha for release",
      deliverance: "Surrender control to God, receive patience"
    },
    {
      name: "Agitation",
      spiritual: "Stirred up by demonic harassment",
      mind: "Mental restlessness, easily disturbed",
      body: "Cannot be still, nervous energy",
      soul: "No inner peace, easily shaken",
      doorway: "Harassment, torment, chaos",
      parasites: "Agitation depletes nervous system",
      herbs: "Skullcap, Passionflower for calming",
      deliverance: "Command harassing spirits to leave, receive peace"
    },
    {
      name: "Nervousness",
      spiritual: "Lack of trust in God's presence and protection",
      mind: "Anxious anticipation, worried thoughts",
      body: "Trembling, sweating, rapid heartbeat",
      soul: "Cannot rest in God, hypervigilant",
      doorway: "Fear, anxiety, control",
      parasites: "Nervousness depletes magnesium, weakens nerves",
      herbs: "Valerian, Skullcap, Lemon Balm",
      deliverance: "Trust God's presence, break anxiety, receive peace"
    },
    {
      name: "Paranoia",
      spiritual: "Extreme distrust. Persecution complex. Demonic torment",
      mind: "Belief others are out to harm you, conspiracy thinking",
      body: "Hypervigilance, exhaustion, isolation",
      soul: "Cannot trust anyone, complete isolation",
      doorway: "Torment, delusion, fear, isolation",
      parasites: "Paranoia linked to brain inflammation and parasites",
      herbs: "Ashwagandha, Holy Basil (but deliverance essential)",
      deliverance: "Break spirits of paranoia and torment, receive sound mind"
    },
    {
      name: "Suspicion",
      spiritual: "Lack of trust. Can open to Jezebel/witchcraft thinking",
      mind: "Doubting others' motives, assuming worst",
      body: "Tension, guarded posture, stress",
      soul: "Cannot build healthy relationships, isolates",
      doorway: "Distrust, control, witchcraft (reading hearts)",
      parasites: "Suspicion creates chronic stress",
      herbs: "Chamomile, Rose for trust",
      deliverance: "Receive trust, break suspicion, heal wounds"
    },
    {
      name: "Distrust",
      spiritual: "Cannot trust God or others. Betrayal wounds",
      mind: "Expectation of betrayal, walls up",
      body: "Guarded posture, chronic tension",
      soul: "Prevents intimacy, creates loneliness",
      doorway: "Isolation, suspicion, control",
      parasites: "Distrust creates stress and isolation",
      herbs: "Rose, Hawthorn for heart opening",
      deliverance: "Heal betrayal wounds, receive ability to trust again"
    },
    {
      name: "Loneliness",
      spiritual: "Orphan spirit. Forgetting God's presence",
      mind: "Feeling alone even in crowds, disconnection",
      body: "Weakened immune system, depression symptoms",
      soul: "Isolation from God and others",
      doorway: "Isolation, abandonment, rejection",
      parasites: "Loneliness weakens overall health",
      herbs: "St. John's Wort, Rose for connection",
      deliverance: "Receive Father's constant presence, break orphan spirit"
    },
    {
      name: "Abandonment",
      spiritual: "Orphan spirit. Believing God has left you",
      mind: "Fear of being left, clinging behaviors",
      body: "Panic when alone, attachment issues",
      soul: "Cannot trust God or others to stay",
      doorway: "Rejection, orphan spirit, fear",
      parasites: "Abandonment trauma affects all systems",
      herbs: "Motherwort, Tulsi for nervous system healing",
      deliverance: "God will never leave you, break orphan spirit, receive security"
    },
    {
      name: "Sadness",
      spiritual: "Valid emotion but can become gateway if prolonged",
      mind: "Low mood, tears, melancholy",
      body: "Low energy, crying, heaviness",
      soul: "Touches heart, can lead to compassion or depression",
      doorway: "If chronic: depression, heaviness, death",
      parasites: "Chronic sadness depletes neurotransmitters",
      herbs: "St. John's Wort, Lemon Balm",
      deliverance: "If chronic: break spirit of heaviness, receive joy"
    },
    {
      name: "Melancholy",
      spiritual: "Prolonged sadness becoming a stronghold",
      mind: "Persistent low mood, pessimism, dwelling on loss",
      body: "Chronic fatigue, pale complexion, weakness",
      soul: "Soul sadness, loss of joy",
      doorway: "Depression, heaviness, death wish",
      parasites: "Melancholy depletes life force",
      herbs: "St. John's Wort, Saffron, Rose",
      deliverance: "Break melancholy, receive garment of praise"
    },
    {
      name: "Disappointment",
      spiritual: "Unmet expectations. Can lead to bitterness if not processed",
      mind: "Feeling let down, unmet hopes",
      body: "Deflated feeling, low energy",
      soul: "If not surrendered, becomes offense",
      doorway: "Offense, bitterness, disappointment with God",
      parasites: "Disappointment creates stress",
      herbs: "Rose, Hawthorn for processing",
      deliverance: "If chronic: surrender expectations to God, receive hope"
    },
    {
      name: "Discouragement",
      spiritual: "Loss of courage. Enemy tactic to stop progress",
      mind: "Wanting to quit, loss of hope in success",
      body: "Heaviness, low energy, slumped posture",
      soul: "Loss of vision and motivation",
      doorway: "If chronic: despair, quitting, failure",
      parasites: "Discouragement depletes vitality",
      herbs: "Ginseng, Rhodiola for renewed courage",
      deliverance: "Receive fresh courage, prophetic encouragement, break discouragement"
    },
    {
      name: "Defeat",
      spiritual: "Believing you've lost. Opposite of faith",
      mind: "Giving up mentally, acceptance of loss",
      body: "Physical surrender, low energy",
      soul: "Loss of fighting spirit",
      doorway: "Defeatism, quitting, giving up on God's promises",
      parasites: "Defeat allows all disease to progress",
      herbs: "Ginseng, Rhodiola for fighting spirit",
      deliverance: "More than conquerors, receive victory, break defeat"
    },
    {
      name: "Pessimism",
      spiritual: "Expecting worst. Opposite of faith and hope",
      mind: "Negative outlook, expecting failure",
      body: "Impacts health through negative expectations",
      soul: "Cannot receive God's promises",
      doorway: "Unbelief, hopelessness, defeat",
      parasites: "Pessimism creates stress hormones",
      herbs: "St. John's Wort, Lemon Balm",
      deliverance: "Renounce pessimism, receive faith and hope"
    },
    {
      name: "Cynicism",
      spiritual: "Distrust of good motives. Hardened heart",
      mind: "Mocking goodness, assuming worst of everyone",
      body: "Closed posture, sneering expressions",
      soul: "Cannot receive from God or others",
      doorway: "Hardness of heart, mockery, unbelief",
      parasites: "Cynicism creates bitterness and toxicity",
      herbs: "Milk Thistle, Rose for heart softening",
      deliverance: "Break cynicism, receive childlike faith, soften heart"
    },
    {
      name: "Skepticism",
      spiritual: "Chronic doubt. Blocks faith and miracles",
      mind: "Questioning everything, trusting nothing",
      body: "Tense, guarded",
      soul: "Cannot receive by faith",
      doorway: "Unbelief, doubt, rationalism",
      parasites: "Skepticism blocks healing",
      herbs: "Gotu Kola for openness",
      deliverance: "Break unbelief, receive faith, ask for signs"
    },
    {
      name: "Doubt",
      spiritual: "Lack of faith. Prevents receiving from God",
      mind: "Uncertainty, wavering, instability",
      body: "Unstable, double-minded effects",
      soul: "Double-minded, unstable (James 1:8)",
      doorway: "Unbelief, instability, not receiving",
      parasites: "Doubt creates mental instability",
      herbs: "Ashwagandha for grounding",
      deliverance: "Help my unbelief! Receive faith, break doubt"
    },
    {
      name: "Unbelief",
      spiritual: "Opposite of faith. Blocks all miracles",
      mind: "Refusal to believe despite evidence",
      body: "Limits God's healing power",
      soul: "Cannot please God without faith",
      doorway: "Atheism, rationalism, hardness of heart",
      parasites: "Unbelief blocks healing mechanisms",
      herbs: "No herb for unbelief—must choose faith",
      deliverance: "Repent of unbelief, receive faith, break hardness"
    },
    {
      name: "Rebellion",
      spiritual: "Witchcraft (1 Samuel 15:23). Independence from God",
      mind: "Refusal to submit to authority",
      body: "Defiant posture, tension from resistance",
      soul: "Self-will against God's will",
      doorway: "Witchcraft, independence, lawlessness",
      parasites: "Rebellion blocks protective boundaries",
      herbs: "No herb for rebellion—must submit",
      deliverance: "Repent of rebellion, submit to God, break witchcraft"
    },
    {
      name: "Defiance",
      spiritual: "Stubborn refusal to obey. Opens to rebellion spirits",
      mind: "Oppositional mindset, must do opposite",
      body: "Resistant posture, clenched jaw",
      soul: "Self-will over God's will",
      doorway: "Rebellion, stubbornness, lawlessness",
      parasites: "Defiance creates internal resistance",
      herbs: "No herb for defiance—must humble self",
      deliverance: "Break stubbornness, humble self, receive submission"
    },
    {
      name: "Stubbornness",
      spiritual: "Stiff neck. Refuses to bend to God (Exodus 32:9)",
      mind: "Rigid thinking, refuses to change",
      body: "Literal stiff neck, rigidity",
      soul: "Cannot be molded by God",
      doorway: "Rebellion, hardness of heart, pride",
      parasites: "Stubbornness creates physical rigidity",
      herbs: "No herb—must soften heart",
      deliverance: "Break stiff neck, receive teachable spirit"
    },
    {
      name: "Hardness of Heart",
      spiritual: "Cannot receive God's word (Mark 6:52). Pharaoh's heart",
      mind: "Unreceptive, unteachable, closed",
      body: "Rigid, unyielding, tense",
      soul: "Seared conscience, no conviction",
      doorway: "Complete separation from God, reprobate mind",
      parasites: "Hardness blocks all healing",
      herbs: "No herb can soften hard heart—only God",
      deliverance: "Cry out for soft heart, break hardness, receive new heart"
    },
    {
      name: "Offense",
      spiritual: "Stumbling block. Trap of the enemy",
      mind: "Holding onto hurt, nursing wounds",
      body: "Tension, guarded posture",
      soul: "Separates from others and God",
      doorway: "Bitterness, unforgiveness, division",
      parasites: "Offense creates inflammation",
      herbs: "Rose, Milk Thistle for release",
      deliverance: "Choose not to be offended, forgive, release"
    },
    {
      name: "Self-Pity",
      spiritual: "Poor me mentality. Victimhood. Blocks breakthrough",
      mind: "Feeling sorry for self, helpless thinking",
      body: "Slumped posture, sighing, weakness",
      soul: "Attracts more suffering, blocks victory",
      doorway: "Victim mentality, manipulation, infirmity",
      parasites: "Self-pity creates weakness and disease",
      herbs: "Rhodiola, Eleuthero for empowerment",
      deliverance: "Renounce self-pity, take authority, receive strength"
    },
    {
      name: "Self-Hatred",
      spiritual: "Attack on God's image. Self-curse",
      mind: "Negative self-talk, self-condemnation",
      body: "Self-harm, autoimmune (body attacks self)",
      soul: "Destroys identity, blocks receiving love",
      doorway: "Self-harm, suicide, autoimmune disease",
      parasites: "Self-hatred causes body to attack itself",
      herbs: "Rose, Tulsi for self-love (but deliverance essential)",
      deliverance: "Break self-curse, receive God's love and identity"
    },
    {
      name: "Self-Condemnation",
      spiritual: "Agreement with the accuser. Blocks grace",
      mind: "Constant self-criticism, perfectionism",
      body: "Hunched posture, stress from performance",
      soul: "Cannot receive forgiveness or love",
      doorway: "Shame, guilt, self-hatred",
      parasites: "Self-condemnation creates chronic stress",
      herbs: "Milky Oats, Rose for self-acceptance",
      deliverance: "No condemnation in Christ! Break agreement with accuser"
    },
    {
      name: "Perfectionism",
      spiritual: "Never good enough. Performance mentality. Blocks grace",
      mind: "Impossible standards, constant criticism of self",
      body: "Chronic stress, burnout, exhaustion",
      soul: "Can never rest, works righteousness",
      doorway: "Performance, pride, religious spirit",
      parasites: "Perfectionism depletes all resources",
      herbs: "Ashwagandha, Holy Basil for release",
      deliverance: "Receive grace, break performance, rest in finished work"
    },
    {
      name: "Control",
      spiritual: "Witchcraft. Trying to be God. Trust issues",
      mind: "Must control everything, cannot surrender",
      body: "Chronic tension from trying to control",
      soul: "Cannot trust God or others",
      doorway: "Witchcraft, manipulation, Jezebel spirit",
      parasites: "Control creates chronic stress",
      herbs: "Passionflower, Holy Basil for release",
      deliverance: "Surrender control to God, break witchcraft, trust Him"
    },
    {
      name: "Manipulation",
      spiritual: "Witchcraft. Controlling others through deception",
      mind: "Using others for own ends, scheming",
      body: "Tense from maintaining facades",
      soul: "Cannot have authentic relationships",
      doorway: "Jezebel, witchcraft, lying spirits",
      parasites: "Manipulation creates toxicity",
      herbs: "No herb for manipulation—must repent",
      deliverance: "Repent of manipulation, break Jezebel, receive honesty"
    },
    {
      name: "Domination",
      spiritual: "Jezebel spirit. Control and intimidation",
      mind: "Must be in charge, intimidate others",
      body: "Domineering presence, aggressive posture",
      soul: "Destroys others, prevents submission to God",
      doorway: "Jezebel, witchcraft, control, pride",
      parasites: "Domination creates internal warfare",
      herbs: "No herb—must humble self",
      deliverance: "Break Jezebel spirit, repent of control, receive submission"
    },
    {
      name: "Intimidation",
      spiritual: "Spirit of fear projected onto others. Goliath spirit",
      mind: "Using fear to control others",
      body: "Aggressive posture, loud voice",
      soul: "Blocks others from their calling",
      doorway: "Fear, bullying, control",
      parasites: "Intimidation creates cortisol in others",
      herbs: "No herb for intimidation—must repent",
      deliverance: "Repent of intimidation, break Goliath spirit"
    },
    {
      name: "Cowardice",
      spiritual: "Spirit of fear. Failure to stand for truth",
      mind: "Avoidance of conflict, backing down",
      body: "Shrinking posture, hiding",
      soul: "Cannot fulfill calling, compromises",
      doorway: "Fear, compromise, denial of faith",
      parasites: "Cowardice weakens entire system",
      herbs: "Ginseng, Rhodiola for courage",
      deliverance: "Break spirit of fear, receive boldness and courage"
    },
    {
      name: "Timidity",
      spiritual: "Spirit of fear. Shrinking back",
      mind: "Excessive shyness, afraid to speak",
      body: "Small presence, quiet voice, hiding",
      soul: "Cannot express true self, hides gifts",
      doorway: "Fear, insecurity, hiding",
      parasites: "Timidity weakens voice and presence",
      herbs: "Ginseng, Ashwagandha for confidence",
      deliverance: "Break fear, receive boldness, step into identity"
    },
    {
      name: "Procrastination",
      spiritual: "Sloth. Fear of failure or success. Delay spirit",
      mind: "Putting off what needs doing, chronic delay",
      body: "Low energy, avoidance behaviors",
      soul: "Wasted time, unfulfilled potential",
      doorway: "Sloth, fear, poverty",
      parasites: "Procrastination linked to fatigue and parasites",
      herbs: "Ginseng, Rhodiola for motivation",
      deliverance: "Break procrastination, receive diligence and zeal"
    },
    {
      name: "Laziness",
      spiritual: "Sloth. Spiritual laziness despite knowing truth",
      mind: "Unwillingness to make effort",
      body: "Physical weakness, poor muscle tone",
      soul: "Wasted calling, unfulfilled purpose",
      doorway: "Sloth, poverty, missed destiny",
      parasites: "Laziness creates stagnation",
      herbs: "Ginseng, Eleuthero (but must break spiritual root)",
      deliverance: "Repent of sloth, receive zeal and diligence"
    },
    {
      name: "Complacency",
      spiritual: "Satisfied with status quo. Lukewarm",
      mind: "No desire for growth or change",
      body: "Stagnant, declining health",
      soul: "Spiritual plateau, no hunger for more",
      doorway: "Lukewarmness, apathy, spiritual death",
      parasites: "Complacency allows disease to progress",
      herbs: "Ginseng, Rhodiola to awaken",
      deliverance: "Break complacency, receive holy hunger, pursue more"
    },
    {
      name: "Entitlement",
      spiritual: "Demanding rights. Opposite of gratitude",
      mind: "Belief you deserve more than you have",
      body: "Demanding posture, indignant",
      soul: "Prevents gratitude, blocks blessing",
      doorway: "Pride, ingratitude, offense",
      parasites: "Entitlement creates stress and dissatisfaction",
      herbs: "Tulsi for gratitude",
      deliverance: "Break entitlement, receive gratitude and humility"
    },
    {
      name: "Ingratitude",
      spiritual: "Closes door to God's gates (Psalm 100:4)",
      mind: "Taking blessings for granted, complaining",
      body: "Stress from focusing on lack",
      soul: "Blocks access to God's presence",
      doorway: "Complaining, murmuring, offense",
      parasites: "Ingratitude creates negative environment",
      herbs: "Tulsi, Hawthorn for grateful heart",
      deliverance: "Repent of ingratitude, practice thanksgiving"
    },
    {
      name: "Complaining",
      spiritual: "Murmuring. Brought judgment on Israel",
      mind: "Constant negativity, fault-finding",
      body: "Stress from negative focus",
      soul: "Blocks blessing, attracts judgment",
      doorway: "Offense, judgment, curse",
      parasites: "Complaining creates toxicity",
      herbs: "Tulsi for contentment",
      deliverance: "Stop murmuring, give thanks in all things"
    },
    {
      name: "Criticism",
      spiritual: "Judging others. Fault-finding spirit",
      mind: "Looking for flaws in others",
      body: "Tense, harsh expressions",
      soul: "Blocks mercy, hardens heart",
      doorway: "Judgment, Pharisee spirit, pride",
      parasites: "Criticism creates bitterness",
      herbs: "Rose, Hawthorn for mercy",
      deliverance: "Stop judging, receive mercy, bless instead"
    },
    {
      name: "Judgment",
      spiritual: "Playing God. Will be judged by same measure",
      mind: "Condemning others, feeling superior",
      body: "Hard expressions, pointing finger",
      soul: "Separates from community, hardens heart",
      doorway: "Pharisee spirit, pride, condemnation",
      parasites: "Judgment creates toxicity",
      herbs: "Rose for mercy",
      deliverance: "Stop judging, receive mercy, see own sin first"
    },
    {
      name: "Apathy",
      spiritual: "Lukewarmness that God will spit out (Revelation 3:16)",
      mind: "Indifference, lack of concern",
      body: "Low energy, disconnection",
      soul: "Spiritual deadness, cold heart",
      doorway: "Spirit of slumber, religion, Laodicean spirit",
      parasites: "Apathy weakens immunity",
      herbs: "Ginger, Cayenne to awaken",
      deliverance: "Repent of lukewarmness, ask for zeal, receive fire"
    },
    {
      name: "Contempt",
      spiritual: "Despising what God loves",
      mind: "Disdain, looking down on others",
      body: "Sneering, dismissive gestures",
      soul: "Destroys compassion and unity",
      doorway: "Pride, arrogance, elitism",
      parasites: "Contempt creates internal bitterness",
      herbs: "Rose for love",
      deliverance: "Repent of pride, receive humility and love"
    },
    {
      name: "Desperation",
      spiritual: "Can open to wrong sources if not directed to God",
      mind: "Frantic, irrational thinking",
      body: "Panic, rapid heartbeat",
      soul: "Vulnerability to deception",
      doorway: "Divination, witchcraft seeking answers",
      parasites: "Desperation weakens discernment",
      herbs: "Valerian, Passionflower to calm",
      deliverance: "Turn to God alone, break idolatry, receive peace"
    },
    {
      name: "Vengeance",
      spiritual: "Trying to be God. Vengeance belongs to Him (Romans 12:19)",
      mind: "Plotting revenge, consumed with payback",
      body: "Tension, aggressive energy",
      soul: "Blocks forgiveness, opens to violence",
      doorway: "Murder spirit, violence, hatred",
      parasites: "Vengeance creates toxic buildup",
      herbs: "Milk Thistle for liver/anger",
      deliverance: "Forgive, release vengeance to God, receive mercy"
    },
    {
      name: "Overwhelm",
      spiritual: "Carrying what God didn't assign",
      mind: "Can't think clearly, mental overload",
      body: "Physical exhaustion, shutdown",
      soul: "Loss of peace, feeling crushed",
      doorway: "Burden, heaviness, false responsibility",
      parasites: "Overwhelm weakens all systems",
      herbs: "Ashwagandha, Holy Basil for stress",
      deliverance: "Cast burdens on Yahusha, break false responsibility"
    },
    {
      name: "Entitlement",
      spiritual: "Demanding what's not owed, opposing grace",
      mind: "Expecting special treatment, ingratitude",
      body: "Demanding posture, expectant stance",
      soul: "Blocks gratitude, creates offense",
      doorway: "Pride, mammon, greed",
      parasites: "Entitlement creates internal imbalance",
      herbs: "No herb—must repent",
      deliverance: "Repent of pride, receive gratitude and humility"
    },
    {
      name: "Complacency",
      spiritual: "Satisfied with less than God's best",
      mind: "Settling, lack of hunger",
      body: "Sluggish, unmotivated",
      soul: "Spiritual stagnation",
      doorway: "Sloth, religion, false peace",
      parasites: "Complacency allows parasitic growth",
      herbs: "Ginger, Ginseng for motivation",
      deliverance: "Repent of settling, receive hunger and zeal"
    },
    {
      name: "Cynicism",
      spiritual: "Mocking spirit, disbelief in good",
      mind: "Distrust, negative lens on everything",
      body: "Closed posture, skeptical expression",
      soul: "Kills hope, blocks faith",
      doorway: "Unbelief, mockery, bitterness",
      parasites: "Cynicism creates acidic environment",
      herbs: "Rose for opening heart",
      deliverance: "Repent of unbelief, receive childlike faith"
    },
    {
      name: "Disillusionment",
      spiritual: "Shattered expectations, loss of faith",
      mind: "Disappointment with God, people, life",
      body: "Heaviness, slumped posture",
      soul: "Crisis of faith, questioning God",
      doorway: "Offense, bitterness, unbelief",
      parasites: "Disillusionment weakens vitality",
      herbs: "Holy Basil, Milky Oats for restoration",
      deliverance: "Release offense, receive renewed hope and trust"
    },
    {
      name: "Suspicion",
      spiritual: "Opposite of faith, agreement with enemy's lies",
      mind: "Constant doubt, distrust",
      body: "Vigilant tension, guarded",
      soul: "Isolation, broken relationships",
      doorway: "Paranoia, fear, trauma",
      parasites: "Suspicion creates defensive toxicity",
      herbs: "Chamomile, Lemon Balm to soften",
      deliverance: "Break trauma, receive trust and discernment"
    },
    {
      name: "Pettiness",
      spiritual: "Majoring in minors, straining gnats",
      mind: "Focus on trivial matters",
      body: "Nitpicking gestures",
      soul: "Misses what matters, causes division",
      doorway: "Critical spirit, Pharisee spirit",
      parasites: "Pettiness creates small-mindedness",
      herbs: "Rose for perspective",
      deliverance: "Repent of majoring in minors, receive wisdom"
    },
    {
      name: "Indignation",
      spiritual: "Righteous anger corrupted by pride",
      mind: "Offended sense of justice",
      body: "Heated, indignant expression",
      soul: "Self-righteousness, pride",
      doorway: "Pride, judgment, Pharisee spirit",
      parasites: "Indignation inflames system",
      herbs: "Turmeric for inflammation",
      deliverance: "Check if truly righteous, repent of pride"
    },
    {
      name: "Obstinacy",
      spiritual: "Stubbornness as witchcraft (1 Samuel 15:23)",
      mind: "Refusing to yield, rebellious",
      body: "Rigid, inflexible stance",
      soul: "Cannot receive correction or truth",
      doorway: "Rebellion, witchcraft, pride",
      parasites: "Obstinacy creates blockages",
      herbs: "No herb—must submit",
      deliverance: "Repent of rebellion, break stubbornness, receive teachability"
    },
    {
      name: "Hopelessness",
      spiritual: "Antichrist spirit denying God's promises",
      mind: "No way out, future looks dark",
      body: "Exhaustion, giving up",
      soul: "Suicidal ideation, death wish",
      doorway: "Depression, suicide, death spirit",
      parasites: "Hopelessness opens to death",
      herbs: "St. John's Wort, Rhodiola for hope",
      deliverance: "Break spirit of death, receive hope and life"
    },
    {
      name: "Restlessness",
      spiritual: "Not resting in God's provision",
      mind: "Can't settle, constant agitation",
      body: "Fidgeting, inability to be still",
      soul: "Striving, no peace",
      doorway: "Anxiety, drivenness, performance",
      parasites: "Restlessness depletes energy",
      herbs: "Valerian, Passionflower for rest",
      deliverance: "Enter God's rest, break striving, receive peace"
    },
    {
      name: "Dread",
      spiritual: "Anticipating evil, opposite of hope",
      mind: "Expecting the worst",
      body: "Heavy foreboding, pit in stomach",
      soul: "Prophesying disaster over self",
      doorway: "Fear, anxiety, death spirit",
      parasites: "Dread weakens all defenses",
      herbs: "Holy Basil, Skullcap to calm",
      deliverance: "Break fear, receive faith and hope"
    },
    {
      name: "Indifference",
      spiritual: "Cold heart toward God and others",
      mind: "Don't care, emotionally numb",
      body: "Disconnected, flat affect",
      soul: "Lovelessness, hardness",
      doorway: "Hard heart, Laodicean spirit",
      parasites: "Indifference allows unchecked growth",
      herbs: "Hawthorn, Rose to soften heart",
      deliverance: "Break hard heart, receive compassion and zeal"
    },
    {
      name: "Defiance",
      spiritual: "Open rebellion against authority",
      mind: "Won't submit to anyone",
      body: "Confrontational, challenging stance",
      soul: "Lawlessness, antichrist spirit",
      doorway: "Rebellion, witchcraft, pride",
      parasites: "Defiance creates internal conflict",
      herbs: "No herb—must submit",
      deliverance: "Repent of rebellion, receive submission to God"
    },
    {
      name: "Vindictiveness",
      spiritual: "Holding accounts, opposite of grace",
      mind: "Keeping score, planning retaliation",
      body: "Calculating, cold expression",
      soul: "Unforgiveness, desire to harm",
      doorway: "Unforgiveness, murder, hatred",
      parasites: "Vindictiveness creates toxicity",
      herbs: "Milk Thistle for bitterness",
      deliverance: "Forgive completely, break unforgiveness"
    },
    {
      name: "Scorn",
      spiritual: "Mocking what should be honored",
      mind: "Ridicule, contempt",
      body: "Sneering, mocking gestures",
      soul: "Destroys respect and honor",
      doorway: "Mockery, pride, rebellion",
      parasites: "Scorn creates acidic environment",
      herbs: "Rose for respect",
      deliverance: "Repent of mockery, receive honor and respect"
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
            
            {/* Search Bar */}
            <div className="relative mt-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search emotions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Alphabet Filter */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Button
                variant={selectedLetter === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLetter("All")}
              >
                All
              </Button>
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => (
                <Button
                  key={letter}
                  variant={selectedLetter === letter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLetter(letter)}
                >
                  {letter}
                </Button>
              ))}
            </div>

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

        <Tabs defaultValue="deadly-sins" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 h-auto p-2 bg-muted/50">
            <TabsTrigger value="deadly-sins" className="flex items-center gap-2">
              <Flame className="w-4 h-4" />
              7 Deadly Sins & Virtues
            </TabsTrigger>
            <TabsTrigger value="positive" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Positive Emotions
            </TabsTrigger>
            <TabsTrigger value="negative" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Negative Emotions
            </TabsTrigger>
          </TabsList>

          {/* 7 Deadly Sins & Opposing Virtues */}
          <TabsContent value="deadly-sins" className="space-y-6 mt-6">
            <Card className="p-6 border-primary/30 bg-gradient-spiritual/5">
              <p className="text-sm text-foreground/80 leading-relaxed">
                <strong>The Seven Deadly Sins</strong> are the root patterns of all sin, opening major spiritual doorways. 
                Each deadly sin has an opposing virtue that brings freedom and reflects Christ's character. 
                Understanding both the sin and the virtue is essential for complete transformation.
              </p>
            </Card>

            <div className="grid gap-8">
              {deadlySins.map((item, index) => (
                <Card key={index} className="border-primary/20 shadow-elevated overflow-hidden">
                  {/* Header with Sin vs Virtue */}
                  <div className="grid md:grid-cols-2 divide-x divide-border/50">
                    <div className="bg-destructive/10 p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="destructive" className="text-base px-4 py-1">
                          DEADLY SIN
                        </Badge>
                      </div>
                      <h3 className="font-serif text-3xl font-bold text-destructive mb-1">{item.sin}</h3>
                      <p className="text-sm text-muted-foreground">What leads you there & its effects</p>
                    </div>
                    <div className="bg-primary/10 p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="text-base px-4 py-1 bg-gradient-spiritual">
                          OPPOSING VIRTUE
                        </Badge>
                      </div>
                      <h3 className="font-serif text-3xl font-bold text-primary mb-1">{item.virtue}</h3>
                      <p className="text-sm text-muted-foreground">The path to freedom & wholeness</p>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-6">
                    {/* The Deadly Sin Section */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-xl text-destructive flex items-center gap-2">
                        <Flame className="w-5 h-5" />
                        Understanding the Sin of {item.sin}
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/30">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Spiritual Root
                          </Badge>
                          <p className="text-sm text-foreground/80">{item.sinSpiritual}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/30">
                            <Brain className="w-3 h-3 mr-1" />
                            Mental Effect
                          </Badge>
                          <p className="text-sm text-foreground/80">{item.sinMind}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/30">
                            <Heart className="w-3 h-3 mr-1" />
                            Physical Impact
                          </Badge>
                          <p className="text-sm text-foreground/80">{item.sinBody}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/30">
                            Soul Damage
                          </Badge>
                          <p className="text-sm text-foreground/80">{item.sinSoul}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                          <p className="font-semibold text-sm mb-2 text-destructive">🚪 Spiritual Doorways Opened:</p>
                          <p className="text-sm text-foreground/80">{item.sinDoorway}</p>
                        </div>

                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="font-semibold text-sm mb-2">🦠 Physical/Parasite Connection:</p>
                          <p className="text-sm text-foreground/80">{item.sinParasites}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <Leaf className="w-4 h-4 text-primary" />
                            Herbal Support (Secondary):
                          </p>
                          <p className="text-sm text-foreground/80">{item.sinHerbs}</p>
                        </div>
                        
                        <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                          <p className="font-semibold text-sm mb-2 text-primary">✨ Deliverance Strategy:</p>
                          <p className="text-sm text-foreground/80">{item.sinDeliverance}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t-2 border-primary/30 pt-6"></div>

                    {/* The Opposing Virtue Section */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-xl text-primary flex items-center gap-2">
                        <Scale className="w-5 h-5" />
                        The Virtue of {item.virtue} - Your Path to Freedom
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Spiritual Power
                          </Badge>
                          <p className="text-sm text-foreground/80">{item.virtueSpiritual}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                            <Brain className="w-3 h-3 mr-1" />
                            Mental Benefits
                          </Badge>
                          <p className="text-sm text-foreground/80">{item.virtueMind}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                            <Heart className="w-3 h-3 mr-1" />
                            Physical Health
                          </Badge>
                          <p className="text-sm text-foreground/80">{item.virtueBody}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                            Soul Healing
                          </Badge>
                          <p className="text-sm text-foreground/80">{item.virtueSoul}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <Leaf className="w-4 h-4 text-primary" />
                            Natural Support for {item.virtue}:
                          </p>
                          <p className="text-sm text-foreground/80">{item.virtueHerbs}</p>
                        </div>
                        
                        <div className="bg-gradient-spiritual/10 p-4 rounded-lg border border-primary/20">
                          <p className="font-semibold text-sm mb-2 text-primary">🙏 Spiritual Practices:</p>
                          <p className="text-sm text-foreground/80">{item.virtuePractice}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Positive Emotions */}
          <TabsContent value="positive" className="space-y-6 mt-6">
            <div className="grid gap-6">
              {positiveEmotions
                .filter(emotion => 
                  emotion.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (selectedLetter === "All" || emotion.name.startsWith(selectedLetter))
                )
                .map((emotion, index) => (
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
              {negativeEmotions
                .filter(emotion => 
                  emotion.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (selectedLetter === "All" || emotion.name.startsWith(selectedLetter))
                )
                .map((emotion, index) => (
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