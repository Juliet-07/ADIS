import React from "react";
import { Route, Routes } from "react-router-dom";
import Flier from "./flier";
import Form from "./form";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/flier" element={<Flier />} />
      </Routes>
    </>
  );
}

export default App;
