// TOP WASH — Tailwind-Build-Konfiguration.
// Ersetzt das frühere theme-config.js (Tailwind-Play-CDN-Config); Farbwerte identisch
// zu den CSS-Variablen in theme.css (dort maßgeblich).
module.exports = {
  content: ["./**/*.html", "./chat.js"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff9ff', 100: '#dcf1ff', 200: '#b3e4ff', 300: '#75d1ff',
          400: '#2fb9ff', 500: '#049ef2', 600: '#0080d0', 700: '#0166a8',
          800: '#08578a', 900: '#0c4972', 950: '#082e4a'
        }
      }
    }
  },
  plugins: [],
};
