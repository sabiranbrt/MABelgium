/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./App.tsx"],
  theme: {
    colors: {
      primary: {
        DEFAULT: "#185CAB",
        light:"#E1EFFF"
      },
      white: "#fff",
      black: "#000",
      gray: {
        DEFAULT: "#808080",
        "dark-color": "#4f545c",
        "ash-color": "#B2BEB5",
        "light-color": "#D9D9D9"
      }
    },
    borderWidth: {
      thin: "0.5px",
      medium: "1px",
    },
    extend: {},
  },
  plugins: [],
  presets: [require("nativewind/preset")],

}
