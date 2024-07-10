import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const PrivateAdminRoute = ({ element: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);
  const user = auth ? JSON.parse(atob(auth.split('.')[1])) : null;

  return (
    <Route
      {...rest}
      element={auth && user.is_admin ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateAdminRoute;
