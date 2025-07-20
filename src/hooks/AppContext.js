"use client"

import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({children})=>{
    const [showPdfIntervewPopup , setShowPdfIntervewPopup] = useState(false);
    return (
        <AppContext.Provider value={{showPdfIntervewPopup , setShowPdfIntervewPopup}}>
            {children}
        </AppContext.Provider>
    )
}