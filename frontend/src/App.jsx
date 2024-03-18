import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DashBoard from './pages/DashBoard';
import LoginPage from './pages/Login';
import LandingPage from './components/LandingPage';
import SignUpPage from './pages/SignUpPage';
import axios from 'axios';


function App() {
  //const [count, setCount] = useState(0);
  
  
  const [message, setMessage] = useState('');
  /*
  useEffect(() => {
    axios.get('http://localhost:8000/algorithms/')
      .then(response => {setMessage(response.data.message);})
      .catch(error => {console.log(error);});
  }, []);

  useEffect(() => {
    axios.post('http://localhost:8000/algorithms/',{pk: 2, username: "myusername2",
        last_name:"Last2", first_name:"First2",email:"test2@web.com",password:"currentlyUnsecure2"})
      .then(response => {setMessage(response.data.message);})
      .catch(error => {console.log(error);});
  }, []);
  */
  //('pk', 'username', 'last_name', 'first_name', 'email', 'password')


  return (
    <div>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    <p>{message}</p>
    </div>
  );
}

export default App
