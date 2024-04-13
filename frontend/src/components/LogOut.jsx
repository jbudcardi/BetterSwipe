import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const Logout = ({ onLogout}) => {
    const navigate = useNavigate();

    useEffect(() => {
        //Call the logout function passed as a prop
        onLogout();
        //Redirect to the login page or home page after logging out
        navigate('/');
    }, [onLogout, navigate]);
    //Render nothing or a simple message while the redirect is happening
    return(
        <div>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default Logout;