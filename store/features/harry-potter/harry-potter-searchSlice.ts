import { IHarryPotterName } from '@/data/harry-potter.models';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HarryPotterSearchState {
  search: string;
  startupNames: IHarryPotterName[];
}

export const initialState: HarryPotterSearchState = {
  search: "",
  startupNames: []
};

export const harryPotterSearchSlice = createSlice({
  name: 'harryPotterSearch',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => { 
      state.search = action.payload; 
    },
    setStartupNames: (state, action: PayloadAction<IHarryPotterName[]>) => { 
      state.startupNames = action.payload;
    },
  }
});

export const { setSearch, setStartupNames } = harryPotterSearchSlice.actions;

export default harryPotterSearchSlice.reducer;

