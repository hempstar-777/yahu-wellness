import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Copy, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ProtectedRoute from "@/components/ProtectedRoute";

const GenerationalAssessment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const generationalCategories = [
    {
      category: "Occult & Spiritual Practices (Family Line)",
      items: [
        "Witchcraft in family",
        "Freemasonry",
        "Eastern Star",
        "Satanism",
        "Wicca",
        "New Age practices",
        "Tarot/divination",
        "Astrology",
        "Mediumship/channeling",
        "Séances",
        "Ouija board use",
        "Fortune telling",
        "Blood rituals",
        "Sacrifices (animal or human)",
      ],
    },
    {
      category: "Sexual Iniquities",
      items: [
        "Adultery in bloodline",
        "Fornication patterns",
        "Incest in family history",
        "Sexual abuse cycles",
        "Pornography addiction (generational)",
        "Prostitution",
        "Sexual perversion",
        "Homosexuality in bloodline",
        "Gender confusion patterns",
      ],
    },
    {
      category: "Violence & Criminal Behavior",
      items: [
        "Murder in bloodline",
        "Suicide patterns",
        "Violent temper",
        "Criminal activity",
        "Gang involvement",
        "Theft patterns",
        "Lying/deception",
        "Betrayal patterns",
      ],
    },
    {
      category: "Addictions & Bondages",
      items: [
        "Alcoholism (generational)",
        "Drug addiction patterns",
        "Gambling addiction",
        "Tobacco use",
        "Mental illness patterns",
        "Depression cycles",
        "Anxiety disorders",
        "Fear patterns",
      ],
    },
    {
      category: "Curses & Covenants",
      items: [
        "Known curses spoken",
        "Vows/oaths taken",
        "Covenant agreements",
        "Dedications to false gods",
        "Initiation rituals",
        "Secret society memberships",
        "Pledges/allegiances",
      ],
    },
  ];

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const copyResults = () => {
    const text = selectedItems.join(", ");
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const saveAndContinue = async () => {
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
          assessment_type: 'generational',
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

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-light">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/assessments">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold">
                Assessment 4: Generational & Bloodline Iniquities
              </h1>
              <p className="text-sm text-muted-foreground">
                Identify ancestral sins and family patterns requiring confession
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 border-primary/20 shadow-elevated">
          <div className="space-y-6">
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-destructive flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Bloodline Confession
              </h3>
              <p className="text-sm text-destructive/80">
                You are confessing sins of your ancestors to disarm their spiritual power
                (Exodus 20:5, Nehemiah 9:2). Even if you didn't participate, these create
                legal ground for enemy activity. Confession breaks generational cycles.
              </p>
            </div>

            {generationalCategories.map((category, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-serif text-xl font-semibold text-foreground border-b border-border pb-2">
                  {category.category}
                </h3>
                <div className="grid gap-3">
                  {category.items.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <Checkbox
                        checked={selectedItems.includes(item)}
                        onCheckedChange={() => toggleItem(item)}
                      />
                      <span className="text-sm">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {selectedItems.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    Selected Items ({selectedItems.length})
                  </h3>
                  <Button onClick={copyResults} size="sm" variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedItems.join(", ")}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={saveAndContinue}
                size="lg"
                className="flex-1 bg-gradient-spiritual shadow-elevated"
                disabled={selectedItems.length === 0 || isSaving}
              >
                {isSaving ? "Saving..." : "Save & Continue to Prayers"}
              </Button>
              <Button
                onClick={copyResults}
                size="lg"
                variant="outline"
                className="flex-1 border-primary/30"
                disabled={selectedItems.length === 0}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Results
              </Button>
            </div>
          </div>
        </Card>
      </section>
      </div>
    </ProtectedRoute>
  );
};

export default GenerationalAssessment;