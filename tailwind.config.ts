export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This catches all files in src
  ],
  theme: {
    extend: {
      colors: {
        // Custom primary colors used in the landing page design
        primary: {
          blue: '#3B82F6',
          indigo: '#6366F1',
          purple: '#A855F7',
          green: '#69E515',
        },
        slate: {
          800: 'rgb(30, 41, 59)',
          900: 'rgb(15, 23, 42)',
        }
      },
      boxShadow: {
        glow: '0 0 30px rgba(59, 130, 246, 0.25), 0 0 20px rgba(59, 130, 246, 0.15)',
      }
    },
  },
  plugins: [],
}