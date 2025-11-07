/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        brand: { DEFAULT: "#0ea5e9", dark: "#0284c7" },
      },
      boxShadow: { soft: "0 6px 20px rgba(2,132,199,.08)" },
    },
  },
  plugins: [],
}
