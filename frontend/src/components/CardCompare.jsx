import React from "react";
import CreditCard from './CreditCard';
import React, {useEffect, useState} from "react";
import './CardCompare.css';

const CardCompare = () =>{
    //this will later handle the calls to 
   const [cardData, setCardData] = useState([]);
   useEffect(() => {
    // Placeholder for fetching data from the backend
    fetch('/api/cards/top') // Example API endpoint
        .then(response => response.json())
        .then(data => setCardData(data))
        .catch(error => console.error('Error fetching card data:', error));
}, []);

    return(

        <div className="container mt-5">
            <div className="row">
            {cardData.map((card, index) => (<crediCard key={index} {...card} />))}
            </div>
        </div>

    );
};

export default CardCompare;