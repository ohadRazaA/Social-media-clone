import React from 'react'
import { createContext, useState } from 'react';

const CentralBase = createContext();

function DataProvider({ children }) {

    const [data, setData] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [login, setLogin] = useState(false);

    return (
        <CentralBase.Provider value={
            {
                data,
                setData,
                login,
                setLogin,
                allPosts,
                setAllPosts,
            }}>

            {children}
        </CentralBase.Provider>
    )
}

export default DataProvider;
export { CentralBase };