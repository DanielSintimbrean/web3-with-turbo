/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: "#0096FF",
          // "primary-focus": "#00FF00", //cambiar
          // "primary-content": "#00FF00", //cambiar
          secondary: "#FF1E56",
          // "secondary-focus": "#00FF00", //cambiar
          // "secondary-content": "#00FF00", //cambiar
          accent: "#7928CA",
          // "accent-focus": "#00FF00", //cambiar
          // "accent-content": "#f8f3ed",
          neutral: "#12101F",
          // "neutral-focus": "#212529", //button hover
          // "neutral-content": "#212529", //button content
          "base-100": "#101010",
          "base-200": "#222222",
          "base-300": "#4b4949",
          "base-content": "#f8f3ed", //text
          info: "#2563eb",
          success: "#22c55e",
          warning: "#facc15",
          error: "#e11d48",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "mytheme",
  },
};

module.exports = config;
