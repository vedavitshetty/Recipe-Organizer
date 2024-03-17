import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';

import Home from './pages/Home';
import AllRecipesList from './pages/AllRecipesList';
import configureStore from './store';

const store = configureStore({});

const App = () => (
  <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes/all" element={<AllRecipesList />} />
        </Routes>
      </Router>
    </Provider>
  </Sentry.ErrorBoundary>
);

export default App;
