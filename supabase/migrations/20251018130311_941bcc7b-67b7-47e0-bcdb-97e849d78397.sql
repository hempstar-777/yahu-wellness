-- Create storage bucket for music files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'music',
  'music',
  true,
  104857600, -- 100MB limit per file
  ARRAY['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a']
);

-- Create table for music tracks
CREATE TABLE public.music_tracks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size BIGINT,
  duration INTEGER, -- duration in seconds
  uploaded_by UUID REFERENCES auth.users(id),
  play_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.music_tracks ENABLE ROW LEVEL SECURITY;

-- Everyone can view music
CREATE POLICY "Anyone can view music tracks"
ON public.music_tracks
FOR SELECT
USING (true);

-- Only admins can upload music
CREATE POLICY "Admins can insert music tracks"
ON public.music_tracks
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Only admins can update music
CREATE POLICY "Admins can update music tracks"
ON public.music_tracks
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Only admins can delete music
CREATE POLICY "Admins can delete music tracks"
ON public.music_tracks
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Storage policies for music bucket
CREATE POLICY "Anyone can view music files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'music');

CREATE POLICY "Admins can upload music files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'music' AND
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update music files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'music' AND
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete music files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'music' AND
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Trigger for updated_at
CREATE TRIGGER update_music_tracks_updated_at
BEFORE UPDATE ON public.music_tracks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to increment play count
CREATE OR REPLACE FUNCTION public.increment_play_count(track_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.music_tracks
  SET play_count = play_count + 1
  WHERE id = track_id;
END;
$$;

-- Function to increment download count
CREATE OR REPLACE FUNCTION public.increment_download_count(track_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.music_tracks
  SET download_count = download_count + 1
  WHERE id = track_id;
END;
$$;