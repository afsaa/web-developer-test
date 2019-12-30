import React from "react";
import TaskAlert from "./components/TaskAlert";
import AppNavbar from "./components/AppNavbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <TaskAlert nombreTarea="Bañar al perro" expTarea="2019-12-31" />
    </div>
  );
}

export default App;
