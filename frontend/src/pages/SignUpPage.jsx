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
        <main class="row m-auto shadow bg-white px-0 rounded-3" >
        <div class="col px-0">
        //this has to get changed to go back to the landing page
        <a href="../pages/registraction.html"><i class="fa-soild.fa-xmark">X</i></a>
      <form 
      action="confirmRegistration.html" 
      class="row g-3 needs-validation" 
      novalidate>
  
      <h2 class="text-center mb-5">Sign up Now</h2>
      //Create form username and password
      <div class="d-flex p-0">
        <i class="fa-solid fa-user"></i><input type="text" class="form-control" placeholder="First Name" required/>
      </div>
      <div class="d-flex p-0">
        <i class="fa-solid fa-user"></i><input type="text" class="form-control" placeholder="Last Name" required/>
      </div>
      <div class="d-flex p-0">
        <i class="fa-solid fa-phone"></i><input type="phone number" class="form-control" placeholder="Phone Number" required/>
      </div>
      <div class="d-flex p-0">
        <i class="fa-solid fa-envelope"></i><input type="email" class="form-control" placeholder="Email" required/>
      </div>
      <div class="d-flex p-0">
        <i class="fa-solid fa-key"></i><input type="password" class="form-control" placeholder="Password" required/>
      </div>
      <div class="d-flex p-0">
        <i class="fa-solid fa-key"></i><input type="password" class="form-control" placeholder="Confirm Password" required/>
      </div>

      //Creating form Sign up and sign in buttons
      <div class="d-flex p-0">
        <div class="col text-center">
          <button class="btn btn-primary px-3 w-100" type="Submit">Register</button>
        </div>
      </div>
        <div class="d-flex p-0">
          <div class="col-5">
            <hr/>
          </div>
          <div class="col-2 text-center">
            <small class="text-secondary">or</small>
            </div>
            <div class="col-5">
              <hr/>
          </div>
        </div>
      <div class="d-flex p-0">
        <div class="col text-center">
          <a href="#" class="col text-center">
            <button class="btn btn-dark px-3 w-100" type="Submit">Sign-in</button>
          </a>
         </div> 
        </div>
        </form>
      </div>
      </main>
    );
}

export default SignUpPage;