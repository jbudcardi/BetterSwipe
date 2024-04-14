import React, {useState} from "react";
import { Link} from 'react-router-dom';
import './NavBar.css';
import logo from '../pages/BetterSwipe Logo.jpg';
import { Navbar, Nav, Container} from 'react-bootstrap';
import Logout from "./LogOut";

//We are creating the functional Component Navigation bar
//This is for the purpose of navigating to different components on our Single-Page- Application
const isAuthenticated = true; // This will be used in future development when we have user authentication implemented 
function NavBar(){
  const[isAuthenticated, setIsAuthenticated] = useState(false);
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
                
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
	    	<Nav.Link as={Link} to="/test">Test</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}
export default NavBar;  //we export this component so that it can be used in App.js or any other file
