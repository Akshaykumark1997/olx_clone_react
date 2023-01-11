import { createContext,useState } from "react";


export const FirebaseContext = createContext(null);

export const AuthContext = createContext(null);

export default function context({children}){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user,setUser] = useState();
    return(
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}