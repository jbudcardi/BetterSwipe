import { useState } from 'react';
import sha256 from 'sha256';

const users = [];

const createUser = (email, password) => {
  const newUser = { id: users.length + 1, email, password: sha256(password) };
  users.push(newUser);
  return newUser;
};

const createConnection = () => {
  return users;
};

const createTable = (conn) => {
  // No action needed, as we're using an in-memory array
};

const validateEmail = (email) => {
  const regex = /^[^@]+@[^@]+\.[^@]+$/;
  return regex.test(email);
};

const validatePassword = (password) => {
  const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{10,}$/;
  return regex.test(password);
};

const register = (email, password) => {
  if (validateEmail(email) && validatePassword(password)) {
    const newUser = createUser(email, password);
    return newUser;
  }
  return null;
};

const login = (email, password) => {
  const conn = createConnection();
  const user = conn.find((user) => user.email === email);
  if (user) {
    if (user.password === sha256(password)) {
      return user;
    }
  }
  return null;
};

const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignInActive, setIsSignInActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsSignInActive(event.target.value.length > 0 && password.length > 0);
    setErrorMessage('');
    setAttempts(0);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsSignInActive(email.length > 0 && event.target.value.length > 0);
    setErrorMessage('');
    setAttempts(0);
  };

  const registerUser = () => {
    register(email, password);
    setEmail('');
    setPassword('');
  };

  const signInUser = () => {
    const user = login(email, password);
    if (user) {
      setEmail('');
      setPassword('');
      setIsSignInActive(false);
    } else {
      setAttempts((prevAttempts) => prevAttempts + 1);
      if (attempts === 1) {
        setErrorMessage('Incorrect input on Email Address and/or Password. The last attempt before your account will be locked out.');
      } else if (attempts === 2) {
        setErrorMessage('Incorrect input on Email Address and/or Password. Your account is temporarily locked out.');
        // Add code here to lock the user's account
      }
    }
  };

  return {
    email,
    password,
    isSignInActive,
    errorMessage,
    attempts,
    handleEmailChange,
    handlePasswordChange,
    registerUser,
    signInUser,
  };
};
