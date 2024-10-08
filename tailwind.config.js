/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'bg-color': '#242424',
        'primary': '#0C0C0C',
        // 'active': "amber-300"
      }
    },
  },
  plugins: [],
}

