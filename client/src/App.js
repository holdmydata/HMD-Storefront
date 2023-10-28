import React, {useState, useEffect, useContext} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Customers from './views/Customers';
import Dashboard from './views/Dashboard';
import Rewards from './views/Rewards';
import './App.css';
import Login from "./views/Login";
import AppHeader from "./components/AppHeader";
import { AuthContext } from "./components/Auth";
import Settings from "./views/Settings";
import { ThemeContext } from "./components/ThemeProvider";


// import Tabs from "./components/Tabs";
const ProtectedRoute = ({ element, ...rest }) => {
  const { authState } = useContext(AuthContext);

  return authState ? element : <Navigate to="/login" replace />;
};

function App() {

  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 762);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const {theme, setTheme} = useContext(ThemeContext);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

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
    <AppHeader isMobileView={isMobileView} isCollapsed={isCollapsed}/>
    <div className="app-container"> 
    {/* <img src= {backgroundImage}  alt="Background" className="background-image bg-grid-slate-900/[0.04]" /> */}
    <div className={`main-content ${isCollapsed ? '' : 'open'}`}>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Dashboard refetchTrigger={refetchTrigger} onRefetch={handleRefetch} />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard refetchTrigger={refetchTrigger} onRefetch={handleRefetch} />} />} />
          <Route path="/customers" element={<ProtectedRoute element={<Customers refetchTrigger={refetchTrigger} onRefetch={handleRefetch} />} />} />
          <Route path="/rewards" element={<ProtectedRoute element={<Rewards refetchTrigger={refetchTrigger} onRefetch={handleRefetch} />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<Settings refetchTrigger={refetchTrigger} onRefetch={handleRefetch} />} />} />
          <Route path="/login" element={<Login isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />} />
        </Routes>
      </div>
    </div>

</Router>
  );
}

export default App;
