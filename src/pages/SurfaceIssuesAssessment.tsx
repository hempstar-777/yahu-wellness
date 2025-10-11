import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, FileText, Copy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ProtectedRoute from "@/components/ProtectedRoute";

const SurfaceIssuesAssessment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const assessmentItems = {
    "Anger & Unforgiveness": [
      "Anger",
      "Rage",
      "Wrath",
      "Bitterness",
      "Resentment",
      "Unforgiveness",
      "Hatred",
      "Revenge",
      "Malice",
      "Spite"
    ],
    "Pride & Rebellion": [
      "Pride",
      "Arrogance",
      "Haughtiness",
      "Rebellion",
      "Stubbornness",
      "Disobedience",
      "Self-righteousness",
      "Vanity",
      "Contempt",
      "Insubordination"
    ],
    "Fear & Anxiety": [
      "Fear",
      "Anxiety",
      "Worry",
      "Panic",
      "Dread",
      "Terror",
      "Phobias",
      "Paranoia",
      "Insecurity",
      "Timidity"
    ],
    "Sexual Sins": [
      "Fornication",
      "Adultery",
      "Pornography",
      "Masturbation",
      "Lust",
      "Sexual fantasy",
      "Perversion",
      "Sodomy",
      "Homosexuality",
      "Prostitution"
    ],
    "Addictions & Substances": [
      "Alcohol",
      "Drugs (pharmakia)",
      "Nicotine",
      "Marijuana",
      "Prescription drug abuse",
      "Caffeine addiction",
      "Food addiction",
      "Gaming addiction",
      "Social media addiction",
      "Shopping addiction"
    ],
    "Deception & Lies": [
      "Lying",
      "Deceit",
      "Manipulation",
      "Cheating",
      "Fraud",
      "Dishonesty",
      "False witness",
      "Exaggeration",
      "Gossip",
      "Slander"
    ],
    "Jealousy & Envy": [
      "Jealousy",
      "Envy",
      "Covetousness",
      "Competition",
      "Comparison",
      "Rivalry",
      "Greed",
      "Selfishness",
      "Possessiveness",
      "Materialism"
    ],
    "Occult & New Age": [
      "Witchcraft",
      "Divination",
      "Fortune telling",
      "Tarot cards",
      "Ouija board",
      "Horoscopes",
      "Astrology",
      "Crystals",
      "Reiki",
      "Yoga (as spiritual practice)"
    ]
  };

  const handleToggle = (item: string) => {
    setSelectedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const handleSelectAll = (category: string[]) => {
    const allSelected = category.every(item => selectedItems.includes(item));
    if (allSelected) {
      setSelectedItems(prev => prev.filter(item => !category.includes(item)));
    } else {
      setSelectedItems(prev => [...new Set([...prev, ...category])]);
    }
  };

  const copyResults = () => {
    const text = selectedItems.join(", ");
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const handleComplete = async () => {
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
          assessment_type: 'surface_issues',
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
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl font-bold">Surface Issues Assessment</h1>
                  <p className="text-sm text-muted-foreground">Check all that apply to your life</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary">{selectedItems.length} selected</Badge>
          </div>
        </div>
      </header>

      {/* Instructions */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 border-primary/20 shadow-elevated">
          <h2 className="font-serif text-xl font-semibold mb-3">Instructions</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            This is a spiritual assessment checklist for common areas requiring deliverance prayer. Be honest with yourself as you go through each category. 
            Check all items that apply to your life, past or present. These will form your personalized prayer focus list.
          </p>
          <div className="bg-destructive/10 rounded-lg p-4 mb-4 border border-destructive/30">
            <p className="text-sm text-destructive font-semibold">
              <strong>Medical Disclaimer:</strong> This spiritual assessment is NOT medical treatment and does not diagnose or cure addiction, mental health conditions, or medical issues. If you struggle with substance abuse, eating disorders, self-harm, or suicidal thoughts, please seek professional medical and mental health care immediately (988 Lifeline or 911).
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <p className="text-sm text-accent-foreground">
              <strong>Tip:</strong> If your list becomes very long, you can address items by category when praying, 
              or you can pray through each item individually for deeper spiritual breakthrough.
            </p>
          </div>
        </Card>
      </section>

      {/* Assessment Categories */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {Object.entries(assessmentItems).map(([category, items], idx) => (
            <Card
              key={category}
              className="p-6 border-border/50 animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl font-semibold">{category}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelectAll(items)}
                >
                  {items.every(item => selectedItems.includes(item)) ? "Deselect All" : "Select All"}
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {items.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/20 transition-colors">
                    <Checkbox
                      id={item}
                      checked={selectedItems.includes(item)}
                      onCheckedChange={() => handleToggle(item)}
                    />
                    <label
                      htmlFor={item}
                      className="text-sm cursor-pointer flex-1 leading-relaxed"
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

      {/* Results Summary */}
      {selectedItems.length > 0 && (
        <section className="container mx-auto px-4 py-8 pb-16">
          <Card className="max-w-4xl mx-auto p-6 border-primary/20 shadow-elevated sticky bottom-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-2">Your Assessment Results</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedItems.length} items selected. Use these in your deliverance prayer.
                  </p>
                </div>
                <Button onClick={copyResults} size="sm" variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border border-border/30 max-h-40 overflow-y-auto">
                <p className="text-sm leading-relaxed">
                  {selectedItems.join(", ")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleComplete} 
                  size="lg" 
                  className="flex-1 bg-gradient-spiritual shadow-elevated"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save & Go to Prayers"}
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/30">
                  <Link to="/deliverance">View 5-Step Process</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      )}
      </div>
    </ProtectedRoute>
  );
};

export default SurfaceIssuesAssessment;
