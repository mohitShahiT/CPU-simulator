import { createContext, useContext, useState } from "react";
import { lines } from "../utils/lines";
export interface LineStatus {
  [key: string]: boolean;
}

interface BusProviderProps {
    lineStatus: LineStatus;
    setLineStatus: (status: LineStatus | ((prev:LineStatus)=>LineStatus)) => void;
}

const BusContext = createContext<BusProviderProps | null>(null)

const initialLineStatus:LineStatus = lines.reduce((acc, curr)=>{
    acc[curr] = false;
    return acc
}, {} as LineStatus)


export const BusProvider:React.FC<{children: React.ReactNode}> = function({children}){
    const [lineStatus, setLineStatus] = useState<LineStatus>(initialLineStatus)
    return <BusContext.Provider value={{lineStatus, setLineStatus}}>
        {children}
    </BusContext.Provider>
}

export const useBus = function(){
    const context = useContext<BusProviderProps | null>(BusContext);
    if(context === null) {
        throw new Error("Bus context used outside the proivider")
    }
    return context
}