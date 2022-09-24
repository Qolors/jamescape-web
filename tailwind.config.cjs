/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require('tailwindcss-neumorphism')],
  daisyui: {
    styled: true,
    themes: ['lofi']
  }
};
