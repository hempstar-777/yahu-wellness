import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Play, Clock, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PrayerVideo {
  id: string;
  prayer_category: string;
  title: string;
  video_url: string;
  description: string | null;
  duration_minutes: number | null;
  is_vip_only: boolean;
}

const PrayerVideos = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [videos, setVideos] = useState<PrayerVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVIP, setIsVIP] = useState(false);

  useEffect(() => {
    loadVideos();
    checkVIPStatus();
  }, []);

  const checkVIPStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('vip_users')
        .select('is_active')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      setIsVIP(!!data);
    } catch (error) {
      console.error('Error checking VIP status:', error);
    }
  };

  const loadVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('prayer_videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error loading videos:', error);
      toast({
        title: "Error",
        description: "Failed to load prayer videos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const categories = Array.from(new Set(videos.map(v => v.prayer_category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="max-w-7xl mx-auto">
        <Button onClick={() => navigate('/dashboard')} variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Video-Guided Prayers</h1>
          <p className="text-muted-foreground">Follow along with guided deliverance prayers</p>
        </div>

        {loading ? (
          <Card className="p-8 text-center">
            <p>Loading videos...</p>
          </Card>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-bold mb-4 capitalize">{category.replace('_', ' ')}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos
                    .filter(v => v.prayer_category === category)
                    .map((video) => {
                      const embedUrl = getYouTubeEmbedUrl(video.video_url);
                      const canAccess = !video.is_vip_only || isVIP;

                      return (
                        <Card key={video.id} className="overflow-hidden">
                          <div className="relative aspect-video bg-secondary/20">
                            {canAccess && embedUrl ? (
                              <iframe
                                src={embedUrl}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <div className="text-center">
                                  <Lock className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">VIP Only</p>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-semibold">{video.title}</h3>
                              {video.is_vip_only && (
                                <Badge variant="secondary" className="flex-shrink-0">
                                  <Lock className="w-3 h-3 mr-1" />
                                  VIP
                                </Badge>
                              )}
                            </div>
                            {video.description && (
                              <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                            )}
                            {video.duration_minutes && (
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="w-3 h-3 mr-1" />
                                {video.duration_minutes} min
                              </div>
                            )}
                          </div>
                        </Card>
                      );
                    })}
                </div>
              </div>
            ))}
            {videos.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No videos available yet</p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayerVideos;