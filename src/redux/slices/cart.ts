import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../interfaces/product.type'

// Define a CartItem type
export interface CartItem extends Product {
  cartQuantity: number
}

interface CartState {
  items: CartItem[],
  numberOfItems: number
}

const initialState: CartState = {
  items: [],
  numberOfItems: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(item => item.id === action.payload.id)
      state.numberOfItems += 1;
      if (existing) {
        existing.cartQuantity += 1
      } else {
        state.items.push({ ...action.payload, cartQuantity: 1 })
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.numberOfItems -= state.items.find(item => item.id === action.payload)!.cartQuantity;
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      state.numberOfItems += action.payload.quantity - (item?.cartQuantity || 0);
      if (item) {
        item.cartQuantity = action.payload.quantity
      }
    },
    clearCart: (state) => {
      state.numberOfItems = 0;
      state.items = []
    },
    // Optionally, add more reducers for increment/decrement, etc.
  },
})

export const { addToCart, removeFromCart, clearCart, updateCartItemQuantity } = cartSlice.actions
export default cartSlice.reducer