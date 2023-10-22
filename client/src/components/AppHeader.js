import React from 'react';
import userImage from "../assets/img/team-1-800x800.jpg";
const AppHeader = () => {

    

    return (
        <>
            <div className="p-2 shadow-lg bg-stone-100">
                <div className="flex items-center">
                    <img src={userImage}
                        alt="User Avatar"
                        className="h-10 w-10 rounded-full mr-4"/>
                    <div className='relative top-0 flex'>
                    <h1 className='text-xl font-stock from-neutral-50 text-stone-700 font-bold'>HMD Admin</h1>
                </div>
                </div>
            </div>
        </>
    );
}

export default AppHeader;
