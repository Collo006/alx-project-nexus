import {   View,Text, FlatList } from "react-native";
import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';
import { useState } from "react";


const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/all/day?language=en-US',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGI4Y2Y5M2JhODBjZGIzYjBkZDIyZjhhZTI4ZDZjNiIsIm5iZiI6MTc1ODA0ODMxOS41NjA5OTk5LCJzdWIiOiI2OGM5YjAzZjAxMDU1NjhlNmI3OGMyNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.aN82hedmtHMdd_1mAKxIAxD8s9Xg8claNVHAxQX0PVU'
  }
};


export default function Index() {

const[info,setInfo]=useState<any>([]);


axios
  .request(options)
  .then(res => {setInfo(res.data); console.log(res.data)})
  .catch(err => console.error(err));


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SafeAreaProvider>
        <SafeAreaView style={{flex:1}}>
          <Text  style={{fontSize:30}} >Movies</Text>
          <FlatList data={info} keyExtractor={(item) => item.id} renderItem={({item})=>(
            <View className="border border-red-600">
              <Text>{item.original_name}</Text>
            </View>
          )} />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}
