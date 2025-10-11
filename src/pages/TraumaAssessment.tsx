import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Copy, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ProtectedRoute from "@/components/ProtectedRoute";

const TraumaAssessment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const traumaCategories = [
    {
      category: "Abuse & Trauma",
      items: [
        "Physical abuse",
        "Sexual abuse",
        "Emotional abuse",
        "Verbal abuse",
        "Ritual abuse",
        "Satanic ritual abuse (SRA)",
        "Mind control programming",
        "Torture",
        "Molestation",
        "Rape",
        "Incest",
        "Human trafficking",
        "Slavery",
      ],
    },
    {
      category: "Secondary Effects of Trauma",
      items: [
        "Bitterness",
        "Unforgiveness toward perpetrators",
        "Self-hatred",
        "Shame",
        "Guilt (false or real)",
        "Fear of intimacy",
        "Fear of authority",
        "Dissociation",
        "Memory loss/amnesia",
        "Nightmares",
        "Flashbacks",
        "Panic attacks",
        "Hypervigilance",
        "Difficulty trusting others",
        "Self-harm tendencies",
        "Suicidal thoughts",
      ],
    },
    {
      category: "Soul Wounds",
      items: [
        "Broken heart",
        "Crushed spirit",
        "Grief that won't heal",
        "Deep loneliness",
        "Abandonment wounds",
        "Rejection wounds",
        "Betrayal trauma",
        "Loss of identity",
        "Loss of innocence",
        "Emotional numbness",
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
          assessment_type: 'trauma',
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
                Assessment 3: Trauma & Soul Wounds
              </h1>
              <p className="text-sm text-muted-foreground">
                Identify trauma, abuse history, and soul wounds requiring healing
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 border-primary/20 shadow-elevated">
          <div className="space-y-6">
            <div className="bg-accent/30 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-accent-foreground flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Important Note
              </h3>
              <p className="text-sm text-accent-foreground/80 space-y-2">
                <span className="block">
                  <strong>Content Warning:</strong> This assessment addresses trauma and abuse. If you are in crisis, please contact professional help immediately (988 Lifeline, 911, or RAINN 1-800-656-4673).
                </span>
                <span className="block">
                  This spiritual assessment helps identify areas for prayer and deliverance. Remember: Even if you were victimized non-consensually, you may have made agreements with spirits of trauma, shame, or bitterness. Focus on breaking these spiritual agreements, not blaming yourself. Forgiveness of perpetrators is key to your spiritual freedom.
                </span>
                <span className="block font-semibold">
                  Important: This is NOT medical treatment. Trauma recovery often requires professional therapy alongside spiritual healing.
                </span>
              </p>
            </div>

            {traumaCategories.map((category, idx) => (
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

export default TraumaAssessment;