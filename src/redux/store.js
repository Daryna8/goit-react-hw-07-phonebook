import { combineReducers } from 'redux';
import { phonebookReducer } from './phonebook/phonebookSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  phonebookData: phonebookReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
