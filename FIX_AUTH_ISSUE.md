# Fix Authentication Issue - Email Confirmation

## Problem
Users are getting "Email not confirmed" error when trying to log in after registration.

## Solution
Run the new migration that automatically confirms users and creates profiles.

## Steps to Fix

### Option 1: Via Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/003_auto_confirm_users.sql`
4. Click **Run** to execute the migration

### Option 2: Using the Supabase CLI

```bash
# If you have Supabase CLI installed
supabase db push
```

## What This Migration Does

1. **Auto-confirms all users**: Sets `email_confirmed_at` for all existing unconfirmed users
2. **Creates a trigger**: Automatically confirms new users and creates their profiles on signup
3. **Creates missing profiles**: Ensures all existing users have profiles in the database

## Testing After Fix

1. Try logging in with your existing account - it should work now
2. Register a new account - it should automatically be confirmed and you should be logged in
3. Close the app and reopen it - you should remain logged in (session persistence)

## Additional Changes Made

### Updated `lib/auth.ts`
- Added automatic profile creation during signup
- Ensures profile is created even if the trigger doesn't fire

### Updated `app/(auth)/login.tsx`
- Better error messages for email confirmation issues
- More user-friendly error handling

## How Email Confirmation is Now Handled

- **Email confirmation is bypassed**: Users are automatically confirmed on signup
- **No email verification needed**: Users can immediately log in after registration
- **Profile auto-creation**: A profile is created automatically for every new user
- **Session persistence**: Login sessions are saved in AsyncStorage and persist across app restarts

## Verification

After running the migration, you can verify it worked by:

1. Go to **Supabase Dashboard > Authentication > Users**
2. Check that all users have a value in the "Email Confirmed At" column
3. Go to **Table Editor > profiles**
4. Verify that all users from auth.users have corresponding profiles

## If You Still Have Issues

If you still can't log in after running the migration:

1. Check the Supabase Dashboard for any error messages
2. Verify the migration ran successfully (no errors in SQL Editor)
3. Try registering a completely new account to test
4. Check that the trigger was created:
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
   ```

## Important Notes

- This disables email verification for the app
- Users can immediately access the app after signup
- This is common for food delivery apps where immediate access is important
- If you want to re-enable email verification later, you'll need to:
  1. Drop the trigger
  2. Update the auth settings in Supabase Dashboard
  3. Implement email verification UI in the app
