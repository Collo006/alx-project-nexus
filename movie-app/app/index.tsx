import { useRouter } from "expo-router";
import {  View,Text, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Video,ResizeMode } from "expo-av";
import React, {  useRef} from "react";






export default function Index() {

    const routes=useRouter();

    const video = useRef<Video>(null);


  return (
    <View style={{flex: 1}}>
      <SafeAreaProvider>
        <SafeAreaView style={{flex:1}} >
          <Video
          ref={video}
          source={require('@/assets/images/Movie-Intro.mp4')}
          style={styles.backgroundVideo}
          resizeMode={ResizeMode.COVER} 
          shouldPlay
          isLooping
          isMuted
          />
          <View className="self-center mt-40">
      <Text className="text-red-700 " onPress={()=>routes.push('/landing-page')}style={styles.overlay}>
        BINGE MOVIES
      </Text>
          </View>
     </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  overlay:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",

  },
  backgroundVideo:{
    position:'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0
  }
})