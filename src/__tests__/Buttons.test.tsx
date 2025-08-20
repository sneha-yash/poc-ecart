import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddCartButton } from '../components/Buttons';

describe('AddCartButton', () => {
  it('renders with correct text', () => {
    render(<AddCartButton />);
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(<AddCartButton onClick={mockOnClick} />);
    
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders with shopping cart icon', () => {
    render(<AddCartButton />);
    expect(screen.getByTestId('ShoppingCartRoundedIcon')).toBeInTheDocument();
  });

  it('accepts additional props', () => {
    render(<AddCartButton disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});