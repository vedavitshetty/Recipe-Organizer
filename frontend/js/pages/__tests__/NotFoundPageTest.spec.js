import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../store';
import NotFoundPage from '../NotFoundPage';

const store = configureStore({});

describe('NotFoundPage', () => {
  test('renders not found message', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
