/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "radial-gradient":
          "radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        front: "#ff1c5e",
      },
    },
  },
  plugins: [],
};
