import { useRef, useState, useCallback } from "react";
import { Howl } from "howler";

export function useHowlerPlayer() {
  const soundRef = useRef<Howl | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stop = useCallback(() => {
    try { soundRef.current?.stop(); } catch {}
    try { soundRef.current?.unload(); } catch {}
    soundRef.current = null;
    setIsPlaying(false);
    setCurrentId(null);
  }, []);

  const playOrToggle = useCallback((url: string, id: string) => {
    return new Promise<"played" | "paused">((resolve, reject) => {
      // Pause if same track is playing
      if (currentId === id && isPlaying && soundRef.current) {
        try {
          soundRef.current.pause();
          setIsPlaying(false);
          resolve("paused");
          return;
        } catch (e) {
          // if pause fails, try fresh instance
        }
      }

      // Unload any previous sound
      try { soundRef.current?.unload(); } catch {}

      soundRef.current = new Howl({
        src: [url],
        html5: true, // stream large files; better on mobile
        format: ["mp3"],
        preload: true,
        onplay: () => {
          setIsPlaying(true);
          setCurrentId(id);
          resolve("played");
        },
        onend: () => {
          setIsPlaying(false);
          setCurrentId(null);
        },
        onloaderror: (_id, err) => {
          stop();
          reject(new Error(err || "load_error"));
        },
        onplayerror: (_id, err) => {
          // Try to recover after user interaction
          soundRef.current?.once("unlock", () => {
            try { soundRef.current?.play(); } catch {}
          });
          reject(new Error(err || "play_error"));
        },
      });

      try {
        soundRef.current.play();
      } catch (e) {
        stop();
        reject(e as Error);
      }
    });
  }, [currentId, isPlaying, stop]);

  return { playOrToggle, currentId, isPlaying, stop };
}
