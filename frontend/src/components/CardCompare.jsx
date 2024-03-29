import React from "react";
import CreditCard from './CreditCard';

const CardCompare = () =>{
    //this will later handle the calls to 
    const cardDate = [
        {cardType: 'Card One', cardNumber: "3455 4562 7710 3507", cardHolder: "John Doe", expiryDate: "02/2027", monthlyRewards: "$50"},
        {cardType: 'Card Two', cardNumber: " 3455 6688 7788 4321", cardHolder: "John Doe", expiryDate: "05/2030", monthlyRewards: "$67"},
        {cardType: 'Card Three', cardNumber: "7056 5713 5723 0795", cardHolder: "John Doe", expiryDate: "03/2027", monthly}
    ]

    return(

        <div className="container mt-5">
            <div className="row">
            {cardDate.map((card, index) => (<crediCard key={index} {...card} />))}
            </div>
        </div>

    );
};

export default CardCompare;