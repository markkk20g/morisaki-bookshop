import React, { useEffect } from "react";
import NewArrivals from "./NewArrivals";
import Bestsellers from "./Bestsellers";
import CustomersPicks from "./CustomersPicks";
import Events from "./Events";
import Statistic from "./Statistic";
import Trending from "./Trending";
import { Dispatch } from "@reduxjs/toolkit";
import { setBestSellers, setNewArrivals, setTopUsers, setTrendingNow } from "./slice";
import { Product } from "../../../libs/types/product";
import { useDispatch } from "react-redux";
import ProductService from "../../services/ProductService";
// @ts-ignore
import 'swiper/css'; // @ts-ignore
import 'swiper/css/navigation'; // @ts-ignore
import 'swiper/css/pagination';
import { CartItem } from "../../../libs/types/search";
import { Member } from "../../../libs/types/member";
import MemberService from "../../services/MemberService";
import TopUsers from "./TopUsers";
import "../../../css/home.css";
import "../../../css/card.css";
import "../../../css/cards/eventCard.css";
import "../../../css//statistic.css";
import Advertisement from "./Advertisement";

/****************************************
              REDUX SLICE
*****************************************/

const actionDispatch = (dispatch: Dispatch) => ({
  setBestSellers: (data: Product[]) => dispatch(setBestSellers(data)),
  setNewArrivals: (data: Product[]) => dispatch(setNewArrivals(data)),
  setTrendingNow: (data: Product[]) => dispatch(setTrendingNow(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
})

interface HomePageProps {
  onAdd: (item: CartItem) => void;
}

export default function HomePage(props: HomePageProps) {
  const { onAdd } = props;
  const { setBestSellers, setNewArrivals, setTrendingNow, setTopUsers } = actionDispatch(useDispatch());

  useEffect(() => {
    const product = new ProductService();
    product.getProducts({
      page: 1,
      limit: 11,
      order: 'productViews',
      direction: -1,
    }).then((data) => {setBestSellers(data)}).catch((err) => console.log(err));

    product.getProducts({
      page: 1,
      limit: 5,
      order: 'createdAt',
      direction: -1,
    }).then((data) => {setNewArrivals(data)}).catch((err) => console.log(err));

    // product.getProducts({
    //   page: 1,
    //   limit: 3,
    //   order: 'productPrice',
    //   direction: Direction.ASC,
    // }).then((data) => {setBestSellers(data)}).catch((err) => console.log(err));

    const member = new MemberService();
    member.getTopUsers()
      .then((data) => {setTopUsers(data)})
      .catch((err) => console.log(err))
  }, []);

  return (
    <div className="homepage">
      <Statistic />
      <Bestsellers />
      <NewArrivals onAdd={onAdd} />
      {/* <CustomersPicks /> */}
      <Advertisement />
      <Trending />
      <TopUsers />
      <Events />
    </div>
  );
}
