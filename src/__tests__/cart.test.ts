import cartReducer, { addToCart, removeFromCart, clearCart, updateCartItemQuantity, CartItem } from '../redux/slices/cart';
import { Product } from '../interfaces/product.type';

const mockProduct: Product = {
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

const mockProduct2: Product = {
  id: 2,
  title: 'Test Product 2',
  price: 200,
  slug: 'test-product-2',
  images: ['test-image-2.jpg'],
  description: 'Test product 2 description',
  category: {
    id: 2,
    name: 'Test Category 2',
    slug: 'test-category-2',
    image: 'test-category-image-2.jpg',
    creationAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  },
  creationAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
};

describe('cart slice', () => {
  const initialState = {
    items: [],
    numberOfItems: 0,
  };

  describe('addToCart', () => {
    it('should add new item to empty cart', () => {
      const actual = cartReducer(initialState, addToCart(mockProduct));
      expect(actual.items).toHaveLength(1);
      expect(actual.numberOfItems).toBe(1);
      expect(actual.items[0]).toEqual({ ...mockProduct, cartQuantity: 1 });
    });

    it('should increment quantity for existing item', () => {
      const stateWithItem = {
        items: [{ ...mockProduct, cartQuantity: 1 }],
        numberOfItems: 1,
      };
      const actual = cartReducer(stateWithItem, addToCart(mockProduct));
      expect(actual.items).toHaveLength(1);
      expect(actual.numberOfItems).toBe(2);
      expect(actual.items[0].cartQuantity).toBe(2);
    });

    it('should add multiple different items', () => {
      const stateWithItem = {
        items: [{ ...mockProduct, cartQuantity: 1 }],
        numberOfItems: 1,
      };
      const actual = cartReducer(stateWithItem, addToCart(mockProduct2));
      expect(actual.items).toHaveLength(2);
      expect(actual.numberOfItems).toBe(2);
      expect(actual.items[1]).toEqual({ ...mockProduct2, cartQuantity: 1 });
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', () => {
      const stateWithItem = {
        items: [{ ...mockProduct, cartQuantity: 2 }],
        numberOfItems: 2,
      };
      const actual = cartReducer(stateWithItem, removeFromCart(1));
      expect(actual.items).toHaveLength(0);
      expect(actual.numberOfItems).toBe(0);
    });

    it('should remove only specified item from multiple items', () => {
      const stateWithItems = {
        items: [
          { ...mockProduct, cartQuantity: 2 },
          { ...mockProduct2, cartQuantity: 1 }
        ],
        numberOfItems: 3,
      };
      const actual = cartReducer(stateWithItems, removeFromCart(1));
      expect(actual.items).toHaveLength(1);
      expect(actual.numberOfItems).toBe(1);
      expect(actual.items[0].id).toBe(2);
    });
  });

  describe('updateCartItemQuantity', () => {
    it('should update quantity for existing item', () => {
      const stateWithItem = {
        items: [{ ...mockProduct, cartQuantity: 1 }],
        numberOfItems: 1,
      };
      const actual = cartReducer(stateWithItem, updateCartItemQuantity({ id: 1, quantity: 3 }));
      expect(actual.items[0].cartQuantity).toBe(3);
      expect(actual.numberOfItems).toBe(3);
    });

    it('should handle quantity decrease', () => {
      const stateWithItem = {
        items: [{ ...mockProduct, cartQuantity: 5 }],
        numberOfItems: 5,
      };
      const actual = cartReducer(stateWithItem, updateCartItemQuantity({ id: 1, quantity: 2 }));
      expect(actual.items[0].cartQuantity).toBe(2);
      expect(actual.numberOfItems).toBe(2);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', () => {
      const stateWithItems = {
        items: [
          { ...mockProduct, cartQuantity: 2 },
          { ...mockProduct2, cartQuantity: 3 }
        ],
        numberOfItems: 5,
      };
      const actual = cartReducer(stateWithItems, clearCart());
      expect(actual.items).toHaveLength(0);
      expect(actual.numberOfItems).toBe(0);
    });

    it('should handle clearing empty cart', () => {
      const actual = cartReducer(initialState, clearCart());
      expect(actual.items).toHaveLength(0);
      expect(actual.numberOfItems).toBe(0);
    });
  });
});