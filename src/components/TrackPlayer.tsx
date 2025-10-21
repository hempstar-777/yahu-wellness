import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Play } from "lucide-react";

export interface TrackPlayerTrack {
  id: string;
  title: string;
  file_url: string;
  file_name: string;
  resolved_url?: string;
  mime_type?: string;
}

interface TrackPlayerProps {
  track: TrackPlayerTrack;
  onPlayed?: () => void;
}

const parseStorageUrl = (fileUrl: string): { bucket: string | null; path: string | null } => {
  // Supports /object/<bucket>/<path> and /object/public|sign/<bucket>/<path>
  const m = fileUrl?.match(/\/storage\/v1\/object\/(?:(?:public|sign)\/)?([^/]+)\/(.+?)(?:\?.*)?$/);
  return m ? { bucket: m[1], path: m[2] } : { bucket: null, path: null };
};

const deriveMime = (name: string) => {
  const lower = (name || '').toLowerCase();
  return lower.endsWith('.mp3')
    ? 'audio/mpeg'
    : lower.endsWith('.m4a')
    ? 'audio/mp4'
    : lower.endsWith('.wav')
    ? 'audio/wav'
    : lower.endsWith('.ogg')
    ? 'audio/ogg'
    : 'audio/mpeg';
};

export default function TrackPlayer({ track, onPlayed }: TrackPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [loading, setLoading] = useState(false);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [srcType, setSrcType] = useState<string>(track.mime_type || deriveMime(track.file_name));

  const toTypedBlobUrl = async (blob: Blob, desiredType: string) => {
    if (blob.type && blob.type !== 'application/octet-stream') {
      return URL.createObjectURL(blob);
    }
    const ab = await blob.arrayBuffer();
    const typed = new Blob([ab], { type: desiredType });
    return URL.createObjectURL(typed);
  };

  const fetchObjectUrl = async () => {
    const desiredType = track.mime_type || deriveMime(track.file_name);
    const { bucket, path } = parseStorageUrl(track.file_url);

    // Try direct authenticated storage download first
    if (bucket && path) {
      const { data, error } = await supabase.storage.from(bucket).download(path);
      if (data) return toTypedBlobUrl(data, desiredType);
      console.warn('Storage download fallback to signed URL', { error, bucket, path });
      const { data: signed } = await supabase.storage.from(bucket).createSignedUrl(path, 60);
      if (signed?.signedUrl) {
        const resp = await fetch(signed.signedUrl);
        if (!resp.ok) throw new Error(`Signed URL fetch failed: ${resp.status}`);
        const blob = await resp.blob();
        return toTypedBlobUrl(blob, desiredType);
      }
    }

    // Final fallback: fetch the provided URL as-is
    const resp = await fetch(track.resolved_url || track.file_url);
    if (!resp.ok) throw new Error(`Direct fetch failed: ${resp.status}`);
    const blob = await resp.blob();
    return toTypedBlobUrl(blob, desiredType);
  };
  const handlePlay = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const desiredType = track.mime_type || deriveMime(track.file_name);
      const url = await fetchObjectUrl();
      const el = audioRef.current;
      if (!el) return;
      // Set src directly for reliable playback, and also update source state
      el.src = url;
      setSrcType(desiredType);
      setSrcUrl(url);
      el.onerror = () => {
        if (el.error) {
          console.error('HTMLAudioElement error', {
            code: el.error.code,
            message: el.error.message,
          });
        }
      };
      el.load();
      await el.play();
      onPlayed?.();
    } catch (err) {
      console.error('TrackPlayer play error', err);
      // Fallback: try playing via a short-lived signed URL directly
      try {
        const { bucket, path } = parseStorageUrl(track.file_url);
        const el = audioRef.current;
        if (bucket && path && el) {
          const { data: signed } = await supabase.storage.from(bucket).createSignedUrl(path, 60);
          if (signed?.signedUrl) {
            const desiredType = track.mime_type || deriveMime(track.file_name);
            el.src = signed.signedUrl;
            setSrcType(desiredType);
            setSrcUrl(signed.signedUrl);
            el.load();
            await el.play();
            onPlayed?.();
            return;
          }
        }
      } catch (fallbackErr) {
        console.error('Signed URL fallback failed', fallbackErr);
      }
      toast({
        title: 'Playback failed',
        description: 'We could not play this track. Tap again or use Download.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={handlePlay}
        size="lg"
        className="gap-2 active:translate-y-[2px] transition-transform"
        disabled={loading}
        aria-busy={loading}
      >
        <Play className="h-5 w-5" />
        {loading ? 'Loading...' : 'Play'}
      </Button>

      <audio
        ref={audioRef}
        className="w-full"
        crossOrigin="anonymous"
        preload="metadata"
        playsInline
      >
        {srcUrl && <source src={srcUrl} type={srcType} />}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
