import { useRouter } from "expo-router";
import { useRef } from "react";
import {  View,Text, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Video,ResizeMode } from "expo-av";

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  overlay:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",

  },
  text:{
    fontSize:24,
    fontWeight:"bold"
  }
})

export default function Index() {

    const routes=useRouter();

    const video = useRef<Video>(null);


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SafeAreaProvider>
        <SafeAreaView >
        </SafeAreaView>
    
          <Video
          ref={video}
          source={require('@/assets/images/Movie-Intro.mp4')}
          style={{width:800}}
          resizeMode={ResizeMode.COVER} 
          shouldPlay
          isLooping
          isMuted
          />
                 <Text className="text-red-700 font-bold" onPress={()=>routes.push('/landing-page')}style={styles.overlay}>LANDING PAGE</Text>

  
      </SafeAreaProvider>
    </View>
  );
}
