/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: {
          500: "#FCCD2A",
          400: "#FCD54D",
          300: "#FFDD66",
          200: "#FFE485",
        },
        primary: {
          600: "#127316",
          500: "#388E3C",
          400: "#41B146",
          300: "#60CE65",
          200: "#77BC7A",
          100: "#A8CCA9",
        },
        whitegray: "#FAFAFA",
        darkgray: "#3C3C3C",
        slategray: "#707070",
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
