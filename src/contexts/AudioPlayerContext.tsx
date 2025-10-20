import { createContext, useContext, useState, useRef, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Track {
  id: string;
  title: string;
  artist: string | null;
  file_url: string;
  cover_url: string | null;
}

interface AudioPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  play: (track: Track) => Promise<void>;
  pause: () => void;
  toggle: () => void;
  audioElement: HTMLAudioElement | null;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const listenersAttachedRef = useRef(false);

  const play = async (track: Track) => {
    console.log("🎵 Play called for:", track.title, track.file_url);
    
    if (!audioRef.current) {
      console.warn("🎵 Audio element not ready yet");
      toast({
        title: "Player initializing",
        description: "Please tap Play again.",
      });
      return;
    }

    // Ensure listeners are attached once to the DOM audio element
    if (!listenersAttachedRef.current) {
      const a = audioRef.current;
      a.crossOrigin = "anonymous";
      // Mobile-friendly playback settings
      // @ts-expect-error playsInline is supported in modern browsers
      a.playsInline = true;
      a.preload = "auto";
      a.muted = false;
      a.volume = 1;
      a.addEventListener("ended", () => setIsPlaying(false));
      a.addEventListener("error", (e) => {
        console.error("Audio error:", e, a.error, {
          src: a.src,
          networkState: a.networkState,
          readyState: a.readyState,
        });
        setIsPlaying(false);
        toast({
          title: "Playback error",
          description: "We couldn't play this track. Try downloading instead.",
          variant: "destructive",
        });
      });
      listenersAttachedRef.current = true;
    }

    const audio = audioRef.current!;

    // Toggle pause if same track is already playing
    if (currentTrack?.id === track.id && !audio.paused) {
      console.log("🎵 Toggling pause for current track");
      audio.pause();
      setIsPlaying(false);
      return;
    }

    // Attempt to play the provided URL directly first (keeps user gesture intact)
    try {
      console.log("🎵 Attempting direct URL playback:", track.file_url);
      audio.src = track.file_url;
      audio.load();
      setCurrentTrack(track);
      await audio.play();
      setIsPlaying(true);
      return;
    } catch (e) {
      console.warn("🎵 Direct URL play failed, will try blob download fallback", e);
    }

    // Download the audio file as a blob to bypass CORS issues
    const resolvePlayableUrl = async (url: string): Promise<string> => {
      try {
        const match = url.match(/\/storage\/v1\/object\/(public|sign)\/([^/]+)\/(.+)/);
        if (!match) {
          console.log("🎵 URL doesn't match Supabase pattern, using as-is:", url);
          return url;
        }
        const [, , bucket, path] = match;
        const cleanPath = path.split("?")[0];
        console.log("🎵 Downloading audio file from:", { bucket, path: cleanPath });
        
        // Download the file as a blob
        const { data, error } = await supabase.storage.from(bucket).download(cleanPath);
        
        if (error || !data) {
          console.error("🎵 Failed to download audio file:", error);
          return url;
        }
        
        // Ensure correct MIME type for mobile decoders
        const ext = cleanPath.toLowerCase().endsWith(".mp3") ? "audio/mpeg" : data.type || "application/octet-stream";
        const typedBlob = data.type === ext ? data : new Blob([data], { type: ext });
        const objectUrl = URL.createObjectURL(typedBlob);
        console.log("🎵 Created object URL for audio playback with type:", ext);
        return objectUrl;
      } catch (e) {
        console.error("🎵 Error resolving playable URL:", e);
        return url;
      }
    };

    const src = await resolvePlayableUrl(track.file_url);
    console.log("🎵 Setting audio.src to:", src);
    audio.src = src;
    audio.load();
    console.log("🎵 Audio loaded, attempting to play...");
    setCurrentTrack(track);
    
    try {
      await audio.play();
      console.log("🎵 Playback started successfully!");
      setIsPlaying(true);
    } catch (err: any) {
      console.warn("🎵 Play error, attempting muted retry:", err?.name || err);
      try {
        audio.muted = true;
        await audio.play();
        console.log("🎵 Muted playback started, unmuting shortly...");
        setIsPlaying(true);
        setTimeout(() => {
          audio.muted = false;
        }, 200);
        return;
      } catch (err2) {
        console.error("🎵 Muted retry failed:", err2);
      }
      setIsPlaying(false);
      toast({
        title: "Playback blocked",
        description: "Tap Play again or try another track. You can also use Download.",
        variant: "destructive",
      });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      pause();
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  return (
    <AudioPlayerContext.Provider value={{ currentTrack, isPlaying, play, pause, toggle, audioElement: audioRef.current }}>
      <audio ref={audioRef} preload="auto" crossOrigin="anonymous" style={{ display: 'none' }} />
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  return context;
}
