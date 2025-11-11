/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./public/*.html"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1220",
        brand: { DEFAULT: "#0b5bd3", dark: "#0843a6" } // Dunkelblau
      },
      boxShadow: { soft: "0 8px 28px rgba(11,91,211,.10)" }
    },
  },
  plugins: [],
}
