import { useState } from 'react'
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
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './components/LogOut';



function App() {
  //const [count, setCount] = useState(0)

  return (
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
  );
}

export default App
