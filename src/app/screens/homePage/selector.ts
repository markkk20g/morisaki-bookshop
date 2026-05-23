import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../libs/types/screen";
import HomePage from ".";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveBestSellers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.bestSellers,
);
export const retrieveNewArrivals = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newArrivals,
);
export const retrieveTrendingNow = createSelector(
  selectHomePage,
  (HomePage) => HomePage.trendingNow,
);
export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers,
);
