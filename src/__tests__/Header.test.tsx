import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import HeaderComponent from '../components/Header';
import cartReducer from '../redux/slices/cart';

const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('HeaderComponent', () => {
  const mockOnCategoryClick = jest.fn();
  const mockOnNavigationClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header with title', () => {
    renderWithProviders(
      <HeaderComponent 
        title="Test Shop"
        onCategoryClick={mockOnCategoryClick}
        onNavigationClick={mockOnNavigationClick}
      />
    );

    expect(screen.getByText('Test Shop')).toBeInTheDocument();
  });

  it('renders cart button with item count', () => {
    renderWithProviders(
      <HeaderComponent 
        cartItemCount={5}
        onCategoryClick={mockOnCategoryClick}
        onNavigationClick={mockOnNavigationClick}
      />
    );

    expect(screen.getByLabelText('Shopping cart with 5 items')).toBeInTheDocument();
  });

  it('shows clear cart button when visible', () => {
    renderWithProviders(
      <HeaderComponent 
        isClearCartVisible={true}
        onCategoryClick={mockOnCategoryClick}
        onNavigationClick={mockOnNavigationClick}
      />
    );

    expect(screen.getByText('Clear Cart')).toBeInTheDocument();
  });

  it('calls navigation handler when navigation button clicked', () => {
    renderWithProviders(
      <HeaderComponent 
        onCategoryClick={mockOnCategoryClick}
        onNavigationClick={mockOnNavigationClick}
      />
    );

    fireEvent.click(screen.getByText('Products'));
    expect(mockOnNavigationClick).toHaveBeenCalledWith('Home');
  });
});