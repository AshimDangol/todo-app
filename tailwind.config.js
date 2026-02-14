/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        paper: {
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          800: "#262626",
          900: "#171717",
        },
        ink: {
          900: "#171717",
          700: "#404040",
          500: "#737373",
          400: "#a3a3a3",
          100: "#fafafa",
        },
      },
    },
  },
  plugins: [],
}

