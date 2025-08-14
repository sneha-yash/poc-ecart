import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../interfaces/product.type'

// Define the initial state
interface ProductsState {
  items: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
}

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/products')
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return response.json()
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // You can add synchronous reducers here if needed
    // Add this reducer to update product quantity when added to cart
    decrementProductQuantity: (state, action: PayloadAction<number>) => {
      const product = state.items.find((item) => item.id === action.payload)
      if (product && product.quantity > 0) {
        product.quantity -= 1
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong'
      })
  },
})

export default productsSlice.reducer