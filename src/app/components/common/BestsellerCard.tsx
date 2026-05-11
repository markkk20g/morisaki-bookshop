import { Box, Container, Stack } from "@mui/material";
import React from "react";

// interface BookCardsProps {
//   title: string;
//   author: string;
//   image: string;
//   price: number;
// }

export default function BestsellerCard() {
  // const { title, author, image, price } = props;

  return (
    <div className="best-card">
      <div className="card-frame">
        <img src={"/img/new/buy-then-build.jpg"} alt={""} className="card-image" />
      </div>
      <div className="card-content">
        <span className="card-title">Buy Then Build</span>
        <p className="card-author">Walker Daibel</p>

        <div className="card-footer">
          <span className="card-price">$22.00</span>

          <button className="card-button">🛒 Add</button>
        </div>
      </div>
    </div>
  );
}
