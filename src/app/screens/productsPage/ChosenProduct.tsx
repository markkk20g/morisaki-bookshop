import React, { useEffect } from "react";
import { Button, Container, Stack } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import "../../../css/chosenProduct.css";
import "../../../css/card.css";
import { CartItem } from "../../../libs/types/search";
import { setAdmin, setChosenProduct } from "./slice";
import { Member } from "../../../libs/types/member";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { Product } from "../../../libs/types/product";
import { retrieveAdmin, retrieveChosenProduct } from "./selector";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { serverApi } from "../../../libs/config";

const actionDispatch = (dispatch: Dispatch) => ({
  setAdmin: (data: Member) => dispatch(setAdmin(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const adminRetriever = createSelector(
  retrieveAdmin, 
  (admin) => ({admin})
);
const chosenProductRetriever = createSelector(
  retrieveChosenProduct, 
  (chosenProduct) => ({chosenProduct})
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const {productId} = useParams<{productId: string}>();
  console.log('productId', productId);

  const { setAdmin, setChosenProduct } = actionDispatch(useDispatch());
  const { admin } = useSelector(adminRetriever);
  const { chosenProduct } = useSelector(chosenProductRetriever);

  useEffect(() => {
    const product = new ProductService();
    product.getProduct(productId)
    .then((data) => setChosenProduct(data))
    .catch((err) => console.log(err));

    const member = new MemberService();
    member.getAdmin()
    .then((data) => setAdmin(data))
    .catch((err) => console.log(err));
  }, []);

  if(!chosenProduct) return null;
  const imagePath = `${serverApi}/${chosenProduct.productImages[0]}`;

  return (
    <div className="chosen-pro-screen">
      <Container className="chosen-pro-container">
        <Stack className="left">
          <div className="blur"></div>
          <div className="img-frame">
            <img src={imagePath} alt=""/>
          </div>
          <Stack className="category">
            <span>{chosenProduct.productViews >= 200 ? "BESTSELLER" : "TRENDING"}</span>
            {chosenProduct.productViews <= 20 
              ? <span>NEW ARRIVED</span> : null}
            <span style={{color: 'rgba(188, 1, 0, 1)', backgroundColor: 'rgba(255, 218, 212, 0.2)'}}>{chosenProduct.productCollection}</span>
          </Stack>
        </Stack>
        <Stack className="right">
          <Stack className="nav-detail">
            <span>PRODUCTS</span>
            <KeyboardArrowRightIcon />
            <span style={{color: 'rgba(188, 1, 0, 1)'}}>{chosenProduct.productCollection}</span>
          </Stack>
          <Stack className="title">
            <span>{chosenProduct.productName}</span>
          </Stack>
          <Stack className="credits">
            <div className="name-rating">
              <div className="name">
                <span style={{color: '#5f5e5e', textDecoration: 'none'}}>by</span>
                <span>{chosenProduct.productAuthorName}</span>
              </div>
              {/* <div className="divider"></div> */}
              <div className="rating"></div>
            </div>
          </Stack>
          <Stack className="main-content">
            <div className="desc">
              <p>{chosenProduct.productDesc}</p>
            </div>
            <div className="type">
              <div className="label">
                <span>PAPERBACK</span>
                <span style={{fontSize: '25px', fontWeight: '600', color: '#1a1c1d'}}>${chosenProduct.productPrice.toFixed(2)}</span>
              </div>
              <Button 
                className="price"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  })
                }}
              >
                <ShoppingBasketOutlinedIcon style={{color: '#fff'}}/>
                <span>Add to Basket</span>
              </Button>
            </div>
            <div></div>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}