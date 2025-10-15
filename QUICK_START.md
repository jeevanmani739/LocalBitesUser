# Quick Start Guide

## 🚀 Get Your Food Delivery App Running in 5 Minutes

### Step 1: Set Up the Database (REQUIRED)

Your Supabase database is connected, but needs tables and data.

1. Open your Supabase Dashboard: https://supabase.com/dashboard
2. Go to your project
3. Click **SQL Editor** in the left sidebar
4. Copy EVERYTHING from `supabase/migrations/001_initial_schema.sql`
5. Paste into SQL Editor and click **RUN**
6. Copy EVERYTHING from `supabase/migrations/002_seed_data.sql`
7. Paste into SQL Editor and click **RUN**

✅ You now have 8 restaurants with 40+ menu items!

### Step 2: Start the App

The app will automatically connect to your Supabase database.

```bash
npm run dev
```

Press `w` to open in your browser.

### Step 3: Create an Account

1. Click **Sign Up**
2. Enter your email and password
3. You're in! (No email confirmation needed)

### Step 4: Order Food!

1. Browse restaurants
2. Tap one to see the menu
3. Add items to cart
4. Go to Cart tab
5. Add a delivery address
6. Place your order
7. Track it in the Orders tab

## That's It!

You now have a fully functional food delivery app with:
- 8 restaurants (Pizza, Burgers, Sushi, Tacos, Thai, Chinese, Mediterranean, Indian)
- 40+ menu items with real images
- Shopping cart
- Order tracking
- Reviews
- Profile management

## Need Help?

- See `README.md` for detailed documentation
- See `SETUP_DATABASE.md` for database troubleshooting
- Check browser console for any errors

Enjoy your food delivery app! 🍕🍔🍣🌮
