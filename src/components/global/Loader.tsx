import React, { useState, CSSProperties } from "react";
import BarLoader from "react-spinners/BarLoader";

const override: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  // transform: "translate(-50%, -50%)",
  // zIndex: 9999,
  display: "block",
};

const Loader = ({ loading }) => {
  let [color, setColor] = useState("#17054B");

  return <BarLoader color={color} cssOverride={override} />;
};

export default Loader;
