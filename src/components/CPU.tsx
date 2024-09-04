import Register from "./Register";
import Flags from "./Flags";
import ALU from "./ALU";
import ControlUnit from "./ControlUnit";
const CPU: React.FC = function () {
  return (
    <div>
      <h1 className="text-center text-gray-200">CPU</h1>
      <div className="p-4 flex flex-col justify-center h-full gap-16">
        <div className="flex gap-3">
          <Register name={"AC"} />
          <Register name={"DR"} />
          <Register name={"Reg1"} />
          <Register name={"Reg2"} />
        </div>
        <div className="flex flex-row justify-between items-center">
            <ALU />
            <Flags/>
          <div className="flex flex-col gap-3 w-fit">
            <Register name={"PC"} />
            <Register name={"IR"} />
            <Register name={"AR"}  />
          </div>
        </div>
        <ControlUnit/>
      </div>
    </div>
  );
};




export default CPU;
