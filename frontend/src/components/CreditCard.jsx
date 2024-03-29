import React from "react";
import React, {useState} from "react";

const CreditCard = ({cardType, cardNumber, cardHolder, expiryDate, monthlyRewards}) => {
    const applyHalndler = () => {
        //Placeholder for apply functionality
        console.log("Apply for", cardType);
    };

    const openTermsHandler = () => {
        //PlaceHolder for opeing terms and conditions
        console.log("Terms for", cardType);
    };

    return(
        <div className={'card-container ${cardType.toLowerCase()}'}>
            <div className="card-header">{cardType}</div>
            <div className="card-body">
                <div className="card-number">{cardNumber}</div>
                <div className="card-holder">{cardHolder}</div>
                <div className="expiry-date">{expiryDate}</div>
            </div>
            <div className="card-footer">
                <div className="rewards">Average Monthly Rewards: ${monthlyRewards}</div>
                <button onClick={openTermsHandler} className="terms-btn">Terms and Conditions</button>
                <button onClick={applyHalndler} className="apply-btn">Apply</button>
                </div>
                { /* this text will be changed later*/}
                <p className="lorem-text">Lorem ipsum dolor sit amet...</p>
        </div>

    );
}

export default CreditCard;