import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Copy, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NewAgeAssessment = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const newAgeCategories = [
    {
      category: "New Age Practices",
      items: [
        "Yoga (spiritual, not just exercise)",
        "Meditation (transcendental/Eastern)",
        "Reiki",
        "Crystal healing",
        "Energy healing",
        "Chakra work",
        "Kundalini awakening",
        "Third eye opening",
        "Astral projection",
        "Remote viewing",
        "Law of attraction",
        "Manifesting",
        "Vision boards (spiritual)",
      ],
    },
    {
      category: "Occult Symbols & Markings",
      items: [
        "Tattoos (occult symbols)",
        "Metatron's cube tattoo",
        "Sacred geometry tattoos",
        "Flower of life symbol",
        "All-seeing eye",
        "Pentagram/pentacle",
        "Hexagram",
        "Ouroboros (serpent eating tail)",
        "Ankh symbol",
        "Om symbol",
        "Yin yang",
      ],
    },
    {
      category: "False Spiritual Teachers & Entities",
      items: [
        "Ascended masters contact",
        "Spirit guides (non-Holy Spirit)",
        "Angels (unbiblical)",
        "Archangel Michael invocations",
        "Mother Mary worship/contact",
        "Buddha/Eastern deities",
        "Hindu gods",
        "Greek/Roman gods",
        "Egyptian deities",
        "Nordic/Celtic deities",
        "Aliens/extraterrestrials",
        "Pleiadians/Arcturians",
        "Star seed beliefs",
      ],
    },
    {
      category: "Divination & Prophetic Counterfeits",
      items: [
        "Tarot cards",
        "Oracle cards",
        "Pendulum use",
        "Dowsing",
        "I Ching",
        "Runes",
        "Scrying/crystal ball",
        "Palm reading",
        "Numerology",
        "Astrology charts",
        "Horoscopes",
        "Psychic readings",
        "Medium sessions",
      ],
    },
    {
      category: "Alternative Religions & Philosophies",
      items: [
        "Buddhism practices",
        "Hinduism practices",
        "Taoism",
        "Kabbalah (mystical)",
        "Gnosticism",
        "Theosophy",
        "Anthroposophy",
        "Rosicrucianism",
        "Scientology",
        "Urantia Book",
        "Course in Miracles",
        "Eckankar",
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

  const saveAndContinue = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item");
      return;
    }
    
    const existing = localStorage.getItem("assessmentResults") || "";
    const combined = existing ? `${existing}, ${selectedItems.join(", ")}` : selectedItems.join(", ");
    localStorage.setItem("assessmentResults", combined);
    
    toast.success("Assessment saved!");
    navigate("/prayers");
  };

  return (
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
                Assessment 5: New Age & Spiritual Influences
              </h1>
              <p className="text-sm text-muted-foreground">
                Identify New Age practices, occult symbols, and false spiritual connections
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
                <Sparkles className="w-5 h-5" />
                Advanced Renunciation
              </h3>
              <p className="text-sm text-accent-foreground/80">
                New Age and occult practices create spiritual pathways and agreements with
                demonic entities. Even "harmless" symbols like tattoos can be doorways. This
                assessment generates advanced renunciation prayers to cut all pathways.
              </p>
            </div>

            {newAgeCategories.map((category, idx) => (
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
                disabled={selectedItems.length === 0}
              >
                Save & Continue to Prayers
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
  );
};

export default NewAgeAssessment;