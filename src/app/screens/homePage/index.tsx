import React, { useEffect } from "react";
import NewArrivals from "./NewArrivals";
import DiscoverArticles from "./DiscoverArticles";
import Bestsellers from "./Bestsellers";
import CustomersPicks from "./CustomersPicks";
import Events from "./Events";
import Statistic from "./Statistic";
import Trending from "./Trending";
import { Dispatch } from "@reduxjs/toolkit";
import { setBestSellers, setNewArrivals, setTrendingNow } from "./slice";
import { Product } from "../../../libs/types/product";
import { useDispatch } from "react-redux";
import ProductService from "../../services/ProductService";
// @ts-ignore
import 'swiper/css'; // @ts-ignore
import 'swiper/css/navigation'; // @ts-ignore
import 'swiper/css/pagination';

import "../../../css/home.css";
import "../../../css/card.css";
import "../../../css/cards/eventCard.css";
import "../../../css//statistic.css";
import { CartItem } from "../../../libs/types/search";


/****************************************
              REDUX SLICE
*****************************************/

const actionDispatch = (dispatch: Dispatch) => ({
  setBestSellers: (data: Product[]) => dispatch(setBestSellers(data)),
  setNewArrivals: (data: Product[]) => dispatch(setNewArrivals(data)),
  setTrendingNow: (data: Product[]) => dispatch(setTrendingNow(data))
})

interface HomePageProps {
  onAdd: (item: CartItem) => void;
}

export default function HomePage(props: HomePageProps) {
  const { onAdd } = props;
  const { setBestSellers, setNewArrivals, setTrendingNow } = actionDispatch(useDispatch());

  useEffect(() => {
    const product = new ProductService();
    product.getProducts({
      page: 1,
      limit: 6,
      order: 'productViews',
    }).then((data) => {setBestSellers(data)}).catch((err) => console.log(err));

    product.getProducts({
      page: 1,
      limit: 5,
      order: 'createdAt',
    }).then((data) => {setNewArrivals(data)}).catch((err) => console.log(err));

    product.getProducts({
      page: 1,
      limit: 3,
      order: 'productPrice',
    }).then((data) => {setBestSellers(data)}).catch((err) => console.log(err));
  }, [])
  return (
    <div className="homepage">
      <Statistic />
      <Bestsellers />
      <NewArrivals onAdd={onAdd} />
      {/* <DiscoverArticles /> */}
      {/* <CustomersPicks /> */}
      <Trending />
      <Events />
    </div>
  );
}
