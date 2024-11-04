/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    colors: {
      orange: {
        500: "rgb(255, 166, 57)",
        600: "#FF7F00",
      },
      BorderColor: {
        board: "",
        title: "",
        context: "",
      },
      modalColor: {
        back: "",
      },
    },
  },
  plugins: [require("daisyui")],
};
