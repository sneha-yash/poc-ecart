describe('Products API', () => {
  it('should export products API', () => {
    const productsModule = require('../redux/slices/products');
    expect(productsModule.productsApi).toBeDefined();
    expect(productsModule.useGetProductsQuery).toBeDefined();
    expect(productsModule.useGetProductQuery).toBeDefined();
  });
});