-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'audio-cache',
  'audio-cache',
  true,
  10485760,
  ARRAY['audio/mpeg', 'audio/mp3']
)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for audio-cache bucket
CREATE POLICY "Audio files are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'audio-cache');

CREATE POLICY "System can insert audio files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'audio-cache');

CREATE POLICY "System can update audio files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'audio-cache');