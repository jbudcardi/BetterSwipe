import React from 'react';
import NavBar from './NavBar';
import { Link} from 'react-router-dom';
//this will be where the hero page will go

function LandingPage(){
    return(
        <div className="landing-page">
            <NavBar /> {/* Location of the NavBar component*/}
            <section className="hero-section">
                <h1>Swipe Smarter, earn better {/* This slogan is subject to change*/}</h1>
                <p>You can say goodbye to the complexities of choosing the right credit card.</p>
                <div className="hero-cta-buttons">
                    <Link to="/login" className="login-container">Login</Link>
                    {/* This is where the sign up page will be*/}
                </div>
                {/* This is where the Hero image will be*/}
            </section>
        </div>

    );

}

export default LandingPage;