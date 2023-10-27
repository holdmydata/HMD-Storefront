import React from 'react';
import { useLocation } from 'react-router-dom';
import userImage from "../assets/img/team-1-800x800.jpg";
import { BsPlus, BsFillLightningFill, BsGearFill, BsPeopleFill } from 'react-icons/bs';
import { FaFire, FaDesktop, FaUser, FaCoins } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AppHeader = ({isMobileView}) => {

    const location = useLocation()
    const currentPage = location.pathname;

    const SideBarIcon = ({ icon, text }) => (
        <div className="sidebar-icon group">
          {icon}
          <span class="sidebar-tooltip group-hover:scale-100 scale-0">
            {text}
          </span>
        </div>
      );
      
      
      const Divider = () => <hr className="sidebar-hr" />;

    

    return (
        <>
        <div className={`sidebar ${isMobileView ? 'justify-evenly bottom-0 left-0 w-full bg-stone-900 shadow-stone-50 overflow-show' : 'flex-col top-0 left-0 h-screen'}`}>
            <div className={`p-2 shadow-lg ${isMobileView ? 'flex flex-row justify-evenly' : 'flex flex-col'}`}>
                <Link to="/dashboard">
                    <SideBarIcon icon={<img src={userImage} alt="User" className="rounded-full" />} text="Admin" />
                </Link>
                <Link to="/dashboard">
                    <SideBarIcon icon={<FaDesktop size="28" />} text="Dashboard"/>
                </Link>
                {/* <Divider /> */}
                <Link to="/customers">
                    <SideBarIcon icon={<BsPeopleFill size="28" to="/customers"/>} text="Customers" onClick="/customers" />
                </Link>
                <Link to="/rewards">
                    <SideBarIcon icon={<FaCoins size="24" to="/rewards"/>}  text="Rewards" />
                </Link>
                {/* <Divider className={`${"hidden"}`} /> */}
                <Link to="/settings">
                    <SideBarIcon icon={<BsGearFill size="22" to="/settings" />} text="Settings" />
                </Link>
                </div>
            </div>
        </>
    );
}

export default AppHeader;
