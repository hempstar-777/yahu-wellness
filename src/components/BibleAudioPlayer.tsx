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
import { supabase } from "@/integrations/supabase/client";

const BibleAudioPlayer = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubliminal, setIsSubliminal] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);
  const [bibleLanguage, setBibleLanguage] = useState('en');
  const [voiceId, setVoiceId] = useState('goT3UYdM9bhm0n2lmKQx'); // Edward (British male) - Official
  const isPlayingRef = useRef(false);
  const currentIndexRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isProcessingRef = useRef(false);
  const ttsInFlightRef = useRef(false);
  const failureCountRef = useRef(0);
  const lastToastAtRef = useRef(0);

  const bibleVerses = ethiopianBibleVerses;

  const playNextInQueue = async () => {
    if (isProcessingRef.current || audioQueueRef.current.length === 0 || !isPlayingRef.current) {
      isProcessingRef.current = false;
      return;
    }

    isProcessingRef.current = true;
    const audioUrl = audioQueueRef.current.shift()!;

    try {
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      audioRef.current.src = audioUrl;
      audioRef.current.volume = isMuted ? 0 : isSubliminal ? 0.05 : volume[0] / 100;
      
      audioRef.current.onended = () => {
        URL.revokeObjectURL(audioUrl);
        isProcessingRef.current = false;
        
        if (isPlayingRef.current) {
          currentIndexRef.current = (currentIndexRef.current + 1) % bibleVerses.length;
          startBibleReading();
        }
      };

      audioRef.current.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        isProcessingRef.current = false;
        if (isPlayingRef.current) {
          setTimeout(() => {
            currentIndexRef.current = (currentIndexRef.current + 1) % bibleVerses.length;
            startBibleReading();
          }, 1000);
        }
      };

      await audioRef.current.play();
    } catch (error) {
      console.error('Audio playback error:', error);
      URL.revokeObjectURL(audioUrl);
      isProcessingRef.current = false;
      if (isPlayingRef.current) {
        setTimeout(() => {
          currentIndexRef.current = (currentIndexRef.current + 1) % bibleVerses.length;
          startBibleReading();
        }, 1000);
      }
    }
  };

  const startBibleReading = async () => {
    if (!isPlayingRef.current) {
      isPlayingRef.current = true;
      toast.success(t('biblePlayer.started'));
    }

    // Stop any browser TTS fallback if it's speaking
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch {}

    try {
      if (ttsInFlightRef.current) return;
      ttsInFlightRef.current = true;

      const text = bibleVerses[currentIndexRef.current];
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voiceId }
      });

      if (error) throw error as any;

      const audioBase64 = (data as any)?.audioContent || (data as any)?.audio;
      if (!audioBase64 || typeof audioBase64 !== 'string') {
        throw new Error('No audio returned');
      }
      const audioBlob = await (await fetch(`data:audio/mpeg;base64,${audioBase64}`)).blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      audioQueueRef.current.push(audioUrl);

      // Reset failure counter on success
      failureCountRef.current = 0;

      if (!isProcessingRef.current) {
        playNextInQueue();
      }
      ttsInFlightRef.current = false;
    } catch (error: any) {
      console.error('Failed to generate speech:', error);
      ttsInFlightRef.current = false;
      const msg = String(error?.message || 'Failed to generate speech');

      // If likely out of credits/quota
      if (/quota|credits? remaining|payment required/i.test(msg)) {
        const now = Date.now();
        if (now - lastToastAtRef.current > 5000) {
          toast.error('Voice service out of credits. Please top up ElevenLabs or try again later.');
          lastToastAtRef.current = now;
        }
        stopBibleReading();
        return;
      }

      // Rate limiting/backoff handling
      const isRateLimited = (error?.status === 429) || /429|Too many concurrent|rate limit/i.test(msg);
      if (isRateLimited) {
        const now = Date.now();
        if (now - lastToastAtRef.current > 5000) {
          toast.info('Voice service is busy. Retrying shortly...');
          lastToastAtRef.current = now;
        }
        if (isPlayingRef.current) {
          const delay = 2500 + Math.floor(Math.random() * 1500);
          setTimeout(() => {
            if (isPlayingRef.current) startBibleReading();
          }, delay);
        }
        return;
      }

      // General failure: limit retries and avoid toast spam
      failureCountRef.current += 1;
      const now = Date.now();
      if (now - lastToastAtRef.current > 5000) {
        const retrying = failureCountRef.current < 2 ? ' Retrying...' : '';
        toast.error('Failed to generate Bible audio.' + retrying);
        lastToastAtRef.current = now;
      }

      if (failureCountRef.current >= 2) {
        stopBibleReading();
        return;
      }

      if (isPlayingRef.current) {
        setTimeout(() => {
          currentIndexRef.current = (currentIndexRef.current + 1) % bibleVerses.length;
          startBibleReading();
        }, 2000);
      }
    }
  };

  const stopBibleReading = () => {
    isPlayingRef.current = false;
    isProcessingRef.current = false;

    // Also cancel any browser TTS that might be speaking
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch {}
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    
    audioQueueRef.current.forEach(url => URL.revokeObjectURL(url));
    audioQueueRef.current = [];
    
    setIsPlaying(false);
    currentIndexRef.current = 0;
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
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : isSubliminal ? 0.05 : volume[0] / 100;
    }
  }, [volume, isSubliminal, isMuted]);

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      isProcessingRef.current = false;
      ttsInFlightRef.current = false;
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioQueueRef.current.forEach(url => URL.revokeObjectURL(url));
      audioQueueRef.current = [];
    };
  }, []);

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

          <div className="space-y-2">
            <label className="text-sm font-medium">Voice Selection</label>
            <Select value={voiceId} onValueChange={setVoiceId} disabled={isPlaying}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="goT3UYdM9bhm0n2lmKQx">Edward (British Male) - Official</SelectItem>
                <SelectItem value="DLsHlh26Ugcm6ELvS0qi">Miss Walker (Female)</SelectItem>
                <SelectItem value="JBFqnCBsd6RMkjVDRZzb">George (British Male)</SelectItem>
                <SelectItem value="nPczCjzI2devNBz1zQrb">Brian (Male)</SelectItem>
                <SelectItem value="9BWtsMINqrJLrRacOk9x">Aria (Female)</SelectItem>
                <SelectItem value="EXAVITQu4vr4xnSDxMaL">Sarah (Female)</SelectItem>
                <SelectItem value="onwK4e9ZLuTAKqWW03F9">Daniel (Male)</SelectItem>
                <SelectItem value="XB0fDUnXU5powFXDhCwa">Charlotte (Female)</SelectItem>
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