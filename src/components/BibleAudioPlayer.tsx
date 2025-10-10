import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, Volume2, VolumeX, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { ethiopianBibleVerses } from "@/data/ethiopianBible";

const BibleAudioPlayer = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubliminal, setIsSubliminal] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);
  const [bibleLanguage, setBibleLanguage] = useState('en');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const bibleVerses = ethiopianBibleVerses;

  const startBibleReading = () => {
    if ('speechSynthesis' in window) {
      speechRef.current = new SpeechSynthesisUtterance();
      speechRef.current.rate = 0.9;
      speechRef.current.pitch = 1;
      speechRef.current.lang = bibleLanguage === 'he' ? 'he-IL' : bibleLanguage === 'arc' ? 'ar-SA' : bibleLanguage;
      
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
      toast.success(t('biblePlayer.started'));
    } else {
      toast.error(t('biblePlayer.notSupported'));
    }
  };

  const stopBibleReading = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    toast.info(t('biblePlayer.stopped'));
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
    // Handle page visibility to keep audio playing
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        // Keep playing even when tab is hidden
        console.log('Tab hidden but keeping audio playing');
      } else if (!document.hidden && isPlaying && !window.speechSynthesis.speaking) {
        // Resume if stopped when tab becomes visible
        startBibleReading();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying]);

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-serif text-xl font-bold">{t('biblePlayer.title')}</h3>
            <p className="text-sm text-muted-foreground">{t('biblePlayer.subtitle')}</p>
            <p className="text-xs text-primary mt-1">{t('biblePlayer.usingEthiopianCanon')}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('biblePlayer.selectLanguage')}</label>
            <Select value={bibleLanguage} onValueChange={setBibleLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t('languages.en')}</SelectItem>
                <SelectItem value="es">{t('languages.es')}</SelectItem>
                <SelectItem value="fr">{t('languages.fr')}</SelectItem>
                <SelectItem value="ar">{t('languages.ar')}</SelectItem>
                <SelectItem value="he">{t('languages.he')}</SelectItem>
                <SelectItem value="arc">{t('languages.arc')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{t('biblePlayer.subliminalMode')}</label>
            <Switch checked={isSubliminal} onCheckedChange={setIsSubliminal} />
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