/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        "sidebar-head-small": "#2a75e6",
        "sidebar-head": "#284eb6",
        "sidebar-body": "#fafafa",
        "sidebar-foot": "#db4d21fb",
        "main-container": "#fafafb",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
