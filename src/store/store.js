// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import dateReducer from './dateSlice';

export const store = configureStore({
  reducer: {
    calendar: dateReducer, // We call this slice 'calendar'
  },
});