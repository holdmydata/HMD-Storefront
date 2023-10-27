import React, {useState} from "react";

function Settings() {

    const [refetchTrigger, setRefetchTrigger] = useState(0);
    const [theme, setTheme] = useState("dark");
    const [isModalOpen, setIsModalOpen] = useState(false);


  return(    
  <>
  <div className="flex w-full h-screen">
    <div className="flex flex-wrap justify-start">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1">
    <ul className="flex flex-col">
      <li className="my-px justify-start text-white">
        Change Theme
        <div className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 bg-gray-100">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="flex items-center justify-center w-1/2 h-full text-sm rounded-lg bg-gray-300">
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </li>
      <li className="my-px">
        <button onClick={() => setIsModalOpen(true)} className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 bg-gray-100">
          <span className="flex items-center justify-center text-lg text-white bg-black rounded-full h-10 w-10 mr-3">?</span>
          <span className="flex flex-col justify-center">
            <span className="text-sm font-medium text-black">Help</span>
          </span>
        </button>
      </li>
      </ul>
    </div>
    </div>
    </div>
  </>
    
  );
  };
export default Settings;