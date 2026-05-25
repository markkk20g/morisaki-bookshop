import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { Product } from "../../../libs/types/product";

// interface BookCardsProps {
//   title: string;
//   author: string;
//   image: string;
//   price: number;
// }
interface BestsellersCardProps {
  product: Product;
  imagePath: string;
  // onAdd: any;
}

export default function BestsellerCard(props: BestsellersCardProps) {
  const { product, imagePath } = props;

  return (
    <div className="best-card">
      <div className="card-frame">
        <img src={imagePath} alt={""} className="card-image" />
      </div>
      <div className="card-content">
        <span className="card-title">{product.productName}</span>
        <p className="card-author">{product.productAuthorName}</p>

        <div className="card-footer">
          <span className="card-price">${product.productPrice.toFixed(2)}</span>

          <button className="card-button">🛒 Add</button>
        </div>
      </div>
    </div>
  );
}
