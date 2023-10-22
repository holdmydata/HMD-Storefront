import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './auth-context';

const ProtectedRoute = ({ element, ...rest }) => {
    const { authState } = useContext(AuthContext);
    
  return (
    <Route
      {...rest}
      element={authState && authState.isAuthenticated ? element : <Navigate to="/login" />
      }
    />
  );
};

export default ProtectedRoute;