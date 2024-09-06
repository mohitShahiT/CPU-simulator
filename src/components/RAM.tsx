import React from "react"
import { useRAM } from "../context/RAMContext"
import { useSimulation } from "../context/SimulationContex"
import { NumberBase } from "../utils/enums"
import { useCPU } from "../context/CPUContext"

const RAM:React.FC = function(){
    const { addressContents, isMemorySelected } = useRAM()
    const { numBase } = useSimulation()
    const {AR} = useCPU()
    const numberBase:number = numBase === NumberBase.Binary ? 2 : numBase === NumberBase.Hexadecimal ? 16 : 10;
    const addressPadBy: number = numBase === NumberBase.Binary ? 4 : 2;
    const instructionPadBy: number = numBase === NumberBase.Binary ? 8 : 2;
    return (
      <div className=" text-slate-200 w-80 z-20 ">
        <h1 className="text-center">RAM</h1>
        <div className="border p-4 bg-slate-700">
          <div className="flex gap-5 justify-between px-2 py-2">
            <span>Address</span>
            <span>Content</span>
          </div>
          {Object.keys(addressContents).map((curAdd) => (
            <div
              className={`flex gap-5 justify-between p-2 border ${
                isMemorySelected &&
                Number(curAdd) === AR &&
                "line-active text-bg-color"
              }`}
              key={curAdd}
            >
              <span className="text-2xl">
                {Number(curAdd)
                  .toString(numberBase)
                  .toLocaleUpperCase()
                  .padStart(addressPadBy, "0")}
              </span>
              <span className="text-2xl">
                {parseInt(addressContents[Number(curAdd)], 2)
                  .toString(numberBase)
                  .toLocaleUpperCase()
                  .padStart(instructionPadBy, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

export default RAM