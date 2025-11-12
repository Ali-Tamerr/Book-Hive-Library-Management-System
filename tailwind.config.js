/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx,html}'],

    theme: {
      colors: {
        gray: colors.coolGray,
        blue: colors.lightBlue,
        red: colors.rose,
        pink: colors.fuchsia,
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      extend: {
        spacing: {
          '128': '32rem',
          '144': '36rem',
        },
        borderRadius: {
          '4xl': '2rem',
        }
      },
      // screens: {
      //   'sm': '576px',
      //   'md': '768px',
      //   'lg': '992px',
      //   'xl': '1200px',
      //   '2xl': '1440px',
      //   '3xl': '1600px',
      //   '4xl': '2560px',
      // },
    },
    variants: {
      extend: {
        
      }
    }
  }