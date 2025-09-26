import { MovieItem } from "@/interfaces";

export interface SavedMoviesType{
    watchlist: MovieItem[];
    addToWatchlist: (item:MovieItem)=> void;
    removeFromWatchlist: (id:string)=> void;

}  //defines what the context value looks like
