import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CHECK_IN_CUSTOMER } from '../queries/queryCheckInCustomer';
import { useRedeemReward } from './RedeemReward';
import Modal from './Modal';


function CheckInForm({onRefetch}) {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkInCustomer] = useMutation(CHECK_IN_CUSTOMER);
  const [customerInfo, setCustomerInfo] = useState(null);
  const { redeem } = useRedeemReward();
  const [modalContent, setModalContent] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await checkInCustomer({ variables: { phoneNumber: phoneNumber } });
      // console.log(response?.data);
      if (response?.data?.checkInCustomer) {  
        const customer = response.data.checkInCustomer.customer;
        // console.log('Customer before:', customer);
        setCustomerInfo(customer);
        // console.log('Customer after:', customerInfo);
        const customerLoyaltyCoins = customer.loyaltyCoins;
        const customerFirstName = customer.firstName;

        if (customerLoyaltyCoins >= 100) {
          // console.log('Customer has enough loyalty coins to redeem a reward!');
          setModalContent(
            <div>
              <p>🥳{customer.firstName} has enough loyalty coins to redeem a reward!</p>
              <button onClick={() => handleRedeem(customer)} className='bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full'>Redeem Now</button>
              <button onClick={handleClose} className='bg-pink-600 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-2'>Close</button>
            </div>
          );
          openModal();
        } else {
          // console.log('Customer does not have enough loyalty coins to redeem a reward.');
          setModalContent(
            <div>
              <p className='text-md font-medium'>🥳{customerFirstName} checked in!</p>
              <button onClick={handleClose} className='bg-pink-600 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-2'>Close</button>
            </div>
          );
          openModal();
        }
      } else {
        console.error('Customer data is not available');
      }
    } catch (error) {
      console.error("Error checking in customer:", error);
      console.error("Error details:", error.message, error.stack);
    }
  };

  const handleRedeem = async (customer) => {

    // console.log('Redeeming reward for customer:', customer)
    if (customer) {
      try {
        const redeemData = await redeem( customer.phoneNumber, "1" );
        // console.log('Redeem data before:', redeemData)

        setModalContent(
        <div>
        <p>🥳{redeemData.customer.firstName} redeemed {redeemData.reward.name}!🙌</p>
        <p>{redeemData.customer.firstName} now has {redeemData.customer.loyaltyCoins} coins remaining!</p>
        <button onClick={handleClose} className='bg-pink-600 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-2'>Close</button>
        </div>
        );
        openModal();
      } catch (error) {
        // Handle error
        console.error("Error redeeming reward:", error);
      }
    }
  };


    const handleClose = () => {
      if (onRefetch) {
        onRefetch().then(() => {
          setCustomerInfo(null);
          closeModal();
        });
      } else {
        setCustomerInfo(null);
        closeModal();
      }
    };

  return (
    // <div className="p-4 py-6 shadow-lg border rounded-xl bg-white mx-auto max-w-7xl sm:px-6 lg:px-8">
    <>
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
        <div className="flex justify-end"> 
        <button type="submit" onClick={handleSubmit} className="bg-stone-50 hover:bg-stone-200 text-stone-800 hover:text-stone-700 rounded w-auto py-2 px-4 font-bold mt-2">Check In</button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} closeModal={handleClose}>
        {modalContent}
      </Modal>
    </>
  );
}
 

export default CheckInForm;