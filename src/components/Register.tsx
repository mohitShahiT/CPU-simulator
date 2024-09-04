import { useEffect } from "react";
import { useCPU } from "../context/CPUContext";
import { useSimulation } from "../context/SimulationContex";
import { NumberBase } from "../utils/enums";

interface RegisterPrpos {
    name: string;
    value?: string | number;
  }
  
const Register:React.FC<RegisterPrpos> = function({name}){
    const { numBase } = useSimulation()
    const numberBase:number = numBase === NumberBase.Binary ? 2 : numBase === NumberBase.Hexadecimal ? 16 : 10;
    const padBy:number = (name === "PC"|| name ==="AR") ? 4: 8 
    const context = useCPU()
    const value = context[name] //need to work on it

    // console.log(context)

    return (
    <div className="border text-slate-300 flex flex-col p-2 ">
        <span className="text-xs text-center">{name}</span>
        <span className="text-3xl text-center">{value.toString(numberBase).toLocaleUpperCase().padStart(padBy, '0')}</span>
    </div>
    )
}

export default Register