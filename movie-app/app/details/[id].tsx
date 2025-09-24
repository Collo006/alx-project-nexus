import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View ,Text, Image, ScrollView} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";





export default function DetailsScreen() {

    const {id,type} = useLocalSearchParams<{id:string;type:string}>();
    const[details,setDetails] = useState<any>(null);
    const[loading,setLoading] = useState(true);

    useEffect(()=>{
        if(!id)return;

        const fetchDetails = async () =>{
            try{
                const url =type === "tv"
                ?`https://api.themoviedb.org/3/tv/${id}?language=en-US`
                :`https://api.themoviedb.org/3/movie/${id}?language=en-US`;
                const response = await axios.get(url,{
                    headers:{
                        accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGI4Y2Y5M2JhODBjZGIzYjBkZDIyZjhhZTI4ZDZjNiIsIm5iZiI6MTc1ODA0ODMxOS41NjA5OTk5LCJzdWIiOiI2OGM5YjAzZjAxMDU1NjhlNmI3OGMyNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aN82hedmtHMdd_1mAKxIAxD8s9Xg8claNVHAxQX0PVU'
                    }
                });
                setDetails(response.data);
            }catch(error){
                console.error(error);
            }finally{
                setLoading(false);
            }
        };
        fetchDetails(); 
    },[id,type]);

    if(loading) return <ActivityIndicator size="large" color="red"/>

    if(!details) return <Text>No details Found</Text>
    




    return(
         <View style={{flex:1,marginLeft: 20, marginTop: 100}}>
            <SafeAreaProvider>
                <SafeAreaView style={{flex:1}}>
                      
                    <ScrollView style={{flex:1, padding:16}}>
                       {details.poster_path &&(
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w300${details.poster_path}` }}
          style={{ width: 200, height: 200, marginTop: 10,marginLeft:1,borderRadius:10 }}/>
                       )}
                       <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 16 }}>
                                {details.title || details.name}
                       </Text>
                         <Text style={{ marginTop: 8 }}>{details.overview}</Text>
                         <Text style={{ marginTop: 8, fontWeight: "bold" }}>
        Release Date: {details.release_date || details.first_air_date}
      </Text>
         <Text style={{ marginTop: 4 }}>
        Rating: {details.vote_average} ⭐ ({details.vote_count} votes)
      </Text>
                    </ScrollView>

                </SafeAreaView>
            </SafeAreaProvider>
         </View>
    )
}