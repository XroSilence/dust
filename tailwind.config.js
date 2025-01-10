// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}", // Adjusted to include specific file types
    "./public"  // Adjusted to include public folder
  ],
  theme: {
    extend: {
      colors: {
        'dustup': {
          quote: '#3B82F6',
          'quote-hover': '#2563EB',
          services: '#6366F1',
          'services-hover': '#4F46E5',
          contact: '#A855F7',
          'contact-hover': '#9333EA',
          areas: '#69E515',
          'areas-hover': '#5ACC13',
        }
      },
      animation: {
        'rotate-wind': 'rotate-180 0.5s ease-in-out',
      }
    },
  },
  plugins: [],
};