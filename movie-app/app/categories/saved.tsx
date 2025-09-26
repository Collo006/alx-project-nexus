import { useWatchlist } from "@/context/SavedMovies";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Sora_400Regular, Sora_600SemiBold, Sora_700Bold} from "@expo-google-fonts/sora";
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { useTheme } from "@/components/color-theme";





export default function SavedScreen(){

    const {watchlist,removeFromWatchlist} = useWatchlist();

           ///Dark Theme and Light Theme   
      const {theme,colors,toggleTheme}=useTheme();

  //fonts
  const [fontsLoaded]= useFonts({Sora_400Regular, Sora_700Bold,Sora_600SemiBold, Poppins_400Regular, Poppins_700Bold, Poppins_600SemiBold});
if(!fontsLoaded){
  return null; 
}

    if (watchlist.length===0){
        return <Text className=" font-sora text-2xl self-center " style={{ color: colors.secondaryText, marginTop:86 }}>Your watch List is empty</Text>
    }

    return(

        <View style={{flex:1, backgroundColor:colors.backGround}}>
            <SafeAreaProvider>
                <SafeAreaView style={{flex:1}}>
                                                          {/** Header */}
                                         <View className="absoulte top-0 left-0 right-0" >
                                        <View className=" flex-row justify-between">
                                          <View className=" flex-row">
                                            <Image source={require('@/assets/images/movie.png')} style={{width: 50, height:50}}  />
                                            <Text className="pt-4 font-sora_bold text-2xl  "  style={{ color: colors.secondaryText }}>BingeMovies</Text>
                                            </View>
                                          <View className=" pt-4 flex-row gap-6">
                                       <Link href='/categories/saved' push asChild>
                                         <Ionicons name="person" size={25}  style={{ color: colors.secondaryText }} />
                                         </Link>
                                          </View>
                                        </View>
                                        <View className=" flex-row gap-2 ml-2">
                                        <Text className=" font-sora text-xl " style={{ color: colors.secondaryText }} >My Movies</Text>  
                                          <TouchableOpacity onPress={toggleTheme} style={{marginLeft:273}}   >
                                          <Text className=" font-sora_bold text-xl " style={{  color: colors.secondaryText }}>
                                              {theme === "light" ? " Light" : " Dark "}
                                          </Text>
                                          </TouchableOpacity>
                                        </View>
                                        </View>


        <ScrollView style={{flex:1, padding:16}}>
            <View>

            { watchlist.map((movie:any)=>(
                <View key={movie.id} style={{marginBottom:20}}>
                <Link href={{pathname: "/details/[id]",params: { id: movie.id, type: movie.title ? "movie" : "tv" }}} asChild >
                <TouchableOpacity>
                {movie.poster_path && (
                    <Image source={{uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }} style={{width:120, height:180, borderRadius:8}}/>
                )}
               <Text  className= " font-sora_bold text-xl " style={{marginTop: 8,color: colors.secondaryText }}>{movie.title || movie.name}</Text>
               </TouchableOpacity>
               </Link>
               
               <TouchableOpacity  style={{ backgroundColor:colors.secondaryText,padding: 6, marginTop: 6, borderRadius: 4 }} onPress={()=> removeFromWatchlist(movie.id)}>
                <Text className= "font_poppins text-lg" style={{backgroundColor:colors.secondaryText, color:colors.primaryText, textAlign: "center" }}>Remove</Text>
                 
               </TouchableOpacity>
                </View>
            ))}
           
             </View>
        </ScrollView>

                                                  {/** FOOTER */}
                                            <View className="absolute bottom-0 left-0 right-0 flex-row justify-around  h-28 items-center" style={{backgroundColor:colors.backGround}}> 
                                            <Link href="/landing-page" push asChild>
                                            <Ionicons name="home"  size={20} className="-mt-10" style={{color: colors.secondaryText}} />
                                            </Link> 
                                            <Link href='/categories/movies' push asChild>
                                            <Ionicons name="play-circle"  size={20} className="-mt-10" style={{color: colors.secondaryText}} />
                                            </Link>
                                            <Link href='/categories/tv_series' push asChild>
                                            <Ionicons name="folder" size={20} className="-mt-10" style={{color: colors.secondaryText}}/>
                                            </Link>
                                            <Link href='/categories/saved' push asChild>
                                            <Ionicons name="bookmark" size={20} className="-mt-10" style={{color: colors.secondaryText}}/>
                                            </Link>
                                            </View>    


                </SafeAreaView>
            </SafeAreaProvider>
            </View>
    )
}