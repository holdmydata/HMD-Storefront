import { useState } from 'react';
import loginFields from '../constants/formFields';
import ModalInput from "./ModalInput";

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function LoginForm({ onLogin, onSignupClick }) {
    const [loginState, setLoginState] = useState(fieldsState);

    const handleChange = (e) => {
      setLoginState({ ...loginState, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginState.username, loginState.password)
        onLogin(loginState.username, loginState.password);
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <ModalInput
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )
                }
            </div>
            <button type="submit" className="bg-black hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-2">Login</button>
            <button onClick={onSignupClick} className="bg-black hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-2">Sign Up</button>
        </form>
    )
}