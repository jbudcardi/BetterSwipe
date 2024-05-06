import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from '../pages/BetterSwipe Logo.jpg';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';


//We are creating the functional Component Navigation bar
//This is for the purpose of navigating to different components on our Single-Page- Application

function NavBar(){

  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Assuming logout is your onLogout function

  const handleLogout = () => {
    logout(); // Perform logout action defined in AuthContext or parent component
    navigate('/'); // Redirect to the home page after logging out
  };

  console.log('Authentication Status:', isAuthenticated); // Debugging


    return (
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img src={logo} alt="BetterSwipe Logo" style={{ height: '40px', borderRadius: '50%' }} />
              BetterSwipe
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                {/* Conditional render of the dasshboard due to authenticaiton status of the user */}
                
                {isAuthenticated &&<Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
                {isAuthenticated ? (
                <Nav.Link as={Link} to="/logout" onClick={() => {handleLogout}}>Logout</Nav.Link>
                ) : (
                  <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/sign-up">Sign Up</Nav.Link>
              </>
                )}
              
	    	{/*<Nav.Link as={Link} to="/test">Test</Nav.Link>*/}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}
export default NavBar;  //we export this component so that it can be used in App.js or any other file
