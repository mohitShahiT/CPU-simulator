import React from "react";
import Controller from "./components/Controller";
import Title from "./components/Title";
import RAM from "./components/RAM";
import CPU from "./components/CPU";
import Bus from "./components/Bus";
import { useSimulation } from "./context/SimulationContex";
import { programs } from "./utils/programs";
import { useRAM } from "./context/RAMContext";
import { useCPU } from "./context/CPUContext";

const App: React.FC = function () {
  return (
    <>
      <Title />
      <Controller />
      <Main />
    </>
  );
};

const Main: React.FC = function () {
  const { isProgramListOpen, setIsProgramListOpen } = useSimulation();
  const { addressContents, setAddressContents } = useRAM();
  const { resetRegisters } = useCPU();
  return (
    // <div className="flex py-4 p justify-between relative mx-40">
    <>
      {isProgramListOpen && (
        <div
          className="absolute inset-0 backdrop-blur-sm z-40"
          onClick={() => setIsProgramListOpen(false)}
        ></div>
      )}
      <div
        className="flex py-4 justify-between relative"
        style={{ width: "1455px", margin: "0 auto" }}
      >
        {isProgramListOpen && (
          <div className="absolute bg-gray-600 inset-5 z-40 opacity-80 p-10 rounded-xl">
            <div
              onClick={() => setIsProgramListOpen(false)}
              className="cursor-pointer absolute top-4 right-5 text-2xl text-red-500 hover:text-red-800"
            >
              &#10005;
            </div>
            <h1 className="text-3xl text-center text-green-300">
              Choose a program to load into the memory
            </h1>

            <div className="flex flex-col p-5 gap-2">
              {programs.map((program) => (
                <div className="text-white flex items-center justify-between">
                  <p>{program.description}</p>
                  <button
                    className="p-2 border-2"
                    onClick={() => {
                      setAddressContents({
                        ...addressContents,
                        ...program.program,
                      });
                      setIsProgramListOpen(false);
                      resetRegisters();
                    }}
                  >
                    Load
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <CPU />
        <RAM />
        <Bus />
      </div>
    </>
  );
};

export default App;
