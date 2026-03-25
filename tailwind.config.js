/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-bg': '#0b0f19',
        'panel': '#2a2a35',
        'red-team-light': '#ff5252',
        'red-team-dark': '#b71c1c',
        'blue-team-light': '#448aff',
        'blue-team-dark': '#0d47a1',
        'gold-light': '#ffd54f',
        'gold-dark': '#f57f17',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
