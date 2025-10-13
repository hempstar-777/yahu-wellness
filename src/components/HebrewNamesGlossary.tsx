import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, AlertCircle, Book } from "lucide-react";
import { hebrewNamesGlossary, bibleBookNames } from "@/data/ethiopianBible";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

const HebrewNamesGlossary = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-serif text-xl font-bold">Paleo Hebrew (Abarit) Glossary</h3>
            <p className="text-sm text-muted-foreground">
              Original names in ancient Paleo Hebrew script - the language of those who crossed over
            </p>
          </div>
        </div>

        <Alert className="border-red-500/30 bg-red-500/5">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-xs leading-relaxed space-y-2">
            <p>
              <strong className="text-red-600">The Letter J Deception:</strong> The letter "J" didn't exist until the 1500s! 
              The letters V and W were also created after Paleo Hebrew. So how did Yahuah (𐤉𐤄𐤅𐤄) become "Jehovah"? 
              This is systematic suppression! They replaced His name with "LORD," "God," or the Jewish tradition of 
              saying "Hashem" (The Name) - as if we're not supposed to know and call our Father by His actual name!
            </p>
            <p>
              <strong className="text-red-600">Ridiculous Maneuverings of the Devil:</strong> These changes weren't 
              accidental - they were designed to make us forget and strip away the vibrational energy and power in the 
              original names. There is spiritual authority in calling on the true name Yahuah (𐤉𐤄𐤅𐤄)!
            </p>
            <p className="font-bold text-foreground">
              "I want the truth of The Most High, not the truth of men. Greater is He that is in me than he that 
              is in the world!" - 1 John 4:4
            </p>
          </AlertDescription>
        </Alert>

        <Alert className="border-amber-500/30 bg-amber-500/5">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-xs leading-relaxed">
            <strong>About Abarit (עברית):</strong> The original name for Hebrew was "Abarit," meaning 
            "language of those who crossed over." This knowledge has been systematically suppressed and 
            dismissed as taboo. In Paleo Hebrew (ancient pictographic script), every letter is a picture 
            with meaning. When combined, these pictures tell the story behind each word. Names should be{" "}
            <strong>transliterated</strong> (phonetic spelling) not <strong>translated</strong>.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="names" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="names">Sacred Names</TabsTrigger>
            <TabsTrigger value="books">Bible Books</TabsTrigger>
          </TabsList>

          <TabsContent value="names" className="mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {Object.entries(hebrewNamesGlossary).map(([name, details]) => (
                  <div 
                    key={name}
                    className="p-4 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{name}</h4>
                          <p className="text-2xl font-hebrew text-primary">{details.hebrew}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">Original</Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium text-foreground">Meaning:</span>{" "}
                          <span className="text-muted-foreground">{details.meaning}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-medium text-destructive">Wrongly Replaced With:</span>{" "}
                          <span className="text-muted-foreground line-through">{details.replaced}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="books" className="mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {Object.entries(bibleBookNames).map(([name, details]) => (
                  <div 
                    key={name}
                    className="p-4 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{name}</h4>
                          <p className="text-2xl font-hebrew text-primary">{details.hebrew}</p>
                        </div>
                        <Badge variant="outline" className="text-xs flex items-center gap-1">
                          <Book className="w-3 h-3" />
                          Original
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium text-foreground">Meaning:</span>{" "}
                          <span className="text-muted-foreground">{details.meaning}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-medium text-destructive">Modern Translation:</span>{" "}
                          <span className="text-muted-foreground line-through">{details.replaced}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="text-xs text-muted-foreground bg-accent/20 p-3 rounded-lg space-y-2">
          <p className="font-medium">📖 Study Tips:</p>
          <p>
            <strong>Theophoric Names:</strong> Notice how many names contain "Yahu" or "Yah" - this is 
            the shortened form of Yahuah (𐤉𐤄𐤅𐤄). When you see names like Yeshayahu (Isaiah = "Yahuah is Salvation") 
            or Yirmeyahu (Jeremiah = "Yahuah Lifts Up"), you're seeing the Father's name preserved. 
            In HalleluYah (𐤄𐤋𐤋𐤅𐤉𐤄), "Hallelu" means "Praise" and "Yah" is Yahuah - literally "Praise Yahuah!"
          </p>
          <p>
            <strong>Pictographic Meaning:</strong> In Paleo Hebrew, each letter is a picture. For example, 
            the name Yahuah (𐤉𐤄𐤅𐤄) combines: Yod (hand/work), Hey (behold/reveal), Vav (nail/secure), 
            Hey (behold/reveal) - telling a deeper story of redemption through pictures.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default HebrewNamesGlossary;
