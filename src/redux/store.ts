import { configureStore } from '@reduxjs/toolkit'

import categoriesReducer from './categories';
import machinesReducer from './machines';

export const store = configureStore({
  reducer: {
    machineCategories: categoriesReducer,
    machineList: machinesReducer
  },
});
