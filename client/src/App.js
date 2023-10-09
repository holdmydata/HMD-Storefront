import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import Customers from './views/Customers';
import Dashboard from './views/Dashboard';
import Rewards from './views/Rewards';
import './App.css';
import Sidebar from "./components/Sidebar";
import backgroundImage from "./assets/img/app-bg-dark.png";
import Login from "./views/Login";



function App() {
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleRefetch = () => {
    console.log("Refetch Trigger: ", refetchTrigger)
      setRefetchTrigger(prev => prev + 1);
  };

  return (

    <Router>
  <div className="app-container"> 
  <img src= {backgroundImage}  alt="Background" className="background-image bg-grid-slate-900/[0.04]" />
  {!isModalOpen && <Sidebar refetchTrigger={refetchTrigger} onRefetch={handleRefetch} className="sidebar-footer"/>  }
    <div className="main-content">   
        <Routes>
          <Route path="/" element={<Dashboard refetchTrigger={refetchTrigger} onRefetch={handleRefetch}/>} />
          <Route path="/dashboard" element={<Dashboard refetchTrigger={refetchTrigger} onRefetch={handleRefetch}/>} />
          <Route path="/customers" element={<Customers refetchTrigger={refetchTrigger} onRefetch={handleRefetch}/>} />
          <Route path="/rewards" element={<Rewards refetchTrigger={refetchTrigger} onRefetch={handleRefetch}/>} />
          <Route path="/login" element={<Login isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal}/>} />
        </Routes>

    </div>
  </div>
</Router>
  );
};


export default App;
