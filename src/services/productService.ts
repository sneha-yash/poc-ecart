import { Product } from '../interfaces/product.type';

export const fetchProductDetails = async (productId: number): Promise<Product> => {
  try {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product details: ${response.status} ${response.statusText}`);
    }
    
    const productData = await response.json();
    return productData;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};
