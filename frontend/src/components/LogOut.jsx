import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();  // Directly use logout from AuthContext

    useEffect(() => {
        logout();  // Call the logout function from AuthContext
        navigate('/');  // Redirect to home after logout
    }, [logout, navigate]);  // Dependency array includes logout and navigate

    // Render nothing or a loading indicator/message
    return (
        <div>Logging out...</div>
    );
};

export default Logout;