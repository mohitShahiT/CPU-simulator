import {
  createContext,
  useContext,
  useState,
  useRef,
  MutableRefObject,
} from "react";

interface CPUProviderProps {
  children: React.ReactNode;
}

interface FlagInterface {
  [key: string]: boolean;
}

interface CPUContxtPrpos {
  PC: number;
  AC: number;
  DR: number;
  Reg1: number;
  Reg2: number;
  IR: number;
  AR: number;
  operation: string;
  flags: FlagInterface;
  activeReg: string;
  PCRef: MutableRefObject<number>;
  ARRef: MutableRefObject<number>;
  DRRef: MutableRefObject<number>;
  ACRef: MutableRefObject<number>;
  setPC: (value: number | ((prevValue: number) => number)) => void;
  setAC: (value: number) => void;
  setDR: (value: number) => void;
  setReg1: (value: number) => void;
  setReg2: (value: number) => void;
  setIR: (value: number) => void;
  setAR: (value: number | ((prevValue: number) => number)) => void;
  setOperation: (value: string) => void;
  setFlags: (updater: (prev: FlagInterface) => FlagInterface) => void;
  setActiveReg: (value: string) => void;
  resetRegisters: () => void;
}

const CPUContext = createContext<CPUContxtPrpos | null>(null);

export const CPUProvider: React.FC<CPUProviderProps> = function ({ children }) {
  const [PC, setPC] = useState<number>(0);
  const [AC, setAC] = useState<number>(0);
  const [DR, setDR] = useState<number>(0);
  const [Reg1, setReg1] = useState<number>(0);
  const [Reg2, setReg2] = useState<number>(0);
  const [AR, setAR] = useState<number>(0);
  const [IR, setIR] = useState<number>(0);
  const [operation, setOperation] = useState<string>("");
  const [activeReg, setActiveReg] = useState<string>("");
  const [flags, setFlags] = useState<{ [key: string]: boolean }>({
    O: false,
    N: false,
    Z: false,
    C: false,
  });

  const PCRef = useRef<number>(0);
  const ARRef = useRef<number>(0);
  const DRRef = useRef<number>(0);
  const ACRef = useRef<number>(0);

  function resetRegisters() {
    setPC(0);
    setAC(0);
    setDR(0);
    setReg1(0);
    setReg2(0);
    setAR(0);
    setIR(0);
    PCRef.current = 0;
    ARRef.current = 0;
    DRRef.current = 0;
    ACRef.current = 0;
  }

  return (
    <CPUContext.Provider
      value={{
        PC,
        AC,
        DR,
        Reg1,
        Reg2,
        AR,
        IR,
        operation,
        flags,
        activeReg,
        PCRef,
        ARRef,
        DRRef,
        ACRef,
        setPC,
        setAC,
        setDR,
        setReg1,
        setReg2,
        setAR,
        setIR,
        setOperation,
        setFlags,
        setActiveReg,
        resetRegisters,
      }}
    >
      {children}
    </CPUContext.Provider>
  );
};

export const useCPU = function () {
  const context = useContext(CPUContext);
  if (context === null) {
    throw new Error("Cannot use CPU context outside the provider");
  }
  return context;
};
