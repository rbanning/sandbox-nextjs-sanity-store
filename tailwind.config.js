/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      extend: {
        animation: {
          'expand-bg': 'expandBG 400ms ease-out'
        }
      },
      keyframes: {
        'expandBG': {
          '0%': {
            opacity: 0,
            transform: 'scaleX(0)'
          },
          '40%': {
            opacity: 0.5,
            transform: 'scaleX(1.1)'
          },
          '100%': {
            opacity: 0,
            transform: 'scaleX(1)'
          },
        }
      },
    },
  },
  plugins: [],
}
