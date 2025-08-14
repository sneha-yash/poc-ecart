import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Order status types
export type OrderStatus = "Ordered" | "Packed" | "Shipped" | "Out for Delivery" | "Delivered";

// Order summary type
export interface OrderSummary {
  id: string; // unique order ID
  numberOfItems: number;
  totalQuantity: number;
  totalAmount: number;
  status: OrderStatus;
  placedAt: string; // ISO date string
}

interface OrdersState {
  orders: OrderSummary[];
}

const initialState: OrdersState = {
  orders: [],
};

// Helper to generate unique order ID (timestamp + random)
const generateOrderId = () =>
  `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder(
      state,
      action: PayloadAction<{
        numberOfItems: number;
        totalQuantity: number;
        totalAmount: number;
      }>
    ) {
      const { numberOfItems, totalQuantity, totalAmount } = action.payload;
      state.orders.push({
        id: generateOrderId(),
        numberOfItems,
        totalQuantity,
        totalAmount,
        status: "Ordered",
        placedAt: new Date().toISOString(),
      });
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;