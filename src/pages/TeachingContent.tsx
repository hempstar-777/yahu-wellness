import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronLeft, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const teachings = {
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
