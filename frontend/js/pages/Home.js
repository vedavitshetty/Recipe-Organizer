import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import AccountCreationForm from './AccountCreationForm';
import LoginForm from './LoginForm';

const Home = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          {isAuthenticated ? (
            <div>
              {/* TODO: Render authenticated content here */}
            </div>
          ) : (
            <div>
              <h2>Login</h2>
              <LoginForm />
              <p className="mt-3">Don't have an account? Sign up below:</p>
              <AccountCreationForm />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
