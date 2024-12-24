
// tailwind.config.js

/** @type {import('tailwindcss').Config} */

export default {

  content: [

    "./index.html",

    "./src/**/*.{js,ts,jsx,tsx}",

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

}
