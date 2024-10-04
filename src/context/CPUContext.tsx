import { createContext, useContext, useState } from "react";

interface CPUProviderProps {
  children: React.ReactNode;
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
  setPC: (value: number | ((prevValue: number) => number)) => void;
  setAC: (value: number) => void;
  setDR: (value: number) => void;
  setReg1: (value: number) => void;
  setReg2: (value: number) => void;
  setIR: (value: number) => void;
  setAR: (value: number | ((prevValue: number) => number)) => void;
  setOperation: (value: string) => void;
}

const CPUContext = createContext<CPUContxtPrpos | null>(null);

export const CPUProvider: React.FC<CPUProviderProps> = function ({ children }) {
  const [PC, setPC] = useState<number>(0);
  const [AC, setAC] = useState<number>(255);
  const [DR, setDR] = useState<number>(0);
  const [Reg1, setReg1] = useState<number>(0);
  const [Reg2, setReg2] = useState<number>(0);
  const [AR, setAR] = useState<number>(0);
  const [IR, setIR] = useState<number>(0);
  const [operation, setOperation] = useState<string>("");

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
        setPC,
        setAC,
        setDR,
        setReg1,
        setReg2,
        setAR,
        setIR,
        setOperation,
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
