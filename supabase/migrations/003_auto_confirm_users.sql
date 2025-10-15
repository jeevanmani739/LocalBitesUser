/*
  # Auto-confirm Users and Create Profiles

  ## Overview
  Automatically confirms user email addresses and creates user profiles on signup.

  ## Changes
  1. Creates a trigger function to auto-create profiles (with SECURITY DEFINER to bypass RLS)
  2. Updates auth.users to confirm existing unconfirmed users
  3. Creates profiles for existing users

  ## Security
  - Uses SECURITY DEFINER on trigger function to bypass RLS during profile creation
  - This is safe because the trigger only runs for new auth.users records
  - Maintains existing RLS policies on profiles table for all other operations
*/

-- Function to automatically create profiles for new users
-- SECURITY DEFINER allows this function to bypass RLS policies
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile automatically with SECURITY DEFINER to bypass RLS
  INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and create new one
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Confirm all existing unconfirmed users (if any)
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- Create profiles for any existing users who don't have one
INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
SELECT
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', ''),
  created_at,
  NOW()
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;
