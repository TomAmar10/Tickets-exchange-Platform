import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../models/Category";

export interface CategoryState {
  categories: Category[] | null;
}

const initialCategoryState: CategoryState = {
  categories: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState: initialCategoryState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const categoryAction = categorySlice.actions;
export default categorySlice.reducer;
