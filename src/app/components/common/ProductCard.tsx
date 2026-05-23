import { Box, Button, Container, Stack } from "@mui/material";
import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { serverApi } from "../../../libs/config";

interface ProductCardProps {
  product: any;
  imagePath: any;
  onAdd: any;
  chooseProductHandler: any;
}

export default function ProductCard(props: ProductCardProps) {
  const { product, imagePath, onAdd, chooseProductHandler } = props;
  // const imagePath = `${serverApi}/${product.productImages[0]}`
  // const { title, author, image, price } = props;

  return (
    <div className="product-card">
      <Box className="product-views">
        <VisibilityOutlinedIcon 
          style={{ color: product.productViews === 0 ? "#5f5e5e" : "#bc0100"}}
        />
        {product.productViews}
      </Box>
      <Stack className="pro-card-frame">
        <div className="pro-card-image" onClick={() => chooseProductHandler(product._id)}>
          <img src={imagePath} alt={""} className="pro-image" />
        </div>
        <div className="pro-card-content" style={{padding: `0px 0 0 0`, marginTop: '20px'}}>
          <span 
            className="pro-card-title"
            onClick={() => chooseProductHandler(product._id)}
          >{product.productName}</span>
          <p className="pro-card-author">{product.productAuthorName}</p>

          <div className="pro-card-footer">
            <span className="pro-card-price">${product.productPrice}</span>

            <button 
              className="pro-card-button"
              onClick={(e) => {
                e.stopPropagation();
                onAdd({
                  _id: product._id,
                  quantity: 1,
                  name: product.productName,
                  price: product.productPrice,
                  image: product.productImages[0],
                });
              }}
            >🛒 Add</button>
            {/* <Button 
              className='shop-button'
              onClick={(e) => {
                e.stopPropagation();
                onAdd({
                  _id: product._id,
                  quantity: 1,
                  name: product.productName,
                  price: product.productPrice,
                  image: product.productImages[0],
                });
              }}>
              <img src='/icons/shopping-cart.svg' style={{display: 'flex'}} className='image'/>
            </Button> */}
          </div>
        </div>
      </Stack>
    </div>
  );
}
