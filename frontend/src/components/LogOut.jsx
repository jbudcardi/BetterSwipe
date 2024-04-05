import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const Logout = ({ onLogout}) => {
    const navigate = useNavigate();

    useEffect(() => {
        //Call the logout function passed as a prop
        onLogout();
        //Redirect to the login page or home page after logging out
        navigate('/login');
    }, [onLogout, navigate]);
    //Render nothing or a simple message while the redirect is happening
    return null;
};

export default Logout;