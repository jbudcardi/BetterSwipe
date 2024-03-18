import React, {useState} from "react";
import { Link} from 'react-router-dom';
import './NavBar.css';
import logo from '../pages/BetterSwipe Logo.jpg';

//We are creating the functional Component Navigation bar
//This is for the purpose of navigating to different components on our Single-Page- Application

function NavBar(){
   //to make NavBar responsive,(particularily for mobile devices) we are going to use the useState hook
   const [clicked , setClicked] = useState(false);

   const handleClick = () => setClicked(!clicked); //checks to see if we clicked anything
   const closeMobileMenu = () => setClicked(false);  //closes the menu when clicking
    return(
        <nav className="navbar">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                <img src={logo} alt="BetterSwipe Logo" />
                {/*The src attribute specifies the URL of an image*/}
                BetterSwipe
            </Link>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                <li><Link to="/" className="nav-links" onClick={closeMobileMenu}>Home</Link></li>
                <li><Link to="/about"className="nav-links" onClick={closeMobileMenu} >About</Link></li>
                <li><Link to="/dashboard"className="nav-links dashboard-link" onClick={closeMobileMenu}>DashBoard</Link></li>
                <li> <Link to="/Login"className="nav-links" onClick={closeMobileMenu}>Login</Link> </li>
                {/*this is where other potential navigation items will be present*/}
            </ul>
        
        </nav>

    );
}
export default NavBar;  //we export this component so that it can be used in App.js or any other file