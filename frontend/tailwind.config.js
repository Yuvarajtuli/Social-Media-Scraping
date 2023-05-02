// tailwind config 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile': '0px',
      'bigMobile': '412px',
      'tablet': '768px',
      'desktop': '936px',
      'bigScreens': '1280px'
    },
    colors: {
      'grey': '#F8F8F8',
      'white': '#FFFFFF',
      'blue': '#4DB7FE',
      'black': '#444444',
      'lightBlack': '#333333',
	'blueHover':'#3285BC',
      'buttons': {
        'primary': '#4DB7FE'
      }
    },
    fontFamily: {
      'primary': 'Open Sans'
    },
    extend: {
      'boxShadow': {
        'v1': '0px 0px 21px 15px rgba(0, 0, 0, 0.03)',
        'v2': '0px 0px 0px 10px rgba(0, 0, 0, 0.1)',
        'v3': '0px 0px 0px 5px rgba(0, 0, 0, 0.1)',
        'v4': '0px 0px 16px 4px rgba(0, 0, 0, 0.15)',
        'v5': '0px 4px 64px 8px rgba(0, 0, 0, 0.05)',
        'v6': ' 0px 0px 64px 8px rgba(0, 0, 0, 0.25)',
        'v7': '0px 0px 8px 2px rgba(0, 0, 0, 0.03)',
        'v8' : '0px 0px 32px 16px rgba(0, 0, 0, 0.03)'

      }
    },
  },
  plugins: [],
}