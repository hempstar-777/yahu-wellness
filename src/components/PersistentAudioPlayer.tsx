import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Play, Pause, X } from "lucide-react";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";

export function PersistentAudioPlayer() {
  const { currentTrack, isPlaying, toggle, pause } = useAudioPlayer();

  if (!currentTrack) return null;

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-50 rounded-none border-t shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            {currentTrack.cover_url ? (
              <img
                src={currentTrack.cover_url}
                alt={currentTrack.title}
                className="h-12 w-12 rounded object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded bg-primary/10 flex items-center justify-center">
                <Music className="h-6 w-6 text-primary" />
              </div>
            )}
          </div>
          
          <div className="flex-grow min-w-0">
            <h4 className="font-semibold truncate">{currentTrack.title}</h4>
            {currentTrack.artist && (
              <p className="text-sm text-muted-foreground truncate">
                {currentTrack.artist}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button onClick={toggle} size="lg" variant={isPlaying ? "secondary" : "default"}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button onClick={pause} size="lg" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
