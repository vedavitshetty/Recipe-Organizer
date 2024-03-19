import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NotFoundPage = () => {
  const isAuthenticated = useSelector((state) => state.userSlice.isAuthenticated);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      {!isAuthenticated ? (
        <p>
          Please <Link to="/login">click here to log in</Link> to view recipes.
        </p>
      ) : (
        <p>
          Please <Link to="/recipes">click here to view recipes</Link>.
        </p>
      )}
    </div>
  );
};

export default NotFoundPage;
