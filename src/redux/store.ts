import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, Persistor } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import productsReducer from './slices/products'
import cartReducer from './slices/cart'
import ordersReducer from './slices/orders'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  ordersDetails: ordersReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  // No need for order details with API call.
  whitelist: ['cart', 'ordersDetails'], // persist cart, add 'products' if you want to persist products too
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor: Persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch