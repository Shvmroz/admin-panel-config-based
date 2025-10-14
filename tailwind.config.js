module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,jsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#0077ED',
          600: '#0066CC',
          700: '#0055AA',
        }
      }
    },
  },
  plugins: [],
}