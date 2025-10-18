-- Add cover_url column to music_tracks table
ALTER TABLE public.music_tracks
ADD COLUMN cover_url TEXT;

-- Create a storage bucket for music covers if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('music-covers', 'music-covers', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for music covers
CREATE POLICY "Anyone can view music covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'music-covers');

CREATE POLICY "Admins can upload music covers"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'music-covers' 
  AND EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  )
);

CREATE POLICY "Admins can update music covers"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'music-covers'
  AND EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  )
);

CREATE POLICY "Admins can delete music covers"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'music-covers'
  AND EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  )
);