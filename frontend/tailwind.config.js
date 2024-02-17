/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["IBM Plex  Mono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        "custom-black": "#020202",
        "custom-light-blue": "#9ED8DB",
        "custom-blue": "#467599",
        "custom-dark-blue": "#1D3354",
      },
    },
  },
  plugins: [],
};
