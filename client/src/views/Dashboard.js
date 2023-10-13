import React from "react";
// import CustomerResults from "../components/CustomerResults"
import FrontpageChart from "../components/FrontpageChart";
import CheckInForm from "../components/CheckInForm";



function Dashboard({onRefetch}) {
    
    return (
        <>
            <div className="flex pt-1 items-center sm:min-w-full">
                {/* Adjusted this line */}
                <div className={`w-full flex-grow`}>
                    {/* KPIs */}
                    <div className="container max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                        <div className="grid grid-flow-col overflow-hidden sm:grid-cols-2 lg:grid-cols-2">
                            <div className=" sm:text-left text-left py-2 px-2 space-y-1">
                            <p className=" text-xs text-stone-100 justify-center font-stock uppercase font-bold sm:text-sm ">Customers</p>                             
                                <div className="px-2 py-2 max-w-sm bg-stone-100 rounded-lg shadow-md">
                                    <div className="space-y-0.5">

                                        <p className="text-stone-600 font-medium text-2xl justify-center flex flex-auto">420</p>
                                    </div>
                                </div>
                            </div>
                            <div className=" sm:text-left text-left py-2 px-2 space-y-1">
                            <p className=" text-xs text-stone-100 justify-center font-stock uppercase font-bold sm:text-sm ">Rewards</p>           
                            <div className="px-2 py-2 max-w-sm bg-stone-100 rounded-lg shadow-md">
                                    <div className="space-y-0.5">
                                    <p className="text-stone-600 font-medium text-2xl justify-center flex flex-auto">69</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" z-automx-auto max-w-7xl py-2 bg-none rounded m-4 sm:px-4 lg:px-8">
                        <h2 className="text-md text-left flex flex-auto text-stone-100  font-stock uppercase font-extrabold sm:text-md ">Visits L7D</h2>
                        <div className="w-full h-full py-10">
                            <FrontpageChart/>
                        </div>
                        <h2 className="text-md text-left flex flex-auto text-stone-100  font-stock uppercase font-extrabold sm:text-md pb-2">Check In Customer</h2>
                        <CheckInForm onRefetch={onRefetch}/>
                    </div>
                {/* <CustomerResults onRefetch={onRefetch}/> */}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
