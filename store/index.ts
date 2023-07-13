//THIS IS THE SITE's REDUX STORE

"use client";

import { configureStore } from "@reduxjs/toolkit";

import counterReducer from './features/counter/counter-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

