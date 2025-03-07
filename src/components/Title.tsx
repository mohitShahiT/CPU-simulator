import React from "react"

const Title:React.FC = function(){
    return (
      <div className="flex items-center justify-center bg-primary flex-col">
        <h1 className=" text-green-600 text-3xl text-center pt-3 uppercase">
          CPU Simulator
        </h1>
        <div>
          <a href="https://github.com/mohitShahiT/CPU-simulator" target="blank">
            <img className="h-7 mt-1" src="/github.png"></img>
          </a>
        </div>
      </div>
    );

}

export default Title