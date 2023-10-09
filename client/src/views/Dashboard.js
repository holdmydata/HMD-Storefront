import React from "react";
import CustomerResults from "../components/CustomerResults"
//import ChartTemplate from "../components/ChartTemplate";
// import CheckInForm from "../components/CheckInForm";

function Dashboard(refetchTrigger) {

    // const handleRefetch = () => {
    //     setRefetchTrigger(prev => prev + 1);
    // };
    return (<>
        <div className={`relative md:ml-64 `}> {/* KPIs */}
            <div className="container max-w-4xl px-4 mx-auto my-4">
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
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

                <div className="p-4">
                    <CustomerResults refetchTrigger={refetchTrigger}/>
                </div>
                {/* <div className="p-4">
                    <ChartTemplate />
                </div> */}
            </div>
        </div>
    </>);
};

export default Dashboard;
