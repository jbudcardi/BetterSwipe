import React, { useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { useNavigate,Link} from 'react-router-dom';
import './SignUpPage.css';
import Validation from './SignUpValidation';
import axios from 'axios';


function SignUpPage(){

    // State to store input values
    // From django serializer: fields = ['id', 'username', 'email', 'password', 'confirm_password', 'first_name', 'last_name']
    const [userInput, setUserInput] = useState({
        username: '',
        first_name: '',
        last_name: '',
        //phoneNumber: '',
        email: '',
        password: '',
        confirm_password: '',
    });
    const[errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (e) => {
        const {name, value} = e.target; //destructing for easier access
        setUserInput(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = Validation(userInput);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            axios.post('http://localhost:8000/algorithms/signup/', userInput, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                navigate('/dashboard'); // Or '/login' if you prefer they log in manually first
            }).catch(error => {
                const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
                setErrors(prevErrors => ({ ...prevErrors, form: errorMessage }));
            });
        }
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
                {/*<Form.Group className="mb-3">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                    type="phoneNumber"
                    placeholder='Phone'
                    id="phoneNumber"
                    name="phoneNumber"
                    value={userInput.phoneNumber}
                    onChange={handleInput} className='form-control round-0'/>
                    {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber}</span>}
    </Form.Group>*/}
                <Form.Group className="mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                    type="username"
                    placeholder='Username'
                    id="username"
                    name="username"
                    value={userInput.username}
                    onChange={handleInput} className='form-control round-0'/>
                    {errors.username && <span className='text-danger'>{errors.username}</span>}
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
                <button onClick={handleSubmit} type="submit" className='btn btn-default border w-100 bg-light rounded-0 text-deconration-none'  >Sign Up</button>
                 <Link to ='/login' className='btn btn-default border w-100 bg-light rounded-0 text-deconration-none'>Already have an account? Sign in here </Link>
                </Form>
                 </Card.Body>
                </Card>
            </Col>
        </Container>
    );

}
export default SignUpPage;