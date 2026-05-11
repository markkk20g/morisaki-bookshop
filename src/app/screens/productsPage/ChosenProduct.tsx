import React from "react";
import { Button, Container, Stack } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import "../../../css/chosenProduct.css";
import "../../../css/card.css";

export default function ChosenProduct() {
  return (
    <div className="chosen-pro-screen">
      <Container className="chosen-pro-container">
        <Stack className="left">
          <div className="blur"></div>
          <div className="img-frame">
            <img src="/img/new/buy-then-build.jpg" alt=""/>
          </div>
          <Stack className="category">
            <span>BESTSELLER</span>
            <span style={{color: 'rgba(188, 1, 0, 1)', backgroundColor: 'rgba(255, 218, 212, 0.2)'}}>SELF-HELP</span>
          </Stack>
        </Stack>
        <Stack className="right">
          <Stack className="nav-detail">
            <span>PRODUCTS</span>
            <KeyboardArrowRightIcon />
            <span style={{color: 'rgba(188, 1, 0, 1)'}}>SELF-HELP</span>
          </Stack>
          <Stack className="title">
            <span>Buy Then Build</span>
          </Stack>
          <Stack className="credits">
            <div className="name-rating">
              <div className="name">
                <span style={{color: '#5f5e5e', textDecoration: 'none'}}>by</span>
                <span>Walker Deibel</span>
              </div>
              {/* <div className="divider"></div> */}
              <div className="rating"></div>
            </div>
          </Stack>
          <Stack className="main-content">
            <div className="desc">
              <p>A masterful exploration of the intersection between artificial 
                consciousness and human legacy. Thorne crafts a narrative that 
                is both terrifying and profoundly beautiful, challenging our 
                perceptions of what it means to truly "exist" in an era of 
                infinite connectivity.
              </p>
            </div>
            <div className="type">
              <div className="label">
                <span>PAPERBACK</span>
                <span style={{fontSize: '25px', fontWeight: '600', color: '#1a1c1d'}}>$19.50</span>
              </div>
              <Button className="price">
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