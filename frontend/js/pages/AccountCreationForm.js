import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { createUser } from '../store/userSlice';

const AccountCreationForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [restaurantName, setRestaurantName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser({ email, password, restaurantName }));
    // Reset form fields after submission
    setEmail('');
    setPassword('');
    setRestaurantName('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicRestaurant">
        <Form.Label>Restaurant Name</Form.Label>
        <Form.Control type="text" placeholder="Enter restaurant name" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} />
      </Form.Group>

      <Button className='mt-1' variant="primary" type="submit">
        Create Account
      </Button>
    </Form>
  );
};

export default AccountCreationForm;
