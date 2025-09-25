import { Stack } from "expo-router";
import "../global.css";
import { ThemeProvider } from "@/components/color-theme";
import { SavedMoviesProvider } from "@/context/SavedMovies";

export default function RootLayout() {
  return (
    <SavedMoviesProvider>
    <ThemeProvider>
      <Stack screenOptions={{headerShown:false}}/>
    </ThemeProvider>
    </SavedMoviesProvider>
  );
}
