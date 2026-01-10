import { createContext, useState } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children })=>{
    const [isLogin, setIsLogin] = useState(false);
    return <DataContext.Provider value={{
        isLogin, 
        setIsLogin
    }} >
        {children}
    </DataContext.Provider>
}


export default DataContextProvider;