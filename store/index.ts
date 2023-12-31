//THIS IS THE SITE's REDUX STORE

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import counterReducer from './features/counter/counter-slice';
import harryPotterSearchSlice from "./features/harry-potter/harry-potter-searchSlice";
import { harryPotterApi } from "./features/harry-potter/harry-potter-api";
import cartSliceReducer from './features/cart/cartSlice';
import authSliceReducer from "./features/auth/authSlice";
import messageSliceReducer from "./features/message/messageSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    harryPotterSearch: harryPotterSearchSlice,
    harryPotterApi: harryPotterApi.reducer,
    message: messageSliceReducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(harryPotterApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//typed the useDispatch and useSelector methods
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

