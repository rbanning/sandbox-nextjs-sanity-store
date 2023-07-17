
import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
import { IMessage, MessageCreateDTO, MessageType, createMessage } from '@/types/message.model';
import { RootState } from '@/store';

export interface MessageState {
  messages: IMessage[];
}

export const initialState: MessageState = {
  messages: []
};


export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageCreateDTO>) => { 
      state.messages.push(createMessage(action.payload));
     },
    removeMessage: (state, action: PayloadAction<string>) => { 
      state.messages = state.messages.filter(m => m.id !== action.payload);
    },
    clearMessageCategory: (state, action: PayloadAction<string>) => { 
      state.messages = state.messages.filter(m => m.category !== action.payload);
    },
  }
});

//custom selectors

const messages = (state: RootState) => state.message.messages;
export const messagesByCategorySelector = createSelector(
  [messages, (messages, category: string) => category], 
  (items, category) => items.filter(m => m.category === category)
);
export const messagesByTypeSelector = createSelector(
  [messages, (messages, type: MessageType) => type], 
  (items, type) => items.filter(m => m.type === type)
);


//export actions
export const { addMessage, removeMessage, clearMessageCategory } = messageSlice.actions;

export default messageSlice.reducer;

