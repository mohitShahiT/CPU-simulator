import { useCPU } from "../context/CPUContext";
import { useSimulation } from "../context/SimulationContex";
import { NumberBase } from "../utils/enums";

interface RegisterPrpos {
  name: string;
  active: boolean;
  value?: string | number;
}

const Register: React.FC<RegisterPrpos> = function ({ name, active }) {
  const { numBase } = useSimulation();
  const numberBase: number =
    numBase === NumberBase.Binary
      ? 2
      : numBase === NumberBase.Hexadecimal
      ? 16
      : 10;
  const padBy: number =
    name === "PC" || name === "AR" ? 4 : numberBase === 2 ? 8 : 2;
  const { PC, AC, DR, Reg1, Reg2, AR, IR } = useCPU();
  let value = 0;
  switch (name) {
    case "PC": {
      value = PC;
      break;
    }
    case "AC": {
      value = AC;
      break;
    }
    case "DR": {
      value = DR;
      break;
    }
    case "Reg1": {
      value = Reg1;
      break;
    }
    case "Reg2": {
      value = Reg2;
      break;
    }
    case "AR": {
      value = AR;
      break;
    }
    case "IR": {
      value = IR;
      break;
    }
  }
  //   const value = context.name; //need to work on it

  // console.log(context)

  return (
    <div
      className={`border text-slate-300 flex flex-col p-2 w-[10.45rem] ${
        active && "border-yellow-400"
      } `}
    >
      <span className="text-xs text-center">{name}</span>
      <span className="text-3xl text-center">
        {value.toString(numberBase).toLocaleUpperCase().padStart(padBy, "0")}
      </span>
    </div>
  );
};

export default Register;
