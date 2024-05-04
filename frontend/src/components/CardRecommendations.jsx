import React, { useState, useEffect, useCallback} from 'react';
import axios from 'axios';



const CardRecommendations = ({ userId }) => {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRecommendations = useCallback(async () => {
        if (!userId) return; // If no userId, do not fetch

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:8000/algorithms/userstopcards/${userId}/`); //may change based on the location of the API endpoint
            setCards(response.data); // Assuming the API returns an array of card objects
        } catch (err) {
            setError(`Failed to fetch recommendations: ${err.response?.data?.message || err.message}`);
            console.error('Error fetching card recommendations:', err);
        }

        setIsLoading(false);
    }, [userId]);

    useEffect(() => {
        fetchRecommendations();
    }, [fetchRecommendations]);

    if (isLoading) {
        return <p>Loading recommendations...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="recommendations-container">
        <h2>Your Recommended Cards</h2>
        {isLoading && <p>Loading recommendations...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && cards.length === 0 && (
            <p>No recommendations available. Consider updating your spending data.</p>
        )}
        <div className="card-list">
            {cards['Cards'].map((card, index) => (
                <div className="card" key={card.id} card_index={index}>
                    <div className="card-header">
                        <h3>{card.Name}</h3>
                        <img src={card.ImageURL} alt={`${card.Name} Card`} />
                    </div>
                    <div className="card-body">
                        <p>Issuer: {card.Issuer}</p>
                        <p>Website: {card.Website}</p>
                        <p>Credit Score: {card.CreditScore}</p>
                        <p>Annual Fee: {card.AnnualFee}</p>
                        <p>Reward Type: {card.RewardType}</p>
                        <p>Travel: {card.TravelReward}</p>
                        <p>Dining: {card.DiningReward}</p>
                        <p>Grocery: {card.GroceryReward}</p>
                        <p>Shopping: {card.ShoppingReward}</p>
                        <p>Gas: {card.GasReward}</p>
                        <p>Entertainment: {card.EntertainmentReward}</p>
                        <p>Other: {card.OtherReward}</p>
                        {/* ...other card details... */}
                    </div>
                    <div className="card-footer">
                        <button className="apply-btn">Apply</button>
                        <p>{card.terms}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

export default CardRecommendations;

