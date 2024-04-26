import React, { useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { useNavigate,Link} from 'react-router-dom';
import './SignUpPage.css';
import Validation from './SignUpValidation';
import axios from 'axios';


function SignUpPage(){

    // State to store input values
    const [userInput, setUserInput] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const[errors, setErrors] = useState({});
    const handleInput = (e) => {
        const {name, value} = e.target; //destructing for easier access
        setUserInput(prev => ({...prev, [name]: value}));
    }

    //Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); //Prevent default form submission behavior
        const newErrors = Validation(userInput);
        setErrors(newErrors); //For now, just log input to the console
        // Check if there are any errors

   
        // Check if there are no errors
    if (Object.keys(newErrors).length === 0) {
        // Define the API endpoint
        const apiEndpoint = 'http://localhost:8000/algorithms/register/'; //This will change based on the path of the api endpoint
        
        // Ensuring that we are sending the correct data format to the backend
        const userData = {
            username: userInput.email, // Assuming username is the email
            firstName: userInput.firstName,
            lastName: userInput.lastName,
            email: userInput.email,
            password: userInput.password,
            // Ensure backend handles password confirmation logic or handle it here
        };
        // Send a POST request to the server with the userInput data
        axios.post(apiEndpoint, userInput)
            .then((response) => {
                // Handle success
                console.log('Registration successful:', response.data);
                // Here, you might want to redirect the user to the login page
                navigate('/test'); // Navigate to the test page for now
                // or a success page
            })
            .catch((error) => {
                // Handle errors
                console.error('Registration error:', error.response.data);
                // You could set form errors based on the response if you have error handling set up in your backend
                setErrors({ ...errors, form: 'Registration failed. Please try again.' });
            });
    }
        //This is where we will send the user input to the backend server (using the Django python framework)
    };

    return(
        <Container className="signup-container">
            <Col xs={12} md={12} lg={12} className="signup-container">
           <Card className="shadow">
            <Card.Body>
            <Form action='' onSubmit={handleSubmit}>
                 <h2 className='text-center mb-4'>Sign up</h2>

                <Form.Group className="mb-3">
                    <label htmlFor="firstName">First Name</label>
                    <input
                    type="text"
                    placeholder="First Name"
                    id="firstName"
                    name="firstName"
                    value={userInput.firstName}
                    onChange={handleInput} className='form-control round-0'/>
                    {errors.firstName && <span className='text-danger'>{errors.firstName}</span>}
                    </Form.Group>

                <Form.Group className="mb-3">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                    type="lastName"
                    placeholder='Last Name'
                    id="lastName"
                    name="lastName"
                    value={userInput.lastName}
                    onChange={handleInput} className='form-control round-0'/>
                    {errors.lastName && <span className='text-danger'>{errors.lastName}</span>}
                  
                </Form.Group>
                <Form.Group className="mb-3">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                    type="phoneNumber"
                    placeholder='Phone'
                    id="phoneNumber"
                    name="phoneNumber"
                    value={userInput.phoneNumber}
                    onChange={handleInput} className='form-control round-0'/>
                    {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    placeholder='Email'
                    id="email"
                    name="email"
                    value={userInput.email}
                    onChange={handleInput} className='form-control round-0'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    placeholder='**********'
                    id="password"
                    name="password"
                    value={userInput.password}
                    onChange={handleInput} className='form-control round-0'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                    type="password"
                    placeholder='********** '
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userInput.confirmPassword}
                    onChange={handleInput} className='form-control round-0'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                    
                </Form.Group>
                <button type="submit" className='btn btn-default border w-100 bg-light rounded-0 text-deconration-none'  >Sign Up</button>
                 <Link to ='/login' className='btn btn-default border w-100 bg-light rounded-0 text-deconration-none'>Already have an account? Sign in here </Link>
                </Form>
                 </Card.Body>
                </Card>
            </Col>
        </Container>
    );
}
export default SignUpPage;