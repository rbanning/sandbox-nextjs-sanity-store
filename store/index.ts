//THIS IS THE SITE's REDUX STORE

import { configureStore } from "@reduxjs/toolkit";

import counterReducer from './features/counter/counter-slice';
import harryPotterSearchSlice from "./features/harry-potter/harry-potter-searchSlice";
import { harryPotterApi } from "./features/harry-potter/harry-potter-api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    harryPotterSearch: harryPotterSearchSlice,
    harryPotterApi: harryPotterApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(harryPotterApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

