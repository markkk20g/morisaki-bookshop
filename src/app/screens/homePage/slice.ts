import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../libs/types/screen";

const initialState: HomePageState = {
  bestSellers: [],
  newArrivals: [],
  trendingNow: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState: initialState,
  reducers: {
    setBestSellers: (state, action) => {
      state.bestSellers = action.payload;
    },
    setNewArrivals: (state, action) => {
      state.newArrivals = action.payload;
    },
    setTrendingNow: (state, action) => {
      state.trendingNow = action.payload;
    },
  },
});

export const { setBestSellers, setNewArrivals, setTrendingNow } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
