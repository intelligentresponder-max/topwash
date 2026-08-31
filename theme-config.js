// TOP WASH — geteilte Tailwind-Konfiguration (Marken-Blau).
// Muss NACH dem Tailwind-CDN-Script geladen werden, siehe Einbindung in jeder Seite.
// Ersetzt das bisher auf jeder Seite identisch wiederholte <script>tailwind.config = ...</script>.
// Die Farbwerte sind identisch zu den CSS-Variablen in theme.css (dort maßgeblich).
tailwind.config = {
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
  }
};
