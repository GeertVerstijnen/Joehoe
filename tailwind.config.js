/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#18413F",
        "mid-blue": "#2F6A69",
        blue: "#449392",
        "light-blue": "#5BBEBC",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
