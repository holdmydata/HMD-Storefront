import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import Customers from './views/Customers';
import Dashboard from './views/Dashboard';
import Rewards from './views/Rewards';
import './App.css';
import Sidebar from "./components/Sidebar";
import backgroundImage from "./assets/img/app-bg-dark.png";
import Login from "./views/Login";
import BottomBar from "./components/BottomBar";



function App() {
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    const newIsCollapsed = !isCollapsed;
    console.log("Sidebar State: ", newIsCollapsed)
      setIsCollapsed(newIsCollapsed);
  };

  const handleRefetch = () => {
    console.log("Refetch Trigger: ", refetchTrigger)
      setRefetchTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (

    <Router>
  <div className="app-container"> 
  <img src= {backgroundImage}  alt="Background" className="background-image bg-grid-slate-900/[0.04]" />
  {!isMobileView && (<button className={`fixed top-0 left-0 m-3 cursor-pointer px-3 py-1 text-xl leading-none bg-transparent  rounded ${isCollapsed ? 'text-white' : 'text-b'} z-50`} 
    type="button"
    onClick={toggleSidebar}>
    <i className={`fas ${isCollapsed ? 'fa-bars' : ''}`}></i>
</button>)}
  {!isModalOpen && !isMobileView && <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} refetchTrigger={refetchTrigger} onRefetch={handleRefetch} className="sidebar-footer"/>}
  {isMobileView && <BottomBar />}
    <div className={`main-content ${isCollapsed ? '' : 'open'}`}>
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
