import { createContext, useContext, useState, useRef, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

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

  const play = async (track: Track) => {
    console.log("🎵 Play called for:", track.title, track.file_url);
    
    if (!audioRef.current) {
      console.log("🎵 Creating new Audio element");
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = "anonymous";
      audioRef.current.preload = "metadata";
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
      audioRef.current.addEventListener("error", (e) => {
        console.error("Audio error:", e, audioRef.current?.error);
        setIsPlaying(false);
      });
    }

    const audio = audioRef.current!;

    // Toggle pause if same track is already playing
    if (currentTrack?.id === track.id && !audio.paused) {
      console.log("🎵 Toggling pause for current track");
      audio.pause();
      setIsPlaying(false);
      return;
    }

    // Resolve a fresh, playable URL for Supabase Storage objects
    const resolvePlayableUrl = async (url: string): Promise<string> => {
      try {
        const match = url.match(/\/storage\/v1\/object\/(public|sign)\/([^/]+)\/(.+)/);
        if (!match) {
          console.log("🎵 URL doesn't match Supabase pattern, using as-is:", url);
          return url;
        }
        const [, visibility, bucket, path] = match;
        console.log("🎵 Resolving Supabase URL:", { visibility, bucket, path });
        
        if (visibility === "public") {
          const { data } = supabase.storage.from(bucket).getPublicUrl(path);
          console.log("🎵 Generated public URL:", data.publicUrl);
          return data.publicUrl;
        } else {
          const { data, error } = await supabase.storage
            .from(bucket)
            .createSignedUrl(path, 60 * 60);
          if (!error && data?.signedUrl) {
            console.log("🎵 Generated signed URL");
            return data.signedUrl;
          }
          console.error("🎵 Failed to create signed URL:", error);
        }
      } catch (e) {
        console.warn("resolvePlayableUrl: falling back to provided URL", e);
      }
      return url;
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
    } catch (err) {
      console.error("🎵 Play error:", err);
      setIsPlaying(false);
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
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  return context;
}
