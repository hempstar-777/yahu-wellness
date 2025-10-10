-- Create fasting_tracker table
CREATE TABLE IF NOT EXISTS public.fasting_tracker (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fasting_type TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  duration_hours INTEGER,
  goal_hours INTEGER NOT NULL,
  notes TEXT,
  water_intake_ml INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.fasting_tracker ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own fasting records"
ON public.fasting_tracker
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own fasting records"
ON public.fasting_tracker
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own fasting records"
ON public.fasting_tracker
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own fasting records"
ON public.fasting_tracker
FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_fasting_tracker_updated_at
BEFORE UPDATE ON public.fasting_tracker
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();