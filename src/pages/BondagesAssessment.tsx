import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Target, Copy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ProtectedRoute from "@/components/ProtectedRoute";

const BondagesAssessment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const assessmentItems = {
    "Pharmakia (Drug Use & Sorcery)": [
      "Recreational drug use",
      "Illegal substance abuse",
      "Prescription medication misuse",
      "Psychedelic drugs",
      "Mind-altering substances",
      "Drug dealing",
      "Growing illegal substances",
      "Enabling others' drug use",
      "Dependency on medication",
      "Using drugs in spiritual practices"
    ],
    "Illicit Sexual Relationships": [
      "Pre-marital sex",
      "Extra-marital affairs",
      "Multiple sexual partners",
      "One-night stands",
      "Friends with benefits",
      "Sexual experimentation",
      "Swinging/partner swapping",
      "Sex outside of biblical marriage",
      "Sexual cohabitation",
      "Engaging with sex workers"
    ],
    "Perverse Sexual Practices": [
      "BDSM practices",
      "Fetishism",
      "Voyeurism",
      "Exhibitionism",
      "Sexual role-play with demonic themes",
      "Blood rituals in sexuality",
      "Tantric sex",
      "Sex magic",
      "Bestiality",
      "Necrophilia fantasies"
    ],
    "Technology & Media Bondages": [
      "Internet pornography addiction",
      "Sexting",
      "Online sexual encounters",
      "Virtual reality porn",
      "Erotic literature/fan fiction",
      "Sexual chat rooms",
      "Dating apps for hookups",
      "Compulsive social media use",
      "Gaming addiction affecting life",
      "Screen addiction"
    ],
    "Occult Practices & Involvement": [
      "Séances",
      "Channeling spirits",
      "Automatic writing",
      "Pendulum use",
      "Dowsing",
      "Spell casting",
      "Curse work",
      "Hex work",
      "Blood pacts",
      "Satanic rituals"
    ],
    "False Religions & Spiritual Systems": [
      "Buddhism",
      "Hinduism",
      "Islam",
      "Mormonism",
      "Jehovah's Witness",
      "Scientology",
      "Freemasonry",
      "Eastern Star",
      "Kabbalah (occult version)",
      "Gnosticism"
    ],
    "Addictive Behaviors & Compulsions": [
      "Gambling",
      "Compulsive spending",
      "Hoarding",
      "Cutting/self-harm",
      "Eating disorders (anorexia/bulimia)",
      "Compulsive lying",
      "Stealing/kleptomania",
      "Fire setting",
      "Risk-taking behaviors",
      "Adrenaline addiction"
    ],
    "Soul Ties & Ungodly Covenants": [
      "Soul ties with past sexual partners",
      "Emotional affairs",
      "Codependent relationships",
      "Toxic friendships",
      "Ungodly covenants made",
      "Blood brother/sister pacts",
      "Secret society oaths",
      "Vows to false gods",
      "Dedication to spirits",
      "Allegiance to dark forces"
    ],
    "Violence & Aggression": [
      "Physical violence",
      "Domestic abuse",
      "Child abuse",
      "Animal cruelty",
      "Sadism",
      "Torture fantasies",
      "Murder (including abortion)",
      "Attempted suicide",
      "Assault",
      "Weapon fascination"
    ],
    "Manifestations & Spiritual Experiences": [
      "Hearing voices",
      "Seeing apparitions",
      "Night terrors/nightmares",
      "Sleep paralysis",
      "Astral projection",
      "Out-of-body experiences",
      "Levitation",
      "Speaking in unknown tongues (not biblical)",
      "Uncontrollable shaking",
      "Involuntary movements"
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
          assessment_type: 'bondages',
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
                <Target className="w-6 h-6 text-primary" />
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl font-bold">Bondages & Habits Assessment</h1>
                  <p className="text-sm text-muted-foreground">Deeper patterns requiring renunciation</p>
                </div>
              </div>
            </div>
            <Badge variant="default">{selectedItems.length} selected</Badge>
          </div>
        </div>
      </header>

      {/* Instructions */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 border-primary/20 shadow-elevated">
          <h2 className="font-serif text-xl font-semibold mb-3">Instructions</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            This assessment dives deeper into patterns like pharmakia, illicit relationships, and addictive behaviors. 
            Be thorough and honest. Remember, confession is the first step to freedom (1 John 1:9).
          </p>
          <div className="bg-accent/50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-accent-foreground">
              <strong>Important:</strong> For items involving trauma or non-consensual experiences, focus on breaking 
              victim agreements and renouncing any spirits that entered through those doorways—not on confessing as if you sinned.
            </p>
            <p className="text-sm text-accent-foreground">
              These results will be added to any previous assessment results you've saved.
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
                    {selectedItems.length} items selected. These will be combined with any previous assessments.
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
                <Button onClick={handleComplete} size="lg" className="flex-1 bg-gradient-spiritual shadow-elevated" disabled={isSaving}>
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

export default BondagesAssessment;
