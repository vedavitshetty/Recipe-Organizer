import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import * as Sentry from '@sentry/react';

import configureStore from './store';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RecipesListPage from './pages/RecipesListPage';
import ViewRecipePage from './pages/ViewRecipePage';
import NotFoundPage from './pages/NotFoundPage';

const store = configureStore({});

const App = () => {
  const isAuthenticated = useSelector((state) => state.userSlice.isAuthenticated);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!isAuthenticated && token) {
      // If isAuthenticated is false but token exists, set isAuthenticated to true
      store.dispatch({ type: 'user/setIsAuthenticated', payload: true });
    }
  }, []);

  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated || token ? '/recipes' : '/login'} />} />
          <Route path="/login" element={!(isAuthenticated || token)  ? <LoginPage /> : <Navigate to="/recipes" />} />
          <Route path="/signup" element={!(isAuthenticated || token)  ? <SignupPage /> : <Navigate to="/recipes" />} />
          <Route
            path="/recipes/*"
            element={isAuthenticated || token  ? <RecipesListPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/recipes/:id"
            element={isAuthenticated || token ? <ViewRecipePage /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Sentry.ErrorBoundary>
  );
};

const AppWithProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWithProvider;
