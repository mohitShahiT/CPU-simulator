import { CiPlay1, CiPause1 } from "react-icons/ci";
import React, { useRef } from "react";
import { useSimulation } from "../context/SimulationContex";
import { NumberBase } from "../utils/enums";
import { useCPU } from "../context/CPUContext";
import { useRAM } from "../context/RAMContext";
import { useBus } from "../context/BUSContext";
import { speeds } from "../utils/speeds";

interface NumberBaseOption {
  value: string;
  label: string;
}
const interval = 1000; //1sec
const MAX_MEMORY_ADDRESS = 15;

const Controller: React.FC = function () {
  const { isPlaying, setIsPlaying, numBase, setNumBase, speed, setSpeed } =
    useSimulation();
  const { setLineStatus } = useBus();
  const numberBaseOptions: NumberBaseOption[] = [
    { value: NumberBase.Binary, label: "BIN" },
    { value: NumberBase.Hexadecimal, label: "HEX" },
    { value: NumberBase.Decimal, label: "DEC" },
  ];
  const { PC, setPC, setAR, setIR } = useCPU();
  const { addressContents, setAddressContents, setIsMemorySelected } = useRAM();
  const PCRef = useRef(PC);

  const fetch = async function () {
    // if (isPlaying) return;
    // if(PC > MAX_MEMORY_ADDRESS) return
    //putting content of PC to CommonBus (activate PC and CommonBus line)
    setLineStatus((prevStatus) => ({
      ...prevStatus,
      PCLine: true,
      CommonBus: true,
    }));

    //get the content of CommonBus to AR
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        setLineStatus((prevStatus) => ({
          ...prevStatus,
          PCLine: false,
          ARLine: true,
        }));
        setAR(() => PCRef.current);
        resolve();
      }, interval / speed)
    );

    // activate the AR to memory line to select the memory cell
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        setIsMemorySelected(true);
        setLineStatus((prevStatus) => ({
          ...prevStatus,
          ARLine: false,
          ARtoMemoryLine: true,
          CommonBus: false,
        }));
        resolve();
      }, interval / speed)
    );

    // activate the read enable line and put the content of the memory cell to CommonBus
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        setLineStatus((prevStatus) => ({
          ...prevStatus,
          ReadLine: true,
          MemoryLine: true,
          CommonBus: true,
          IRLine: true,
        }));
        setIR(parseInt(addressContents[PCRef.current], 2));
        // setPC((prevPC) => (prevPC + 1) % (MAX_MEMORY_ADDRESS + 1));
        // setPC((prevPC) => (prevPC + 1) % (MAX_MEMORY_ADDRESS + 1));
        setPC((prevPC) => {
          const newPC = (prevPC + 1) % (MAX_MEMORY_ADDRESS + 1);
          PCRef.current = newPC; // Update the ref value
          return newPC;
        });
        resolve();
      }, interval / speed)
    );

    // deactivate all the lines
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        setIsMemorySelected(false);
        setLineStatus((prevStatus) => ({
          ...prevStatus,
          ReadLine: false,
          MemoryLine: false,
          CommonBus: false,
          IRLine: false,
          ARtoMemoryLine: false,
        }));
        resolve();
      }, interval / speed)
    );
  };

  // useEffect(function () {
  //   const waitForResume = async () => {
  //     return new Promise<void>((resolve) => {
  //       const checkPaused = () => {
  //       console.log("ue", isPlaying)
  //         if (isPlaying) {
  //           resolve();
  //         } else {
  //           setTimeout(checkPaused, 100); // Check again after 100ms
  //         }
  //       };
  //       checkPaused();
  //     });
  //   };
  //   if(!isPlaying){
  //     waitForResume()
  //   }
  // }, [isPlaying]);

  const hanldleNumberBaseChange = function (
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    switch (e.target.value) {
      case NumberBase.Decimal:
        setNumBase(NumberBase.Decimal);
        break;
      case NumberBase.Hexadecimal:
        setNumBase(NumberBase.Hexadecimal);
        break;
      default:
        setNumBase(NumberBase.Binary);
    }
  };

  const decode = async function () {
    const instruction = addressContents[PCRef.current];
    console.log("from decode function", instruction);
    if (instruction === "00000000") {
      console.log("HLT");
      return true;
    }
    if (instruction[0] === "0") {
      //memory reference
      const opcode = instruction.slice(1, 4);
      switch (opcode) {
        case "000": {
          console.log("AND");
        }
      }
    } else {
      console.log("is register reference");
    }
  };

  const handlePlay = async function () {
    if (isPlaying) return;
    setIsPlaying((prev) => !prev);
    await startExecution();
    setIsPlaying((prev) => !prev);
  };

  const startExecution = async function () {
    while (true) {
      await fetch();
      const halted = await decode();
      if (PCRef.current === 0 || halted) break;
    }
    // setPC((prevPC) => (prevPC + 1) % (MAX_MEMORY_ADDRESS + 1));
  };

  const handleLoadProgram = function () {
    setAddressContents({
      ...addressContents,
      0: "10101010",
      1: "00110011",
      2: "11001100",
      3: "00001111",
      4: "00000000",
    });
  };

  const handleSpeedChange = function (e: React.ChangeEvent<HTMLSelectElement>) {
    setSpeed(Number(e.target.value));
  };

  return (
    <nav className="bg-primary  p-4 flex justify-around items-stretch">
      <button
        onClick={handlePlay}
        className="border px-3 py-2 rounded-sm text-white"
      >
        {isPlaying ? <CiPause1 size={24} /> : <CiPlay1 size={24} />}
      </button>
      <select value={numBase} onChange={hanldleNumberBaseChange}>
        {numberBaseOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <select value={speed} onChange={handleSpeedChange}>
        {speeds.map((spd) => (
          <option key={spd} value={spd}>
            {spd}
          </option>
        ))}
      </select>
      <button
        onClick={handleLoadProgram}
        className="border px-3 py-2 rounded-sm text-white"
      >
        Load
      </button>
    </nav>
  );
};

export default Controller;
