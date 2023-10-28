import React from "react";
// import CustomerResults from "../components/CustomerResults"
import CreateCustomerForm from "../components/CreateCustomer";
import CustomerSearch from "../components/CustomerSearch";
import CustomerResults from "../components/CustomerResults";

function Customers(refetchTrigger) {


    return (
        <div className={`relative flex flex-col pt-6 sm:pl-8 md:pl-20 justify-evenly`}>
            <div className="flex flex-col py-8 sm:px-6 rounded shadow-xl shadow-stone-900 max-w-screen">
                <h2 className="text-md text-left font-stock uppercase font-extrabold sm:text-md ">Create Customer</h2>

                <CreateCustomerForm refetchTrigger={refetchTrigger}/> {/* <div className="flex flex-col py-2 sm:px-6 lg:px-8lative  max-w-screen rounded">
                <div className="flex flex-row border-2 rounded-xl m-2">
                    <div className="group w-full font-inter z-auto bg-stone-50 bg-opacity-90 rounded-xl xs:text-xs">
                        <div className="text-2xl w-full my-2 font-thin pb-2 text-center">Customer Search</div>
                        <div className="flex p-2 xs:p-2">
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
                <div> */} </div>
            <div className="flex flex-col mt-14  sm:px-6 lg:px-8lative max-w-full rounded shadow-xl shadow-stone-900">
                <h2 className="text-md text-left flex flex-auto font-stock uppercase font-extrabold sm:text-md ">Recent Customers</h2>
                <div className="font-inter drop-shadow-xl">
                    <CustomerResults refetchTrigger={refetchTrigger}/>
                </div>
                {/* </div>
            </div> */} </div>
        </div>
    );
}

export default Customers;
