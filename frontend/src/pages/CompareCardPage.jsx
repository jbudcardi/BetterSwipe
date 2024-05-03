import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import './CompareCardPage.css';

function CompareCard(){

    const [cards, setCards] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/algorithms/userstopcards/${userId}/`) //this will be changed to the correct path for top cards
            .then(response => {
                setCards(response.data.Cards); // Make sure the backend sends an array of card data
            })
            .catch(error => {
                console.error('Failed to fetch card data:', error);
            });
    }, [userId]);

    return(

        <div>
        <h1 className="CTC">Compare Top Cards</h1>
        <div className="Row">
            {cards.map((card, index) => (
                <div key={index} className={`Card${index + 1}`}>
                    <h2>{`Top Card ${index + 1}`}</h2>
                    <p>{card.Name}</p>
                    <div className="btn-group">
                        <a href={card.Website} target="_blank" rel="noopener noreferrer">
                            <button>Terms & Conditions</button>
                        </a>
                        <button onClick={() => window.open(card.Website)}>Apply now</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
    
); 

{/*<div>
        <h1 className="CTC"> Compare Top Cards</h1>
    <div className="Row">
        
       <div className="Card1">
        <h2>Top Card 1</h2>
        <div className="btn-group">
        <button>Terms & Conditions</button>
        <button>Apply now</button>
        </div>
    </div>

    <div className="Card2">
        <h2>Top Card 2</h2>
        <div className="btn-group">
        <button>Terms & Conditions</button>
        <button>Apply now</button>
        </div>
    </div>

    <div className="Card3">
        <h2>Top Card 3</h2>
        <div className="btn-group">
        <button>Terms & Conditions</button>
        <button>Apply now</button>
        </div>
    </div>
    </div>
    </div>*/}

}

export default CompareCard;
