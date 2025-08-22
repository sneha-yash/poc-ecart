import cartReducer, { addToCart, removeFromCart, clearCart, updateCartItemQuantity, CartItem } from '../redux/slices/cart';
import { Product } from '../interfaces/product.type';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 100,
  description: 'Test Description',
  category: { id: 1, name: 'Test Category', image: 'test.jpg', slug: 'test',creationAt: '2025-08-21T08:23:03.000Z', updatedAt: '2025-08-21T08:23:03.000Z'  },
  images: ['test.jpg'],
  slug: 'test-product',
  creationAt: '2025-08-21T08:23:03.000Z',
  updatedAt: '2025-08-21T08:23:03.000Z'
};

describe('cart slice', () => {
  const initialState = {
    items: [],
    numberOfItems: 0,
  };

  it('should return initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should add item to cart', () => {
    const actual = cartReducer(initialState, addToCart(mockProduct));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0]).toEqual({ ...mockProduct, cartQuantity: 1 });
    expect(actual.numberOfItems).toBe(1);
  });

  it('should increment quantity when adding existing item', () => {
    const stateWithItem = {
      items: [{ ...mockProduct, cartQuantity: 1 }],
      numberOfItems: 1,
    };
    const actual = cartReducer(stateWithItem, addToCart(mockProduct));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].cartQuantity).toBe(2);
    expect(actual.numberOfItems).toBe(2);
  });

  it('should remove item from cart', () => {
    const stateWithItem = {
      items: [{ ...mockProduct, cartQuantity: 2 }],
      numberOfItems: 2,
    };
    const actual = cartReducer(stateWithItem, removeFromCart(1));
    expect(actual.items).toHaveLength(0);
    expect(actual.numberOfItems).toBe(0);
  });

  it('should update item quantity', () => {
    const stateWithItem = {
      items: [{ ...mockProduct, cartQuantity: 1 }],
      numberOfItems: 1,
    };
    const actual = cartReducer(stateWithItem, updateCartItemQuantity({ id: 1, quantity: 3 }));
    expect(actual.items[0].cartQuantity).toBe(3);
    expect(actual.numberOfItems).toBe(3);
  });

  it('should clear cart', () => {
    const stateWithItems = {
      items: [{ ...mockProduct, cartQuantity: 2 }],
      numberOfItems: 2,
    };
    const actual = cartReducer(stateWithItems, clearCart());
    expect(actual.items).toHaveLength(0);
    expect(actual.numberOfItems).toBe(0);
  });

  it('should handle multiple different items', () => {
    const product2: Product = { ...mockProduct, id: 2, title: 'Product 2' };
    let state = cartReducer(initialState, addToCart(mockProduct));
    state = cartReducer(state, addToCart(product2));
    
    expect(state.items).toHaveLength(2);
    expect(state.numberOfItems).toBe(2);
  });
});