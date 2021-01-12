import React from "react";
import "./App.css";

import Clock from "./components/Clock";

function App() {
  return (
    <div className="App">
      <Clock startValue={20} />
    </div>
  );
}

export default App;
