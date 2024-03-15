import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from './LoginForm';
import AccountCreationForm from './AccountCreationForm';

const Home = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          {showLoginForm ? (
            <>
              <h2>Login</h2>
              <LoginForm />
              <p className="mt-3">Don't have an account? <button onClick={toggleForm}>Sign up here</button></p>
            </>
          ) : (
            <>
              <h2>Create Account</h2>
              <AccountCreationForm />
              <p className="mt-3">Already have an account? <button onClick={toggleForm}>Login here</button></p>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
