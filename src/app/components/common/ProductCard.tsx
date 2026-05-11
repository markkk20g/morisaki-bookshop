import { Box, Container, Stack } from "@mui/material";
import React from "react";


export default function ProductCard() {
  // const { title, author, image, price } = props;

  return (
    <div className="product-card">
      <Stack className="pro-card-frame">
        <div className="pro-card-image">
          <img src={"/img/new/buy-then-build.jpg"} alt={""} className="pro-image" />
        </div>
        <div className="pro-card-content" style={{padding: `0px 0 0 0`, marginTop: '20px'}}>
          <h3 className="pro-card-title">Buy Then Build</h3>
          <p className="pro-card-author">Walker Daibel</p>

          <div className="pro-card-footer">
            <span className="pro-card-price">$22.00</span>

            <button className="pro-card-button">🛒 Add</button>
          </div>
        </div>
      </Stack>
    </div>
  );
}
