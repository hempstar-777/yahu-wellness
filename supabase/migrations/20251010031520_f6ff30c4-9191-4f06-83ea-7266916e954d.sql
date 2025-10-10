-- Create badges and certificates tables
CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL, -- 'member', 'course_completion', 'subject_expert', 'full_course_diploma'
  badge_category TEXT, -- 'deliverance', 'intercessors', 'trauma', 'naturalHealing', 'tribunals'
  badge_level INTEGER, -- 1-4 for specific module completion
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  badge_data JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS public.user_certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  certificate_type TEXT NOT NULL, -- 'course_module', 'full_course_diploma'
  course_id TEXT NOT NULL,
  course_name TEXT NOT NULL,
  level_index INTEGER, -- NULL for full course diplomas
  level_name TEXT,
  issued_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  certificate_data JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_certificates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for badges
CREATE POLICY "Users can view own badges"
  ON public.user_badges
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view public badges"
  ON public.user_badges
  FOR SELECT
  USING (true);

CREATE POLICY "System can insert badges"
  ON public.user_badges
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for certificates
CREATE POLICY "Users can view own certificates"
  ON public.user_certificates
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert certificates"
  ON public.user_certificates
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX idx_user_badges_type ON public.user_badges(badge_type, badge_category);
CREATE INDEX idx_user_certificates_user_id ON public.user_certificates(user_id);
CREATE INDEX idx_user_certificates_course ON public.user_certificates(course_id, level_index);

-- Grant member badge to all existing users
INSERT INTO public.user_badges (user_id, badge_type, badge_data)
SELECT id, 'member', '{"title": "Community Member", "description": "Welcome to the community!"}'::jsonb
FROM public.profiles
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_badges 
  WHERE user_id = profiles.id AND badge_type = 'member'
);