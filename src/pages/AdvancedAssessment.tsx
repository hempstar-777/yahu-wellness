import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Copy, ShieldAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdvancedAssessment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const advancedCategories = [
    {
      category: "Dissociation & Alter Systems",
      items: [
        "Dissociative Identity Disorder (DID)",
        "Alter personalities",
        "System fragmentation",
        "Gatekeeper alters",
        "Protector alters",
        "Child alters",
        "Persecutor alters",
        "Amnesic barriers",
        "Internal programming",
        "Structured system",
      ],
    },
    {
      category: "Mind Control & Programming",
      items: [
        "MK-Ultra programming",
        "Monarch programming",
        "Illuminati programming",
        "Military programming (MILAB)",
        "Beta programming (sexual)",
        "Delta programming (assassination)",
        "Theta programming (psychic)",
        "Omega programming (self-destruct)",
        "Triggers/codes",
        "Handler control",
      ],
    },
    {
      category: "Vows & Inner Agreements",
      items: [
        "Vow of silence",
        "Vow never to tell",
        "Agreement with death",
        "Agreement with suicide",
        "Self-abandonment",
        "Agreement to stay in bondage",
        "Vow to protect abusers",
        "Agreement with fear",
        "Covenant with death",
        "Agreement with darkness",
      ],
    },
    {
      category: "Spiritual Technologies & Implants",
      items: [
        "Spiritual implants",
        "Monitoring devices (spiritual)",
        "Tracking systems",
        "Frequency weapons",
        "Scalar wave interference",
        "Black goo",
        "Nanobots (spiritual)",
        "AI overlay",
        "Quantum entanglement",
        "Spiritual microchips",
      ],
    },
    {
      category: "Advanced Demonic Strongholds",
      items: [
        "Demonic portals in body",
        "Internal demonic kingdoms",
        "Ruling spirits/principalities",
        "Legion-level oppression",
        "Spiritual cages/prisons",
        "Demonic council",
        "Unholy trinity structure",
        "Baphomet structure",
        "Leviathan spirit",
        "Python spirit",
        "Jezebel spirit",
        "Marine kingdom spirits",
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
          assessment_type: 'advanced',
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
                Assessment 6: Advanced Strongholds
              </h1>
              <p className="text-sm text-muted-foreground">
                For complex cases: alters, programming, vows, and high-level oppression
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
                <ShieldAlert className="w-5 h-5" />
                Advanced Deliverance Warning
              </h3>
              <p className="text-sm text-destructive/80">
                This assessment is for severe cases. If you identify with these items, we
                strongly recommend working with a qualified deliverance coach. Self-deliverance
                may not be sufficient for these complex strongholds. Integration, healing, and
                professional support are often necessary.
              </p>
            </div>

            {advancedCategories.map((category, idx) => (
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

export default AdvancedAssessment;