import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext()

function UserProvider({children}){
    const {register,authenticathed,logout,login} = useAuth()
    return(
        <Context.Provider value={{register,authenticathed,logout,login}}>
            {children}
        </Context.Provider>
    )
}

export {Context, UserProvider}