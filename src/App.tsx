import React from "react";
import Controller from "./components/Controller";
import Title from "./components/Title";
import RAM from "./components/RAM";
import CPU from "./components/CPU";
import Bus from "./components/Bus";
import { useSimulation } from "./context/SimulationContex";

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
  return (
    // <div className="flex py-4 p justify-between relative mx-40">
    <>
      {isProgramListOpen && (
        <div
          className="absolute inset-0"
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
            <div className="p-5">
              <div className="text-white">
                Add two numbers stored in memory and store the result back in
                the memory
              </div>
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
