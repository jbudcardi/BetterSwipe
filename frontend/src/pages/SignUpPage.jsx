import React, { useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { Link} from 'react-router-dom';


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
        <Container className="signup-container">
            <Col xs={12} md={12} lg={12} className="signup-container">
           <Card className="shadow">
            <Card.Body>
            <Form onSubmit={handleSubmit}>
                 <h2 className='text-center mb-4'>Sign up</h2>
                <Form.Group className="mb-3">
                    <label htmlFor="firstName">First Name</label>
                    <input
                    type="text"
                    placeholder="First Name"
                    id="firstName"
                    name="firstName"
                    value={userInput.firstName}
                    onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                    type="lastName"
                    placeholder='Last Name'
                    id="lastName"
                    name="lastName"
                    value={userInput.lastName}
                    onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                    type="phoneNumber"
                    placeholder='Phone'
                    id="phoneNumber"
                    name="phoneNumber"
                    value={userInput.phoneNumber}
                    onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    placeholder='Email'
                    id="email"
                    name="email"
                    value={userInput.email}
                    onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    placeholder='**********'
                    id="password"
                    name="password"
                    value={userInput.password}
                    onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                    type="confirmPassword"
                    placeholder='********** '
                    id="password"
                    name="confirmPassword"
                    value={userInput.password}
                    onChange={handleChange}
                    />
                </Form.Group>
                <button type="submit">Sign Up</button>
                 <button>Already have an account? Sign in here </button>
                </Form>
                 </Card.Body>
                </Card>
            </Col>
        </Container>

    );
}

export default SignUpPage;