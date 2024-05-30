import React from "react";
import { createContext, useState } from "react";

const AppProvider = ({ children }) => {

    const [errorLoading, setErrorLoading] = useState(false);

    return (
        <AppContext.Provider value={{
            errorLoading,
            setErrorLoading
        }}>
            {children}
        </AppContext.Provider>
    )
};

export default AppProvider;

export const AppContext = createContext();