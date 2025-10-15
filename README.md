# Food Delivery Customer App

A full-featured food delivery mobile application built with Expo, React Native, TypeScript, and Supabase.

## Features

- ✅ User authentication (email/password)
- ✅ Browse restaurants with search and filters
- ✅ View menu items with images and descriptions
- ✅ Shopping cart with quantity management
- ✅ Multiple delivery address management
- ✅ Order placement and checkout
- ✅ Real-time order tracking
- ✅ Order history
- ✅ Restaurant reviews and ratings
- ✅ User profile management

## Tech Stack

- **Frontend**: Expo (React Native) with TypeScript
- **Styling**: TailwindCSS utility classes
- **State Management**: Zustand
- **Backend**: Supabase (Database, Auth, Real-time)
- **Navigation**: Expo Router
- **Icons**: Lucide React Native

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

**IMPORTANT**: You must set up the database before the app will work properly.

#### Option A: Via Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click **Run** to create all tables and security policies
5. Copy and paste the contents of `supabase/migrations/002_seed_data.sql`
6. Click **Run** to populate with sample data

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

See `SETUP_DATABASE.md` for detailed instructions.

### 3. Verify Environment Variables

Your `.env` file should contain:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

These are already configured for your project.

### 4. Start the App

```bash
npm run dev
```

Then:
- Press `w` to open in web browser
- Scan QR code with Expo Go app for mobile

## Database Schema

The app uses the following tables:

- **profiles** - User profile information
- **restaurants** - Restaurant listings (8 sample restaurants included)
- **menu_items** - Menu items for each restaurant (40+ items included)
- **addresses** - User delivery addresses
- **orders** - Order records
- **order_items** - Individual items in orders
- **reviews** - Customer reviews
- **payments** - Payment records

All tables have Row Level Security (RLS) enabled for data protection.

## Sample Data

After running the seed migration, you'll have:

- 8 restaurants across different cuisines:
  - Pizza Palace (Italian)
  - Burger House (American)
  - Sushi Tokyo (Japanese)
  - Taco Fiesta (Mexican)
  - Thai Spice (Thai)
  - Dragon Wok (Chinese)
  - Mediterranean Grill (Mediterranean)
  - Indian Palace (Indian)

- 40+ menu items with real images from Pexels
- All items include descriptions, prices, and categories

## Usage

### First Time Setup

1. **Run the database migrations** (see step 2 above)
2. Start the app
3. Click "Sign Up" to create a new account
4. Fill in your details (email confirmation is disabled)
5. You'll be automatically signed in

### Ordering Food

1. Browse restaurants on the home screen
2. Tap a restaurant to view its menu
3. Tap menu items to add to cart
4. Specify quantity and special requests
5. Go to Cart tab to review order
6. Tap "Proceed to Checkout"
7. Add a delivery address if you don't have one
8. Review order and tap "Place Order"

### Order Tracking

- View active orders in the "Orders" tab
- See order status progression
- Track delivery in real-time
- Leave reviews for completed orders

## Project Structure

```
├── app/                    # App screens and navigation
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main tab navigation
│   ├── restaurant/        # Restaurant detail
│   ├── order/             # Order detail
│   └── review/            # Review screen
├── components/            # Reusable components
├── contexts/              # React contexts
├── hooks/                 # Custom hooks
├── lib/                   # Utilities and Supabase client
├── store/                 # Zustand stores
├── types/                 # TypeScript types
└── supabase/
    └── migrations/        # Database migrations
```

## Troubleshooting

### "supabaseUrl is required" Error

✅ **FIXED**: The Supabase client now has fallback values. If you still see this error:
- Check that your `.env` file exists
- Verify the environment variables are correct
- Restart the dev server

### No Restaurants Showing

- Make sure you ran the database seed migration (`002_seed_data.sql`)
- Check browser console for errors
- Verify RLS policies are enabled

### Authentication Issues

- Email confirmation is disabled by default
- Users can sign up and immediately use the app
- Profile is automatically created on signup

### Permission Errors

- Ensure RLS policies were created correctly
- Check that you're authenticated when accessing protected data
- Review the policies in `001_initial_schema.sql`

## Build Commands

```bash
# Start development server
npm run dev

# Build for web
npm run build:web

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Security Notes

- All tables have Row Level Security (RLS) enabled
- Users can only access their own data
- Restaurants and menu items are publicly readable
- Authentication is handled by Supabase Auth
- Passwords are securely hashed

## Next Steps

To enhance the app further:

- [ ] Integrate real payment processing (Stripe/PayPal)
- [ ] Add real-time location tracking
- [ ] Implement push notifications
- [ ] Add promo codes and discounts
- [ ] Create admin panel for restaurants
- [ ] Add delivery driver app
- [ ] Implement social login (Google/Apple)
- [ ] Add favorites and saved restaurants
- [ ] Implement order scheduling

## Support

For issues or questions:
1. Check `SETUP_DATABASE.md` for database setup help
2. Review the Troubleshooting section above
3. Check the Supabase dashboard for errors

## License

This project is open source and available under the MIT License.
