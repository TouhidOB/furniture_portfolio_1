/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atelier: {
          ivory: '#F5F2EC',
          charcoal: '#181818',
          sand: '#D7C5AF',
          walnut: '#72503C',
          stone: '#A7A39C',
          bronze: '#A57C52',
          white: '#FFFFFF',
          darkSurface: '#121212',
          subtleBorder: '#E6E2D8',
          cardBg: '#EDE8E0',
          mutedText: '#76726B',
        }
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      spacing: {
        'desktop-x': '6vw',
      },
      transitionTimingFunction: {
        'atelier-ease': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
