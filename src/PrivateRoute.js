import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * A custom route component that redirects to the login page if the user is not authenticated.
 * @param {Object} props - The component props.
 * @param {Object} props.element - The element to render if the user is authenticated.
 * @returns {JSX.Element} The private route component.
 */
const PrivateRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem('token') !== null;

    if (!isAuthenticated) {
        alert('You need to log in first!');
        return <Navigate to="/login" />;
    }

    return element;
};

export default PrivateRoute;