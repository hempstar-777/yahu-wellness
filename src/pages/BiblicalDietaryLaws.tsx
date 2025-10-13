import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronLeft, AlertTriangle, Apple, Fish, Beef, BadgeAlert, Sparkles, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BiblicalDietaryLaws = () => {
  const cleanAnimals = [
    { name: "Beef (Cattle)", reference: "Lev 11:3", details: "Divided hoof, chews cud" },
    { name: "Lamb/Sheep", reference: "Lev 11:3", details: "Divided hoof, chews cud" },
    { name: "Goat", reference: "Lev 11:3", details: "Divided hoof, chews cud" },
    { name: "Deer/Venison", reference: "Deut 14:4-5", details: "Divided hoof, chews cud" },
    { name: "Fish with fins & scales", reference: "Lev 11:9", details: "Salmon, trout, bass, etc." },
    { name: "Chicken", reference: "Lev 11:13-19", details: "Not listed among unclean birds" },
    { name: "Turkey", reference: "Lev 11:13-19", details: "Not listed among unclean birds" },
    { name: "Duck", reference: "Lev 11:13-19", details: "Not listed among unclean birds" },
    { name: "Quail", reference: "Num 11:31-32", details: "Provided by Yahuah in wilderness" },
  ];

  const uncleanAnimals = [
    { name: "Pork/Swine", reference: "Lev 11:7", reason: "Divided hoof but doesn't chew cud - ABOMINATION", danger: "Parasites, toxins" },
    { name: "Shellfish", reference: "Lev 11:10-12", reason: "No fins or scales - DETESTABLE", danger: "Bottom feeders, filter toxins" },
    { name: "Catfish", reference: "Lev 11:10-12", reason: "No scales - DETESTABLE", danger: "Scavenger, eats waste" },
    { name: "Rabbit/Hare", reference: "Lev 11:6", reason: "Chews cud but no divided hoof", danger: "Disease carriers" },
    { name: "Camel", reference: "Lev 11:4", reason: "Chews cud but no divided hoof", danger: "Unclean" },
    { name: "Eagle, Vulture, Raven", reference: "Lev 11:13-19", reason: "Birds of prey/scavengers", danger: "Eat dead/rotting flesh" },
    { name: "Bat", reference: "Lev 11:19", reason: "Flying creature - unclean", danger: "Disease vector" },
    { name: "Reptiles/Lizards", reference: "Lev 11:29-30", reason: "Creeping things - ABOMINATION", danger: "Unclean" },
  ];

  const modernCorruptions = [
    {
      category: "GMOs (Genetically Modified Organisms)",
      issues: [
        "Seeds altered by man, not created by Yahuah",
        "Genetically modified to resist pesticides (absorb MORE poison)",
        "Linked to gut damage, allergies, infertility",
        "Corporate control over food supply (Monsanto/Bayer)",
      ],
      solution: "Buy organic, non-GMO, heirloom seeds when possible"
    },
    {
      category: "Pesticides & Herbicides",
      issues: [
        "Glyphosate (Roundup) - classified as probable carcinogen",
        "Disrupts gut microbiome and hormones",
        "Damages DNA and causes neurological issues",
        "Found in most conventional produce and grains",
      ],
      solution: "Choose organic produce, especially for 'Dirty Dozen' items"
    },
    {
      category: "Processed Foods",
      issues: [
        "Loaded with seed oils (canola, soybean, corn) - inflammatory",
        "High fructose corn syrup - metabolic poison",
        "Artificial colors, flavors, preservatives - neurotoxic",
        "Designed to be addictive, not nourishing",
      ],
      solution: "Eat whole, real foods that Yahuah created"
    },
    {
      category: "Factory Farming",
      issues: [
        "Animals fed GMO corn/soy instead of grass",
        "Pumped with antibiotics and growth hormones",
        "Kept in diseased, unnatural conditions",
        "Meat is toxic, inflammatory, nutrient-depleted",
      ],
      solution: "Buy grass-fed, pasture-raised, organic meat when possible"
    },
  ];

  const biblicalFeasts = [
    { name: "Sabbath", timing: "7th day (Saturday)", meaning: "Rest in Yahuah", reference: "Ex 20:8-11" },
    { name: "Passover", timing: "14th of 1st month", meaning: "Deliverance from bondage", reference: "Lev 23:5" },
    { name: "Unleavened Bread", timing: "15-21 of 1st month", meaning: "Separation from sin", reference: "Lev 23:6-8" },
    { name: "First Fruits", timing: "Day after Sabbath during Unleavened Bread", meaning: "Resurrection", reference: "Lev 23:10-11" },
    { name: "Pentecost/Shavuot", timing: "50 days after First Fruits", meaning: "Outpouring of Spirit", reference: "Lev 23:15-16" },
    { name: "Trumpets/Yom Teruah", timing: "1st of 7th month", meaning: "Awakening, return", reference: "Lev 23:24-25" },
    { name: "Day of Atonement/Yom Kippur", timing: "10th of 7th month", meaning: "Repentance, covering", reference: "Lev 23:27-28" },
    { name: "Tabernacles/Sukkot", timing: "15-21 of 7th month", meaning: "Dwelling with Yahuah", reference: "Lev 23:34" },
  ];

  const paganHolidays = [
    { name: "Christmas", origin: "Roman Saturnalia, winter solstice worship", truth: "Yahusha NOT born Dec 25th - likely Sukkot (Sept/Oct)" },
    { name: "Easter", origin: "Ishtar/Astarte fertility goddess worship", truth: "Should celebrate Passover/First Fruits as commanded" },
    { name: "Halloween", origin: "Celtic Samhain - communicating with dead/demons", truth: "Abomination - Deut 18:10-12" },
    { name: "Sunday Worship", origin: "Roman sun god worship (Constantine 321 AD)", truth: "Sabbath is 7th day (Friday sunset-Saturday sunset)" },
  ];

  return (
    <div className="min-h-screen bg-gradient-light pb-16">
      {/* Header */}
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
              <h1 className="font-serif text-2xl md:text-3xl font-bold">Biblical Dietary Laws</h1>
              <p className="text-sm text-muted-foreground">What Yahuah says to eat & what to avoid</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
        
        {/* Critical Warning */}
        <Alert className="border-red-500/30 bg-red-500/5">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <AlertDescription className="text-sm leading-relaxed space-y-3">
            <p>
              <strong className="text-red-600 text-base">THE BIG LIE:</strong> "All food is clean if you pray over it" - 
              This is FALSE teaching! That's like blessing McDonald's poison and expecting it to become healthy. 
              Yahusha NEVER abolished the Torah (Matt 5:17-18)!
            </p>
            <p>
              <strong className="text-red-600">The Devil's Strategy:</strong> Corrupt our food supply, our health, 
              our minds, and our faith - all while making us think we're "free in Christ" to eat anything. 
              That's rebellion disguised as grace!
            </p>
            <p className="font-bold text-foreground">
              "I want the truth of The Most High, not the truth of men. Greater is He that is in me than he that 
              is in the world!" - 1 John 4:4
            </p>
          </AlertDescription>
        </Alert>

        {/* Torah Was Not Abolished */}
        <Card className="p-6 border-amber-500/30 bg-amber-500/5">
          <div className="flex items-start gap-4">
            <BookOpen className="w-8 h-8 text-amber-500 mt-1" />
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold">Yahusha Never Abolished the Torah</h2>
              <div className="space-y-2 text-sm leading-relaxed">
                <p>
                  <strong>Matthew 5:17-18:</strong> "Think not that I am come to destroy the law, or the prophets: 
                  I am not come to destroy, but to fulfil. For verily I say unto you, Till heaven and earth pass, 
                  one jot or one tittle shall in no wise pass from the law, till all be fulfilled."
                </p>
                <p>
                  <strong>1 John 3:4:</strong> "Whosoever committeth sin transgresseth also the law: for sin is the 
                  transgression of the law."
                </p>
                <p className="font-semibold text-amber-700 dark:text-amber-400">
                  The dietary laws are STILL in effect. Pork is still unclean. Shellfish is still detestable. 
                  Heaven and earth haven't passed away yet!
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Clean vs Unclean Animals */}
        <Tabs defaultValue="clean" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="clean">Clean (Permitted)</TabsTrigger>
            <TabsTrigger value="unclean">Unclean (Forbidden)</TabsTrigger>
          </TabsList>

          <TabsContent value="clean" className="space-y-4 mt-6">
            <Card className="p-6 border-green-500/30 bg-green-500/5">
              <div className="flex items-center gap-3 mb-4">
                <Beef className="w-6 h-6 text-green-600" />
                <h3 className="font-serif text-xl font-bold">Clean Animals - Leviticus 11 & Deuteronomy 14</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {cleanAnimals.map((animal, index) => (
                  <div key={index} className="p-4 rounded-lg bg-background border border-green-500/20">
                    <div className="font-semibold text-green-700 dark:text-green-400">{animal.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{animal.reference}</div>
                    <div className="text-sm mt-2">{animal.details}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="unclean" className="space-y-4 mt-6">
            <Card className="p-6 border-red-500/30 bg-red-500/5">
              <div className="flex items-center gap-3 mb-4">
                <BadgeAlert className="w-6 h-6 text-red-600" />
                <h3 className="font-serif text-xl font-bold">Unclean Animals - DO NOT EAT</h3>
              </div>
              <div className="space-y-3">
                {uncleanAnimals.map((animal, index) => (
                  <div key={index} className="p-4 rounded-lg bg-background border border-red-500/20">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-semibold text-red-700 dark:text-red-400 text-lg">{animal.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{animal.reference}</div>
                        <div className="text-sm mt-2 font-medium">{animal.reason}</div>
                        <div className="text-xs mt-1 text-muted-foreground">Health danger: {animal.danger}</div>
                      </div>
                      <Badge variant="destructive">FORBIDDEN</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modern Food Corruption */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-7 h-7 text-destructive" />
            <h2 className="font-serif text-2xl font-bold">Modern Food Corruption</h2>
          </div>
          <div className="space-y-6">
            {modernCorruptions.map((corruption, index) => (
              <div key={index} className="p-5 rounded-lg bg-muted/50 border border-destructive/20">
                <h3 className="font-bold text-lg text-destructive mb-3">{corruption.category}</h3>
                <ul className="space-y-2 mb-4">
                  {corruption.issues.map((issue, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-destructive mt-1">⚠</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-3 rounded bg-background border border-primary/30">
                  <div className="text-sm font-semibold text-primary mb-1">Solution:</div>
                  <div className="text-sm">{corruption.solution}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Biblical Feasts vs Pagan Holidays */}
        <Card className="p-6">
          <h2 className="font-serif text-2xl font-bold mb-4">Biblical Feasts vs Pagan Holidays</h2>
          <Alert className="mb-6 border-primary/30 bg-primary/5">
            <Sparkles className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              The world celebrates man-made traditions with pagan origins, while Yahuah's appointed times 
              (Leviticus 23) are ignored. Even the dates have been changed - the calendar was manipulated!
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="biblical" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="biblical">Biblical Feasts</TabsTrigger>
              <TabsTrigger value="pagan">Pagan Holidays</TabsTrigger>
            </TabsList>

            <TabsContent value="biblical" className="space-y-3 mt-6">
              {biblicalFeasts.map((feast, index) => (
                <div key={index} className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="font-bold text-lg">{feast.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">{feast.timing}</div>
                      <div className="text-sm mt-2">{feast.meaning}</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">{feast.reference}</Badge>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="pagan" className="space-y-3 mt-6">
              {paganHolidays.map((holiday, index) => (
                <div key={index} className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                  <div className="font-bold text-lg text-destructive">{holiday.name}</div>
                  <div className="text-sm mt-2">
                    <span className="font-semibold">Pagan Origin:</span> {holiday.origin}
                  </div>
                  <div className="text-sm mt-2 p-3 rounded bg-background border border-primary/30">
                    <span className="font-semibold text-primary">Biblical Truth:</span> {holiday.truth}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </Card>

        {/* Practical Guidance */}
        <Card className="p-6 border-primary/30 bg-gradient-spiritual">
          <h2 className="font-serif text-2xl font-bold mb-4">Practical Guidance</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              <strong>1. Start Where You Are:</strong> Don't feel condemned if you can't afford all organic, 
              grass-fed everything. Do what you can. Yahuah sees your heart!
            </p>
            <p>
              <strong>2. Eliminate the Worst First:</strong> Stop eating pork, shellfish, and processed junk. 
              These are the biggest offenders.
            </p>
            <p>
              <strong>3. Read Labels:</strong> If you can't pronounce it or don't know what it is, don't eat it. 
              Choose foods with 5 ingredients or less.
            </p>
            <p>
              <strong>4. Grow Your Own:</strong> Even a small garden with herbs and vegetables connects you back 
              to Yahuah's creation.
            </p>
            <p>
              <strong>5. Fast Regularly:</strong> Fasting cleanses the body, sharpens spiritual discernment, 
              and breaks food addictions.
            </p>
            <p>
              <strong>6. Pray Over Your Food:</strong> Yes, still pray! Thank Yahuah for provision and ask Him to 
              bless and sanctify what you eat. But don't use prayer as an excuse to eat what He called unclean!
            </p>
            <p className="font-bold text-primary-foreground">
              Your body is the temple of the Ruach HaKodesh (1 Cor 6:19-20). Honor Yahuah with what you eat!
            </p>
          </div>
        </Card>

        {/* Scripture References */}
        <Card className="p-6">
          <h2 className="font-serif text-2xl font-bold mb-4">Key Scripture References</h2>
          <div className="space-y-3 text-sm">
            <div className="p-3 rounded bg-muted/50">
              <strong>Leviticus 11:</strong> Complete list of clean and unclean animals
            </div>
            <div className="p-3 rounded bg-muted/50">
              <strong>Deuteronomy 14:3-21:</strong> Dietary laws repeated and expanded
            </div>
            <div className="p-3 rounded bg-muted/50">
              <strong>Isaiah 65:2-5:</strong> Prophecy against those who eat swine and abominable things
            </div>
            <div className="p-3 rounded bg-muted/50">
              <strong>Isaiah 66:15-17:</strong> Judgment coming for those who eat pork and abominations
            </div>
            <div className="p-3 rounded bg-muted/50">
              <strong>Daniel 1:8-16:</strong> Daniel refused the king's unclean food and was blessed
            </div>
            <div className="p-3 rounded bg-muted/50">
              <strong>Acts 10:</strong> Peter's vision was about PEOPLE, not food! Read context carefully.
            </div>
            <div className="p-3 rounded bg-muted/50">
              <strong>1 Corinthians 6:19-20:</strong> Your body is the temple of the Holy Spirit
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default BiblicalDietaryLaws;