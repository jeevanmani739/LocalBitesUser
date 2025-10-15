/**
 * Modern Bistro Color Palette
 *
 * A clean and sophisticated palette with an earthy, vibrant accent.
 * Feels modern and premium, similar to an upscale restaurant.
 */

export const Colors = {
  // Primary - Burnt Orange (Accent/CTA)
  primary: {
    50: '#FFF8F0',
    100: '#FFF0E6',
    200: '#FFD6B8',
    300: '#FFBD8A',
    400: '#FFA45C',
    500: '#F68537', // Main primary color
    600: '#E66B1F',
    700: '#C85515',
    800: '#A4410D',
    900: '#7D2F08',
  },

  // Background
  background: {
    default: '#E9E9E9', // Light gray - main background
    card: '#FFFFFF', // White - cards and elevated surfaces
    secondary: '#F5F5F5', // Slightly darker for contrast
  },

  // Text
  text: {
    primary: '#181818', // Charcoal black - main text
    secondary: '#6B7280', // Medium gray - secondary text
    muted: '#9CA3AF', // Light gray - muted text
    inverse: '#FFFFFF', // White text on dark backgrounds
  },

  // Border
  border: {
    default: '#E5E7EB', // Default borders
    light: '#F3F4F6', // Light borders for subtle separation
  },

  // Accent
  accent: {
    orange: '#F68537', // Same as primary for consistency
    pewter: '#BDBDBD', // Pewter for secondary accents
  },

  // Semantic Colors
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Status Colors (for order tracking)
  status: {
    pending: '#f59e0b',
    confirmed: '#3b82f6',
    preparing: '#8b5cf6',
    outForDelivery: '#22c55e',
    delivered: '#22c55e',
    cancelled: '#ef4444',
  },
};

export default Colors;
