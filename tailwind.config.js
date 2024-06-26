/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        space: ["Space Mono", "monospace"],
        mplus: ["M PLUS 1 Code", "monospace"],
        regards: ["Regards", "sans-serif"],
      },
      colors: {
        primary: "#111010", // 111010 171616 0F172B
      },
      animation: {
        meteor: "meteor 5s linear infinite",
        grid: "grid 15s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(-25%)" },
        },
      },
    },
  },
  plugins: [],
};
