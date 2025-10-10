-- Fix search_path for calculate_level function
CREATE OR REPLACE FUNCTION public.calculate_level(total_xp INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
BEGIN
  RETURN FLOOR(SQRT(total_xp / 100)) + 1;
END;
$$;

-- Fix search_path for update_streak_level function
CREATE OR REPLACE FUNCTION public.update_streak_level()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.level = calculate_level(NEW.total_xp);
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;