import React from "react";
import NewArrivals from "./NewArrivals";
import DiscoverArticles from "./DiscoverArticles";
import Bestsellers from "./Bestsellers";
import CustomersPicks from "./CustomersPicks";
import Events from "./Events";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "../../../css/home.css";
import "../../../css/card.css";
import "../../../css/cards/eventCard.css";



export default function HomePage() {
  return (
    <div className="homepage">
      <Bestsellers />
      <NewArrivals />
      <DiscoverArticles />
      <CustomersPicks />
      <Events />
    </div>
  );
}
