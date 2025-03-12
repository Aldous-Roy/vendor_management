/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#C14600',
        'secondary': '#FF9D23',
        'accent': '#E5D0AC',
      },
    },
  },
  plugins: [],
}