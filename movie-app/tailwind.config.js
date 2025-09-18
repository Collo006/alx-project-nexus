/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  fontFamily:{
    sora:["Sora_400Regular"],
    soraBold:["Sora_700Bold"],
    soraSemiBold:["Sora_600SemiBold"]
 },
    theme: {
    extend: {},
  },
  plugins: [],
}

