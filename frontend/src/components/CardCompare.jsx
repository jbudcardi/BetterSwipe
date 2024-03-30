import React from "react";
import CreditCard from './CreditCard';
import React, {useEffect, useState} from "react";

const CardCompare = () =>{
    //this will later handle the calls to 
   const [cardData, setCardData] = useState([]);

    return(

        <div className="container mt-5">
            <div className="row">
            {cardDate.map((card, index) => (<crediCard key={index} {...card} />))}
            </div>
        </div>

    );
};

export default CardCompare;