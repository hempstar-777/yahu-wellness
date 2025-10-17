-- Fix handle_new_user() with input validation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_vip_count INTEGER;
  validated_email TEXT;
  validated_name TEXT;
BEGIN
  -- Validate email format
  validated_email := LOWER(TRIM(NEW.email));
  IF validated_email !~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Validate and sanitize full_name (max 100 chars, strip dangerous chars)
  validated_name := TRIM(COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  validated_name := SUBSTRING(validated_name FROM 1 FOR 100);
  validated_name := REGEXP_REPLACE(validated_name, '[<>\"''`]', '', 'g');
  
  -- Insert profile with validated data
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    validated_email,
    validated_name
  );
  
  -- Create default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  -- Handle VIP assignment (first 500 users)
  SELECT COUNT(*) INTO current_vip_count
  FROM public.vip_users
  WHERE is_active = true;
  
  IF current_vip_count < 500 THEN
    INSERT INTO public.vip_users (user_id, vip_number, is_active)
    VALUES (NEW.id, current_vip_count + 1, true);
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create rate limiting table for AI functions
CREATE TABLE IF NOT EXISTS public.ai_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  function_name TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, function_name, window_start)
);

ALTER TABLE public.ai_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own rate limits"
  ON public.ai_rate_limits
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can manage rate limits"
  ON public.ai_rate_limits
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_ai_rate_limits_user_function 
  ON public.ai_rate_limits(user_id, function_name, window_start);

-- Create cleanup function for old rate limit records
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.ai_rate_limits
  WHERE window_start < NOW() - INTERVAL '1 hour';
END;
$$;

-- Fix forum RLS policies with explicit authentication
DROP POLICY IF EXISTS "Anyone can view forum posts" ON public.forums;
DROP POLICY IF EXISTS "Anyone can view forum replies" ON public.forum_replies;

CREATE POLICY "Authenticated users can view forum posts"
  ON public.forums
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Public can view forum posts"
  ON public.forums
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can view forum replies"
  ON public.forum_replies
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Public can view forum replies"
  ON public.forum_replies
  FOR SELECT
  TO anon
  USING (true);

-- Update forum policies to require authentication for posting
DROP POLICY IF EXISTS "Authenticated users can create posts" ON public.forums;
DROP POLICY IF EXISTS "Authenticated users can create replies" ON public.forum_replies;

CREATE POLICY "Authenticated users can create posts"
  ON public.forums
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create replies"
  ON public.forum_replies
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id AND auth.uid() IS NOT NULL);

-- Create table to track XP activity uniqueness
CREATE TABLE IF NOT EXISTS public.xp_activity_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  activity_type TEXT NOT NULL,
  activity_key TEXT NOT NULL,
  awarded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, activity_type, activity_key)
);

ALTER TABLE public.xp_activity_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activity tracking"
  ON public.xp_activity_tracking
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can manage activity tracking"
  ON public.xp_activity_tracking
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_xp_tracking_user_activity 
  ON public.xp_activity_tracking(user_id, activity_type, activity_key);