import React, { useState } from 'react';
import "./App.css"
import TitleBar from "./TitleBar";
import MainWindow from "./MainWindow";

function App() {
  const [currentPage, setCurrentPage] = useState('Login');
  const [TOGO, setTOGO] = useState('포장');

  return (
    <div className="App">
      <TitleBar currentPage={currentPage} setCurrentPage={setCurrentPage} TOGO={TOGO} />
      <MainWindow currentPage={currentPage} setCurrentPage={setCurrentPage} TOGO={TOGO} setTOGO={setTOGO} />
    </div>
  );
}

export default App;
