import { createContext, ReactNode, useContext, useState } from "react";





type Theme = "light" | "dark";

type ThemeColors = {
    backGround: string;
    primaryText:string;
    secondaryText:string;
    error:string;
    sliderOverlay: string;
}

type ThemeContextType = {
    theme: Theme;
    colors: ThemeColors;
    toggleTheme: ()=> void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined); //provides a global theme where we will store and reuse the themes

const lightColors: ThemeColors = {
    backGround: '#ffff',
    primaryText: '#ffff',
    secondaryText: "#121212",
    error: '#B00020',
    sliderOverlay: "rgba(0,0,0,0.5)"
};

const darkColors: ThemeColors = {
    backGround: "#121212",
    primaryText: "#121212",
    secondaryText: "#03DAC6",
    error: "#CF6679",
    sliderOverlay: "rgba(0,0,0,0.5)"

}

export function ThemeProvider({children}:{children:ReactNode}) {
    const [theme,setTheme]=useState<Theme>("light");

    const toggleTheme = () =>{
        setTheme((prev)=>(prev === "light" ? "dark" :"light"));
    };

    const colors = theme === "light" ? lightColors : darkColors;

    return(
        <ThemeContext.Provider value={{theme,colors,toggleTheme}}>{children}
        </ThemeContext.Provider>
    );
}

export function useTheme(){
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error("useTheme must be used inside ThemeProvider")
    }
    return context;
}