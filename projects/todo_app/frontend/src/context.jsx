import { createContext } from "react";
import { API_BASE_URL } from "./config";

export const DataContext = createContext();

export const DataProviderFuncComp = ({ children }) => {
    const getData = ()=>{}
    
    const postData = async (route, data, setSubmitting)=>{

        try {
            setSubmitting(true);
             const data = await fetch(`${API_BASE_URL}/${route}`, {
                headers : {
                    'content-type' : "application/json"
                },
                method : "POST",
                body : JSON.stringify(data)
            });

            const res = await data.json();
            setSubmitting(false);
            return res

        } catch (error) {
            console.log(error);
            return ;   
        } 

    }
    return <DataContext.Provider value={{}}>{children}</DataContext.Provider>
}