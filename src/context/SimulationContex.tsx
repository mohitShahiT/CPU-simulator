import { createContext, useContext, useState } from "react"
import { NumberBase } from "../utils/enums";


interface SimulationContextPrpos {
  isPlaying: boolean;
  numBase: NumberBase;
  speed: number;
  isProgramListOpen: boolean;
  setIsPlaying: (value: boolean | ((prev: boolean) => boolean)) => void;
  setNumBase: (value: NumberBase) => void;
  setSpeed: (value: number) => void;
  setIsProgramListOpen: (valie: boolean) => void;
}

const SimulationContext = createContext<SimulationContextPrpos | null>(null)

export const SimulationProvider:React.FC<{children: React.ReactNode}> = function({children}){
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [speed, setSpeed] = useState<number>(1.5);
    const [numBase, setNumBase] = useState<NumberBase>(NumberBase.Binary)
    const [isProgramListOpen, setIsProgramListOpen] = useState<boolean>(false);


    return (
      <SimulationContext.Provider
        value={{
          isPlaying,
          numBase,
          speed,
          isProgramListOpen,
          setIsPlaying,
          setNumBase,
          setSpeed,
          setIsProgramListOpen,
        }}
      >
        {children}
      </SimulationContext.Provider>
    );
}


export const useSimulation = function(){
    const context:(SimulationContextPrpos | null) = useContext(SimulationContext)
    if (context === null) {
        throw new Error("Cannot use Simulation context outside SimulationProvider")
    }
    return context
}