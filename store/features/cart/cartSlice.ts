
import { RootState } from '@/store';
import { ICartItem } from '@/types/cart.model';
import { ProductListItemDTO } from '@/types/product.model';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  items: ICartItem[];
}

export const initialState: CartState = {
  items: []
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<ProductListItemDTO>) => { 
      const product = action.payload;
      const item = state.items.find(m => m.product.sku === product.sku);
      if (item) { 
        item.qty += 1;
      } else {
        state.items.push({
          product,
          qty: 1
        })
      }
     },
    decrement: (state, action: PayloadAction<ProductListItemDTO>) => { 
      const item = state.items.find(m => m.product.sku === action.payload.sku);
      if (item) {
        item.qty -= 1;
        if (item.qty <= 0) {
          //remove
          state.items = state.items.filter(m => m.product.sku !== action.payload.sku);          
        }
      }
    },
    remove: (state, action: PayloadAction<ProductListItemDTO>) => { 
      state.items = state.items.filter(m => m.product.sku !== action.payload.sku);
    },
  }
});


//custom selectors

const cartItems = (state: RootState) => state.cart.items;
export const totalQtySelector = createSelector(
  [cartItems], 
  (items) => items.reduce((total: number, item) => (total + item.qty), 0));
export const totalPriceSelector = createSelector(
  [cartItems], 
  (items) => items.reduce((total: number, item) => (total + (item.qty * item.product.price)), 0));
export const productQtySelector = createSelector(
  [cartItems, (items, sku: string) => sku], 
  (items, sku) => items.find((item) => item.product.sku === sku)?.qty);



//export actions
export const { increment, decrement, remove } = cartSlice.actions;

export default cartSlice.reducer;

