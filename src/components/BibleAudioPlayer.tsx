import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Play, Pause, Volume2, VolumeX, BookOpen } from "lucide-react";
import { toast } from "sonner";

const BibleAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubliminal, setIsSubliminal] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Bible verses for continuous reading (sample - can be expanded)
  const bibleVerses = [
    "Psalm 23: The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters.",
    "John 3:16: For Yahuah so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    "Psalm 91: He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.",
    "Isaiah 41:10: Fear thou not; for I am with thee: be not dismayed; for I am thy Elohim: I will strengthen thee; yea, I will help thee.",
    "Philippians 4:13: I can do all things through Messiah which strengtheneth me.",
    "Romans 8:28: And we know that all things work together for good to them that love Yahuah.",
  ];

  const startBibleReading = () => {
    if ('speechSynthesis' in window) {
      speechRef.current = new SpeechSynthesisUtterance();
      speechRef.current.rate = 0.9;
      speechRef.current.pitch = 1;
      
      // Set volume based on subliminal mode
      if (isSubliminal) {
        speechRef.current.volume = 0.05; // Very low for subliminal
      } else {
        speechRef.current.volume = volume[0] / 100;
      }

      // Loop through verses
      let currentIndex = 0;
      const readNextVerse = () => {
        if (speechRef.current) {
          speechRef.current.text = bibleVerses[currentIndex];
          window.speechSynthesis.speak(speechRef.current);
          
          speechRef.current.onend = () => {
            if (isPlaying) {
              currentIndex = (currentIndex + 1) % bibleVerses.length;
              setTimeout(readNextVerse, 1000);
            }
          };
        }
      };

      readNextVerse();
      toast.success("Bible reading started - 24/7 mode active");
    } else {
      toast.error("Text-to-speech not supported in your browser");
    }
  };

  const stopBibleReading = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    toast.info("Bible reading stopped");
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopBibleReading();
    } else {
      setIsPlaying(true);
      startBibleReading();
    }
  };

  useEffect(() => {
    if (isPlaying && speechRef.current) {
      // Update volume when slider changes
      const newVolume = isSubliminal ? 0.05 : volume[0] / 100;
      if (window.speechSynthesis.speaking) {
        stopBibleReading();
        setTimeout(() => {
          setIsPlaying(true);
          startBibleReading();
        }, 100);
      }
    }
  }, [volume, isSubliminal]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-serif text-xl font-bold">24/7 Bible Audio</h3>
            <p className="text-sm text-muted-foreground">
              Continuous scripture reading with subliminal option
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
              In subliminal mode, audio plays at very low volume (inaudible to conscious hearing
              but processed subconsciously). Perfect for background play while others are present.
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
              className="w-full"
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
                Stop Reading
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Start 24/7 Bible Reading
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BibleAudioPlayer;