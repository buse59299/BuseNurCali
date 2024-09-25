/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container:{
        screens:{
          xs:"375px",
          sm:"640px",
          md: "768px",
          lg: "1024px",
          xl: "1140px",
          "2xl": "1140",
        },
      },
      colors: {
        primary: "#ffbe33",  // Birincil Renk
        secondary: "#222831", // İkincil Renk Sİyah
      },
      fontFamily: {
        dancing: ["Dancing Script", "cursive"],
        sans:["Open Sans", "sans-serif" ],
      },
    },
  },
  plugins: [],

};