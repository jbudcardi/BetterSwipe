import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
//example outlook for the about page
function AboutPage(){
    return(
        <Container className="about-container">
        <Row>
            <Col md={12}>
                <h1 className="about-header">About Us</h1>
                <p className="about-text">
                    Welcome to BetterSwipe, your reliable source for credit card information and recommendations. At BetterSwipe, we are committed to providing you with expert reviews, detailed comparisons, and the latest insights on credit cards that suit your financial needs.
                </p>
                <h2 className="about-header">Our Mission</h2>
                <p className="about-text">
                    Our mission is to empower consumers by offering transparent, accurate, and up-to-date information that helps in making informed decisions about credit cards. Whether you are looking for the best rewards cards, low interest options, or cards that help build credit, we're here to help.
                </p>
                <h2 className="about-header">Our Team</h2>
                <p className="about-text">
                    The BetterSwipe team is made up of financial experts, seasoned journalists, and credit card enthusiasts who are passionate about finance and technology. Our team works diligently to ensure the information we provide is accurate and beneficial to our users.
                </p>
                <h2 className="about-header">Contact Us</h2>
                <p className="about-text">
                    Have questions? Feel free to reach out to us at:
                    <ul className="about-list">
                        <li className="about-contact-item">Email: support@betterswipe.com</li>
                        <li className="about-contact-item">Phone: (123) 456-7890</li>
                        <li className="about-contact-item">Twitter: @BetterSwipe</li>
                    </ul>
                </p>
            </Col>
        </Row>
    </Container>
    );
}

export default AboutPage;
