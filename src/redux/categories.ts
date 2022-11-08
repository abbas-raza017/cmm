import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: []
  },
  reducers: {
    addCategory: (state, action) => {
      if (action.payload.category.title) {
        state.categories.push(action.payload.category as never);
      }
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter((cat) => (cat as any).id !== action.payload.id);
    },
    updateCategory: (state, action) => {
      if (action.payload.category.title) {
        const index = state.categories.map((cat) => (cat as any).id).indexOf(action.payload.category.id);
        state.categories[index] = action.payload.category as never;
      }
    }
  }
});

export const addCategory = categoriesSlice.actions.addCategory;
export const removeCategory = categoriesSlice.actions.removeCategory;
export const updateCategory = categoriesSlice.actions.updateCategory;
export default categoriesSlice.reducer;
