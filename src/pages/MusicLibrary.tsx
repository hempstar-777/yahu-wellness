import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Music, Download, Upload, ArrowLeft, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MusicTrack {
  id: string;
  title: string;
  artist: string | null;
  description: string | null;
  file_url: string;
  file_name: string;
  cover_url: string | null;
  play_count: number;
  download_count: number;
  created_at: string;
  // resolved fields for playback
  resolved_url?: string;
  mime_type?: string;
}

const MusicLibrary = () => {
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; track: MusicTrack | null }>({ open: false, track: null });
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();
const navigate = useNavigate();
const errorNotifiedRef = useRef<Record<string, number>>({});
  const { t } = useTranslation();

  useEffect(() => {
    fetchTracks();
  }, []);

const fetchTracks = async () => {
  try {
    const { data, error } = await supabase
      .from("music_tracks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const enhanced = (data || []).map((t: MusicTrack) => {
      const name = (t.file_name || '').toLowerCase();
      const mime = name.endsWith('.mp3')
        ? 'audio/mpeg'
        : name.endsWith('.m4a')
        ? 'audio/mp4'
        : name.endsWith('.wav')
        ? 'audio/wav'
        : name.endsWith('.ogg')
        ? 'audio/ogg'
        : 'audio/mpeg';

      // Prefer the URL stored with the track; avoid hardcoding bucket names
      const url = t.file_url;
      return { ...t, resolved_url: url, mime_type: mime } as MusicTrack;
    });

    setTracks(enhanced);
  } catch (error) {
    console.error("Error fetching tracks:", error);
    toast({
      title: t('musicLibrary.errorLoading'),
      description: t('musicLibrary.errorLoadingDesc'),
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};

const parseStorageUrl = (fileUrl: string): { bucket: string | null; path: string | null } => {
  const m = fileUrl?.match(/\/storage\/v1\/object\/(?:public|sign)\/([^/]+)\/(.+?)(?:\?.*)?$/);
  return m ? { bucket: m[1], path: m[2] } : { bucket: null, path: null };
};

const getAudioUrl = (track: MusicTrack): string => {
  return track.resolved_url || track.file_url;
};

  const handlePlayCount = async (trackId: string) => {
    await supabase.rpc("increment_play_count", { track_id: trackId });
    setTracks(prev => prev.map(t => t.id === trackId ? { ...t, play_count: t.play_count + 1 } : t));
  };

const handleDownload = async (track: MusicTrack) => {
  try {
    const { bucket, path } = parseStorageUrl(track.file_url);
    let blob: Blob | null = null;

    if (bucket && path) {
      const { data, error } = await supabase.storage.from(bucket).download(path);
      if (error) throw error;
      blob = data ?? null;
    }

    if (!blob) {
      // Fallback: fetch the direct URL (could be external)
      const resp = await fetch(getAudioUrl(track));
      blob = await resp.blob();
    }

    if (!blob) throw new Error('Download failed');

    const ext = (track.file_name?.split('.').pop() || 'mp3');
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${track.title}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // Increment download count
    await supabase.rpc("increment_download_count", { track_id: track.id });
    setTracks(prev =>
      prev.map(t => t.id === track.id ? { ...t, download_count: t.download_count + 1 } : t)
    );

    toast({
      title: t('musicLibrary.downloadStarted', { defaultValue: 'Download started' }),
      description: t('musicLibrary.downloading', { title: track.title, defaultValue: `Downloading ${track.title}...` }),
    });
  } catch (error) {
    console.error("Error downloading track:", error);
    toast({
      title: t('musicLibrary.downloadFailed', { defaultValue: 'Download failed' }),
      description: t('musicLibrary.downloadFailedDesc', { defaultValue: 'Please try again or contact support.' }),
      variant: "destructive",
    });
  }
};

  const handleDelete = async (track: MusicTrack) => {
    try {
      const { error } = await supabase
        .from("music_tracks")
        .delete()
        .eq("id", track.id);

      if (error) throw error;

      setTracks(prev => prev.filter(t => t.id !== track.id));
      
      toast({
        title: t('musicLibrary.trackDeleted'),
        description: t('musicLibrary.trackDeletedDesc', { title: track.title }),
      });
      
      setDeleteDialog({ open: false, track: null });
    } catch (error) {
      console.error("Error deleting track:", error);
      toast({
        title: t('musicLibrary.deleteFailed'),
        description: t('musicLibrary.deleteFailedDesc'),
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <Music className="h-12 w-12 animate-pulse mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">{t('musicLibrary.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('musicLibrary.back')}
          </Button>
          {isAdmin && (
            <Button
              onClick={() => navigate("/music-upload")}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              {t('musicLibrary.uploadMusic')}
            </Button>
          )}
        </div>

        <div className="text-center mb-12">
          <Music className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">{t('musicLibrary.title')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('musicLibrary.worship')}
          </p>
        </div>

        {tracks.length === 0 ? (
          <Card className="p-12 text-center">
            <Music className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">{t('musicLibrary.noMusic')}</h3>
            <p className="text-muted-foreground">
              {isAdmin ? t('musicLibrary.noMusicAdmin') : t('musicLibrary.noMusicUser')}
            </p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {tracks.map((track) => (
              <Card key={track.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {track.cover_url ? (
                      <img
                        src={track.cover_url}
                        alt={track.title}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Music className="h-8 w-8 text-primary" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <h3 className="text-xl font-semibold mb-1 truncate">
                      {track.title}
                    </h3>
                    {track.artist && (
                      <p className="text-sm text-muted-foreground mb-2">
                        by {track.artist}
                      </p>
                    )}
                    {track.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {track.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{track.play_count} {t('musicLibrary.plays')}</span>
                      <span>{track.download_count} {t('musicLibrary.downloads')}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleDownload(track)}
                        size="lg"
                        variant="outline"
                      >
                        <Download className="h-5 w-5" />
                      </Button>
                      {isAdmin && (
                        <Button
                          onClick={() => setDeleteDialog({ open: true, track })}
                          size="lg"
                          variant="destructive"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
<audio
  controls
  className="w-full"
  crossOrigin="anonymous"
  preload="metadata"
  playsInline
  src={getAudioUrl(track)}
  onPlay={() => handlePlayCount(track.id)}
  onStalled={(e) => {
    // Try to resume on minor network hiccups
    e.currentTarget.play().catch(() => {});
  }}
  onWaiting={(e) => {
    e.currentTarget.play().catch(() => {});
  }}
  onError={async (e) => {
    const last = errorNotifiedRef.current[track.id] || 0;
    const now = Date.now();
    if (now - last < 8000) return;
    errorNotifiedRef.current[track.id] = now;

    const audioEl = e.currentTarget as HTMLAudioElement;
    try {
      const { bucket, path } = parseStorageUrl(track.file_url);
      if (bucket && path) {
        const { data } = await supabase.storage.from(bucket).download(path);
        if (data) {
          const objectUrl = URL.createObjectURL(data);
          audioEl.src = objectUrl;
          await audioEl.play();
          handlePlayCount(track.id);
          return;
        }
      }
      // Final fallback: fetch as-is
      const resp = await fetch(getAudioUrl(track));
      const blob = await resp.blob();
      const objectUrl = URL.createObjectURL(blob);
      audioEl.src = objectUrl;
      await audioEl.play();
      handlePlayCount(track.id);
      return;
    } catch (err) {
      console.error("Audio failed to play", {
        error: (e as any).currentTarget?.error,
        src: (e as any).currentTarget?.currentSrc,
        err,
      });
    }
    toast({
      title: t('musicLibrary.playbackFailed', { defaultValue: 'Playback failed' }),
      description: t('musicLibrary.playbackFailedDesc', { defaultValue: 'We could not play this track. Tap again or use Download.' }),
      variant: "destructive",
    });
  }}
  controlsList="nodownload"
>
  Your browser does not support the audio element.
</audio>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, track: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('musicLibrary.deleteTrack')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('musicLibrary.deleteConfirm', { title: deleteDialog.track?.title || '' })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('musicLibrary.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteDialog.track && handleDelete(deleteDialog.track)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t('musicLibrary.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MusicLibrary;
