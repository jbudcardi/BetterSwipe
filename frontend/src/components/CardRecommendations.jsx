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

        // month = new Date().getMonth() + 1;
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
                        <h5>{card.Name}</h5>
                        <img src={card.ImageURL} alt={`${card.Name} Card`} width="200" />
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

export default CardRecommendations;

