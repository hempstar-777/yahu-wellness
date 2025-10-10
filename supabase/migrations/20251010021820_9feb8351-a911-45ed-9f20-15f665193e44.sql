-- Grant admin role to Ryan (creator)
-- First, we need to find the user ID based on email and insert admin role
-- This assumes the user has already signed up with chidoweywey@gmail.com

-- Insert admin role for the creator
-- Note: This will work once the user signs up with this email
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'chidoweywey@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Create a function to automatically grant admin to the creator on signup
CREATE OR REPLACE FUNCTION public.grant_creator_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If this is the creator's email, grant admin role
  IF NEW.email = 'chidoweywey@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger to run after user creation
DROP TRIGGER IF EXISTS on_creator_signup ON auth.users;
CREATE TRIGGER on_creator_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.grant_creator_admin();