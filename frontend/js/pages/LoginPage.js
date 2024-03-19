import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginUser } from '../store/userSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError('Please enter both email and password.');
      return;
    }
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        // Reset form fields after submission
        setEmail('');
        setPassword('');
        navigate('/recipes');
      })
      .catch((error) => {
        // Set form error if login failed
        setFormError(error?.message || 'Login failed');
      });
  };

  return (
    <Col md={6}>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        {formError && <Alert className='mt-1' style={{ color: 'red' }}>{formError}</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button className='mt-1' variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <p className="mt-3">Don't have an account? <button onClick={() => navigate('/signup')}>Sign up here</button></p>
    </Col>
  );
};

export default LoginPage;
