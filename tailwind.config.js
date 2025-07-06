plugins: [
  require('@tailwindcss/forms'),
  require('@tailwindcss/typography'),
  require('@tailwindcss/aspect-ratio'),
],
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 10s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
    },
  },
  plugins: [],
}
