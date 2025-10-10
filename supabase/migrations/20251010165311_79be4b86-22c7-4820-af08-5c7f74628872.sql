-- Add prayer videos table
CREATE TABLE IF NOT EXISTS public.prayer_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prayer_category TEXT NOT NULL,
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER,
  is_vip_only BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.prayer_videos ENABLE ROW LEVEL SECURITY;

-- Everyone can view non-VIP videos
CREATE POLICY "Anyone can view public prayer videos"
ON public.prayer_videos FOR SELECT
USING (is_vip_only = false);

-- VIP users can view all videos
CREATE POLICY "VIP users can view all prayer videos"
ON public.prayer_videos FOR SELECT
USING (is_vip_user(auth.uid()));

-- Create group prayer sessions table
CREATE TABLE IF NOT EXISTS public.group_prayer_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  prayer_type TEXT,
  max_participants INTEGER DEFAULT 10,
  is_active BOOLEAN DEFAULT true,
  scheduled_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.group_prayer_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view active prayer sessions"
ON public.group_prayer_sessions FOR SELECT
USING (is_active = true);

CREATE POLICY "Users can create prayer sessions"
ON public.group_prayer_sessions FOR INSERT
WITH CHECK (auth.uid() = host_user_id);

CREATE POLICY "Hosts can update their sessions"
ON public.group_prayer_sessions FOR UPDATE
USING (auth.uid() = host_user_id);

-- Create group prayer participants table
CREATE TABLE IF NOT EXISTS public.group_prayer_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.group_prayer_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(session_id, user_id)
);

ALTER TABLE public.group_prayer_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view session participants"
ON public.group_prayer_participants FOR SELECT
USING (true);

CREATE POLICY "Users can join sessions"
ON public.group_prayer_participants FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave sessions"
ON public.group_prayer_participants FOR DELETE
USING (auth.uid() = user_id);

-- Create forums table
CREATE TABLE IF NOT EXISTS public.forums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  reply_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.forums ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view forum posts"
ON public.forums FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create posts"
ON public.forums FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their posts"
ON public.forums FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their posts"
ON public.forums FOR DELETE
USING (auth.uid() = user_id);

-- Create forum replies table
CREATE TABLE IF NOT EXISTS public.forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  forum_id UUID NOT NULL REFERENCES public.forums(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view forum replies"
ON public.forum_replies FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create replies"
ON public.forum_replies FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their replies"
ON public.forum_replies FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their replies"
ON public.forum_replies FOR DELETE
USING (auth.uid() = user_id);

-- Update reply count trigger
CREATE OR REPLACE FUNCTION update_forum_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.forums
    SET reply_count = reply_count + 1,
        updated_at = now()
    WHERE id = NEW.forum_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.forums
    SET reply_count = GREATEST(0, reply_count - 1),
        updated_at = now()
    WHERE id = OLD.forum_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER forum_reply_count_trigger
AFTER INSERT OR DELETE ON public.forum_replies
FOR EACH ROW EXECUTE FUNCTION update_forum_reply_count();

-- Enable realtime for group prayer sessions
ALTER PUBLICATION supabase_realtime ADD TABLE public.group_prayer_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.group_prayer_participants;