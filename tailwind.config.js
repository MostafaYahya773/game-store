/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{html,js}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        custom: '15% 85%',
      },
      gridTemplateRows: {
        'custom-rows': 'auto 1fr',
      },
      fontSize: {
        'text-xLarge': '50px',
        'text-Large': '30px',
        'text-mediam': '20px',
        'text-normal': '16px',
        'text-small': '14px',
        'text-vsmall': '9px',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
