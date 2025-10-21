import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, Music, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

const MusicUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { t } = useTranslation();

  if (!isAdmin) {
    navigate("/");
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const validTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/m4a"];
      const validFiles: File[] = [];
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        // Validate file type
        if (!validTypes.includes(file.type)) {
          toast({
            title: t('musicUpload.invalidFileType'),
            description: `${file.name}: ${t('musicUpload.invalidAudioType')}`,
            variant: "destructive",
          });
          continue;
        }
        
        // Validate file size (100MB max)
        if (file.size > 104857600) {
          toast({
            title: t('musicUpload.fileTooLarge'),
            description: `${file.name}: ${t('musicUpload.audioTooLarge')}`,
            variant: "destructive",
          });
          continue;
        }
        
        validFiles.push(file);
      }
      
      setFiles(validFiles);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast({
        title: t('musicUpload.noFileSelected'),
        description: t('musicUpload.noFileSelectedDesc'),
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    let successCount = 0;
    let failCount = 0;

    try {
      const userId = (await supabase.auth.getUser()).data.user?.id;

      for (const file of files) {
        try {
          // Upload audio file to storage
          const fileExt = file.name.split(".").pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `tracks/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("music")
            .upload(filePath, file);

          if (uploadError) {
            console.error("Audio upload error:", uploadError);
            failCount++;
            continue;
          }

          // Get public URL for audio
          const { data: { publicUrl } } = supabase.storage
            .from("music")
            .getPublicUrl(filePath);

          // Create database record with auto-generated title
          const trackTitle = file.name.replace(/\.[^/.]+$/, "");
          const { error: dbError } = await supabase
            .from("music_tracks")
            .insert({
              title: trackTitle,
              artist: "Camp Yahuah",
              description: description.trim() || null,
              file_url: publicUrl,
              file_name: fileName,
              file_size: file.size,
              cover_url: null,
              uploaded_by: userId,
            });

          if (dbError) {
            console.error("Database insert error:", dbError);
            failCount++;
          } else {
            successCount++;
          }
        } catch (err) {
          console.error("Error uploading file:", file.name, err);
          failCount++;
        }
      }

      if (successCount > 0) {
        toast({
          title: t('musicUpload.uploadSuccess'),
          description: `${successCount} track(s) uploaded successfully${failCount > 0 ? `, ${failCount} failed` : ''}`,
        });
      }

      if (failCount > 0 && successCount === 0) {
        toast({
          title: t('musicUpload.uploadFailed'),
          description: t('musicUpload.uploadFailedDesc'),
          variant: "destructive",
        });
      }

      // Reset form
      setDescription("");
      setFiles([]);
      
      // Navigate to music library
      navigate("/music-library");
    } catch (error) {
      console.error("Error uploading tracks:", error);
      toast({
        title: t('musicUpload.uploadFailed'),
        description: t('musicUpload.uploadFailedDesc'),
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/music-library")}
          className="mb-8 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('musicUpload.backToLibrary')}
        </Button>

        <div className="text-center mb-8">
          <Upload className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">{t('musicUpload.title')}</h1>
          <p className="text-muted-foreground">
            {t('musicUpload.subtitle')}
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <Label htmlFor="file">{t('musicUpload.audioFile')}</Label>
              <div className="mt-2">
                <label
                  htmlFor="file"
                  className="flex items-center justify-center w-full h-32 px-4 transition border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 border-muted-foreground/25"
                >
                  <div className="text-center">
                    {files.length > 0 ? (
                      <>
                        <Music className="mx-auto h-8 w-8 text-primary mb-2" />
                        <p className="text-sm font-medium">{files.length} file(s) selected</p>
                        <p className="text-xs text-muted-foreground">
                          {(files.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024).toFixed(2)} MB total
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload multiple audio files
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t('musicUpload.audioFormats')}
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    accept="audio/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    multiple
                  />
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="description">{t('musicUpload.description')} (Optional - applies to all tracks)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('musicUpload.descriptionPlaceholder')}
                disabled={uploading}
                rows={4}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={uploading || files.length === 0}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('musicUpload.uploading')}
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload {files.length > 0 ? `${files.length} Track(s)` : 'Tracks'}
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default MusicUpload;
