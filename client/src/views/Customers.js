import React from "react";
// import CustomerResults from "../components/CustomerResults"
import CreateCustomerForm from "../components/CreateCustomer";
import CustomerSearch from "../components/CustomerSearch";

function Customers(refetchTrigger) {


    return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md sm:items-stretch object-fill justify-center ">
        <div className=" font-inter sm:mx-auto">
            {/* <div className="flex flex-row bg-neutral-50 shadow-neutral-600 rounded-xl ">
                <div className=" border-2 rounded-xl bg-stone-900 "> */}
                    <div className="text-sm text-neutral-50 font-inter uppercase font-bold text-left">Create Customer</div>
                    <div className="">
                    <CreateCustomerForm refetchTrigger={refetchTrigger}/>
                    </div>
                <div className="flex flex-row bg-neutral-50 shadow-neutral-600 rounded-xl ">
                {/* <CustomerSearch /> */}
                </div>

                {/* </div>
            </div> */}
            {/* <div className="absolute z-automx-auto max-w-7xl py-2 sm:px-6 lg:px-8lative md:ml-64 max-w-screen rounded">
                <div className="border-2 rounded-xl m-2 bg-neutral-50">
                    <div className="font-gabarito flex flex-col z-auto w-auto bg-white bg-opacity-90 rounded-xl xs:text-xs">
                        <div className="text-2xl w-full my-2 font-thin pb-2 text-center">Customer Search</div>
                        <div className="flex flex-row w-full p-2 xs:p-2">
                            <label className="text-gray-700 flex-1 mb-1 p-2">Search:</label>
                            <input type="text" placeholder="Search" className="border  border-gray-300 flex-2 shadow px-4 rounded-xl"/>
                            <label className="text-gray-700 flex-1 text-right mb-1 p-2">Start:</label>
                            <input type="date" className="border flex-2 border-gray-300 shadow px-4 rounded-xl"/>
                            <label className="text-gray-700 flex-1 text-right mb-1 p-2">End:</label>
                            <input type="date" className="border flex-2 border-gray-300 shadow px-4 rounded-xl"/>
                            <button className='bg-stone-900 px-4 ml-10 w-1/4  h-auto rounded-lg border-2 border-spacing-2 border-sky-100 text-gray-200 text-md hover:text-gray-800 hover:bg-stone-200 hover:border-gray-400 '>Search</button>
                        </div>
                        <form className="flex z-auto px-2 py-2"></form>
                    </div>
                </div>
                <div>
                    <div className="font-gabarito border-2 rounded-xl bg-purple-100 shadow-purple-300 shadow-md">
                        <CustomerResults refetchTrigger={refetchTrigger}/>
                    </div>
                </div>
            </div> */}
        </div>
    </div>);
}

export default Customers;
