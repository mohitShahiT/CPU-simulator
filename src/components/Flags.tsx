import { useCPU } from "../context/CPUContext";

const Flags: React.FC = function () {
  const { flags } = useCPU();
  return (
    <div className="flex flex-col gap-2 text-white">
      {Object.keys(flags).map((flag) => (
        <Flag key={flag} flag={flag} value={flags[flag] ? "1" : "0"} />
      ))}
    </div>
  );
};

const Flag: React.FC<{ flag: string; value: string }> = function ({
  flag,
  value,
}) {
  return (
    <div className="h-11 w-11 bg-slate-500 flex items-center justify-center relative">
      <span className="absolute top-0 left-1 text-sm">{flag}</span>
      <span className="text-2xl">{value}</span>
    </div>
  );
};

export default Flags;
