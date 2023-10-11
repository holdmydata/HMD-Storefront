import React from 'react';
import { Link } from 'react-router-dom';
export default function BottomBar() {
    return (
    <div className="fixed bottom-0 left-0 w-full bg-transparent overflow-hidden"> 
    <div className="flex flex-row justify-evenly pb-4">
        <Link to="/dashboard">
            <i className="fas fa-home fa-xl text-stone-100 m-2 px-2 "></i>
        </Link>
        <Link to="/customers">
        <i className="fas fa-address-card fa-xl text-stone-100 m-2 px-2"></i>
        </Link>
        <Link to="/rewards">
        <i className="fas fa-coins fa-xl text-stone-100 m-2 px-2"></i>
        </Link>
        <i className="fas fa-bars fa-xl text-stone-100 m-2 px-2"></i>
    </div>
    </div>
    );

}