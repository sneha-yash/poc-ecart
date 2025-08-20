import { Product } from '../../interfaces/product.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.escuelajs.co/api/v1/',
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    // Fetch all products
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
      providesTags: ['Product'],
    }),
    // Fetch single product by ID
    getProduct: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
  }),
})

// Export hooks for usage in functional components
export const { 
  useGetProductsQuery, 
  useGetProductQuery,
} = productsApi

// Export the reducer
export default productsApi.reducer
