-- Fix search_path for remaining functions without it set

-- Fix grant_creator_admin function
CREATE OR REPLACE FUNCTION public.grant_creator_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.email = 'chidoweywey@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Fix update_forum_reply_count function
CREATE OR REPLACE FUNCTION public.update_forum_reply_count()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
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
$$;

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_vip_count INTEGER;
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
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