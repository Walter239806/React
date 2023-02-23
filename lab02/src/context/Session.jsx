import { createContext, useState, useContext } from "react";


const authContext = createContext({})

export const useAuth= ()=>{
    return useContext(authContext)
}

export const ProvideAuth = ({children})=>{
    const auth = useProvideAuth() 
   
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

const useProvideAuth = ()=>{
    const [session, setSession] = useState(null);
    return {session}

}