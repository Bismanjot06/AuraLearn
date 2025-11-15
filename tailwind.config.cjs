/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9333EA',
          light: '#A855F7',
          dark: '#7E22CE',
        },
        accent: {
          DEFAULT: '#C084FC',
          light: '#D8B4FE',
          dark: '#A855F7',
        },
        dark: {
          DEFAULT: '#0A0A0F',
          lighter: '#141420',
          card: '#1A1A2E',
          panel: '#0F0F1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #7E22CE 0%, #9333EA 100%)',
        'subtle-gradient': 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
        'glass': 'linear-gradient(135deg, rgba(147, 51, 234, 0.03), rgba(168, 85, 247, 0.01))',
        'dark-gradient': 'linear-gradient(to bottom right, #0A0A0F, #141420, #0A0A0F)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(147, 51, 234, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(168, 85, 247, 0.35)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
