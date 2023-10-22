import { useState } from 'react';
import loginFields from '../constants/formFields';
import ModalInput from "./ModalInput";
import { gql, useMutation } from '@apollo/client';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
    }
  }
`;

export default function SignupForm() {
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION);
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ variables: { ...signupState } });
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {
          fields.map(field =>
            <ModalInput
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
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
      <button type="submit" className="bg-black hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-2">Sign Up</button>
      {loading && <p>Loading...</p>}
      {data && <p>Signup successful!</p>}
      {error && <p>Error signing up: {error.message}</p>}
    </form>
  );
}