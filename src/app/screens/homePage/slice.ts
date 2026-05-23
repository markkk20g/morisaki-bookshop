import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../libs/types/screen";

const initialState: HomePageState = {
  bestSellers: [],
  newArrivals: [],
  trendingNow: [],
  topUsers: [],
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
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

export const { setBestSellers, setNewArrivals, setTrendingNow, setTopUsers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
