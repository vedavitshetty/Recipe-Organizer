import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';

import Home from './pages/Home';
import RecipesListPage from './pages/RecipesListPage';
import ViewRecipePage from './pages/ViewRecipePage';
import configureStore from './store';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const store = configureStore({});

const App = () => (
  <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/recipes" element={<RecipesListPage />} />
          <Route path="/recipes/:id" element={<ViewRecipePage />} />
        </Routes>
      </Router>
    </Provider>
  </Sentry.ErrorBoundary>
);

export default App;
