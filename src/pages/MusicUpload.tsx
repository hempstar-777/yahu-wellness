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
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { t } = useTranslation();

  if (!isAdmin) {
    navigate("/");
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/m4a"];
      if (!validTypes.includes(selectedFile.type)) {
        toast({
          title: t('musicUpload.invalidFileType'),
          description: t('musicUpload.invalidAudioType'),
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (100MB max)
      if (selectedFile.size > 104857600) {
        toast({
          title: t('musicUpload.fileTooLarge'),
          description: t('musicUpload.audioTooLarge'),
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
      
      // Auto-fill title from filename if empty
      if (!title) {
        const fileName = selectedFile.name.replace(/\.[^/.]+$/, "");
        setTitle(fileName);
      }
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(selectedFile.type)) {
        toast({
          title: t('musicUpload.invalidFileType'),
          description: t('musicUpload.invalidImageType'),
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (10MB max for images)
      if (selectedFile.size > 10485760) {
        toast({
          title: t('musicUpload.fileTooLarge'),
          description: t('musicUpload.imageTooLarge'),
          variant: "destructive",
        });
        return;
      }
      
      setCoverImage(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: t('musicUpload.noFileSelected'),
        description: t('musicUpload.noFileSelectedDesc'),
        variant: "destructive",
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: t('musicUpload.titleRequired'),
        description: t('musicUpload.titleRequiredDesc'),
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload audio file to storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `tracks/${fileName}`;

      console.log("Uploading audio file:", filePath);
      const { error: uploadError } = await supabase.storage
        .from("music")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Audio upload error:", uploadError);
        throw uploadError;
      }

      // Get public URL for audio
      const { data: { publicUrl } } = supabase.storage
        .from("music")
        .getPublicUrl(filePath);
      
      console.log("Audio public URL:", publicUrl);

      // Upload cover image if provided
      let coverUrl = null;
      if (coverImage) {
        const coverExt = coverImage.name.split(".").pop();
        const coverFileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${coverExt}`;
        const coverPath = `covers/${coverFileName}`;

        console.log("Uploading cover image:", coverPath);
        const { error: coverUploadError } = await supabase.storage
          .from("music-covers")
          .upload(coverPath, coverImage);

        if (coverUploadError) {
          console.error("Cover upload error:", coverUploadError);
          // Don't throw, just log and continue without cover
        } else {
          const { data: { publicUrl: coverPublicUrl } } = supabase.storage
            .from("music-covers")
            .getPublicUrl(coverPath);
          coverUrl = coverPublicUrl;
          console.log("Cover public URL:", coverUrl);
        }
      }

      // Create database record
      console.log("Creating database record...");
      const { error: dbError, data: insertedData } = await supabase
        .from("music_tracks")
        .insert({
          title: title.trim(),
          artist: artist.trim() || null,
          description: description.trim() || null,
          file_url: publicUrl,
          file_name: fileName,
          file_size: file.size,
          cover_url: coverUrl,
          uploaded_by: (await supabase.auth.getUser()).data.user?.id,
        })
        .select();

      if (dbError) {
        console.error("Database insert error:", dbError);
        throw dbError;
      }

      console.log("Successfully inserted track:", insertedData);

      toast({
        title: t('musicUpload.uploadSuccess'),
        description: t('musicUpload.uploadSuccessDesc'),
      });

      // Reset form
      setTitle("");
      setArtist("");
      setDescription("");
      setFile(null);
      setCoverImage(null);
      setCoverPreview(null);
      
      // Navigate to music library
      navigate("/music-library");
    } catch (error) {
      console.error("Error uploading track:", error);
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
              <Label htmlFor="cover">{t('musicUpload.coverImage')}</Label>
              <div className="mt-2">
                <label
                  htmlFor="cover"
                  className="flex items-center justify-center w-full h-48 px-4 transition border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 border-muted-foreground/25"
                >
                  {coverPreview ? (
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {t('musicUpload.clickToUpload')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t('musicUpload.imageFormats')}
                      </p>
                    </div>
                  )}
                  <input
                    id="cover"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleCoverChange}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="file">{t('musicUpload.audioFile')}</Label>
              <div className="mt-2">
                <label
                  htmlFor="file"
                  className="flex items-center justify-center w-full h-32 px-4 transition border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 border-muted-foreground/25"
                >
                  <div className="text-center">
                    {file ? (
                      <>
                        <Music className="mx-auto h-8 w-8 text-primary mb-2" />
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {t('musicUpload.clickToUploadAudio')}
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
                  />
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="title">{t('musicUpload.title')}</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('musicUpload.titlePlaceholder')}
                disabled={uploading}
                required
              />
            </div>

            <div>
              <Label htmlFor="artist">{t('musicUpload.artist')}</Label>
              <Input
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder={t('musicUpload.artistPlaceholder')}
                disabled={uploading}
              />
            </div>

            <div>
              <Label htmlFor="description">{t('musicUpload.description')}</Label>
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
              disabled={uploading || !file}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('musicUpload.uploading')}
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {t('musicUpload.uploadTrack')}
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
