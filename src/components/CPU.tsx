import Register from "./Register";
import Flags from "./Flags";
import ALU from "./ALU";
import ControlUnit from "./ControlUnit";
import { useCPU } from "../context/CPUContext";
const CPU: React.FC = function () {
  const { activeReg } = useCPU();
  return (
    <div>
      <h1 className="text-center text-gray-200">CPU</h1>
      <div className="p-4 flex flex-col justify-center h-full gap-16">
        <div className="flex gap-3">
          <Register name={"AC"} active={activeReg === "AC"} />
          <Register name={"DR"} active={activeReg === "DR"} />
          <Register name={"Reg1"} active={activeReg === "Reg1"} />
          <Register name={"Reg2"} active={activeReg === "Reg2"} />
        </div>
        <div className="flex flex-row justify-between items-center">
          <ALU />
          <Flags />
          <div className="flex flex-col gap-3 w-fit">
            <Register name={"PC"} active={activeReg === "PC"} />
            <Register name={"IR"} active={activeReg === "IR"} />
            <Register name={"AR"} active={activeReg === "AR"} />
          </div>
        </div>
        <ControlUnit />
      </div>
    </div>
  );
};




export default CPU;
