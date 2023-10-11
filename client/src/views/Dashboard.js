import React from "react";
// import CustomerResults from "../components/CustomerResults"
import FrontpageChart from "../components/FrontpageChart";
//import ChartTemplate from "../components/ChartTemplate";
// import CheckInForm from "../components/CheckInForm";

function Dashboard(refetchTrigger) {

    // const handleRefetch = () => {
    //     setRefetchTrigger(prev => prev + 1);
    // };
    return (<>
     <div className="flex flex-grow items-center sm:min-w-full"> {/* Adjusted this line */}
        <div className={`relative w-full flex-grow`}> {/* KPIs */}
            <div className="container max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto my-4">
                <div className="grid gap-7 overflow-hidden sm:grid-cols-1 lg:grid-cols-2">
                    <div className="text-center space-y-2 sm:text-left">
                        <div className="p-5 bg-white rounded shadow-md">
                            <div className="space-y-0.5">
                                <p className="text-md flex flex-auto text-black justify-center font-inter sm:text-lg ">Customers Today</p>
                                <p className="text-gray-500 font-medium text-2xl justify-center flex flex-auto">420</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center space-y-2 sm:text-left">
                        <div className="p-5 bg-white rounded shadow-md">
                            <div className="space-y-0.5">
                                <p className="text-md flex flex-auto text-black justify-center font-thin sm:text-lg ">Rewards Today</p>
                                <p className="text-gray-500 text-2xl justify-center font-medium flex flex-auto">69</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="text-center space-y-2 sm:text-left">
                            <div className="p-5 bg-white rounded shadow-md">
                                <div className="space-y-0.5">
                                    <p className="text-md text-black font-semibold">Customers Today</p>
                                    <p className="text-gray-500 font-medium text-lg flex flex-auto">420</p>
                                </div>
                            </div>
                        </div> */} </div>
            </div>
            <div className="flex flex-col z-automx-auto max-w-7xl py-2 bg-white rounded-xl m-4 sm:px-6 lg:px-8">

                {/* <div className="p-4">
                    <CustomerResults refetchTrigger={refetchTrigger}/>
                </div> */}
                <div className="p-4">
                    <FrontpageChart />
                </div>
            </div>
        </div>
    </div>
    </>);
};

export default Dashboard;
