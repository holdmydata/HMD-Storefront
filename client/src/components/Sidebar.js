import React from "react";
import {Link, useLocation} from "react-router-dom";
import userImage from "../assets/img/team-1-800x800.jpg";
import CheckInForm from "./CheckInForm";
import {Transition} from "@headlessui/react";


// import UserDropdown from "./UserDropdown.js";


export default function Sidebar({onRefetch, isModalOpen, isCollapsed, toggleSidebar}) {

    const location = useLocation()
    const currentPage = location.pathname;

    return (
        <>
        <Transition 
            show={!isCollapsed}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
        >
            <div className={
                `sidebar ${
                    isModalOpen ? 'hidden' : ''
                } ${
                    isCollapsed ? 'collapse' : ''
                }`
            }>
                <nav className="fixed bottom-0 left-0 md:left-0 md:top-0 md:bottom-auto overflow-y-auto flex-row  overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between w-full md:w-64 z-10 py-4 px-6 md:block">
                    <button className={`absolute top-0 right-0 m-3 cursor-pointer px-3 py-1 text-xl leading-none bg-transparent rounded ${isCollapsed ? 'text-stone-900' : 'text-stone-600'} `}
                        type="button"
                        onClick={toggleSidebar}>
                        <i className={`fas ${isCollapsed ? 'fa-bars' : 'fa-times'}`}></i>
                    </button>
                    <div className={`md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full'`}>
                        <Link className="text-xl sidebar font-thin md:block text-justify md:pb-2 mr-0 inline-block whitespace-nowrap p-4 px-0" to="/dashboard">
                            Velvet Vapor Admin
                        </Link>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full"/>

                        <div className={
                            "sm:hidden md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " + isCollapsed
                        }>
                            {/* Collapse header */}
                            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                                <div className="flex flex-wrap">
                                    <div className="w-6/12">
                                        <Link className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase p-4 px-0" to="/dashboard">
                                            Velvet Vapor Admin
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* Form */}
                            <form className="mt-6 mb-4 md:hidden">
                                <div className="mb-3 pt-0">
                                    <input type="tel" placeholder="Search" className="px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"/>
                                </div>
                            </form>
                            {/* Navigation */}
                            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                                <li className="items-center">
                                    <Link className={
                                            `text-md font-inter py-3 block ${
                                                currentPage === '/dashboard' || currentPage === '/' ? 'text-pink-500 hover:text-pink-600 font-bold' : 'text-blueGray-700 hover:text-blueGray-500 font-thin'
                                            }`
                                        }
                                        to="/dashboard">
                                        <i className="fas fa-tv opacity-75 mr-2 text-sm"></i>
                                        <span className={
                                            `md:inline-block ${
                                                isCollapsed ? 'hidden' : 'inline-block'
                                            }`
                                        }>Dashboard</span>
                                    </Link>
                                </li>

                                <li className="items-center">
                                    <Link className={
                                            `text-md font-inter py-3 block ${
                                                currentPage === '/customers' ? 'text-pink-500 hover:text-pink-600 font-bold' : 'text-blueGray-700 hover:text-blueGray-500 font-thin'
                                            }`
                                        }
                                        to="/customers">
                                        <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>
                                        <span className={
                                            `md:inline-block ${
                                                isCollapsed ? 'hidden' : 'inline-block'
                                            }`
                                        }>Customers</span>
                                    </Link>
                                </li>

                                <li className="items-center">
                                    <Link className={
                                            `text-md font-inter py-3 block ${
                                                currentPage === '/rewards' ? 'text-pink-500 hover:text-pink-600 font-bold' : 'text-blueGray-700 hover:text-blueGray-500 font-thin'
                                            }`
                                        }
                                        to="/rewards">
                                        <i className="fas fa-coins text-blueGray-400 mr-2 text-sm"></i>
                                        <span className={
                                            `md:inline-block ${
                                                isCollapsed ? 'hidden' : 'inline-block'
                                            }`
                                        }>Rewards</span>
                                    </Link>
                                </li>

                                <li className="items-center font-thin">
                                    <a className="text-blueGray-300 font-inter text-md py-3 block" href="#pablo"
                                        onClick={
                                            e => e.preventDefault()
                                    }>
                                        <i className="fas fa-tools text-blueGray-300 mr-2 text-sm"></i>
                                        <span className={
                                            `md:inline-block ${
                                                isCollapsed ? 'hidden' : 'inline-block'
                                            }`
                                        }>Settings
                                        </span>
                                    </a>
                                </li>
                            </ul>
                            {/* Divider */}
                            <hr className="my-4 md:min-w-full"/> {/* Heading */}
                            <h6 className="md:min-w-full text-blueGray-500 text-lg font-thin block pt-1 pb-4 no-underline">Check In Customer</h6>
                            <div className="relative flex w-full flex-wrap items-stretch">
                                <CheckInForm onRefetch={onRefetch}/>
                            </div>
                        </div>
                        <div className="sidebar pb-4 bottom-0 w-full"></div>
                        <div className="sidebar-footer p-4 shadow-lg border rounded bg-white">
                            <div className="flex items-center">
                                <img src={userImage}
                                    alt="User Avatar"
                                    className="h-10 w-10 rounded-full mr-4"/>
                                <div className="text-gray-500 text-justify flex-grow">Rhonda</div>
                            </div>
                            <div className="mt-4">
                                <Link to="/login">
                                    <button href="/login" className="bg-black hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-2">
                                        Logout
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </nav>
            </div>
        </Transition>
        </>
    );
}
