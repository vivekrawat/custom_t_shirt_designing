/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        // handwriting
        delicious: ["Delicious Handrawn", "cursive"],
        freehand: ["Freehand", "cursive"],
        alkatra: ["Alkatra", "cursive"],
        handlee: ["Handlee", "cursive"],
        gochi: ["Gochi Hand", "cursive"],
        // display
        sedgwick: ["Sedgwick Ave Display", "cursive"],
        notoSerif: ["Noto Serif Display", "serif"],
        ruslan: ["Ruslan Display","cursive"],
        majorMono: ["Major Mono Display", "monospace"],
        bigShoulders: ["Big Shoulders Stencil Display", "cursive"],
        almendra: ["Almendra Display", "cursive"],
        monoton: ["Monoton", "cursive"],
        nosifer: ["Nosifer", "cursive"],
        fasterOne: ["Faster One", "cursive"]
      },
    },
  },
  plugins: [],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
}

