const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./public/**/*.html",
    "./public/*.html",
    "./src/**/*.js",
    "./src/*.js",
    "./src/**/*.html",
    "./src/*.html",
    "./public/**/*.js",
    "./public/*.js",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        'red4': '#7c0000',
        // Ensure red color palette is properly extended
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d', // This is the red-900 you want
        }
      },
      minHeight: {
        "screen-75": "75vh",
      },
      fontSize: {
        55: "55rem",
      },
      opacity: {
        80: ".8",
      },
      zIndex: {
        2: 2,
        3: 3,
      },
      inset: {
        "-100": "-100%",
        "-225-px": "-225px",
        "-160-px": "-160px",
        "-150-px": "-150px",
        "-94-px": "-94px",
        "-50-px": "-50px",
        "-29-px": "-29px",
        "-20-px": "-20px",
        "25-px": "25px",
        "40-px": "40px",
        "95-px": "95px",
        "145-px": "145px",
        "195-px": "195px",
        "210-px": "210px",
        "260-px": "260px",
      },
      height: {
        "95-px": "95px",
        "70-px": "70px",
        "350-px": "350px",
        "500-px": "500px",
        "600-px": "600px",
      },
      maxHeight: {
        "860-px": "860px",
      },
      maxWidth: {
        "100-px": "100px",
        "120-px": "120px",
        "150-px": "150px",
        "180-px": "180px",
        "200-px": "200px",
        "210-px": "210px",
        "580-px": "580px",
      },
      minWidth: {
        "140-px": "140px",
        48: "12rem",
      },
      backgroundSize: {
        full: "100%",
      },
    },
  },

  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addComponents, theme }) {
      // Your plugin code here (if needed)
      //this is for testing plugin in for ordercard input focus fileds
      // const managerFieldStyles = {
      //   '.manager-field': {
      //     backgroundColor: 'red !important',
      //     borderColor: 'red !important',
      //     borderWidth: '1px !important',
      //     '&:focus': {
      //       borderColor: 'red !important',
      //       boxShadow: '0 0 0 2px rgba(124, 0, 0, 0.1) !important',
      //     }
      //   }
      // }
      
      // addComponents(managerFieldStyles);
    }),
  ],
});