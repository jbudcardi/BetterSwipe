import React, { useState } from 'react';
import { Link} from 'react-router-dom';


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

    const handleSubmit = (e) => {
        e.preventDefault(); //Prevent default form submission behavior
        console.log(userInput); //For now, just log input to the console
        //This is where we will send the user input to the backend server (using the Django python framework)
    };

    return(
        <div className="signup-container">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    id="username"
                    name="username"
                    value={userInput.username}
                    onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    value={userInput.password}
                    onChange={handleChange}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            </div>

    );
}

export default SignUpPage;