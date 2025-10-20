import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Music, Download, Play, Pause, Upload, ArrowLeft, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

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
  cover_url: string | null;
  play_count: number;
  download_count: number;
  created_at: string;
}

const MusicLibrary = () => {
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; track: MusicTrack | null }>({ open: false, track: null });
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState<MusicTrack | null>(null);
  const [isNativePlaying, setIsNativePlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      setTracks(data || []);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      toast({
        title: "Error loading music",
        description: "Failed to load music tracks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = async (track: MusicTrack) => {
    console.log("🎵 Native UI: Play clicked for", track.title, track.file_url);
    try {
      setSelectedTrack(track);
      const audio = audioRef.current;
      if (!audio) return;

      // If same track and currently playing, toggle pause
      if (selectedTrack?.id === track.id && !audio.paused) {
        audio.pause();
        setIsNativePlaying(false);
        return;
      }

      if (audio.src !== track.file_url) {
        audio.src = track.file_url;
        audio.load();
      }

      await audio.play();
      setIsNativePlaying(true);

      // Increment play count (fire-and-forget)
      void supabase
        .rpc("increment_play_count", { track_id: track.id })
        .then(() =>
          setTracks(prev => prev.map(t => t.id === track.id ? { ...t, play_count: t.play_count + 1 } : t))
        );
    } catch (e) {
      console.error("🎵 Native play failed:", e);
      toast({
        title: "Playback error",
        description: "Try tapping Play again or use Download.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (track: MusicTrack) => {
    try {
      // Use the file_url directly since it's already a complete public URL
      const response = await fetch(track.file_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${track.title}.mp3`;
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
        title: "Download started",
        description: `Downloading ${track.title}`,
      });
    } catch (error) {
      console.error("Error downloading track:", error);
      toast({
        title: "Download failed",
        description: "Failed to download the track",
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
        title: "Track deleted",
        description: `${track.title} has been removed`,
      });
      
      setDeleteDialog({ open: false, track: null });
    } catch (error) {
      console.error("Error deleting track:", error);
      toast({
        title: "Delete failed",
        description: "Failed to delete the track",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <Music className="h-12 w-12 animate-pulse mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading music library...</p>
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
            Back
          </Button>
          {isAdmin && (
            <Button
              onClick={() => navigate("/music-upload")}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Music
            </Button>
          )}
        </div>

        <div className="text-center mb-12">
          <Music className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Music Library</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Worship and spiritual music to uplift your soul
          </p>
        </div>

        {tracks.length === 0 ? (
          <Card className="p-12 text-center">
            <Music className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No music yet</h3>
            <p className="text-muted-foreground">
              {isAdmin ? "Upload your first track to get started" : "Check back soon for new music"}
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
                      <span>{track.play_count} plays</span>
                      <span>{track.download_count} downloads</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      onClick={() => handlePlay(track)}
                      size="lg"
                      variant={selectedTrack?.id === track.id && isNativePlaying ? "secondary" : "default"}
                    >
                      {selectedTrack?.id === track.id && isNativePlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </Button>
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
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, track: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this track?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteDialog.track?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteDialog.track && handleDelete(deleteDialog.track)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Simple native audio player (from scratch) */}
      <div className={selectedTrack ? "fixed bottom-0 left-0 right-0 border-t rounded-none bg-background" : "hidden"}>
        <div className="container mx-auto px-4 py-3 max-w-6xl">
          <Card className="p-3 rounded-lg shadow-md">
            <div className="flex items-center gap-3">
              {selectedTrack?.cover_url ? (
                <img src={selectedTrack.cover_url} alt={selectedTrack.title} className="h-10 w-10 rounded object-cover" />
              ) : (
                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                  <Music className="h-5 w-5 text-primary" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{selectedTrack?.title}</div>
                <div className="text-xs text-muted-foreground truncate">{selectedTrack?.artist || ""}</div>
              </div>
              <audio
                ref={audioRef}
                controls
                className="w-full max-w-md"
                crossOrigin="anonymous"
                preload="metadata"
                onPlay={() => setIsNativePlaying(true)}
                onPause={() => setIsNativePlaying(false)}
                onEnded={() => setIsNativePlaying(false)}
              />
              <Button
                variant="ghost"
                onClick={() => {
                  if (audioRef.current) audioRef.current.pause();
                  setIsNativePlaying(false);
                  setSelectedTrack(null);
                }}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MusicLibrary;
