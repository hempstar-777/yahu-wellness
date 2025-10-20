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

    // Download the audio file as a blob to bypass CORS issues
    const resolvePlayableUrl = async (url: string): Promise<string> => {
      try {
        const match = url.match(/\/storage\/v1\/object\/(public|sign)\/([^/]+)\/(.+)/);
        if (!match) {
          console.log("🎵 URL doesn't match Supabase pattern, using as-is:", url);
          return url;
        }
        const [, , bucket, path] = match;
        console.log("🎵 Downloading audio file from:", { bucket, path });
        
        // Download the file as a blob
        const { data, error } = await supabase.storage.from(bucket).download(path);
        
        if (error || !data) {
          console.error("🎵 Failed to download audio file:", error);
          return url;
        }
        
        // Create an object URL from the blob
        const objectUrl = URL.createObjectURL(data);
        console.log("🎵 Created object URL for audio playback");
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
