import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import axios from 'axios';
import { View,Text, TextInput, TouchableOpacity,Image, ActivityIndicator, FlatList,ScrollView  } from "react-native";
import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context";
import { Sora_400Regular, Sora_600SemiBold, Sora_700Bold} from "@expo-google-fonts/sora";
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { useTheme } from "@/components/color-theme";
import { useEffect, useState } from "react";


//Trending Movies
const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGI4Y2Y5M2JhODBjZGIzYjBkZDIyZjhhZTI4ZDZjNiIsIm5iZiI6MTc1ODA0ODMxOS41NjA5OTk5LCJzdWIiOiI2OGM5YjAzZjAxMDU1NjhlNmI3OGMyNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aN82hedmtHMdd_1mAKxIAxD8s9Xg8claNVHAxQX0PVU'
  }
};



export default function Trending() {

const[info,setInfo]=useState<any>([]); //fetch info from API
const[pendingRequests,setPendingRequests]=useState(0)// counter state
const[loading,setIsLoading]=useState(true); //loading state
const[error,setError]=useState<string | null>(null); //error state

//Search Bar
const[search,setSearch]=useState("")//search query
const[filterData,setFilteredData]=useState<any>([])// filter data across all field

//set counter function
async function fetchWithCounter(fetchFn:()=>Promise<void>){
  setPendingRequests((prev)=> prev +1);
  try{
    await fetchFn();
  }finally{
    setPendingRequests((prev)=>{
      const newCount = prev - 1;
      if(newCount===0)setIsLoading(false);
      return newCount
    });
  }
} 

//trending api
useEffect(()=>{
fetchWithCounter(async()=>{
  try{
   
    const response= await axios.request(options);
    const data= response.data.results;
    console.log(data);
    setInfo(data);
    setIsLoading(false);
  }catch(error:any){
    setIsLoading(false);
    console.log(error);
    setError("Something just Crushed!! see you in a jiffy!")
  }

})

},[])

//function to handle search
const handleSearch=(text:string)=>{
  setSearch(text) //updates the search state with the current value
  if(text===""){
    setFilteredData(info);
  }else{
    const result =info.filter((item:any)=>  (item.name || item.title || "").toLowerCase().includes(text.toLowerCase()));
      setFilteredData(result)
  }
}


    //Dark theme and Light Theme Toggle
  const {theme,colors,toggleTheme}=useTheme();

  //fonts
  const [fontsLoaded]= useFonts({Sora_400Regular, Sora_700Bold,Sora_600SemiBold, Poppins_400Regular, Poppins_700Bold, Poppins_600SemiBold});
if(!fontsLoaded){
  return null; 
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
                      <TextInput placeholder="Search Movie" placeholderTextColor="#A2A2A2" value={search} onChangeText={handleSearch}/>
                     <Ionicons name="search" size={25}  style={{ color: colors.secondaryText }} />
                     <Link href='/Profile/user_profile' push asChild>
                     <Ionicons name="person" size={25}  style={{ color: colors.secondaryText }} />
                     </Link>
                      </View>
                    </View>
                    <View className=" flex-row gap-2 ml-2 ">
                      <Text className=" font-sora text-xl " style={{ color: colors.secondaryText }} >Movies</Text>  
                      <Link href="/categories/trending" push asChild>
                      <Text className=" font-sora text-xl"  style={{ color: colors.secondaryText }} >Trending</Text>
                      </Link>
                      <TouchableOpacity onPress={toggleTheme} style={{marginLeft: 218}}   >
                      <Text className=" font-sora text-xl " style={{ fontWeight: "bold", color: colors.secondaryText }}>
                          {theme === "light" ? " Light" : " Dark "}
                      </Text>
                      </TouchableOpacity>
                    </View>
                    </View>

               
                        <View style={{height:700}}>
                       {
                        loading?(
                            <ActivityIndicator color="red" size="large"/>
                        ):error?(
                            <Text style={{color:colors.error}}>{error}</Text>
                        ): <FlatList numColumns={2} key={2} data={search.length >0 ? filterData: info} keyExtractor={(item)=>item.id} renderItem={({item})=>(
                            <View style={{paddingLeft:3}}>
                              <Link href={{pathname: "/details/[id]",params:{id:item.id,type:item.media_type||"movie"}}} asChild>
                              <TouchableOpacity>
                              {item.poster_path && (
                                             <Image className=" gap-1 "
                                               source={{
                                                 uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                                               }}
                                               style={{ width: 200, height: 200, marginTop: 10,marginLeft:1,borderRadius:10 }}
                                               resizeMode="cover"
                                             
                                             />
                                             
                                           )} 

                              </TouchableOpacity>
                              </Link>
                             <Text className="font-sora text-sm " style={{color: colors.secondaryText, paddingLeft:3, flexShrink:1, flexWrap:"wrap",maxWidth:120}} numberOfLines={2} ellipsizeMode="tail">
                                {item.name || item.title}</Text>                                 
                            </View>
                        )}/>
                       }
                         </View>
                 

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