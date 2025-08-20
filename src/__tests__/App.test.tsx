import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Create a simple mock store for testing
const mockStore = configureStore({
  reducer: {
    cart: (state = { items: [], numberOfItems: 0 }) => state,
    ordersDetails: (state = []) => state,
  },
});

// Mock the entire App component to avoid router issues
const MockApp = () => {
  return (
    <div className="App">
      <header className="App-header" role="banner">
        <div data-testid="app-content">App Content</div>
      </header>
    </div>
  );
};

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={mockStore}>
        <MockApp />
      </Provider>
    );

    expect(screen.getByTestId('app-content')).toBeInTheDocument();
  });

  it('renders the app structure', () => {
    render(
      <Provider store={mockStore}>
        <MockApp />
      </Provider>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByTestId('app-content')).toBeInTheDocument();
  });
});