import React from "react";
// import CustomerResults from "../components/CustomerResults"
import FrontpageChart from "../components/FrontpageChart";
import CheckInForm from "../components/CheckInForm";
import DashboardCounts from "../components/DashboardCounts";


function Dashboard({onRefetch}) {
    


    return (
        <>
            <div className="flex pt-1 items-center sm:min-w-full">
                {/* Adjusted this line */}
                <div className={`w-full flex-grow`}>
                    {/* KPIs */}
                    <DashboardCounts refetchTrigger={onRefetch}/>
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
