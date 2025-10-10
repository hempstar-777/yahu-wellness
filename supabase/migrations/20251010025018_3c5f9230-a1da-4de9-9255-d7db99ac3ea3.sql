-- Update handle_new_user function to automatically grant VIP access to first 500 users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
  
  -- Check current VIP count
  SELECT COUNT(*) INTO current_vip_count
  FROM public.vip_users
  WHERE is_active = true;
  
  -- If less than 500 VIPs, grant VIP access automatically
  IF current_vip_count < 500 THEN
    INSERT INTO public.vip_users (user_id, vip_number, is_active)
    VALUES (NEW.id, current_vip_count + 1, true);
  END IF;
  
  RETURN NEW;
END;
$$;