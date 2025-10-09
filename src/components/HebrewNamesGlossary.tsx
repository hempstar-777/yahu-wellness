import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, AlertCircle } from "lucide-react";
import { hebrewNamesGlossary } from "@/data/ethiopianBible";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from "react-i18next";

const HebrewNamesGlossary = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-serif text-xl font-bold">Hebrew Names Glossary</h3>
            <p className="text-sm text-muted-foreground">
              Original names with their true meanings (transliterated, not translated)
            </p>
          </div>
        </div>

        <Alert className="border-secondary/30 bg-secondary/5">
          <AlertCircle className="h-4 w-4 text-secondary" />
          <AlertDescription className="text-xs leading-relaxed">
            <strong>Why This Matters:</strong> In most Bible translations, the sacred name Yahuah (יהוה) 
            was replaced with "LORD" or "God", and names like Yahuchanon became "John", Ya'akov became 
            "James/Jacques", etc. Each Hebrew name carries deep prophetic meaning that gets lost in translation. 
            Names should be <strong>transliterated</strong> (phonetic spelling) not <strong>translated</strong>.
          </AlertDescription>
        </Alert>

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

        <div className="text-xs text-muted-foreground bg-accent/20 p-3 rounded-lg">
          <p className="font-medium mb-1">📖 Study Tip:</p>
          <p>
            Notice how many names contain "Yahu" or "Yah" - this is the shortened form of Yahuah (יהוה). 
            When you see names like Yeshayahu (Isaiah = "Yahuah is Salvation") or Yirmeyahu (Jeremiah = "Yahuah Lifts Up"), 
            you're seeing the Father's name preserved in the name itself. This is called a "theophoric" name - 
            a name that contains the name of Elohim. In HalleluYah (הללויה), "Hallelu" means "Praise" and "Yah" 
            is Yahuah - so it literally means "Praise Yahuah!"
          </p>
        </div>
      </div>
    </Card>
  );
};

export default HebrewNamesGlossary;
