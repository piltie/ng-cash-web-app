/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ibm: "IBM Plex Sans",
        tech: "Share Tech Mono",
      },
    },
  },
  plugins: [],
};
