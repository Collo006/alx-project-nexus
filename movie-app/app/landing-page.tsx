import { FlatList,  View, Image, ActivityIndicator, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import axios from 'axios';
import { useFonts } from "expo-font"
import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useRef, useState } from "react";
import { Sora_400Regular, Sora_600SemiBold, Sora_700Bold} from "@expo-google-fonts/sora";
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../components/color-theme"


//Trending Movies
const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/all/day?language=en-US',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGI4Y2Y5M2JhODBjZGIzYjBkZDIyZjhhZTI4ZDZjNiIsIm5iZiI6MTc1ODA0ODMxOS41NjA5OTk5LCJzdWIiOiI2OGM5YjAzZjAxMDU1NjhlNmI3OGMyNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aN82hedmtHMdd_1mAKxIAxD8s9Xg8claNVHAxQX0PVU'
  }
};

//Popular movies and tv shows
const popular = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGI4Y2Y5M2JhODBjZGIzYjBkZDIyZjhhZTI4ZDZjNiIsIm5iZiI6MTc1ODA0ODMxOS41NjA5OTk5LCJzdWIiOiI2OGM5YjAzZjAxMDU1NjhlNmI3OGMyNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aN82hedmtHMdd_1mAKxIAxD8s9Xg8claNVHAxQX0PVU'
  }
};

//Now playing or latest movies
const now_playing = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGI4Y2Y5M2JhODBjZGIzYjBkZDIyZjhhZTI4ZDZjNiIsIm5iZiI6MTc1ODA0ODMxOS41NjA5OTk5LCJzdWIiOiI2OGM5YjAzZjAxMDU1NjhlNmI3OGMyNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aN82hedmtHMdd_1mAKxIAxD8s9Xg8claNVHAxQX0PVU'
  }
};

//Rated Tv Episodes
const rated = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/guest_session/guest_session_id/rated/tv/episodes?language=en-US&page=1&sort_by=created_at.asc',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGI4Y2Y5M2JhODBjZGIzYjBkZDIyZjhhZTI4ZDZjNiIsIm5iZiI6MTc1ODA0ODMxOS41NjA5OTk5LCJzdWIiOiI2OGM5YjAzZjAxMDU1NjhlNmI3OGMyNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aN82hedmtHMdd_1mAKxIAxD8s9Xg8claNVHAxQX0PVU'
  }
};

export default function LandingPage() {

//API setup
const[info,setInfo]=useState<any>([]); // fetch info from API
const[pop,setPopular]=useState<any>([]);// fetch popular API
const[latest,setLatest]=useState<any>([]);// fetch latest movies
const[rate,setRated]=useState<any>([]);// fetch rated movies
const[loading,setIsLoading]=useState(true); //loading state
const[error,setError]=useState<string | null>(null); //error state

//trending api
useEffect(()=>{
 async function fetchData () {
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
};
  fetchData();
},[])

//POPULAR API
useEffect(()=>{
 async function fetchData () {
  try{
   
    const response= await axios.request(popular);
    const data= response.data.results;
    console.log(data);
    setPopular(data);
    setIsLoading(false);
  }catch(error:any){
    setIsLoading(false);
    console.log(error);
    setError("Something just Crushed!! see you in a jiffy!")
  }
};
  fetchData();
},[])

//Now playing
useEffect(()=>{
 async function fetchData () {
  try{
   
    const response= await axios.request(now_playing);
    const data= response.data.results;
    console.log(data);
    setLatest(data);
    setIsLoading(false);
  }catch(error:any){
    setIsLoading(false);
    console.log(error);
    setError("Something just Crushed!! see you in a jiffy!")
  }
};
  fetchData();
},[])

//Rated Movies
useEffect(()=>{
  async function fetchData () {
    try{
      const response= await axios.request(rated);
      const data=response.data.results;
      console.log(data);
      setRated(data);
      setIsLoading(false);
    }catch(error:any){
      setIsLoading(false);
      console.log(error);
      setError("Something just Crushed!! See you in a jiffy")
    }
  };
  fetchData();
},[])


/*axios
  .request(options)
  .then(res => { console.log(res.data)})
  .catch(err => console.error(err));*/

//Autoplay Animation
const flatListRef= useRef<FlatList>(null); //creates a reference to the FlatList,lets us call .scrollToIndex() method outside the FlatList
const [currentIndex,setCurrentIndex] = useState(0); //keeps track of which movie.poster is currently displayed

useEffect(()=>{
  if(info.length === 0)return;
  const interval = setInterval(()=>{
  const nextIndex = (currentIndex + 1) % info.length;
  setCurrentIndex(nextIndex);
  flatListRef.current?.scrollToIndex({
    index: nextIndex,
    animated:true,
  });//uses Flatlist to scroll to the new Index, animated ensures it slides smoothly
  },3000);
  return ()=> clearInterval(interval); //cleans up the interval whenever the component unmounts and prevents multiple timers stacking up and breaking things
},[currentIndex,info])//runs everytime currentIndex or info changes
  // %info.length makes sure when we reach the last movie, it loops back to 0

  //Dark theme and Light Theme Toggle
  const {theme,colors,toggleTheme}=useTheme();

  


  //fonts
  const [fontsLoaded]= useFonts({Sora_400Regular, Sora_700Bold,Sora_600SemiBold, Poppins_400Regular, Poppins_700Bold, Poppins_600SemiBold});
if(!fontsLoaded){
  return null; 
}





  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:colors.backGround,
        

      }}
    >
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
             <Ionicons name="search" size={25}  style={{ color: colors.secondaryText }} />
             <Ionicons name="person" size={25}  style={{ color: colors.secondaryText }} />
              </View>
            </View>
            <View className=" flex-row gap-2 ml-2 ">
              <Text className=" font-sora text-xl"  style={{ color: colors.secondaryText }} >Trending</Text>
              <Text className=" font-sora text-xl " style={{ color: colors.secondaryText }} >Popular</Text>
              <TouchableOpacity onPress={toggleTheme} style={{marginLeft: 218}}   >
              <Text className=" font-sora text-xl " style={{ fontWeight: "bold", color: colors.secondaryText }}>
                  {theme === "light" ? " Light" : " Dark "}
              </Text>
              </TouchableOpacity>
            </View>
            </View>


            <ScrollView >
            {
              loading ? (
                <ActivityIndicator color="red" size="large" />
              ) : error ? (
                <Text style={{color: colors.error}}>{error}</Text>
              ): 
                        <FlatList style={{ backgroundColor:colors.backGround, height:500, width:400}} data={info} keyExtractor={(item)=> item.id}
                        ref={flatListRef}
                        renderItem={({item})=>(
            <View className="mt-10" style={{position:"relative", width:400, height:300}}>
                 {item.poster_path && (
                <Image className=" gap-20 "
                  source={{
                    uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
                  }}
                  style={{ width: 300, height: 400, marginTop: 10,marginLeft:50,borderRadius:5 }}
                  resizeMode="cover"
                
                />
                
              )}
              <View className=" self-center">
                   <Text className="font-sora_semi_bold text-2xl  " style={{color: colors.secondaryText}}>{item.name}</Text>
                   <Text className="font-sora text-xl " style={{color:colors.secondaryText}}>{item.media_type}</Text> 
              </View>
            </View>
            )}  horizontal
             showsHorizontalScrollIndicator={false}
          pagingEnabled
          getItemLayout={(_,index)=>({ length:400, offset:400 * index, index})}
            />

            }
            <View className=" mt-2 ml-2 flex-row justify-between">
              <Ionicons name="information-circle" size={20} style={{ color: colors.secondaryText }}/>
              <TouchableOpacity className="rounded-lg " style={{width:150,height:50,}}><Text className="text-center pt-4 font-sora_semi_bold rounded-lg " style={{backgroundColor:colors.secondaryText, color:colors.primaryText,height:50}}>WATCH NOW</Text></TouchableOpacity>
             <Ionicons name="bookmark" size={20} style={{color: colors.secondaryText}}/>
            </View>
                {/** POPULAR MOVIES/TV SHOWS */}
             <View className=" mt-2 ml-2" style= {{height: 250}}>
               <Text className=" font-sora text-xl " style={{ color: colors.secondaryText }} >Popular</Text>

              {
                loading?(
                  <ActivityIndicator color="red" size="large" />
                ): error?(
                  <Text style={{color: colors.error}}>{error}</Text>
                ):
            
              <FlatList data={pop} keyExtractor={(item)=>item.id} renderItem={({item})=>(
                <View >
                  {item.poster_path && (
                <Image className=" gap-1 "
                  source={{
                    uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                  }}
                  style={{ width: 200, height: 200, marginTop: 10,marginLeft:1,borderRadius:10 }}
                  resizeMode="cover"
                
                />
                
              )}
              <Text className="font-sora text-sm " style={{color: colors.secondaryText}}>{item.name}</Text>

                </View>
              )} 
              horizontal
              showsHorizontalScrollIndicator={false}
              />
                 }
            </View>
            {/**LATEST MOVIES */}
             <View className=" mt-2 ml-2" style= {{height: 250}}>
              <Text className=" font-sora text-xl " style={{ color: colors.secondaryText }} >Latest Movies</Text>
              {
                loading?(
                  <ActivityIndicator color="red" size="large" />
                ): error?(
                  <Text style={{color: colors.error}}>{error}</Text>
                ):
            
              <FlatList data={latest} keyExtractor={(item)=>item.id} renderItem={({item})=>(
                <View >
                  {item.poster_path && (
                <Image className=" gap-1 "
                  source={{
                    uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                  }}
                  style={{ width: 200, height: 200, marginTop: 10,marginLeft:1,borderRadius:10 }}
                  resizeMode="cover"
                
                />
                
              )}
              <Text className="font-sora text-sm " style={{color: colors.secondaryText}}>{item.name}</Text>

                </View>
              )} 
              horizontal
              showsHorizontalScrollIndicator={false}
              />
                 }
            </View>
            {/** Top Rated Series */}
              <View className=" mt-2 ml-2" style= {{height: 300}}>
              <Text className=" font-sora text-xl " style={{ color: colors.secondaryText }} >Top Rated Series</Text>
              {
                loading?(
                  <ActivityIndicator color="red" size="large" />
                ): error?(
                  <Text style={{color: colors.error}}>{error}</Text>
                ):
            
              <FlatList data={rate} keyExtractor={(item)=>item.id} renderItem={({item})=>(
                <View >
                  {item.poster_path && (
                <Image className=" gap-1 "
                  source={{
                    uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                  }}
                  style={{ width: 200, height: 200, marginTop: 10,marginLeft:1,borderRadius:10 }}
                  resizeMode="cover"
                
                />
                
              )}
              <Text className="font-sora text-sm " style={{color: colors.secondaryText}}>{item.name}</Text>

                </View>
              )} 
              horizontal
              showsHorizontalScrollIndicator={false}
              />
                 }
            </View>

          </ScrollView>
               
            {/** FOOTER */}
          <View className="absolute bottom-0 left-0 right-0 flex-row justify-around  h-28 items-center" style={{backgroundColor:colors.backGround}}>  
          <Ionicons name="home"  size={20} className="-mt-10" style={{color: colors.secondaryText}} />
          <Ionicons name="play-circle"  size={20} className="-mt-10" style={{color: colors.secondaryText}} />
          <Ionicons name="folder" size={20} className="-mt-10" style={{color: colors.secondaryText}}/>
          <Ionicons name="bookmark" size={20} className="-mt-10" style={{color: colors.secondaryText}}/>
          <Ionicons name="ellipsis-horizontal" size={20} className="-mt-10" style={{color: colors.secondaryText}}/>
          </View>    
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}
