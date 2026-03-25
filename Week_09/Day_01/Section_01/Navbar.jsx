import React from "react";
import RComponent from "./RComponent";

function Navbar(props) {
  return (
    <>
      <RComponent type={"menu"} />
      <RComponent type={"tab"} tabs={["Home", "About", "Contact"]} />
      <RComponent type={"Icon"} img={"public/pikachu.img"}/>
    </>
  );
}
