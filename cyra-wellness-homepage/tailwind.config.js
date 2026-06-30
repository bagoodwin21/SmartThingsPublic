/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm, boutique women's-health palette — warm neutrals + terracotta/blush/sage.
        cream: '#FBF6F0', // page background
        ivory: '#FFFCF8', // card surfaces
        sand: '#F2E7DA', // soft section bands
        terracotta: {
          DEFAULT: '#C2734F', // primary accent
          dark: '#A65C3C', // hover / pressed
          soft: '#E7C3B0', // tints, borders
        },
        blush: '#F0D9CF',
        sage: {
          DEFAULT: '#7E8E72', // secondary accent
          soft: '#DDE3D5',
        },
        cocoa: {
          DEFAULT: '#43342C', // primary text
          muted: '#6F5E54', // secondary text
        },
      },
      fontFamily: {
        // Soft serif for headlines, clean rounded sans for body. Loaded in index.html.
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Nunito Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'soft-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'soft-float': 'soft-float 6s ease-in-out infinite',
      },
      boxShadow: {
        soft: '0 18px 40px -24px rgba(67, 52, 44, 0.35)',
        card: '0 12px 30px -18px rgba(67, 52, 44, 0.28)',
      },
    },
  },
  plugins: [],
}
