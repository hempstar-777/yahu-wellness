import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Play, Pause, X } from "lucide-react";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import { useState, useEffect } from "react";

export function PersistentAudioPlayer() {
  const { currentTrack, isPlaying, toggle, pause, audioElement } = useAudioPlayer();
  const [duration, setDuration] = useState<string>("--:--");
  const [currentTime, setCurrentTime] = useState<string>("0:00");

  useEffect(() => {
    if (!audioElement) return;

    const updateTime = () => {
      const current = Math.floor(audioElement.currentTime);
      const minutes = Math.floor(current / 60);
      const seconds = current % 60;
      setCurrentTime(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    };

    const updateDuration = () => {
      if (audioElement.duration && !isNaN(audioElement.duration)) {
        const total = Math.floor(audioElement.duration);
        const minutes = Math.floor(total / 60);
        const seconds = total % 60;
        setDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      }
    };

    audioElement.addEventListener("timeupdate", updateTime);
    audioElement.addEventListener("loadedmetadata", updateDuration);
    audioElement.addEventListener("durationchange", updateDuration);

    return () => {
      audioElement.removeEventListener("timeupdate", updateTime);
      audioElement.removeEventListener("loadedmetadata", updateDuration);
      audioElement.removeEventListener("durationchange", updateDuration);
    };
  }, [currentTrack, audioElement]);

  if (!currentTrack) return null;

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-50 rounded-none border-t shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            {currentTrack.cover_url ? (
              <img
                src={currentTrack.cover_url}
                alt={`${currentTrack.title} cover art`}
                className="h-12 w-12 rounded object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded bg-primary/10 flex items-center justify-center" aria-hidden>
                <Music className="h-6 w-6 text-primary" />
              </div>
            )}
          </div>
          
          <div className="flex-grow min-w-0">
            <h4 className="font-semibold truncate" title={currentTrack.title}>{currentTrack.title}</h4>
            {currentTrack.artist && (
              <p className="text-sm text-muted-foreground truncate" title={currentTrack.artist || undefined}>
                {currentTrack.artist}
              </p>
            )}
            <p className="text-xs text-muted-foreground" aria-live="polite">
              {currentTime} / {duration}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button onClick={toggle} size="lg" variant={isPlaying ? "secondary" : "default"} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button onClick={pause} size="lg" variant="ghost" aria-label="Stop">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
