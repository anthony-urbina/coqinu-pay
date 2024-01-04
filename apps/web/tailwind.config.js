/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D65752",
      },
      borderColor: {
        primary: "#D65752",
      },
      backgroundColor: {
        primary: "white",
        orange: "#D65752",
      },
    },
  },
  plugins: [],
};
