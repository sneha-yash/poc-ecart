import ordersReducer, { addOrder, clearOrders, OrderSummary, OrderStatus } from '../redux/slices/orders';

describe('orders slice', () => {
  const initialState = {
    orders: [],
  };

  const mockOrderData = {
    numberOfItems: 3,
    totalQuantity: 5,
    totalAmount: 500,
  };

  describe('addOrder', () => {
    it('should add new order with generated ID and timestamp', () => {
      const actual = ordersReducer(initialState, addOrder(mockOrderData));
      
      expect(actual.orders).toHaveLength(1);
      expect(actual.orders[0]).toMatchObject({
        numberOfItems: 3,
        totalQuantity: 5,
        totalAmount: 500,
        status: 'Ordered',
      });
      expect(actual.orders[0].id).toMatch(/^ORD-\d+-\d+$/);
      expect(actual.orders[0].placedAt).toBeDefined();
      expect(new Date(actual.orders[0].placedAt)).toBeInstanceOf(Date);
    });

    it('should add multiple orders with unique IDs', () => {
      const stateWithOrder = {
        orders: [{
          id: 'ORD-123-456',
          numberOfItems: 1,
          totalQuantity: 1,
          totalAmount: 100,
          status: 'Ordered' as OrderStatus,
          placedAt: '2023-01-01T00:00:00.000Z',
        }],
      };

      const actual = ordersReducer(stateWithOrder, addOrder(mockOrderData));
      
      expect(actual.orders).toHaveLength(2);
      expect(actual.orders[0].id).toBe('ORD-123-456');
      expect(actual.orders[1].id).not.toBe('ORD-123-456');
      expect(actual.orders[1].id).toMatch(/^ORD-\d+-\d+$/);
    });

    it('should handle zero values', () => {
      const zeroOrderData = {
        numberOfItems: 0,
        totalQuantity: 0,
        totalAmount: 0,
      };

      const actual = ordersReducer(initialState, addOrder(zeroOrderData));
      
      expect(actual.orders).toHaveLength(1);
      expect(actual.orders[0]).toMatchObject({
        numberOfItems: 0,
        totalQuantity: 0,
        totalAmount: 0,
        status: 'Ordered',
      });
    });

    it('should handle large values', () => {
      const largeOrderData = {
        numberOfItems: 1000,
        totalQuantity: 5000,
        totalAmount: 999999.99,
      };

      const actual = ordersReducer(initialState, addOrder(largeOrderData));
      
      expect(actual.orders).toHaveLength(1);
      expect(actual.orders[0]).toMatchObject({
        numberOfItems: 1000,
        totalQuantity: 5000,
        totalAmount: 999999.99,
        status: 'Ordered',
      });
    });
  });

  describe('clearOrders', () => {
    it('should clear all orders', () => {
      const stateWithOrders = {
        orders: [
          {
            id: 'ORD-123-456',
            numberOfItems: 1,
            totalQuantity: 1,
            totalAmount: 100,
            status: 'Ordered' as OrderStatus,
            placedAt: '2023-01-01T00:00:00.000Z',
          },
          {
            id: 'ORD-789-012',
            numberOfItems: 2,
            totalQuantity: 3,
            totalAmount: 200,
            status: 'Shipped' as OrderStatus,
            placedAt: '2023-01-02T00:00:00.000Z',
          },
        ],
      };

      const actual = ordersReducer(stateWithOrders, clearOrders());
      
      expect(actual.orders).toHaveLength(0);
      expect(actual.orders).toEqual([]);
    });

    it('should handle clearing empty orders', () => {
      const actual = ordersReducer(initialState, clearOrders());
      
      expect(actual.orders).toHaveLength(0);
      expect(actual.orders).toEqual([]);
    });
  });

  describe('state immutability', () => {
    it('should not mutate original state when adding order', () => {
      const state = {
        orders: [{
          id: 'ORD-123-456',
          numberOfItems: 1,
          totalQuantity: 1,
          totalAmount: 100,
          status: 'Ordered' as OrderStatus,
          placedAt: '2023-01-01T00:00:00.000Z',
        }],
      };

      const actual = ordersReducer(state, addOrder(mockOrderData));
      
      expect(actual).not.toBe(state);
      expect(actual.orders).not.toBe(state.orders);
      expect(state.orders).toHaveLength(1); // Original state unchanged
      expect(actual.orders).toHaveLength(2);
    });

    it('should not mutate original state when clearing orders', () => {
      const state = {
        orders: [{
          id: 'ORD-123-456',
          numberOfItems: 1,
          totalQuantity: 1,
          totalAmount: 100,
          status: 'Ordered' as OrderStatus,
          placedAt: '2023-01-01T00:00:00.000Z',
        }],
      };

      const actual = ordersReducer(state, clearOrders());
      
      expect(actual).not.toBe(state);
      expect(actual.orders).not.toBe(state.orders);
      expect(state.orders).toHaveLength(1); // Original state unchanged
      expect(actual.orders).toHaveLength(0);
    });
  });

  describe('order ID generation', () => {
    it('should generate unique IDs for concurrent orders', () => {
      const ids = new Set();
      
      // Generate multiple orders quickly
      for (let i = 0; i < 10; i++) {
        const actual = ordersReducer(initialState, addOrder(mockOrderData));
        ids.add(actual.orders[0].id);
      }
      
      expect(ids.size).toBe(10); // All IDs should be unique
    });

    it('should generate IDs with correct format', () => {
      const actual = ordersReducer(initialState, addOrder(mockOrderData));
      const orderId = actual.orders[0].id;
      
      expect(orderId).toMatch(/^ORD-\d{13}-\d{1,4}$/);
      
      const parts = orderId.split('-');
      expect(parts).toHaveLength(3);
      expect(parts[0]).toBe('ORD');
      expect(parseInt(parts[1])).toBeGreaterThan(0);
      expect(parseInt(parts[2])).toBeGreaterThanOrEqual(0);
      expect(parseInt(parts[2])).toBeLessThan(10000);
    });
  });

  describe('timestamp handling', () => {
    it('should generate valid ISO timestamp', () => {
      const actual = ordersReducer(initialState, addOrder(mockOrderData));
      const timestamp = actual.orders[0].placedAt;
      
      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
      expect(new Date(timestamp).toISOString()).toBe(timestamp);
    });

    it('should generate recent timestamp', () => {
      const beforeTime = Date.now();
      const actual = ordersReducer(initialState, addOrder(mockOrderData));
      const afterTime = Date.now();
      
      const orderTime = new Date(actual.orders[0].placedAt).getTime();
      expect(orderTime).toBeGreaterThanOrEqual(beforeTime);
      expect(orderTime).toBeLessThanOrEqual(afterTime);
    });
  });
});