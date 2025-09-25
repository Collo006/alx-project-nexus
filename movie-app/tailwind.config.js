/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [ "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        brand:{
          light: "#FFFFF",
          dark: "#121212",
          primary_one: "#6200EE",
          secondary: "#03DAC6",
          error_one: "#B00020",
          primary_two: "#BB86FC",
          error_two: "#CF6679"
          
        }
      }
    },
    fontFamily:{
      sora:["Sora_400Regular"],
      sora_bold:["Sora_700Bold"],
      sora_semi_bold:["Sora_600SemiBold"],
      poppins:["Poppins_400Regular"],
      poppins_bold:["Poppins_700Bold"],
      poppins_semi_bold:["Poppins_600SemiBold"],
      shadow_into_light:["ShadowIntoLight_400Regular"],
      dancingscript:["DancingScript_400Regular"],
      dancingscript_semi_bold:["DancingScript_600SemiBold"],
      dancingscript_bold:["DancingScript_700Bold"]
    },
  },
  plugins: [],
}