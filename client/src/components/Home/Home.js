import React from "react"; 
import Note from "../Notes/Note";
import "./Home.css";

export default function Home(props) {

  return (
    <>
      <Note showAlert={props.showAlert} />
    </>
  );
}
