import React, {useState} from "react";
import { Link} from 'react-router-dom';
import './NavBar.css';

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
                MyApp
            </Link>
            <div className="menu-icon" onClick-={handleClick}>
                <i className={clicked ? 'fas fa-times' :  'fas fa-bars'}></i>
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                <li><Link to="/" className="nav-links" onClick={closeMobileMenu}>Home</Link></li>
                <li><Link to="/about"className="nav-links" onClick={closeMobileMenu} >About</Link></li>
                {/*this is where other potential navigation items will be present*/}
            </ul>
        
        </nav>

    );
}
export default NavBar;  //we export this component so that it can be used in App.js or any other file