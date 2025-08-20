import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../redux/slices/products';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const mockProducts = [
  {
    id: 1,
    title: 'Test Product 1',
    price: 100,
    slug: 'test-product-1',
    images: ['test-image-1.jpg'],
    description: 'Test product 1 description',
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
  },
  {
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
  },
];

const server = setupServer(
  rest.get('https://api.escuelajs.co/api/v1/products', (req, res, ctx) => {
    return res(ctx.json(mockProducts));
  }),
  rest.get('https://api.escuelajs.co/api/v1/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const product = mockProducts.find(p => p.id === parseInt(id as string));
    if (product) {
      return res(ctx.json(product));
    }
    return res(ctx.status(404), ctx.json({ message: 'Product not found' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('products API slice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        productsApi: productsApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
    });
  });

  describe('getProducts', () => {
    it('should fetch all products successfully', async () => {
      const result = await store.dispatch(productsApi.endpoints.getProducts.initiate());
      
      expect(result.status).toBe('fulfilled');
      expect(result.data).toEqual(mockProducts);
      expect(result.data).toHaveLength(2);
    });

    it('should handle API error', async () => {
      server.use(
        rest.get('https://api.escuelajs.co/api/v1/products', (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: 'Server error' }));
        })
      );

      const result = await store.dispatch(productsApi.endpoints.getProducts.initiate());
      
      expect(result.status).toBe('rejected');
      expect(result.error).toBeDefined();
    });
  });

  describe('getProduct', () => {
    it('should fetch single product successfully', async () => {
      const result = await store.dispatch(productsApi.endpoints.getProduct.initiate(1));
      
      expect(result.status).toBe('fulfilled');
      expect(result.data).toEqual(mockProducts[0]);
      expect(result.data?.id).toBe(1);
    });

    it('should handle product not found', async () => {
      const result = await store.dispatch(productsApi.endpoints.getProduct.initiate(999));
      
      expect(result.status).toBe('rejected');
      expect(result.error).toBeDefined();
    });

    it('should cache product data', async () => {
      // First request
      const result1 = await store.dispatch(productsApi.endpoints.getProduct.initiate(1));
      expect(result1.status).toBe('fulfilled');

      // Second request should use cache
      const result2 = await store.dispatch(productsApi.endpoints.getProduct.initiate(1));
      expect(result2.status).toBe('fulfilled');
      expect(result2.data).toEqual(result1.data);
    });
  });

  describe('API state management', () => {
    it('should track loading state', async () => {
      const promise = store.dispatch(productsApi.endpoints.getProducts.initiate());
      
      // Check loading state
      const state = store.getState();
      const queryState = state.productsApi.queries['getProducts(undefined)'];
      expect(queryState?.status).toBe('pending');

      await promise;

      // Check fulfilled state
      const finalState = store.getState();
      const finalQueryState = finalState.productsApi.queries['getProducts(undefined)'];
      expect(finalQueryState?.status).toBe('fulfilled');
    });

    it('should invalidate cache on tag changes', async () => {
      // Initial fetch
      await store.dispatch(productsApi.endpoints.getProducts.initiate());
      
      // Invalidate tags
      store.dispatch(productsApi.util.invalidateTags(['Product']));
      
      const state = store.getState();
      expect(Object.keys(state.productsApi.queries)).toHaveLength(0);
    });
  });
});