import { Box, Container, Stack } from "@mui/material";
import React from "react";

interface BookCardsProps {
  title: string;
  author: string;
  image: string;
  price: number;
}

export default function BookCard(props: BookCardsProps) {
  const { title, author, image, price } = props;

  return (
    <div className="new-card">
      <div className="card-frame">
        <img src={image} alt={title} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-author">{author}</p>

        <div className="card-footer">
          <span className="card-price">${price.toFixed(2)}</span>

          <button className="card-button">🛒 Add</button>
        </div>
      </div>
    </div>
  );
}
