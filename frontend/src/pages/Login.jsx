import React, {useState} from 'react';
import { Container, Row, Col, Card, Form, Button, Nav } from 'react-bootstrap';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import validateLogin from './validateLogin'; 
import axios from 'axios';
//Will import axios here for backend communication

function LoginPage(){
   //create and email and password constant variable
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    };
    //Handle the submit of the submit button
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateLogin(inputs);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // No validation errors, proceed with login
            axios.post('http://localhost:8000/algorithms/api/login/', {
                username: inputs.email,
                password: inputs.password
            })
            .then(response => {
                // Login successful
                navigate('/dashboard'); // Redirect to the dashboard
            })
            .catch(error => {
                // Handle login error (e.g., incorrect credentials)
                setErrors({ ...errors, form: 'Failed to login. Check your credentials.' });
            });
        }
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
                                    name="email"
                                    value={inputs.email}
                                    onChange={handleInputChange}
                                />
                                {errors.email && <p className='text-danger'>{errors.email}</p>}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={inputs.password}
                                    onChange={handleInputChange}
                                />
                                {errors.email && <p className='text-danger'>{errors.email}</p>}
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