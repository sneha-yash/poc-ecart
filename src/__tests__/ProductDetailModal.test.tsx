import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductDetailModal from '../components/ProductDetailModal';
import cartReducer from '../redux/slices/cart';
import { productsApi } from '../redux/slices/products';

const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

// Mock the RTK Query hook
jest.mock('../redux/slices/products', () => ({
  ...jest.requireActual('../redux/slices/products'),
  useGetProductQuery: jest.fn(),
}));

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 100,
  description: 'Test description',
  images: ['test-image.jpg'],
};

describe('ProductDetailModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    const { useGetProductQuery } = require('../redux/slices/products');
    useGetProductQuery.mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
      error: null,
    });
  });

  it('renders modal when open', () => {
    render(
      <Provider store={mockStore}>
        <ProductDetailModal open={true} onClose={mockOnClose} productId={1} />
      </Provider>
    );

    expect(screen.getByText('Product Details')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Provider store={mockStore}>
        <ProductDetailModal open={false} onClose={mockOnClose} productId={1} />
      </Provider>
    );

    expect(screen.queryByText('Product Details')).not.toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    render(
      <Provider store={mockStore}>
        <ProductDetailModal open={true} onClose={mockOnClose} productId={1} />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText('Close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    const { useGetProductQuery } = require('../redux/slices/products');
    useGetProductQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(
      <Provider store={mockStore}>
        <ProductDetailModal open={true} onClose={mockOnClose} productId={1} />
      </Provider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});