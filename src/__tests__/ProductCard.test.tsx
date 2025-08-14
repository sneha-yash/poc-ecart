import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductCard from '../components/ProductCard';
import cartReducer from '../redux/slices/cart';

// Mock the product service
jest.mock('../services/productService', () => ({
  fetchProductDetails: jest.fn(),
}));

const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 100,
  slug: 'test-product',
  images: ['test-image.jpg'],
  description: 'Test product description',
  category: {
    id: 1,
    name: 'Test Category',
    slug: 'test-category',
    image: 'test-category-image.jpg',
    creationAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  },
  creationAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(
      <Provider store={mockStore}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('₹ 100')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('dispatches addToCart when button is clicked', () => {
    render(
      <Provider store={mockStore}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    const initialCartItems = mockStore.getState().cart.items.length;
    const initialNumberOfItems = mockStore.getState().cart.numberOfItems;

    fireEvent.click(screen.getByText('Add to Cart'));

    // Check that the cart state has been updated
    const finalCartItems = mockStore.getState().cart.items.length;
    const finalNumberOfItems = mockStore.getState().cart.numberOfItems;

    expect(finalCartItems).toBeGreaterThanOrEqual(initialCartItems);
    expect(finalNumberOfItems).toBe(initialNumberOfItems + 1);
  });

  it('opens modal when card is clicked', async () => {
    const { fetchProductDetails } = require('../services/productService');
    fetchProductDetails.mockResolvedValue(mockProduct);

    render(
      <Provider store={mockStore}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    // Click on the card (but not on the button)
    const cardTitle = screen.getByText('Test Product');
    fireEvent.click(cardTitle);

    // Wait for modal to appear
    await waitFor(() => {
      expect(screen.getByText('Product Details')).toBeInTheDocument();
    });
  });
});