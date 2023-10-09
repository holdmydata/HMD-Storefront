import ModalHeader from "../components/ModalHeader";
import Modal from "../components/Modal";
import LoginForm from "../components/LoginForm";
import { useState, useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
// import { useMutation } from '@apollo/client';
// import { AUTH_TOKEN } from '../constants/authToken';

function Login({isModalOpen, openModal, closeModal}) {

    const [modalContent, setModalContent] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleClose = useCallback(() => {
        setModalContent(null);
        navigate('/dashboard');
        setIsAuthenticated(true);
        closeModal();

    }, [closeModal]);

    useEffect(() => {
        if(!isAuthenticated) {
        try {
            setModalContent(
                <>
                <ModalHeader 
                    heading={"You are not prepared..."}
                    paragraph={"I bet you thought you could just waltz in here and start using the app. Well, you can't. You need to login first."}
                    linkName={"Can't login, eh?"}
                    linkUrl="/dashboard"
                />
              
                <LoginForm /> 
                <div className="flex justify-center pt-4">
                    <button onClick={handleClose} className="bg-black hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-2">Login</button> 
                </div>
                </>
            );
            openModal();
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    }
    }, [handleClose, openModal, isAuthenticated]); 

    return (
        <>    
            <Modal isOpen={isModalOpen} closeModal={handleClose}>
                {modalContent}
            </Modal>
        </>
    )
}

export default Login;