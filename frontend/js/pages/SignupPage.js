import React, { useEffect, useState } from 'react';
import { Form, Button, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchRestaurants } from '../store/restaurantSlice';
import { createUser } from '../store/userSlice';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [restaurantOption, setRestaurantOption] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [newRestaurantName, setNewRestaurantName] = useState('');
  const [formError, setFormError] = useState('');
  const existingRestaurants = useSelector((state) => state.restaurantSlice.restaurants);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const clearFormFields = () => {
    setEmail('');
    setPassword('');
    setSelectedRestaurant('');
    setNewRestaurantName('');
    setRestaurantOption('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !selectedRestaurant || (selectedRestaurant === 'new' && !newRestaurantName.trim())) {
      setFormError('Please provide all required information.');
      return;
    }

    let formData = { email, password };

    if (selectedRestaurant === 'new') {
      formData.restaurant = { name: newRestaurantName.trim() };
    } else {
      formData.restaurant = { id: selectedRestaurant };
    }

    dispatch(createUser(formData))
      .unwrap()
      .then(() => {
        // Clear form fields and redirect to login upon successful account creation
        clearFormFields();
        navigate('/login');
      })
      .catch((error) => {
        // Set form error if account creation failed
        const errorResponse = error?.error;
        setFormError(errorResponse?.email || errorResponse?.name || 'Account creation failed');
      });
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setRestaurantOption(value);
    setSelectedRestaurant(value);
  };

  return (
    <Col md={6}>
      <h2>Create Account</h2>
      <Form onSubmit={handleSubmit}>
        {formError && <p className="text-danger">{formError}</p>}
        <Form.Group className='mt-2' controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className='mt-2' controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group className='mt-2' controlId="formBasicRestaurant">
          <Form.Label>Restaurant</Form.Label>
          <InputGroup>
            <div>
              <FormControl
                as="select"
                value={restaurantOption}
                onChange={handleSelectChange}
              >
                <option value="">Select restaurant</option>
                {existingRestaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
                ))}
                <option value="new">Add new restaurant</option>
              </FormControl>
              {restaurantOption === 'new' && (
                <FormControl
                  type="text"
                  placeholder="Enter restaurant name"
                  value={newRestaurantName}
                  onChange={(e) => setNewRestaurantName(e.target.value)}
                  className='mt-2'
                />
              )}
            </div>
          </InputGroup>
        </Form.Group>

        <Button className="mt-2" variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
      <p className="mt-3">Already have an account? <button onClick={()=>navigate('/login')}>Login here</button></p>
    </Col>
  );
};

export default SignupPage;
