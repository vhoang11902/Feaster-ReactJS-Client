/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {"600":"#E66B63","700":"#B04740", "userPages":"#f9f7f4", "adminPages":"#f2e9e8"}
      },

    },
    fontFamily: {
      'body': ['Helvetica', 'Arial', 'sans-serif'],
      'aboutUs': ['Segoe UI', 'serif']
    
    }
  },
  plugins: [],
}