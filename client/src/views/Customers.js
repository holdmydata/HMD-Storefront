import React from "react";
import CustomerResults from "../components/CustomerResults"
import CreateCustomerForm from "../components/CreateCustomer";



function Customers(refetchTrigger) {


    return (

        <div>
            <div className="font-gabarito reflex flex-col z-automx-auto max-w-7xl py-2 sm:px-6 lg:px-8lative md:ml-64 max-w-screen rounded">
                <div className="flex flex-col max-w-screen py-4 px-4 bg-neutral-50 shadow-neutral-600 rounded-xl my-4">
                    <div className="border-2 rounded-xl bg-stone-900 bg-opacity-90 shadow-md">
                    <div className="text-2xl my-2 text-neutral-50 font-inter text-center">Create Customer</div>
                        <CreateCustomerForm refetchTrigger={refetchTrigger} />
                    </div>
                </div>
            </div>
            <div className="reflex flex-col z-automx-auto max-w-7xl py-2 sm:px-6 lg:px-8lative md:ml-64 max-w-screen rounded">
            <div className="border-2 rounded-xl m-1 bg-neutral-50">
                <div className="font-gabarito flex flex-col z-auto w-auto bg-white bg-opacity-90 rounded-xl">
                <div className="text-2xl w-full my-2 font-thin pb-2 text-center">Customer Search</div>
                    {/* <div className="flex flex-row w-full p-2">
                        <label className="text-gray-700 w-1/4 mb-1 p-2">Search:</label>
                        <input type="text" placeholder="Search" className="border  border-gray-300 w-1/2 shadow px-4 rounded-xl"/>
                    </div> */}
                    <div className="flex flex-row w-full p-2">
                    <label className="text-gray-700 w-1/4 mb-1 p-2">Search:</label>
                        <input type="text" placeholder="Search" className="border  border-gray-300 w-1/2 shadow px-4 rounded-xl"/>
                            <label className="text-gray-700 w-1/4 text-right mb-1 p-2">Start:</label>
                            <input type="date" className="border w-1/2 border-gray-300 shadow px-4 rounded-xl"/>
                            <label className="text-gray-700 w-1/4 text-right mb-1 p-2">End:</label>
                            <input type="date" className="border w-1/2 border-gray-300 shadow px-4 rounded-xl"/>
                            <button className='bg-white px-4 ml-10 w-1/4  h-auto rounded-lg border-2 border-spacing-2 border-sky-100 text-blue-800 text-md hover:text-white hover:bg-fuchsia-500 '>Search</button>
                        </div>
                    <form className="flex z-auto px-2 py-2">
                    </form>
                </div>
            </div>
            <div>
                    <div className="font-gabarito border-2 rounded-xl bg-purple-100 shadow-purple-300 shadow-md">
                    <CustomerResults refetchTrigger={refetchTrigger} /> {/* </div> */} </div>
                    </div>
            </div>
        </div>
    );
}

export default Customers;
