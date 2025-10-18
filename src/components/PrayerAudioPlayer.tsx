import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Play, Pause, Volume2, VolumeX, Flame } from "lucide-react";
import { toast } from "sonner";

const PrayerAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubliminal, setIsSubliminal] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);
  const isPlayingRef = useRef(false);

  const deliverancePrayer = `Father Yahuah, I come before you in the mighty name of Yahusha Ha Mashiach. 
    I confess all unrighteousness and sin. I repent and receive your grace. 
    I renounce all evil and break every agreement with darkness. 
    I bind every evil spirit in chains and fetters of iron. 
    I declare you are severed from my life and cast out in Yahusha's name. 
    I speak that spirits resisting are assaulted with the sword of Yahuah, fire, hailstones, and living water. 
    Thank you Yahusha Ha Mashiach for setting me free. I invite the Ruach HaKodesh to fill every space.`;

  const startPrayerLoop = () => {
    if (!('speechSynthesis' in window)) {
      toast.error("Text-to-speech not supported in this browser");
      return;
    }

    // Wait for voices to load
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', startPrayerLoop, { once: true });
      return;
    }

    isPlayingRef.current = true;

    const playPrayer = () => {
      if (!isPlayingRef.current) return;

      const utterance = new SpeechSynthesisUtterance();
      utterance.text = deliverancePrayer;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      // Set volume
      if (isSubliminal) {
        utterance.volume = 0.05;
      } else {
        utterance.volume = isMuted ? 0 : volume[0] / 100;
      }

      utterance.onend = () => {
        if (isPlayingRef.current) {
          setTimeout(playPrayer, 2000);
        }
      };

      utterance.onerror = (error) => {
        console.error('Speech synthesis error:', error);
        if (isPlayingRef.current) {
          setTimeout(playPrayer, 2000);
        }
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Failed to speak:', error);
        toast.error('Failed to start prayer loop');
        setIsPlaying(false);
        isPlayingRef.current = false;
      }
    };

    playPrayer();
    toast.success("Deliverance prayer loop started");
  };

  const stopPrayer = () => {
    isPlayingRef.current = false;
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    toast.info("Prayer loop stopped");
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopPrayer();
    } else {
      setIsPlaying(true);
      startPrayerLoop();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      // Restart with new settings when volume or subliminal changes
      stopPrayer();
      setTimeout(() => {
        setIsPlaying(true);
        startPrayerLoop();
      }, 100);
    }
  }, [volume, isSubliminal, isMuted]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      isPlayingRef.current = false;
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <Card className="p-6 bg-gradient-to-br from-destructive/5 to-primary/5 border-primary/20">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Flame className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-serif text-xl font-bold">Deliverance Prayer Loop</h3>
            <p className="text-sm text-muted-foreground">
              Continuous deliverance prayer with subliminal frequency
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Subliminal Mode</label>
            <Switch
              checked={isSubliminal}
              onCheckedChange={setIsSubliminal}
            />
          </div>
          
          {isSubliminal && (
            <p className="text-xs text-muted-foreground bg-accent/20 p-3 rounded-lg">
              Subliminal frequency mode - prayers play at subconscious level. 
              Others in the room won't hear it, but your spirit receives the declaration.
            </p>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Volume {isSubliminal ? "(Subliminal)" : `(${volume[0]}%)`}
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              disabled={isSubliminal || isMuted}
            />
          </div>

          <Button
            onClick={togglePlay}
            className="w-full bg-gradient-spiritual"
            size="lg"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Stop Prayer Loop
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Start Prayer Loop
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PrayerAudioPlayer;