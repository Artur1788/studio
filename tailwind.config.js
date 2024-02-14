/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: [' azo-sans-web', 'sans-serif'],
    },
    fontSize: {
      xs: ['12px', '1rem'],
      sm: ['14px', '1.2rem'],
      base: ['16px', '1.2rem'],
      lg: ['18px', '1.2rem'],
      xl: ['20px', '1.2rem'],
      xxl: ['24px', '1.2rem'],
    },
    extend: {
      colors: {
        'light-green': '#59D07F',
        'light-gray': '#C9C9C9',
        'mid-gray-400': '#D9D9D9',
        'backround-gray': '#B9B9B9',
        'custom-black': '#00140A',
      },
      dropShadow: {
        '3xl': '0px 4px 4px rgba(0, 0, 0, 0.50)',
      },
    },
  },
  plugins: [],
};
