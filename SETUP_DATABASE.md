# Database Setup Instructions

## Automatic Setup (Recommended)

If you have access to the Supabase dashboard, you can run the migrations directly:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the migrations in order:
   - First: `supabase/migrations/001_initial_schema.sql`
   - Second: `supabase/migrations/002_seed_data.sql`

## Manual Setup via SQL Editor

### Step 1: Create Tables and Security Policies

Copy and paste the entire contents of `supabase/migrations/001_initial_schema.sql` into the Supabase SQL Editor and click "Run".

This will create:
- profiles table
- restaurants table
- menu_items table
- addresses table
- orders table
- order_items table
- reviews table
- payments table
- All necessary RLS policies
- Indexes for performance

### Step 2: Add Sample Data

Copy and paste the entire contents of `supabase/migrations/002_seed_data.sql` into the Supabase SQL Editor and click "Run".

This will populate:
- 8 sample restaurants (Pizza, Burgers, Sushi, Tacos, Thai, Chinese, Mediterranean, Indian)
- 40+ menu items across all restaurants
- All items include images, descriptions, and prices

## Verification

After running the migrations, verify the setup:

1. Check that all tables exist:
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public';
   ```

2. Verify restaurants were inserted:
   ```sql
   SELECT name, cuisine_type, rating FROM restaurants;
   ```

3. Check menu items:
   ```sql
   SELECT r.name as restaurant, m.name as item, m.price
   FROM menu_items m
   JOIN restaurants r ON r.id = m.restaurant_id
   LIMIT 10;
   ```

## Environment Variables

Make sure your `.env` file has the correct Supabase credentials:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Testing the App

After database setup:

1. Start the app: `npm run dev`
2. Register a new account
3. Browse restaurants
4. Add items to cart
5. Complete an order

## Troubleshooting

### RLS Errors
If you see "permission denied" errors, make sure:
- RLS is enabled on all tables
- Policies are correctly created
- You're authenticated when accessing protected data

### Missing Data
If restaurants don't show up:
- Verify the seed data migration ran successfully
- Check browser console for errors
- Ensure the Supabase URL and key are correct

### Authentication Issues
- Email confirmation is disabled by default
- Users can sign up and immediately use the app
- Profile is automatically created on signup
