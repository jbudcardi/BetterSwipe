import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'; //Importing useNavigate to help us navigate to the dashboard when the user is logged in/authenticated
import { Container, Row, Col, Card, Form, Button, Nav } from 'react-bootstrap';
import './Login.css';
//Will import axios here for backend communication
import axios from 'axios';

function LoginPage(){
   //create and email and password constant variable
   const navigate = useNavigate();
   const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    // State variables for loading and error handling
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    //Handle the submit of the submit button
    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        //Make a post request to /api/users/login with the user's email and password
        if(!email || !password){
            alert('Both email and password are required');
            return;
        }

        //the link will be adjusted to where this application will be held
        axios.post('http://localhost:5173/api/login/', { 
            username: email,
            password: password
        })
        .then(response => {
           
            setLoading(false);
            console.log('Login successful:', response.data);
            //Redirecting to the dashboard
            navigate('/dashboard');
        })

        .catch(error => {
            setLoading(false);
            setError('Failed to login. Check your credentials .')
            console.error('Login failed:', error);

        });

        //Authentication Login will be Implemented here
    };

    return(
        <Container fluid className="login-page-container d-flex justify-content-center align-items-center">
        <Row className="justify-content-center">
            <Col xs={12} md={12} lg={12} className="login-card-container">
                <Card className="shadow">
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <h2 className="text-center mb-4">Login</h2>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">
                                    Log In
                                </Button>
                            </div>
                        </Form>
                        <Nav.Link href="#" className="mt-2 nav-link-custom" aria-label="Forgot Password">Forgot Password?</Nav.Link>
                        <hr />
                        <div className="text-center">
                            <p>Don't have an account yet? <Nav.Link href="/sign-up"  className="mt-3 nav-link-custom" aria-label="register-link">Register for free</Nav.Link></p>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
            
    );
}

export default LoginPage;