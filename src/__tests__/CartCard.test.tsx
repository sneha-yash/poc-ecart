import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CartCard from '../components/CartCard';
import cartReducer from '../redux/slices/cart';
import { CartItem } from '../interfaces/cart.type';

const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const mockCartItem: CartItem = {
  id: 1,
  title: 'Test Cart Item',
  price: 150,
  images: ['test-cart-image.jpg'],
  cartQuantity: 2,
  slug: 'test-cart-item',
};

const mockOnQuantityChange = jest.fn();
const mockOnRemove = jest.fn();

describe('CartCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders cart item information correctly', () => {
    render(
      <Provider store={mockStore}>
        <CartCard 
          item={mockCartItem} 
          onQuantityChange={mockOnQuantityChange}
          onRemove={mockOnRemove}
        />
      </Provider>
    );

    expect(screen.getByText('Test Cart Item')).toBeInTheDocument();
    expect(screen.getByText('₹ 150')).toBeInTheDocument();
  });

  it('displays correct quantity', () => {
    render(
      <Provider store={mockStore}>
        <CartCard 
          item={mockCartItem} 
          onQuantityChange={mockOnQuantityChange}
          onRemove={mockOnRemove}
        />
      </Provider>
    );

    const quantityInput = screen.getByDisplayValue('2');
    expect(quantityInput).toBeInTheDocument();
  });

  it('calls onQuantityChange when quantity is updated', () => {
    render(
      <Provider store={mockStore}>
        <CartCard 
          item={mockCartItem} 
          onQuantityChange={mockOnQuantityChange}
          onRemove={mockOnRemove}
        />
      </Provider>
    );

    const quantityInput = screen.getByDisplayValue('2');
    fireEvent.change(quantityInput, { target: { value: '5' } });

    expect(mockOnQuantityChange).toHaveBeenCalledWith(1, 5);
  });

  it('calls onRemove when remove button is clicked', () => {
    render(
      <Provider store={mockStore}>
        <CartCard 
          item={mockCartItem} 
          onQuantityChange={mockOnQuantityChange}
          onRemove={mockOnRemove}
        />
      </Provider>
    );

    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });

  it('handles missing image gracefully', () => {
    const itemWithoutImage = { ...mockCartItem, images: [] };
    
    render(
      <Provider store={mockStore}>
        <CartCard 
          item={itemWithoutImage} 
          onQuantityChange={mockOnQuantityChange}
          onRemove={mockOnRemove}
        />
      </Provider>
    );

    expect(screen.getByText('Test Cart Item')).toBeInTheDocument();
  });

  it('works without optional callbacks', () => {
    render(
      <Provider store={mockStore}>
        <CartCard item={mockCartItem} />
      </Provider>
    );

    expect(screen.getByText('Test Cart Item')).toBeInTheDocument();
  });

  it('handles zero quantity', () => {
    const zeroQuantityItem = { ...mockCartItem, cartQuantity: 0 };
    
    render(
      <Provider store={mockStore}>
        <CartCard 
          item={zeroQuantityItem} 
          onQuantityChange={mockOnQuantityChange}
          onRemove={mockOnRemove}
        />
      </Provider>
    );

    const quantityInput = screen.getByDisplayValue('0');
    expect(quantityInput).toBeInTheDocument();
  });

  it('prevents negative quantity input', () => {
    render(
      <Provider store={mockStore}>
        <CartCard 
          item={mockCartItem} 
          onQuantityChange={mockOnQuantityChange}
          onRemove={mockOnRemove}
        />
      </Provider>
    );

    const quantityInput = screen.getByDisplayValue('2');
    fireEvent.change(quantityInput, { target: { value: '-1' } });

    // Should not call onQuantityChange with negative value
    expect(mockOnQuantityChange).not.toHaveBeenCalledWith(1, -1);
  });
});