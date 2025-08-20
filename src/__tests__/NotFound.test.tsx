import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('NotFound', () => {
  it('renders not found message', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('renders go home link', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });
});