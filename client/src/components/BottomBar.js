import React from 'react';
import { Link, useLocation } from 'react-router-dom';



export default function BottomBar(){
const location = useLocation()
const currentPage = location.pathname;

   
    return (

    <div className="absolute bottom-0 left-0 w-full bg-stone-50 overflow-hidden"> 
    <div className="flex flex-row justify-evenly pb-0">
    <Link className={`text-lg font-inter py-3 block`}to="/dashboard"> 
        <i className={`fas fa-home fa-lg text-stone-900 m-2 px-2 py-3 block ${currentPage === '/dashboard' || currentPage === '/' ? 'border-b-4 border-opacity-75 border-spacing-y-2 border-stone-400 text-stone-400 hover:text-stone-600' : 'text-stone-900 hover:text-stone-500'}`}></i>
        </Link>
        <Link className={`text-lg font-inter py-3 block`}to="/customers"> 
        <i className={`fas fa-address-card fa-lg text-stone-900 m-2 px-2 py-3 block ${currentPage === '/customers' ? 'border-b-4 border-opacity-75 border-spacing-y-2 border-stone-500 text-stone-500 hover:text-stone-700' : 'text-stone-900 hover:text-stone-500'}`}></i>
        </Link>
        <Link className={`text-lg font-inter py-3 block`}to="/rewards"> 
        <i className={`fas fa-coins fa-lg text-stone-900 m-2 px-2 py-3 block ${currentPage === '/rewards' ? 'border-b-4 border-opacity-75 border-spacing-y-2 border-stone-500 text-stone-500 hover:text-stone-700' : 'text-stone-900 hover:text-stone-500'}`}></i>
        </Link>
        <Link className={`text-lg font-inter py-3 block ${currentPage === '/' ? 'text-pink-500 hover:text-pink-600 font-bold' : 'text-blueGray-700 hover:text-blueGray-500 font-thin'}`}to="/login"> 
        <i className={`fas fa-cog fa-lg text-stone-900 m-2 px-2 py-3 block ${currentPage === '/login' ? 'border-b-4 border-opacity-75 border-spacing-y-2  border-stone-500 text-stone-500 hover:text-stone-700' : 'text-stone-900 hover:text-stone-500'}`}></i>
        </Link>
    </div>
    </div>
    );

}
