import { useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Video, ResizeMode } from "expo-av";
import React, { useRef } from "react";
import {
  Sora_400Regular,
  Sora_600SemiBold,
  Sora_700Bold,
} from "@expo-google-fonts/sora";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  DancingScript_400Regular,
  DancingScript_600SemiBold,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";
import { ShadowsIntoLight_400Regular } from "@expo-google-fonts/shadows-into-light";
import { useFonts } from "expo-font";

export default function Index() {
  const routes = useRouter();

  const video = useRef<Video>(null);

  //fonts
  const [fontsLoaded] = useFonts({
    Sora_400Regular,
    Sora_700Bold,
    Sora_600SemiBold,
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
    ShadowsIntoLight_400Regular,
    DancingScript_400Regular,
    DancingScript_600SemiBold,
    DancingScript_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Video
            ref={video}
            source={require("@/assets/images/Movie-Intro.mp4")}
            style={styles.backgroundVideo}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            isMuted
          />
          <View className="self-center mt-40">
            <Text
              className=" font-dancingscript_bold text-7xl  mt-56 "
              onPress={() => routes.push("/landing-page")}
              style={styles.overlay}
            >
              BINGE MOVIES
            </Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
