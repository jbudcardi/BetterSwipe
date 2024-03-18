import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import './SignUpPage.css';


function SignUpPage(){

    // State to store input values
    const [userInput, setUserInput] = useState({
        username: '',
        email: '',
        password: '',
    });

    //Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target; //Destructure name and value from event target
        setUserInput({
            ...userInput,
            [name]: value,
        });
    };

    //Handle form submission

    const handleSubmit =  async(e) => {
        e.preventDefault(); //Prevent default form submission behavior
        //This is where we will send the user input to the backend server (using the Django python framework)
        try{
            const response = await axios.post('http://localhost:8000/algorithms/signup', userInput);
            console.log("SignUp successfull: ", response.data);
            //this will redirect to login page
            //This will handle post-signup actions here like redirect to login page
        } catch(error){
            console.error('SignUp error:', error.response ? error.response.data : error);
        }
    };

    return(
        <div className="signup-container">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                {/* <div>
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    id="username"
                    name="username"
                    value={userInput.username}
                    onChange={handleChange} />
                </div> */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={userInput.email}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password </label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={userInput.password}
                    onChange={handleChange}/>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            </div>

    );
}

export default SignUpPage;