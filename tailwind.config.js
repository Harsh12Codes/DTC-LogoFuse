/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        '7xl': '72px',
      },
      keyframes:{
        gradient: {
           "0%": {backgroundPosition : "0% 50%"},
            "100%": {backgroundPosition : "100% 50%"},
        },
      },
      animation: {
        gradient: "gradient 6s linear infinite",
      },
      screens: {
        '1447': '1447px',
        '1240': "1240px",
        "1000": "1000px",
        "578": "578px",
        "458": "458px",
        "340": "340px",
      },
    },
    
  },
  plugins: [],
}

