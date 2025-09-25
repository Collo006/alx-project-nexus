import { createContext, ReactNode, useContext, useState } from "react";

export interface MovieItem{
    id:string;
    title?:string;
    name?:string;
    poster_path?:string;
    overview?:string;
} ///describes a movie/tv show in the watch list

interface SavedMoviesType{
    watchlist: MovieItem[];
    addToWatchlist: (item:MovieItem)=> void;
    removeFromWatchlist: (id:string)=> void;

}  //defines what the context value looks like

const SavedMoviesContext = createContext<SavedMoviesType | undefined>(undefined)   //create the context object

export const SavedMoviesProvider =({children}: {children:ReactNode})=>{
    const [watchlist,setWatchlist]= useState<MovieItem[]>([]);

const addToWatchlist = (item:MovieItem)=>{
    setWatchlist((prev)=>{
        const exists = prev.find((movie)=>movie.id===item.id);
        if(exists) return prev; //avoid duplicates
        return [...prev, item] 
    });
};

const removeFromWatchlist = (id:string)=>{
    setWatchlist((prev)=>prev.filter((movie)=>movie.id !==id));
};

return (
    <SavedMoviesContext.Provider value={{watchlist,addToWatchlist,removeFromWatchlist}}>
        {children}
    </SavedMoviesContext.Provider>
);
};
export const useWatchlist=()=>{
    const context = useContext(SavedMoviesContext);
    if(!context) throw new Error("useWatchlist must be used inside SavedMoviesProvider");
    return context;
}

