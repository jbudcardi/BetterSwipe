import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import './CompareCardPage.css';

function CompareCard(){

    return(
    <div>
        <h1 className="CTC"> Compare Top Cards</h1>
   
    <div className="Card1">
        <h2>Top Card 1</h2>

    </div>
    <div className="Card2">
        <h2>Top Card 2</h2>

    </div>
    <div className="Card3">
        <h2>Top Card 3</h2>

    </div>
    
    </div>
); 

}

export default CompareCard;
