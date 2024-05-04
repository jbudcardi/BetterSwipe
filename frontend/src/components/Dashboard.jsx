import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import CardRecommendations from './CardRecommendations';  // Adjust the path as necessary based on the project structure
import "./Dashboard.css";


const Dashboard = ({ userId }) => {
    //fuction to useNavigate to the uploadPage
    const navigate = useNavigate();
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); //Default to current month

    const [spendingData, setSpendingData] = useState({
	type: 'doughnut',
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

    var APIcall = (month = selectedMonth) => {
        // axios.get(`http://localhost:8000/algorithms/dashboard/${userId}/`)
        axios.post(`http://127.0.0.1:8000/algorithms/dashboard/`, { "userId" : userId, "month": month } )
            .then(response => {
                // testing with the latest month for display
                // const latestSummary = response.data[response.data.length - 1];
                const latestSummary = response.data;
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
    };


    useEffect(APIcall, [userId]);

    const handleMonthChange = (event) =>{
        setSelectedMonth(event.target.value);
        APIcall(event.target.value);
    }
    const options = {
	    responsive: true,
	    legend: {
		position: 'bottom',
	    },
	    plugins: {
		    labels: {
			    render: 'percentage',
			    fontColor: ['black'],
			    precision: 1
		    }
	    },

        /*
	    scales: {
            y: { // Corrected scale configuration
              beginAtZero: true,
            },
          },
	*/

    }
    
    return (
     
        <div style={{ width: '600px', height: '400px', margin: '100px auto' }}>
            <h2 className='MSS'>Monthly Spending Summary</h2>

            <div className="month-selector">
                <label htmlFor="month-select">Select a Month:</label>
                <select
                    id="month-select"
                    className="form-control"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })} - {i + 1}
                        </option>
                    ))}
                </select>
            </div>
         

            <Doughnut data={spendingData} options={options} />

            <h1 className='DB'> Main Dashboard</h1>

            <div className= 'UPbtn'>
            <button onClick={() => {navigate("/UploadPage")}}>Upload Statments</button>
            </div>

            <div className='CR'>
            <CardRecommendations userId={userId} />
            </div>

            <div className='CCbtn'>
                <button onClick={() => {navigate("/CardCompare")}}>Compare Cards</button>
            </div>
           

        </div>
        
       
    );
};
export default Dashboard;
