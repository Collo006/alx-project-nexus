import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MovieItem } from "@/interfaces";
import { SavedMoviesType } from "@/constants/saved";


const SavedMoviesContext = createContext<SavedMoviesType | undefined>(undefined)   //create the context object

export const SavedMoviesProvider =({children}: {children:ReactNode})=>{
    const [watchlist,setWatchlist]= useState<MovieItem[]>([]);

//load from AsyncStorage when app starts
useEffect(()=>{
    const loadSavedlist= async () =>{
        try{
            const stored = await AsyncStorage.getItem("watchlist");
            if(stored) setWatchlist(JSON.parse(stored));
        }catch(e){
            console.log("Failed to load watchlist:",e)
        }
    };
    loadSavedlist();
},[]);

//save to asyncStorage whenever watchlist changes
useEffect(()=>{
    const saveWatchlist = async () => {
        try{
            await AsyncStorage.setItem("watchlist",JSON.stringify(watchlist));
        }catch (e){
            console.log("Failed to save watchlist:",e);
        }
    };
    saveWatchlist();
},[watchlist])

const addToWatchlist = (movie:any)=>{
    if(!watchlist.find((item)=>item.id === movie.id)){
        setWatchlist([...watchlist,movie])
    }
};

const removeFromWatchlist = (id:string)=>{
    setWatchlist(watchlist.filter((item)=>item.id !== id));
};

return (
    <SavedMoviesContext.Provider value={{watchlist,addToWatchlist,removeFromWatchlist}}>
        {children}
    </SavedMoviesContext.Provider>
);
};
export const useWatchlist = () => {
  const context = useContext(SavedMoviesContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a SavedMoviesProvider");
  }
  return context;
};

