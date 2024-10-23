/** @type {import('tailwindcss').Config} */
import svgr from "vite-plugin-svgr";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [svgr()],
}

