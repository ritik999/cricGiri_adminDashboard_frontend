/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        "sidebar-head-small": "#2a75e6",
        "sidebar-head": "#326ad2",
        "sidebar-body": "#fafafa",
        "sidebar-foot": "#ffa600",
        "main-container": "#fafafb",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
