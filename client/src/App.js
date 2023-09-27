import React from "react";
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import './App.css';
import Sidebar from "./components/Sidebar";
import backgroundImage from "./assets/img/beams.jpg";


function App() {
  return (
    <Router>
  <div className="app-container"> 
  <img src= {backgroundImage}  alt="Background" className="background-image" />
    <Sidebar className="sidebar-footer"/>  
    <div className="main-content">   
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

    </div>
  </div>
</Router>
  );
};


export default App;
