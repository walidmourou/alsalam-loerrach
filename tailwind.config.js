/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#262262',
          light: '#353187',
          dark: '#1b1844'
        },
        secondary: {
          DEFAULT: '#009245',
          light: '#00b354',
          dark: '#007236'
        }
      }
    },
  },
  plugins: [],
};