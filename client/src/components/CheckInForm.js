import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CHECK_IN_CUSTOMER } from '../queries/queryCheckInCustomer';

function CheckInForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [checkInCustomer] = useMutation(CHECK_IN_CUSTOMER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await checkInCustomer({ variables: { phoneNumber: phoneNumber } });
      setShowPopup(true);
      // Handle success, maybe clear the form or show a success message
    } catch (error) {
      // Handle error
      console.error("Error checking in customer:", error);
    }
  };

  return (
    <div className="p-4 shadow-lg border rounded bg-white flex">
      <h2 className="text-xl mb-4 flex-grow">Check In Customer</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Phone Number" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="p-2 border rounded flex-grow, max-w-full"
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
          Check In
        </button>
      </form>
      {showPopup && (
        <div className="absolute top-0 left-0 w-full h-full bg-transparent bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="text-xl">Customer Checked In!</p>
            <button onClick={() => setShowPopup(false)} className='rounded '>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckInForm;