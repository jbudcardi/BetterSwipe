import React, {useState} from 'react';
import { Container, Row, Col, Card, Form, Button, Nav } from 'react-bootstrap';
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
        <Container fluid className="login-page-container d-flex justify-content-center align-items-center">
        <Row className="justify-content-center">
            <Col xs={12} md={6} lg={4}>
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
                        <Nav.Link href="#" className="mt-2" aria-label="Forgot Password">Forgot Password?</Nav.Link>
                        <hr />
                        <div className="text-center">
                            <p>Don't have an account yet? <Nav.Link href="/register" aria-label="Register for free">Register for free</Nav.Link></p>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
            
    );
}

export default LoginPage;