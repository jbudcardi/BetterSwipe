import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ userId }) => {
    //fuction to useNavigate to the uploadPage
    const navigate = useNavigate();

    const [spendingData, setSpendingData] = useState({
        labels: ['Travel', 'Dining', 'Grocery', 'Gas', 'Entertainment', 'Other'],
        datasets: [{
            label: 'Monthly Spending',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/spending-summary/${userId}/`)
            .then(response => {
                // testing with the latest month for display
                const latestSummary = response.data[response.data.length - 1];
                setSpendingData(prevData => ({
                    ...prevData,
                    datasets: [{
                        ...prevData.datasets[0],
                        data: [
                            latestSummary.travel_amount,
                            latestSummary.dining_amount,
                            latestSummary.grocery_amount,
                            latestSummary.gas_amount,
                            latestSummary.entertainment_amount,
                            latestSummary.other_amount
                        ]
                    }]
                }));
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, [userId]);

    const options = {
        scales: {
            y: { // Corrected scale configuration
              beginAtZero: true,
            },
          },
          responsive: true,
    }

    return (
        <div style={{ width: '600px', height: '400px', margin: '50px auto' }}>
            <h2>Monthly Spending Summary</h2>
            <Bar data={spendingData} options={options} />
            <div>
            <button onClick={() => {navigate("/UploadPage")}}>Upload Statments</button>
            </div>
        </div>
    );
};

export default Dashboard;
