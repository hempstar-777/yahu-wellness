-- Create course purchases table
CREATE TABLE public.course_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  level_index INTEGER,
  purchase_type TEXT NOT NULL CHECK (purchase_type IN ('module', 'full_course')),
  stripe_payment_id TEXT NOT NULL,
  amount_paid INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  purchased_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id, level_index)
);

-- Enable RLS
ALTER TABLE public.course_purchases ENABLE ROW LEVEL SECURITY;

-- Users can view their own purchases
CREATE POLICY "Users can view own purchases" 
ON public.course_purchases 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_course_purchases_user_course ON public.course_purchases(user_id, course_id);

-- Add updated_at column to course_purchases
ALTER TABLE public.course_purchases ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();

-- Trigger for updating updated_at
CREATE TRIGGER update_course_purchases_updated_at
BEFORE UPDATE ON public.course_purchases
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();