/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6',
        secondary: '#6d28d9',
        dark: {
          bg: '#0b0f19',
          card: '#1e293b',
          surface: '#151c2c',
        },
        light: {
          bg: '#f8fafc',
          card: '#ffffff',
          surface: '#f1f5f9',
        },
        accent: '#a78bfa',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
