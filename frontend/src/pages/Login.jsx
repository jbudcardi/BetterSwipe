import React, {useState} from 'react';
import './Login.css';
//Will import axios here for backend communication

function LoginPage(){
   //create and email and password constant variable
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    //Handle the submit of the submit button
    const handleSubmit = e => {
        e.preventDefault();

        //Authentication Login will be Implemented here
    }

    return(
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                {/* Inputing the usage of a password just like the email above*/}
                <input
                type='password'
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Log In</button>
                
            </form>
        </div>
            
    );
}

export default LoginPage;