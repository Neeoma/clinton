/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0C',
          900: '#0A0A0C',
          800: '#101114',
          700: '#16181C',
          600: '#1D2025',
          500: '#262A31',
        },
        gold: {
          DEFAULT: '#C9A961',
          light: '#E9D3A4',
          soft: '#DCC08A',
          dark: '#9C7C3C',
          deep: '#7A6030',
        },
        cream: '#F6F3ED',
        mist: '#A6A6AE',
        ocean: '#7FA6B8',
        rose: '#C08C93',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      maxWidth: {
        shell: '1320px',
      },
      boxShadow: {
        gold: '0 18px 60px -20px rgba(201,169,97,0.45)',
        card: '0 24px 70px -30px rgba(0,0,0,0.85)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(115deg, #E9D3A4 0%, #C9A961 45%, #9C7C3C 100%)',
        'radial-gold': 'radial-gradient(circle at 50% 50%, rgba(201,169,97,0.16), transparent 65%)',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1.16)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(1.7)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gridDrift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(40px)' },
        },
      },
      animation: {
        kenburns: 'kenburns 12s ease-out forwards',
        marquee: 'marquee 32s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.4s ease-out infinite',
        shimmer: 'shimmer 5s linear infinite',
        'grid-drift': 'gridDrift 12s linear infinite alternate',
      },
    },
  },
  plugins: [],
}
