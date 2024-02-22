/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vgreen: '#39A900',
        vbg: '#F4F4F4',
				vgray: '#C6C2C2',
				vgray2: '#969696',
        vgraylight:'#848484',
        vgraydark:'#515151'
      }
    },
  },
  plugins: [],
}

