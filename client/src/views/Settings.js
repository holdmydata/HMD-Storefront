import React, { useContext, useState} from "react";
import { ThemeContext } from "../components/ThemeProvider";


function Settings({}) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
    
  return (
    <>
      <div className="relative pt-6 sm:pl-8 md:pl-20">
        <div className="w-full">

          <div className="mb-8">
            <h2 className="text-md font-extrabold uppercase mb-4">Change Theme</h2>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="px-4 py-2 rounded-lg bg-gray-300 text-black"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>

          <div>
            <h2 className="text-md font-extrabold uppercase mb-4">Help</h2>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center px-4 py-2 rounded-lg bg-gray-300 text-black"
            >
              <span className="mr-2 text-lg">?</span> Get Help
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
