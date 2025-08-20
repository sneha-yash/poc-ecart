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
    // Add more endpoints as needed
    // createProduct: builder.mutation<Product, Partial<Product>>({
    //   query: (newProduct) => ({
    //     url: 'products',
    //     method: 'POST',
    //     body: newProduct,
    //   }),
    //   invalidatesTags: ['Product'],
    // }),
  }),
})

// Export hooks for usage in functional components
export const { 
  useGetProductsQuery, 
  useGetProductQuery,
  // useCreateProductMutation, // if you add the mutation
} = productsApi

// Export the reducer
export default productsApi.reducer
