import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const SpendingCharts = ({ userId }) => {
    const [spendingData30, setSpendingData30] = useState({ categories: [], amounts: [] });
    const [spendingData180, setSpendingData180] = useState({ categories: [], amounts: [] });

    useEffect(() => {
        const fetchData = async (days, setData) => {
            try {
                const response = await axios.get(`http://localhost:8000/api/spending-data/${userId}/${days}/`);
                const categories = [];
                const amounts = [];
                response.data.forEach(item => {
                    categories.push(item.spending_category);
                    amounts.push(item.amount);
                });
                setData({ categories, amounts });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(30, setSpendingData30);
        fetchData(180, setSpendingData180);
    }, [userId]);

    const createPieData = (labels, data) => ({
        labels,
        datasets: [{
            data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0']
        }]
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <div>
                <h3>Pie Chart - Last 30 Days</h3>
                <Pie data={createPieData(spendingData30.categories, spendingData30.amounts)} />
            </div>
            <div>
                <h3>Pie Chart - Last 180 Days</h3>
                <Pie data={createPieData(spendingData180.categories, spendingData180.amounts)} />
            </div>
        </div>
    );
};

export default SpendingCharts;
