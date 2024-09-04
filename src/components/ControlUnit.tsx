const ControlUnit:React.FC = function(){
    return (
      <div className="flex items-center justify-center text-slate-300  bg-gray-500 h-20 relative">
        <p className="text-4xl">Control Unit</p>
        <div className=" flex flex-col absolute right-2 gap-4">
          <p>Read</p>
          <p>Write</p>
        </div>
      </div>
    )
  }

export default ControlUnit