import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CartCard from '../components/CartCard';
import cartReducer from '../redux/slices/cart';
import { CartItem } from '../interfaces/cart.type';

const mockStore = configureStore({ reducer: { cart: cartReducer } });
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

const renderCartCard = (item = mockCartItem, onQuantityChange = mockOnQuantityChange, onRemove = mockOnRemove) => 
  render(
    <Provider store={mockStore}>
      <CartCard item={item} onQuantityChange={onQuantityChange} onRemove={onRemove} />
    </Provider>
  );

describe('CartCard', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders cart item information and quantity correctly', () => {
    renderCartCard();
    expect(screen.getByText('Test Cart Item')).toBeInTheDocument();
    expect(screen.getByText('₹150.00')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
  });

  it('handles quantity changes and remove actions', () => {
    renderCartCard();
    
    fireEvent.click(screen.getByTestId('AddIcon').closest('button')!);
    expect(mockOnQuantityChange).toHaveBeenCalledWith(1, 3);
    
    fireEvent.click(screen.getByTestId('RemoveIcon').closest('button')!);
    expect(mockOnQuantityChange).toHaveBeenCalledWith(1, 1);
    
    fireEvent.click(screen.getByTitle('Remove item'));
    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });



  it('handles edge cases', () => {
    renderCartCard({ ...mockCartItem, images: [] });
    expect(screen.getByText('Test Cart Item')).toBeInTheDocument();
    
    renderCartCard({ ...mockCartItem, cartQuantity: 0 });
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('works without optional callbacks', () => {
    renderCartCard(mockCartItem, undefined, undefined);
    expect(screen.getByText('Test Cart Item')).toBeInTheDocument();
  });





  it('disables decrease button when quantity is 1', () => {
    renderCartCard({ ...mockCartItem, cartQuantity: 1 });
    expect(screen.getByTestId('RemoveIcon').closest('button')).toBeDisabled();
  });

  it('displays pricing correctly', () => {
    renderCartCard();
    expect(screen.getByText('₹300.00')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    
    renderCartCard({ ...mockCartItem, originalPrice: 200 });
    expect(screen.getByText('₹200.00')).toBeInTheDocument();
    expect(screen.getByText('SALE')).toBeInTheDocument();
  });


});