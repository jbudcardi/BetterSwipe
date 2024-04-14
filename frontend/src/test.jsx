import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav } from 'react-bootstrap';
import axios from 'axios';
import { Link} from 'react-router-dom';
import './pages/Login.css';

function test() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/algorithms/test/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Container className="Test">
	  <Row>
	  	<Col md={12}>
	  		<h1 className="test-header">This is a test</h1>
	  		<p className="test-message">{message}</p>
	  	</Col>
	  </Row>
    </Container>
      
     /*<div>
      <h1>This is a test</h1>
      <p>{message}</p>
    </div> */	
  );
}

export default test;
