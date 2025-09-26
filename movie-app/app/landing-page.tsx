import { FlatList,  View, Image, ActivityIndicator, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import axios from 'axios';
import { useFonts } from "expo-font"
import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useRef, useState } from "react";
import { Sora_400Regular, Sora_600SemiBold, Sora_700Bold} from "@expo-google-fonts/sora";
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { useTheme } from "../components/color-theme";
import { Link } from "expo-router";


//Multi-serach
const multi_search = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGI4Y2Y5M2JhODBjZGIzYjBkZDIyZjhhZTI4ZDZjNiIsIm5iZiI6MTc1ODA0ODMxOS41NjA5OTk5LCJzdWIiOiI2OGM5YjAzZjAxMDU1NjhlNmI3OGMyNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aN82hedmtHMdd_1mAKxIAxD8s9Xg8claNVHAxQX0PVU'
  }
};



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
  url: 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGI4Y2Y5M2JhODBjZGIzYjBkZDIyZjhhZTI4ZDZjNiIsIm5iZiI6MTc1ODA0ODMxOS41NjA5OTk5LCJzdWIiOiI2OGM5YjAzZjAxMDU1NjhlNmI3OGMyNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aN82hedmtHMdd_1mAKxIAxD8s9Xg8claNVHAxQX0PVU'
  }
};

export default function LandingPage() {

//API setup
const[info,setInfo]=useState<any>([]); //fetch info from API
const[pop,setPopular]=useState<any>([]);// fetch popular API
const[latest,setLatest]=useState<any>([]);// fetch latest movies
const[rate,setRated]=useState<any>([]);// fetch rated movies
const[pendingRequests,setPendingRequests]=useState(0)// counter state
const[loading,setIsLoading]=useState(true); //loading state
const[error,setError]=useState<string | null>(null); //error state
const[errorPopular,setErrorPopular]=useState<string|null>(null);//popular error state
const[errorNowPlaying,setErrorNowPlaying]=useState<string|null>(null)//now playing
const[errorRated,setErrorRated]=useState<string|null>(null)// rated
const[errormultisearch,setErrorMultiSearch]=useState<string|null>(null)// rated

const combinedData = [...pop,...latest,...rate];

//Search Bar
const[search,setSearch]=useState("")//search query
const[multisearch,setMultiSearch]=useState<any>([])// fetch from multi_search
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
} //If you’re using fetchWithCounter, you shouldn’t call setIsLoading(false) inside each request.Instead, you let fetchWithCounter manage it:


//Multi search
useEffect(()=>{
fetchWithCounter(async()=>{
  try{
   
    const response= await axios.request(multi_search);
    const data= response.data.results;
    console.log(data);
    setMultiSearch(data);
   
  }catch(errormultisearch:any){
    
    console.log(errormultisearch);
    setErrorMultiSearch("Something just Crushed!! see you in a jiffy!")
  }

})

},[])


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

//POPULAR API
useEffect(()=>{
fetchWithCounter(async () => {
   try{
   
    const response= await axios.request(popular);
    const data= response.data.results;
    console.log(data);
    setPopular(data);
  
  }catch(errorPopular:any){
 
    console.log(errorPopular);
    setErrorPopular("Something just Crushed!! see you in a jiffy!")
  }
})
},[])

//Now playing
useEffect(()=>{
fetchWithCounter(async () =>{
  try{
   
    const response= await axios.request(now_playing);
    const data= response.data.results;
    console.log(data);
    setLatest(data);
 
  }catch(errorNowPlaying:any){
   
    console.log(errorNowPlaying);
    setErrorNowPlaying("Something just Crushed!! see you in a jiffy!")
  }
})
},[])

//Rated Movies
useEffect(()=>{
  fetchWithCounter( async () => {
        try{
      const response= await axios.request(rated);
      const data=response.data.results;
      console.log(data);
      setRated(data);

    }catch(errorRated:any){
     
      console.log(errorRated);
      setErrorRated("Something just Crushed!! See you in a jiffy")
    }

  })
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
  },5000);
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


//Function to Handle Search Bar
const handleSearch=(text:string)=>{
  setSearch(text) //updates the search state with the current value
  if(text===""){
    setFilteredData(combinedData);
  }else{
    const result =combinedData.filter((item:any)=>  (item.name || item.title || "").toLowerCase().includes(text.toLowerCase()));
      setFilteredData(result)
  }
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
              <TextInput placeholder="Search Movie" placeholderTextColor="#A2A2A2" value={search} onChangeText={handleSearch}/>
             <Ionicons name="search" size={25}  style={{ color: colors.secondaryText }} />
            <Link href='/categories/saved' push asChild>
             <Ionicons name="person" size={25}  style={{ color: colors.secondaryText }} />
             </Link>
              </View>
            </View>
            <View className=" flex-row gap-2 ml-2 ">
              <Link href="/categories/trending" push asChild>
              <Text className=" font-sora text-xl"  style={{ color: colors.secondaryText }} >Trending</Text>
              </Link>
              <Link href="/categories/popular" push asChild>
              <Text className=" font-sora text-xl " style={{ color: colors.secondaryText }} >Popular</Text>
              </Link>
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
              <Link href={{pathname: "/details/[id]",params:{id:item.id,type:item.media_type}}} asChild>
              <TouchableOpacity>
                 {item.poster_path && (
                <Image className=" gap-20 "
                  source={{
                    uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
                  }}
                  style={{ width: 300, height: 400, marginTop: 10,marginLeft:50,borderRadius:5 }}
                  resizeMode="cover"
                
                />
                
              )}

              </TouchableOpacity>
              </Link>
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

              {info [currentIndex] &&(
              <Link href={{pathname:"/details/[id]", params:{id:info[currentIndex]?.id,type:info[currentIndex]?.media_type ||(info[currentIndex].title ? "movie" : "tv")}}} asChild>
                <TouchableOpacity className="rounded-lg " style={{width:150,height:50,}}>
                <Text className="text-center pt-4 font-sora_semi_bold rounded-lg " style={{backgroundColor:colors.secondaryText, color:colors.primaryText,height:50}}>WATCH NOW</Text>
                </TouchableOpacity>
              </Link>
                )}
                <Link href='/categories/saved' push asChild>
                <TouchableOpacity>
                <Ionicons name="bookmark" size={20} style={{color: colors.secondaryText}}/>
                </TouchableOpacity>
                </Link>
            </View>
                {/** POPULAR MOVIES/TV SHOWS */}
             <View className=" mt-2 ml-2" style= {{height: 250}}>
              <Link href='/categories/popular' push asChild>
               <Text className=" font-sora text-xl " style={{ color: colors.secondaryText }} >Popular</Text>
              </Link>

              {
                loading?(
                  <ActivityIndicator color="red" size="large" />
                ): errorPopular?(
                  <Text style={{color: colors.error}}>{errorPopular}</Text>
                ):
            
              <FlatList data={search.length >0 ? filterData: pop} keyExtractor={(item)=>item.id} renderItem={({item})=>(
                <View >
                  <Link href={{pathname: "/details/[id]",params:{id:item.id,type:item.media_type || "tv"}}} asChild>
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
                   <Text className="font-sora text-sm " style={{color: colors.secondaryText}}>{item.name || item.title}</Text>

                </View>
              )} 
              horizontal
              showsHorizontalScrollIndicator={false}
              />
                 }
            </View>
            {/**LATEST MOVIES */}
             <View className=" mt-2 ml-2" style= {{height: 250}}>
              <Link href='/categories/movies' push asChild>
              <Text className=" font-sora text-xl " style={{ color: colors.secondaryText }} >Latest Movies</Text>
              </Link>
              {
                loading?(
                  <ActivityIndicator color="red" size="large" />
                ): errorNowPlaying?(
                  <Text style={{color: colors.error}}>{errorNowPlaying}</Text>
                ):
            
              <FlatList data={search.length >0 ? filterData: latest} keyExtractor={(item)=>item.id} renderItem={({item})=>(
                <View >

                  <Link href={{pathname: "/details/[id]",params:{id:item.id,type:item.media_type || "movie"}}} asChild>
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
              <Link href='/categories/tv_series' push asChild>
              <Text className=" font-sora text-xl " style={{ color: colors.secondaryText }} >Top Rated Series</Text>
              </Link>
              {
                loading?(
                  <ActivityIndicator color="red" size="large" />
                ): errorRated?(
                  <Text style={{color: colors.error}}>{errorRated}</Text>
                ):
            
              <FlatList data={search.length >0 ? filterData: rate} keyExtractor={(item)=>item.id} renderItem={({item})=>(
                <View >
                 <Link href={{pathname: "/details/[id]",params:{id:item.id,type:item.media_type ||  "tv"}}} asChild>
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
  );
}
