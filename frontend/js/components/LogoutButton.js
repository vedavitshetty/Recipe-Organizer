import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/userSlice';
import { useNavigate } from 'react-router';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate('/login');
      })
  };

  return (
    <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
  );
};

export default LogoutButton;
