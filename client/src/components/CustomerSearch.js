import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_CUSTOMER } from '../queries/querySearchCustomer';
import Modal from './Modal';


function CustomerSearch({onRefetch}) {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchCustomer] = useQuery(SEARCH_CUSTOMER);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!phoneNumber) {
        return console.error('Customer data is not available');
        }
    else {
    try {
      console.log('Phone Number:', phoneNumber);
      const response = await searchCustomer({ variables: { phoneNumber: phoneNumber } });
      console.log(response?.data);
      if (response?.data?.checkInCustomer) {  
        const customer = response.data.checkInCustomer.customer;
        // console.log('Customer before:', customer);
        setCustomerInfo(customer);
        // console.log('Customer after:', customerInfo);

        //if statement here for if cusotmer exists
          console.log('Customer has enough loyalty coins to redeem a reward!');
          setModalContent(
            <div>
              <p>🥳{customerInfo.firstName} placeholder!!!!</p>
              <button onClick={handleClose} className='bg-pink-600 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-2'>Close</button>
            </div>
          );
          openModal();
        }
    } catch (error) {
      console.error("Error checking in customer:", error);
      console.error("Error details:", error.message, error.stack);
    }
  }
    };


  const handleClose = () => {

    if ( onRefetch ) {
      onRefetch();
      setCustomerInfo(null);
      closeModal();

    }
  };

  return (
    // <div className="p-4 py-6 shadow-lg border rounded-xl bg-white mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="flex flex-col items-center justify-center shadow-xl shadow-white">
      <form onSubmit={handleSubmit}>
        <span className=" z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
          <i className="fas fa-search"></i>
        </span>
        <input 
          type="tel" 
          placeholder="Phone Number" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="p-2 border flex-grow max-w-fullborder-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus: ring-purple-900 w-full pl-10"
          
        />
      </form>
      <Modal isOpen={isModalOpen} closeModal={handleClose}>
        {modalContent}
      </Modal>
    </div>
  );
}

 

export default CustomerSearch;