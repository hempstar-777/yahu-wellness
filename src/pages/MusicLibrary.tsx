import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Music, Download, Upload, ArrowLeft, Trash2 } from "lucide-react";
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
  file_name: string;
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

  const getAudioUrl = (track: MusicTrack): string => {
    const match = track.file_url?.match(/\/storage\/v1\/object\/(?:public|sign)\/[^/]+\/(.+)$/);
    const pathInBucket = match ? match[1] : `tracks/${track.file_name}`;
    const { data } = supabase.storage.from('music').getPublicUrl(pathInBucket);
    return data.publicUrl;
  };

  const handlePlayCount = async (trackId: string) => {
    await supabase.rpc("increment_play_count", { track_id: trackId });
    setTracks(prev => prev.map(t => t.id === trackId ? { ...t, play_count: t.play_count + 1 } : t));
  };

  const handleDownload = async (track: MusicTrack) => {
    try {
      const downloadUrl = getAudioUrl(track);
      const response = await fetch(downloadUrl);
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
                      onPlay={() => handlePlayCount(track.id)}
                      onError={(e) => {
                        console.error("Audio failed to play", {
                          error: (e as any).currentTarget?.error,
                          src: (e as any).currentTarget?.currentSrc,
                        });
                        toast({
                          title: "Playback failed",
                          description: "We couldn't play this track. Try the Download button.",
                          variant: "destructive",
                        });
                      }}
                      controlsList="nodownload"
                    >
                      <source
                        src={getAudioUrl(track)}
                        type={`${track.file_name.toLowerCase().endsWith('.mp3')
                          ? 'audio/mpeg'
                          : track.file_name.toLowerCase().endsWith('.m4a')
                          ? 'audio/mp4'
                          : track.file_name.toLowerCase().endsWith('.wav')
                          ? 'audio/wav'
                          : track.file_name.toLowerCase().endsWith('.ogg')
                          ? 'audio/ogg'
                          : 'audio/mpeg'}`}
                      />
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
    </div>
  );
};

export default MusicLibrary;
