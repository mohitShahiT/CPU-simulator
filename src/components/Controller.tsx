import { CiPlay1, CiPause1 } from "react-icons/ci";
import React, { useRef } from "react";
import { useSimulation } from "../context/SimulationContex";
import { NumberBase } from "../utils/enums";
import { useCPU } from "../context/CPUContext";
import { useRAM } from "../context/RAMContext";
import { useBus } from "../context/BUSContext";
import { speeds } from "../utils/speeds";
import { opcodes } from "../utils/opcode";
interface NumberBaseOption {
  value: string;
  label: string;
}
const interval = 1000; //1sec
const MAX_MEMORY_ADDRESS = 15;

const createAsyncStep = function (
  fn: () => void,
  stepDelay: number
): Promise<void> {
  return new Promise<void>((resolve: () => void) => {
    setTimeout(() => {
      fn();
      resolve();
    }, stepDelay);
  });
};

const Controller: React.FC = function () {
  const { isPlaying, setIsPlaying, numBase, setNumBase, speed, setSpeed } =
    useSimulation();
  const { setLineStatus } = useBus();
  const numberBaseOptions: NumberBaseOption[] = [
    { value: NumberBase.Binary, label: "BIN" },
    { value: NumberBase.Hexadecimal, label: "HEX" },
    { value: NumberBase.Decimal, label: "DEC" },
  ];
  const { PC, AC, AR, DR, setOperation, setPC, setAR, setIR, setDR, setAC } =
    useCPU();
  const { addressContents, setAddressContents, setIsMemorySelected } = useRAM();
  const PCRef = useRef(PC);
  const ARRef = useRef(AR);
  const DRRef = useRef(DR);
  const ACRef = useRef(AC);
  const delay = interval / speed;

  const fetch = async function () {
    setLineStatus((prevStatus) => ({
      ...prevStatus,
      PCLine: true,
      CommonBus: true,
    }));

    //get the content of CommonBus to AR
    await createAsyncStep(() => {
      setLineStatus((prevStatus) => ({
        ...prevStatus,
        PCLine: false,
        ARLine: true,
      }));
      ARRef.current = PCRef.current;
      setAR(() => PCRef.current);
    }, delay);

    // activate the AR to memory line to select the memory cell
    await createAsyncStep(() => {
      setIsMemorySelected(true);
      setLineStatus((prevStatus) => ({
        ...prevStatus,
        ARLine: false,
        ARtoMemoryLine: true,
        CommonBus: false,
      }));
    }, delay);

    // activate the read enable line and put the content of the memory cell to CommonBus
    await createAsyncStep(() => {
      setLineStatus((prevStatus) => ({
        ...prevStatus,
        ReadLine: true,
        MemoryLine: true,
        CommonBus: true,
        IRLine: true,
      }));
      setIR(parseInt(addressContents[PCRef.current], 2));
      PCRef.current = (PCRef.current + 1) % (MAX_MEMORY_ADDRESS + 1); // Update the ref value
      // setPC((prevPC) => {
      //   const newPC = (prevPC + 1) % (MAX_MEMORY_ADDRESS + 1);
      //   PCRef.current = newPC; // Update the ref value
      //   return newPC;
      // });
      setPC(PCRef.current);
    }, delay);

    // deactivate all the lines
    await createAsyncStep(() => {
      setIsMemorySelected(false);
      setLineStatus((prevStatus) => ({
        ...prevStatus,
        ReadLine: false,
        MemoryLine: false,
        CommonBus: false,
        IRLine: false,
        ARtoMemoryLine: false,
      }));
    }, delay);
  };

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

  const decode = async function (): Promise<string> {
    const instruction = addressContents[PCRef.current - 1]; //upto this point pc is already incremented and ponting to the next instruction
    const opcode = instruction.slice(0, 4);
    const address = instruction.slice(4);

    // await createAsyncStep(() => {
    setLineStatus((prevStatus) => ({
      ...prevStatus,
      CommonBus: true,
      IRLine: true,
    }));
    // }, delay);

    await createAsyncStep(() => {
      ARRef.current = parseInt(address, 2);
      setAR(ARRef.current);
      setLineStatus((prevStatus) => ({
        ...prevStatus,
        CommonBus: true,
        IRLine: false,
        ARLine: true,
      }));
    }, delay);

    await createAsyncStep(() => {
      setLineStatus((prevStatus) => ({
        ...prevStatus,
        CommonBus: false,
        ARLine: false,
      }));
    }, delay);

    if (instruction[0] === "0") {
      //memory reference
      console.log("is memory reference");
    } else {
      //register reference
      console.log("is register reference");
    }
    return opcodes[opcode];
  };

  const handlePlay = async function () {
    if (isPlaying) return;
    setIsPlaying((prev) => !prev);
    await startExecution();
    setIsPlaying((prev) => !prev);
  };

  const execute = async function (
    operation: string
    // setLineStatus: (setterFn: (prev: LineStatus) => LineStatus) => void,
    // setIsMemorySelected: (val: boolean) => void,
    // setIR: (val: number) => void,
    // delay: number
  ) {
    const memoryToCPUOpearation = async function (
      operation: string,
      executeFn: () => void
    ) {
      //do and operation here
      // DR <- M[AR]
      // AC <- AC ^ DR

      // set the selecte the memory thorugn AR
      await createAsyncStep(() => {
        setIsMemorySelected(true);
        setLineStatus((prevStatus) => ({
          ...prevStatus,
          ARtoMemoryLine: true,
          // ReadLine: true,
        }));
      }, delay);

      // read the memory from selected memroy to common bus
      await createAsyncStep(() => {
        setLineStatus((prevStatus) => ({
          ...prevStatus,
          ARtoMemoryLine: true,
          ReadLine: true,
          CommonBus: true,
          MemoryLine: true,
          DRLine: true,
        }));
        DRRef.current = parseInt(addressContents[ARRef.current], 2);
        setDR(DRRef.current);
      }, delay);

      await createAsyncStep(() => {
        setIsMemorySelected(false);
        setLineStatus((prevStatus) => ({
          ...prevStatus,
          ARtoMemoryLine: false,
          ReadLine: false,
          CommonBus: false,
          MemoryLine: false,
          DRLine: false,
          ACtoALULine: true,
          DRtoALULine: true,
          ALUtoACLine: true,
        }));
        setOperation(operation);
        //do and operation and update AC
        // ACRef.current = DRRef.current & ACRef.current;
        executeFn();
      }, delay);
      await createAsyncStep(() => {
        setLineStatus((prevStatus) => ({
          ...prevStatus,
          ACtoALULine: false,
          DRtoALULine: false,
          ALUtoACLine: false,
        }));
        setOperation("");
      }, delay);
    };

    switch (operation) {
      case "ADD": {
        console.log("ADD");
        memoryToCPUOpearation(operation, () => {
          ACRef.current = DRRef.current + ACRef.current;
          setAC(ACRef.current);
        });
        break;
      }
      case "AND": {
        console.log("AND");
        memoryToCPUOpearation(operation, () => {
          ACRef.current = DRRef.current & ACRef.current;
          setAC(ACRef.current);
        });
        break;
      }
      case "LDA": {
        memoryToCPUOpearation(operation, () => {
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            ACtoALULine: false,
          }));
          ACRef.current = DRRef.current;
          setAC(ACRef.current);
        });
        break;
      }
      case "STA": {
        await createAsyncStep(() => {
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            ACLine: true,
            CommonBus: true,
            MemoryLine: true,
          }));
        }, delay);
        await createAsyncStep(() => {
          setIsMemorySelected(true);
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            WriteLine: true,
          }));
          setAddressContents({
            ...addressContents,
            [ARRef.current]: ACRef.current.toString(2).padStart(8, "0"),
          });
        }, delay);
        await createAsyncStep(() => {
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            WriteLine: false,
            ACLine: false,
            CommonBus: false,
            MemoryLine: false,
          }));
          setIsMemorySelected(false);
        }, delay);
        break;
      }
      case "BUN": {
        //branch unconditionallt
        console.log("BUN");
        await createAsyncStep(() => {
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            ARLine: true,
            CommonBus: true,
          }));
        }, delay);

        await createAsyncStep(() => {
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            PCLine: true,
          }));
          PCRef.current = ARRef.current;
          setPC(PCRef.current);
        }, delay);

        await createAsyncStep(() => {
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            PCLine: false,
            CommonBus: false,
            ARLine: false,
          }));
          PCRef.current = ARRef.current;
          setPC(PCRef.current);
        }, delay);

        break;
      }
      case "BSA": {
        console.log("BSA");
        await createAsyncStep(() => {
          setIsMemorySelected(true);
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            ARtoMemoryLine: true,
          }));
        }, delay);
        await createAsyncStep(() => {
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            PCLine: true,
            CommonBus: true,
          }));
        }, delay);
        await createAsyncStep(() => {
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            WriteLine: true,
            CommonBus: true,
            MemoryLine: true,
          }));
          setAddressContents({
            ...addressContents,
            [ARRef.current]: PCRef.current.toString(2).padStart(8, "0"),
          });
        }, delay);
        await createAsyncStep(() => {
          setIsMemorySelected(false);
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            WriteLine: false,
            CommonBus: false,
            MemoryLine: false,
            PCLine: false,
            ARtoMemoryLine: false,
          }));
          ARRef.current++;
          setAR(ARRef.current);
        }, delay);

        await createAsyncStep(() => {
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            ARLine: true,
            CommonBus: true,
          }));
        }, delay);

        await createAsyncStep(() => {
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            PCLine: true,
          }));
          PCRef.current = ARRef.current;
          setPC(PCRef.current);
        }, delay);

        await createAsyncStep(() => {
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            ARLine: false,
            CommonBus: false,
            PCLine: false,
          }));
        }, delay);
        break;
      }
      case "ISZ": {
        console.log("ISZ");
        await createAsyncStep(() => {
          setIsMemorySelected(true);
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            ARtoMemoryLine: true,
            // ReadLine: true,
          }));
        }, delay);
        await createAsyncStep(() => {
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            ReadLine: true,
            CommonBus: true,
            MemoryLine: true,
            DRLine: true,
          }));
          DRRef.current = parseInt(addressContents[ARRef.current], 2);
          setDR(DRRef.current);
        }, delay);
        await createAsyncStep(() => {
          setIsMemorySelected(false);
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            ARtoMemoryLine: false,
            ReadLine: false,
            CommonBus: false,
            MemoryLine: false,
            DRLine: false,
          }));
          DRRef.current = parseInt(addressContents[ARRef.current], 2);
          setDR(DRRef.current);
        }, delay);
        await createAsyncStep(() => {
          DRRef.current = (DRRef.current + 1) % 256;
          setDR(DRRef.current);
        }, delay);
        await createAsyncStep(() => {
          setIsMemorySelected(true);
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            ARtoMemoryLine: true,
          }));
        }, delay);
        await createAsyncStep(() => {
          setIsMemorySelected(true);
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            DRLine: true,
            CommonBus: true,
            MemoryLine: true,
            WriteLine: true,
          }));
          setAddressContents({
            ...addressContents,
            [ARRef.current]: DRRef.current.toString(2).padStart(8, "0"),
          });
        }, delay);
        await createAsyncStep(() => {
          setIsMemorySelected(false);
          setLineStatus((prevStatus) => ({
            ...prevStatus,
            ARtoMemoryLine: false,
            DRLine: false,
            CommonBus: false,
            MemoryLine: false,
            WriteLine: false,
          }));
          setAddressContents({
            ...addressContents,
            [ARRef.current]: DRRef.current.toString(2).padStart(8, "0"),
          });
        }, delay);

        if (DRRef.current === 0) {
          await createAsyncStep(() => {
            PCRef.current++;
            setPC(PCRef.current);
          }, delay);
        }

        break;
      }
      case "CLA": {
        console.log("CLA");
        break;
      }
      case "CMA": {
        console.log("CMA");
        break;
      }
      case "INC": {
        console.log("INC");
        break;
      }
      case "DEC": {
        console.log("DEC");
        break;
      }
      case "SPA": {
        console.log("SPA");
        break;
      }
      case "SNA": {
        console.log("SNA");
        break;
      }
      case "SZA": {
        console.log("SZA");
        break;
      }
      case "HLT": {
        console.log("HLT");
        break;
      }
      default: {
        console.log("Unknown opcode");
      }
    }
  };

  const startExecution = async function () {
    // while (true) {
    await fetch();
    const operation = await decode();
    // if (PCRef.current === 0 || operation === "HLT") break;
    await execute(operation);
    // }
    // setPC((prevPC) => (prevPC + 1) % (MAX_MEMORY_ADDRESS + 1));
  };

  const handleLoadProgram = function () {
    setAddressContents({
      ...addressContents,
      0: "00011010",
      1: "11110000",
      2: "01001100",
      3: "11011111",
      4: "11110000",
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
        disabled={isPlaying}
        onClick={handleLoadProgram}
        className="border px-3 py-2 rounded-sm text-white"
      >
        Load
      </button>
    </nav>
  );
};

export default Controller;
