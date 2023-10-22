import React, {useState, useEffect, useCallback, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {gql, useMutation} from "@apollo/client";
import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import {AuthContext} from "../components/Auth";


const LOGIN_MUTATION = gql `
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;



function Login({isModalOpen, openModal, closeModal}) {
    const [modalContent, setModalContent] = useState("login");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [loginMutation, {
            data,
            loading,
            error
        }
    ] = useMutation(LOGIN_MUTATION);

    const handleLogin = async (username, password) => {
        try {
            console.log(username, password); // Add this line to log the username and password
            const {data} = await loginMutation({
                variables: {
                    username,
                    password
                }
            });
            if (data && data.login.token) {
                localStorage.setItem("token", data.login.token);
                login(data.login.token);
                closeModal();
                navigate("/dashboard");
            } else {
                console.log("Login failed");
            }
        } catch (error) {
            console.error("Error logging in: ", error);
        }
    };

    const handleClose = useCallback(() => {
        setModalContent("login");
        navigate("/dashboard");
        setIsAuthenticated(true);
        closeModal();
    }, [closeModal, navigate]);

    useEffect(() => {
        if (!isAuthenticated) {
            try {
                openModal();
            } catch (error) {
                console.error("Error opening modal:", error);
            }
        }
    }, [openModal, isAuthenticated]);

    return (
        <Modal isOpen={isModalOpen}
            closeModal={handleClose}>
            {
            modalContent === "login" ? (
                <>
                    <ModalHeader heading="You are not prepared..." paragraph="I bet you thought you could just waltz in here and start using the app. Well, you can't. You need to login first." linkName="Can't login, eh?" linkUrl="/dashboard"/>
                    <LoginForm onLogin={handleLogin}
                        onSignupClick={
                            () => setModalContent("signup")
                        }/>

                </>
            ) : (
                <>
                    <ModalHeader heading="New Here?" paragraph="Create an account to get started." linkName="Already have an account?" linkUrl="/dashboard"/>
                    <SignupForm/>
                    <div className="flex justify-center pt-4">
                        <button onClick={
                                () => setModalContent("login")
                            }
                            // Added button to switch back to login
                            className="bg-black hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-2"
                        >
                            Back to Login
                        </button>
                    </div>
                </>
            )
        } </Modal>
    );
}

export default Login;
