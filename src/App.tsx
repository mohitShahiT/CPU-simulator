import React from "react";
import Controller from "./components/Controller";
import Title from "./components/Title";
import RAM from "./components/RAM";
import CPU from "./components/CPU";
import Bus from "./components/Bus";

const App: React.FC = function () {
  return (
    <>
      <Title />
      <Controller />
      <Main />
    </>
  );
};

const Main: React.FC = function () {
  return (
    // <div className="flex py-4 p justify-between relative mx-40">
    <div
      className="flex py-4 justify-between relative"
      style={{ width: "1455px", margin: "0 auto" }}
    >
      <CPU />
      <RAM />
      <Bus />
    </div>
  );
};

export default App;
