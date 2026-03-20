import { configureStore } from '@reduxjs/toolkit';
import leaveReducer from '../features/leaveSlice';

export const store = configureStore({
  reducer: {
    leaves: leaveReducer,
  },
});