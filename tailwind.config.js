/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{
        'sidebar-head':'#214162',
        'sidebar-body':'#15283c',
        'sidebar-foot':'#db4d21fb',
        'main-container':'#fafafb'
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

