import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Flame, Copy, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AltarsAssessment = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const altarCategories = [
    {
      category: "Ancestral & Generational Altars",
      items: [
        "Family shrine/altar to ancestors",
        "Traditional worship of family gods",
        "Ancestral veneration rituals",
        "Bloodline dedications to false gods",
        "Generational covenants with idols",
        "Family curse altars",
        "Inherited spiritual dedications"
      ]
    },
    {
      category: "Occult & Witchcraft Altars",
      items: [
        "Personal altar for spells/rituals",
        "Witchcraft dedication altar",
        "Satanic altar involvement",
        "Blood sacrifice altars",
        "Altar to demon/spirit guide",
        "Occult initiation altar",
        "Freemasonic altar participation",
        "Wiccan/pagan altar"
      ]
    },
    {
      category: "Religious & Idolatrous Altars",
      items: [
        "Buddhist shrine/altar",
        "Hindu deity altar",
        "Santeria/Voodoo altar",
        "Catholic saint veneration altar",
        "New Age crystal altar",
        "Altar to ascended masters",
        "Shrine to false prophet/guru",
        "Islamic prayer shrine (beyond basic prayer)"
      ]
    },
    {
      category: "Sexual & Perversion Altars",
      items: [
        "Altar of lust/pornography addiction",
        "Sexual ritual altar",
        "Altar to spirit husband/wife",
        "Altar of sexual perversion",
        "Tantric sex altar",
        "Altar through sexual abuse (victim)"
      ]
    },
    {
      category: "Personal Sin Altars",
      items: [
        "Altar of pride/ego worship",
        "Altar to mammon/money",
        "Altar of addiction (drugs, alcohol)",
        "Altar of self/narcissism",
        "Altar of revenge/bitterness",
        "Altar of fear/anxiety",
        "Altar through suicide attempts",
        "Altar of agreement with death"
      ]
    },
    {
      category: "Territorial & Environmental Altars",
      items: [
        "Participated in land dedication ritual",
        "Built altar on cursed land",
        "Altar in home/property",
        "Visited/prayed at demonic shrine",
        "Participated in community idol worship",
        "Altar at workplace/business",
        "Graveyard/cemetery altar activity"
      ]
    }
  ];

  const toggleItem = (item: string) => {
    setSelectedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const copyResults = () => {
    const text = selectedItems.join("\n");
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Your altar list has been copied"
    });
  };

  const saveAndContinue = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save your assessment",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("assessment_results")
        .insert({
          user_id: user.id,
          assessment_type: "altars",
          responses: { selected_items: selectedItems },
          completed_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Assessment saved",
        description: "Your altar assessment has been saved successfully"
      });

      navigate("/prayers");
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast({
        title: "Error",
        description: "Failed to save assessment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-light">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/assessments">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div className="flex-1">
                <h1 className="font-serif text-2xl md:text-3xl font-bold">Altars & Evil Dedications</h1>
                <p className="text-sm text-muted-foreground">Identify spiritual altars requiring demolition</p>
              </div>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <section className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto p-6 border-primary/20 shadow-elevated">
            <div className="flex gap-4">
              <Flame className="w-8 h-8 text-primary flex-shrink-0" />
              <div className="space-y-3">
                <h2 className="font-serif text-xl font-semibold">What Are Spiritual Altars?</h2>
                <p className="text-foreground/80 leading-relaxed">
                  In the spiritual realm, an <strong>altar</strong> is a dedication point or access portal that gives demons 
                  legal rights to operate in your life. Altars are established through worship, rituals, vows, blood covenants, 
                  or ongoing sinful patterns. They act as "feeding stations" where demonic forces draw power.
                </p>
                <Alert className="border-secondary/30 bg-secondary/5">
                  <AlertDescription>
                    <strong>Biblical Pattern:</strong> Throughout Scripture, Yahuah commanded His people to tear down pagan altars 
                    (Deut 12:3, Judges 6:25). Before deliverance, we must spiritually demolish every altar not dedicated to Him.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </Card>
        </section>

        {/* Assessment */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {altarCategories.map((category, catIndex) => (
              <Card key={catIndex} className="p-6 border-border/50 shadow-elevated animate-fade-in" 
                    style={{ animationDelay: `${catIndex * 100}ms` }}>
                <h3 className="font-serif text-xl font-semibold mb-4 text-primary">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Checkbox
                        id={`${catIndex}-${itemIndex}`}
                        checked={selectedItems.includes(item)}
                        onCheckedChange={() => toggleItem(item)}
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
              </Card>
            ))}
          </div>
        </section>

        {/* Selected Summary */}
        {selectedItems.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <Card className="max-w-4xl mx-auto p-6 bg-gradient-divine text-primary-foreground shadow-glow">
              <h3 className="font-serif text-xl font-semibold mb-4">
                Altars to Demolish ({selectedItems.length})
              </h3>
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 mb-4 max-h-60 overflow-y-auto">
                <ul className="space-y-2 text-sm">
                  {selectedItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Flame className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                onClick={copyResults}
                variant="outline"
                size="sm"
                className="border-primary-foreground/30 hover:bg-primary-foreground/10"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy List
              </Button>
            </Card>
          </section>
        )}

        {/* Prayer Template */}
        <section className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto p-6 border-primary/20 shadow-elevated">
            <h3 className="font-serif text-xl font-semibold mb-4">Altar Demolition Prayer</h3>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3 text-sm font-mono leading-relaxed">
              <p className="font-bold text-primary">Use this prayer after completing your list:</p>
              <p>"Father Yahuah, I come before You in the mighty name of Yahusha Ha Mashiach.</p>
              <p>I confess and repent for every altar I have built or participated in that was not dedicated to You:</p>
              <p className="pl-4 text-muted-foreground">[Read your list out loud]</p>
              <p>I renounce these altars and I break all agreements, covenants, and dedications made through them.</p>
              <p>By the authority of Yahusha, I command these altars DEMOLISHED in the spirit realm.</p>
              <p>I release the fire of Yahuah to consume every altar not built for Your glory.</p>
              <p>I command every demon that received access through these altars to LEAVE NOW.</p>
              <p>I close every door these altars opened and I seal them with the Blood of Yahusha.</p>
              <p>I dedicate my life as a living altar unto You alone. Fill me with Your Ruach HaKodesh.</p>
              <p>Thank You for complete freedom. In Yahusha's name, Amen."</p>
            </div>
          </Card>
        </section>

        {/* Action Buttons */}
        <section className="container mx-auto px-4 py-8 pb-16">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={saveAndContinue}
              disabled={selectedItems.length === 0 || isSaving}
              size="lg"
              className="bg-gradient-spiritual shadow-elevated"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save & Continue to Prayers"}
            </Button>
            <Button
              onClick={copyResults}
              disabled={selectedItems.length === 0}
              size="lg"
              variant="outline"
              className="border-primary/30"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Results
            </Button>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
};

export default AltarsAssessment;
