/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Agregar las fuentes personalizadas
      fontFamily: {
        'caprasimo': ['Caprasimo', 'cursive'],
        'raleway': ['Raleway', 'sans-serif'],
        'heading': ['Caprasimo', 'cursive'],
        'body': ['Raleway', 'sans-serif'],
      },
      colors: {
        lapis_lazuli: {
          DEFAULT: '#05668d',
          100: '#01151d',
          200: '#022a39',
          300: '#033e56',
          400: '#045372',
          500: '#05668d',
          600: '#089bd5',
          700: '#2dbef7',
          800: '#73d4fa',
          900: '#b9e9fc'
        },
        teal: {
          DEFAULT: '#028090',
          100: '#001a1d',
          200: '#01343a',
          300: '#014d57',
          400: '#026775',
          500: '#028090',
          600: '#03c0d9',
          700: '#29e3fc',
          800: '#70ecfd',
          900: '#b8f6fe'
        },
        persian_green: {
          DEFAULT: '#00a896',
          100: '#00221e',
          200: '#00433d',
          300: '#00655b',
          400: '#008779',
          500: '#00a896',
          600: '#00edd5',
          700: '#32ffea',
          800: '#76fff1',
          900: '#bbfff8'
        },
        mint: {
          DEFAULT: '#02c39a',
          100: '#00271f',
          200: '#014f3e',
          300: '#01765d',
          400: '#029e7c',
          500: '#02c39a',
          600: '#09fdc8',
          700: '#46fdd5',
          800: '#84fee3',
          900: '#c1fef1'
        },
        cream: {
          DEFAULT: '#f0f3bd',
          100: '#46490d',
          200: '#8d931b',
          300: '#d0d82c',
          400: '#e0e675',
          500: '#f0f3bd',
          600: '#f3f6cb',
          700: '#f6f8d8',
          800: '#f9fae5',
          900: '#fcfdf2'
        },
        // Alias para facilidad de uso
        primary: {
          DEFAULT: '#05668d',
          50: '#b9e9fc',
          100: '#73d4fa',
          200: '#2dbef7',
          300: '#089bd5',
          400: '#05668d',
          500: '#045372',
          600: '#033e56',
          700: '#022a39',
          800: '#01151d',
          900: '#000a0d'
        },
        secondary: {
          DEFAULT: '#028090',
          50: '#b8f6fe',
          100: '#70ecfd',
          200: '#29e3fc',
          300: '#03c0d9',
          400: '#028090',
          500: '#026775',
          600: '#014d57',
          700: '#01343a',
          800: '#001a1d',
          900: '#000d0f'
        },
        accent: {
          DEFAULT: '#02c39a',
          50: '#c1fef1',
          100: '#84fee3',
          200: '#46fdd5',
          300: '#09fdc8',
          400: '#02c39a',
          500: '#029e7c',
          600: '#01765d',
          700: '#014f3e',
          800: '#00271f',
          900: '#001310'
        }
      }
    },
  },
  plugins: [],
}