import { useBus } from "../context/BUSContext"

const Bus:React.FC = function (){
    const {lineStatus} = useBus();
    
    return (
      <div className="absolute inset-0 -z-10">
        <ACLine isActive={lineStatus.ACLine}/>
        <DRLine isActive={lineStatus.DRLine}/>
        <Reg1Line isActive={lineStatus.Reg1Line}/>
        <Reg2Line isActive={lineStatus.Reg2Line}/>
        <MemoryLine isActive={lineStatus.MemoryLine}/>
        <PCLine isActive={lineStatus.PCLine}/>
        <IRLine isActive={lineStatus.IRLine}/>
        <ARLine isActive={lineStatus.ARLine}/>
        <ARtoMemoryLine isActive={lineStatus.ARtoMemoryLine}/>
        <CommonBus isActive={lineStatus.CommonBus}/>
        <ReadLine isActive={lineStatus.ReadLine}/>
        <WriteLine isActive={lineStatus.WriteLine}/>
        <ALUtoACLine isActive={lineStatus.ALUtoACLine}/>
        <ACtoALULine isActive={lineStatus.ACtoALULine}/>
        <DRtoALULine isActive={lineStatus.DRtoALULine}/>
        <ALUtoOFlag isActive={lineStatus.ALUtoOFlag}/>
        <ALUtoZFlag isActive={lineStatus.ALUtoZFlag}/>
        <ALUtoNFlag isActive={lineStatus.ALUtoNFlag}/>
        <ALUtoCFlag isActive={lineStatus.ALUtoCFlag}/>
      </div>
    )
  }


const CommonBus:React.FC<{isActive:boolean}> = function({isActive}){
return (
        <div>
            <div className={`${isActive? "line-active": "line-inactive"} w-[55%]  h-2  absolute right-[35rem] top-[10rem]`}></div>
            <div className={`${isActive? "line-active": "line-inactive"} bg-slate-600 absolute h-[42%] w-2 right-[35rem] top-[10rem]`}></div>
        </div>
)
}

const ACLine:React.FC<{isActive:boolean}> = function({isActive}){

    return (
        <div className={`${isActive? "line-active": "line-inactive"} absolute h-[4.55rem] w-2 right-[85rem] top-[10rem]`}></div>
    )
}

const DRLine:React.FC <{isActive:boolean}> = function({isActive}){

    return (
        <div className={`${isActive? "line-active": "line-inactive"} absolute h-[4.55rem] w-2 right-[73rem] top-[10rem]`}></div>
    )
}

const Reg1Line:React.FC <{isActive:boolean}> = function({isActive}){

    return (
        <div className={`${isActive? "line-active": "line-inactive"} absolute h-[4.55rem] w-2 right-[62rem] top-[10rem]`}></div>
    )
}

const Reg2Line:React.FC <{isActive:boolean}> = function({isActive}){
    return (
        <div className={`${isActive? "line-active": "line-inactive"} absolute h-[4.55rem] w-2 right-[51rem] top-[10rem]`}></div>
    )
}

const MemoryLine:React.FC <{isActive:boolean}> = function({isActive}){

    return (
        <div className={`${isActive? "line-active": "line-inactive"} w-60  h-2  absolute right-[20rem] top-[10rem]`}></div>
    )
}

const PCLine:React.FC <{isActive:boolean}> = function({isActive}){
    return (
        <div className={`${isActive? "line-active": "line-inactive"} w-[11rem]  h-2  absolute right-[35rem] top-[25rem]`}></div>
    )
}

const IRLine:React.FC <{isActive:boolean}> = function({isActive}){
    return (
        <div className={`${isActive? "line-active": "line-inactive"} w-[11rem]  h-2  absolute right-[35rem] top-[30rem]`}></div>
    )
}

const ARLine:React.FC <{isActive:boolean}> = function({isActive}){
    return (
        <div>
            <div className={`${isActive? "line-active": "line-inactive"} w-[11rem]  h-2  absolute right-[35rem] top-[34rem]`}></div>
            <div className={`${isActive? "line-active": "line-inactive"} w-[26rem]  h-2  absolute right-[20rem] top-[36rem]`}></div>
        </div>
    )
}
const ARtoMemoryLine:React.FC<{isActive:boolean}>  = function({isActive}) {
    return (
        <div>
            <div className={`${isActive? "line-active": "line-inactive"} w-[26rem]  h-2  absolute right-[20rem] top-[36rem]`}></div>
        </div>
    )
}
const ReadLine:React.FC <{isActive:boolean}> = function({isActive}){
    return (
        <div className={`${isActive? "line-active": "line-inactive"} w-[27.56rem]  h-2  absolute right-[20rem] top-[42.5rem]`}></div>

    )
}

const WriteLine:React.FC<{isActive:boolean}> = function({isActive}){
    return (
        <div className={`${isActive? "line-active": "line-inactive"} w-[27.56rem]  h-2  absolute right-[20rem] top-[45.2rem]`}></div>

    )
}

const ALUtoACLine:React.FC <{isActive:boolean}> = function({isActive}){
    return (
        <div>
        <div className={`${isActive? "line-active": "line-inactive"} absolute h-[4.3rem] w-2 right-[79.5rem] top-[34.7rem]`}></div>
        <div className={`${isActive? "line-active": "line-inactive"} w-[11.4rem]  h-2  absolute left-0 top-[38.5rem]`}></div>
        <div className={`${isActive? "line-active": "line-inactive"} absolute h-[29rem] w-2 left-0 top-[10rem]`}></div>
        <div className={`${isActive? "line-active": "line-inactive"} w-[3rem]  h-2  absolute left-0 top-[10rem]`}></div>
        <div className={`${isActive? "line-active": "line-inactive"} absolute h-[4.55rem] w-2 left-[3rem] top-[10rem]`}></div>
        </div>
    )
}

const ACtoALULine:React.FC <{isActive:boolean}> = function({isActive}){
    return (
        <div className={`${isActive? "line-active": "line-inactive"} absolute h-[7rem] w-2 right-[85.5rem] top-[18.9rem]`}></div>
    )
}

const DRtoALULine:React.FC <{isActive:boolean}> = function({isActive}){
    return (
        <div className={`${isActive? "line-active": "line-inactive"} absolute h-[7rem] w-2 right-[74rem] top-[18.9rem]`}></div>
    )
}

const ALUtoNFlag:React.FC <{isActive:boolean}> = function({isActive}){
    return (
        <div className={`${isActive? "line-active": "line-inactive"} w-[11.5rem]  h-1  absolute left-[15rem] top-[28.5rem]`}></div>

    )
}

const ALUtoZFlag:React.FC <{isActive:boolean}> = function({isActive}){
    return (
        <div className={`${isActive? "line-active": "line-inactive"} w-[11.5rem]  h-1  absolute left-[15rem] top-[31.5rem]`}></div>

    )
}

const ALUtoOFlag:React.FC <{isActive:boolean}> = function({isActive}){
    return (
        <div className={`${isActive? "line-active": "line-inactive"} w-[11.5rem]  h-1  absolute left-[15rem] top-[26rem]`}></div>

    )
}

const ALUtoCFlag:React.FC <{isActive:boolean}> = function({isActive}){
    return (
        <div className={`${isActive? "line-active": "line-inactive"} w-[14rem]  h-1  absolute left-[13rem] top-[34.4rem]`}></div>

    )
}

export default Bus