/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  // Opcional: configurações de tema
  daisyui: {
    themes: ["light", "dark"], // ou personalize como quiser
  },
};