/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/main.js", "./src/ui.js" , "./src/storage.js" , "./src/services/api.js"],
  theme: {
    extend: {
      
      colors: {
        brand: {
          
           DEFAULT: "hsl(63, 96%, 59%)",
             dark: "#fb9518",
            light: "#E5E7EB",

        },
        ink: "#14171D",
        muted: "#545B68",
        ground: "#EDEFF3",
        line: "rgb(225, 221, 213)",
        
      },
      fontFamily: {
        display: ["Arial", "sans-serif"],
        body: ["Arial", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },
      borderRadius: {
        card: "50px",
      },
      
    },
  },
  plugins: [],
};
