import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {CREATE_CUSTOMER} from '../queries/queryCreateCustomer';
import Modal from './Modal';

function CreateCustomerForm({onSuccess, onError, onRefetch}) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        loyaltyCoins: 10,
        birthday: ''

    });
    const inputClassName = 'rounded-md appearance-none relative block w-full px-3 py-4 mb-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm'
    const [createCustomer] = useMutation(CREATE_CUSTOMER);
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

          
    const handleSubmit = async (e) => {
        console.log('Form data:', formData)
        e.preventDefault();

        try {
            const response = await createCustomer({
                variables: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phoneNumber: formData.phoneNumber,
                    email: formData.email,
                    loyaltyCoins: 10,
                    birthday: new Date(formData.birthday)
                }
            });
            console.log('Customer created:', response);
            onSuccess && onSuccess(response);
            setFormData({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                loyaltyCoins: 10,
                birthday: ''
            });
            setModalContent(
                <div>
                    <p className='text-md font-medium'>Customer created!</p>
                    <button onClick={handleClose} className='bg-pink-600 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-2'>Close</button>
                </div>
            );
            openModal();
        } catch (error) {
            console.error('Error creating customer:', error);
            onError && onError(error);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClose = () => {
          setModalContent(null);
          closeModal();
        };

    return (
        <>
            <div className='p-2 m-2 lg:columns-2 sm:flex-auto md:flex-shrink sm:flex-shrink items-center sm:columns-1'>
                <form onSubmit={handleSubmit} className='w-full max-w-lg'>
                <input type="text" name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className = {inputClassName} />
                <input type="text" name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className = {inputClassName} />
                <input type="text" name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className = {inputClassName} />
                <input type="text" name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className = {inputClassName} />
                <input type="date" name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    placeholder="Birthday"
                    className = {inputClassName} />

            <div className='w-full flex justify-center py-2'>
                <button type="submit" onSubmit={handleSubmit} className='bg-white ml-10 p-1 w-1/2 pt-2 rounded-lg border-2 border-spacing-2 border-sky-100 text-blue-800 text-md hover:text-white hover:bg-fuchsia-500 '>Create</button>
            </div>
            </form>
        </div>
              <Modal isOpen={isModalOpen} closeModal={handleClose}>
              {modalContent}
            </Modal>
        </>
    );
}

export default CreateCustomerForm;
