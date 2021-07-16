import React from 'react';
import { Route, Redirect } from "react-router";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <Route>
      {
        () => JSON.parse(localStorage.getItem('loggIn')) ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
)}

export default ProtectedRoute; 