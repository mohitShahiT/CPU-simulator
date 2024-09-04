import { CiPlay1, CiPause1 } from "react-icons/ci";
import React, { useEffect } from "react";
import { useSimulation } from "../context/SimulationContex";
import { NumberBase } from "../utils/enums";
import { useCPU } from "../context/CPUContext";
import { useRAM } from "../context/RAMContext";
import { useBus } from "../context/BUSContext";

interface NumberBaseOption {
  value: string;
  label: string;
}
const interval = 1000; //1sec
const MAX_MEMORY_ADDRESS = 15;

const Controller: React.FC = function () {
  const { isPlaying, setIsPlaying, numBase, setNumBase, speed } =
    useSimulation();
  const { setLineStatus } = useBus();
  const numberBaseOptions: NumberBaseOption[] = [
    { value: NumberBase.Binary, label: "BIN" },
    { value: NumberBase.Hexadecimal, label: "HEX" },
    { value: NumberBase.Decimal, label: "DEC" },
  ];
  const { PC, IR, setPC, setAR, setIR } = useCPU();
  const { addressContents, setAddressContents, setIsMemorySelected } = useRAM();

  const fetch = async function () {
    if (isPlaying) return;
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
        setAR(() => PC);
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
        setIR(parseInt(addressContents[PC], 2));
        setPC((prevPC) => (prevPC + 1) % (MAX_MEMORY_ADDRESS + 1));
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

  const decode = function () {
    console.log(IR);
  };

  const handlePlay = async function () {
    setIsPlaying((prev) => !prev);
  };
  const startExecution = async function () {
    if (isPlaying) return;
    console.log(IR);
    setIsPlaying((prev) => {
      return !prev;
    });
    await fetch();
    console.log(IR);
    decode();
    setIsPlaying((prev) => !prev);
  };

  const handleLoadProgram = function () {
    setAddressContents({ ...addressContents, 10: "10101010" });
  };

  return (
    <nav className="bg-primary  p-4 flex justify-around items-stretch">
      <button
        onClick={handlePlay}
        className="border px-3 py-2 rounded-sm text-white"
      >
        {isPlaying ? <CiPause1 size={24} /> : <CiPlay1 size={24} />}
      </button>
      <button
        onClick={startExecution}
        className="border px-3 py-2 rounded-sm text-white"
      >
        Start
      </button>
      <select value={numBase} onChange={hanldleNumberBaseChange}>
        {numberBaseOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
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
