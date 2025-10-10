-- Create table for personalized deliverance roadmaps
CREATE TABLE public.deliverance_roadmaps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES public.assessment_results(id) ON DELETE CASCADE,
  roadmap_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  duration_days INTEGER NOT NULL DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  progress JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.deliverance_roadmaps ENABLE ROW LEVEL SECURITY;

-- Users can view their own roadmaps
CREATE POLICY "Users can view own roadmaps"
ON public.deliverance_roadmaps
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own roadmaps
CREATE POLICY "Users can insert own roadmaps"
ON public.deliverance_roadmaps
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own roadmaps
CREATE POLICY "Users can update own roadmaps"
ON public.deliverance_roadmaps
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own roadmaps
CREATE POLICY "Users can delete own roadmaps"
ON public.deliverance_roadmaps
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_roadmaps_user_id ON public.deliverance_roadmaps(user_id);
CREATE INDEX idx_roadmaps_assessment_id ON public.deliverance_roadmaps(assessment_id);

-- Trigger for updated_at
CREATE TRIGGER update_roadmaps_updated_at
BEFORE UPDATE ON public.deliverance_roadmaps
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();