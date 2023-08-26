import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: "популярности",
    sort: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoriesId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilter(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const { setCategoriesId, setSort, setFilter, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
