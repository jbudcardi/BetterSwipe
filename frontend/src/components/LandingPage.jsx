import React from 'react';
import NavBar from './NavBar';
import { Link} from 'react-router-dom';
import SignUpPage from '../pages/SignUpPage';
import {Button, Container, Row, Col } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import './LandingPage.css';
import backgroundImage from '../images/betterSwipe.png';


//this will be where the hero page will go

function LandingPage(){
    return(
        <Container fluid className="landing-page" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/*<NavBar />*/} {/* Location of the NavBar component*/}
            <Row className="hero-section justify-content-center align-items-center text-center">
                <Col xs={12} md={8}>
                <h1>Swipe Smarter, earn better {/* This slogan is subject to change*/}</h1>
                <p>You can say goodbye to the complexities of choosing the right credit card.</p>
                <div className="hero-cta-buttons">
                    <LinkContainer to="/login">
                    <Button variant="primary" className="me-2">Login</Button>
                    </LinkContainer>

                    {/* This is where the sign up page will be*/}
                    <LinkContainer to="/sign-up">
                    <Button variant="outline-primary">Sign Up</Button>    
                    </LinkContainer> 
                </div>
                </Col>
                {/* This is where the Hero image will be*/}
            </Row>
        </Container>

    );

}

export default LandingPage;