module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF8F0',
          100: '#FFF0E6',
          200: '#FFD6B8',
          300: '#FFBD8A',
          400: '#FFA45C',
          500: '#F68537',
          600: '#E66B1F',
          700: '#C85515',
          800: '#A4410D',
          900: '#7D2F08',
        },
        background: {
          DEFAULT: '#E9E9E9',
          card: '#FFFFFF',
          secondary: '#F5F5F5',
        },
        text: {
          primary: '#181818',
          secondary: '#6B7280',
          muted: '#9CA3AF',
        },
        border: {
          DEFAULT: '#E5E7EB',
          light: '#F3F4F6',
        },
        accent: {
          orange: '#F68537',
          pewter: '#BDBDBD',
        },
      },
    },
  },
  plugins: [],
};

/*
 * Modern Bistro Color Palette
 *
 * Primary (Burnt Orange): #F68537
 * - Used for CTAs, highlights, and interactive elements
 *
 * Background:
 * - Light Gray: #E9E9E9 (main background)
 * - White: #FFFFFF (cards, elevated surfaces)
 *
 * Text:
 * - Charcoal Black: #181818 (primary text)
 * - Gray: #6B7280 (secondary text)
 *
 * Accent:
 * - Pewter: #BDBDBD (borders, dividers)
 */
