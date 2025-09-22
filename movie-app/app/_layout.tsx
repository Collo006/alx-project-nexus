import { Stack } from "expo-router";
import "../global.css";
import { ThemeProvider } from "@/components/color-theme";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{headerShown:false}}/>
    </ThemeProvider>
  );
}
