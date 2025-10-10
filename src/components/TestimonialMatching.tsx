import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Users, MessageCircle, Sparkles } from "lucide-react";

interface Match {
  testimony_id: string;
  testimony_title: string;
  user_name: string;
  similarity_score: number;
  shared_themes: string[];
}

const TestimonialMatching = ({ currentTestimonyId }: { currentTestimonyId: string }) => {
  const { toast } = useToast();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentTestimonyId) {
      findMatches();
    }
  }, [currentTestimonyId]);

  const findMatches = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get current testimony
      const { data: currentTestimony } = await supabase
        .from('testimonies')
        .select('content')
        .eq('id', currentTestimonyId)
        .single();

      if (!currentTestimony) return;

      // Get other public testimonies
      const { data: otherTestimonies } = await supabase
        .from('testimonies')
        .select(`
          id,
          title,
          content,
          profiles:user_id (full_name)
        `)
        .eq('is_public', true)
        .neq('user_id', user.id)
        .limit(20);

      if (!otherTestimonies) return;

      // Simple keyword matching for themes
      const currentWords = currentTestimony.content.toLowerCase().split(/\s+/);
      const keywords = [
        'deliverance', 'healing', 'trauma', 'addiction', 'depression',
        'anxiety', 'fear', 'anger', 'forgiveness', 'freedom',
        'spiritual warfare', 'generational', 'occult', 'abuse'
      ];

      const foundMatches: Match[] = otherTestimonies.map(testimony => {
        const testimonyWords = testimony.content.toLowerCase().split(/\s+/);
        const sharedThemes = keywords.filter(keyword => 
          currentWords.some(w => w.includes(keyword)) && 
          testimonyWords.some(w => w.includes(keyword))
        );

        const similarity = sharedThemes.length / Math.max(keywords.length, 1);

        return {
          testimony_id: testimony.id,
          testimony_title: testimony.title,
          user_name: testimony.profiles?.full_name || 'Anonymous',
          similarity_score: similarity,
          shared_themes: sharedThemes
        };
      })
      .filter(m => m.similarity_score > 0.2)
      .sort((a, b) => b.similarity_score - a.similarity_score)
      .slice(0, 3);

      setMatches(foundMatches);
    } catch (error) {
      console.error('Error finding matches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">Finding similar testimonies...</p>
      </Card>
    );
  }

  if (matches.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-lg">Connect With Similar Journeys</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        These believers have overcome similar challenges
      </p>
      <div className="space-y-3">
        {matches.map((match) => (
          <div 
            key={match.testimony_id}
            className="p-4 bg-background rounded-lg border border-border/50"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1">
                <h4 className="font-semibold">{match.testimony_title}</h4>
                <p className="text-xs text-muted-foreground">by {match.user_name}</p>
              </div>
              <Badge variant="secondary" className="flex-shrink-0">
                {Math.round(match.similarity_score * 100)}% match
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {match.shared_themes.map(theme => (
                <Badge key={theme} variant="outline" className="text-xs capitalize">
                  {theme}
                </Badge>
              ))}
            </div>
            <Button size="sm" variant="outline" className="w-full">
              <MessageCircle className="w-3 h-3 mr-2" />
              View Testimony
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TestimonialMatching;