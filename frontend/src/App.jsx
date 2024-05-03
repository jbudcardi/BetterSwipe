import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; //might delete this if it causes any problems

import './App.css'
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Dashboard from './components/Dashboard';
import LoginPage from './pages/Login';
import LandingPage from './components/LandingPage';
import SignUpPage from './pages/SignUpPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './components/LogOut';
import Test from './pages/Test';
import UploadPage from './pages/UploadPage';
import CompareCardPage from './pages/CompareCardPage'


function App() {
  //const [count, setCount] = useState(0)
  const [userId, setUserId] = useState(0);

  return (
    <AuthProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<Dashboard userId={userId} />} />
        <Route path="/login" element={<LoginPage setId={setUserId} />} />
        <Route path="/logout" element={<Logout />} /> 
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/UploadPage" element={<UploadPage />} />
        <Route path="/CompareCardPage" element={<CompareCardPage />} />
	<Route path="/test" element={<Test />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App
