import { createContext, useContext, useState } from "react"
import {addresses} from "../utils/addresses"

interface AddressContents {
    [address: number]: string 
}

interface RAMContextProps {
    addressContents: AddressContents
    setAddressContents: (contents: AddressContents)=> void
    isMemorySelected: boolean
    setIsMemorySelected: (value:boolean)=>void
}

const RAMContexet = createContext<RAMContextProps | null>(null)

const initialAddressContents = addresses.reduce((acc, curr)=> {
    acc[curr] = "00000010"
    return acc
}, {} as AddressContents)

export const RAMProvider:React.FC<{children: React.ReactNode}> = function({ children }){
    const [addressContents, setAddressContents] = useState< AddressContents >(initialAddressContents)
    const [isMemorySelected, setIsMemorySelected] = useState<boolean>(false)
    return (
        <RAMContexet.Provider value={{addressContents, isMemorySelected, setAddressContents, setIsMemorySelected}}>
            {children}
        </RAMContexet.Provider>
    )
}

export const useRAM = function(){
    const context:(RAMContextProps | null) = useContext(RAMContexet)
    if(context === null) {
        throw new Error("RAM context used outside RAMContext Provider")
    }
    return context
}
