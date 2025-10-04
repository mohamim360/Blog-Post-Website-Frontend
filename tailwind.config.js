/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: ['"Space Grotesk"', 'sans-serif'], 
      },
      colors: {
        gray: {
          50: '#F8F8F8',
          300: '#DBDBDB',
          600: '#4A4A4A',
          900: '#131313',
        },
        green: {
          500: '#2DC925',
        },
        purple: {
          600: '#6F45EE',
        },
        orange: {
          500: '#C97C25',
        },
      },
      maxWidth: {
        '7xl': '1620px',
      },
    },
  },
  plugins: [],
}
