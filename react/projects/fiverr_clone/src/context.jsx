import { createContext, useState } from "react";

const DataContext = createContext();

const DataProviderComponent = ({ children })=>{
    const [users, setUsers] = useState('guest');
    return <DataContext.Provider value={{
        users,
        setUsers
    }}>
        {children}
    </DataContext.Provider>
}


export { DataContext }

export default DataProviderComponent;