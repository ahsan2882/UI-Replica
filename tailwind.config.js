/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0b0f17",
        "midnight-dark": "#1f283d",
        pinkish: "#ff6476",
        "skyish-blue": "#84d7e9",
      },
    },
  },
  plugins: [],
};
