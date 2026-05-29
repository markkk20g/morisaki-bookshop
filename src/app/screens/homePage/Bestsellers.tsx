import { Box, Button, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import BookCard from "../../components/common/Card";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BestsellerCard from "../../components/common/BestsellerCard";

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"
import { createSelector } from "@reduxjs/toolkit";
import { retrieveBestSellers } from "./selector";
import { useSelector } from "react-redux";
import { Product } from "../../../libs/types/product";
import { serverApi } from "../../../libs/config";

// Import Swiper styles

// export default () => (
//   <Swiper
//     modules={[Navigation, Pagination]}
//     slidesPerView={3}
//     navigation
//     pagination={{ clickable: true }}
//   >
//     <SwiperSlide>Slide 1</SwiperSlide>
//     <SwiperSlide>Slide 2</SwiperSlide>
//   </Swiper>
// );
const bestsellersRetriever = createSelector(
  retrieveBestSellers, 
  (bestsellers) => ({bestsellers})
)

export default function Bestsellers() {
  const { bestsellers } = useSelector(bestsellersRetriever);
  const highBestsellers = bestsellers.slice(0, 8);

  // const [bestsellers, setBestsellers] = useState<number[]>([1, 2, 3, 4, 5, 6,])
  return (
    <div className="bestsellers-frame">
      <Container>
        <Stack className="section">
          <Stack className="section-title-info">
            <Stack className="section-title">
              <Box className="section-title-txt">Bestsellers</Box>
              <span>Bestselling books chosen by readers worldwide.</span>
            </Stack>
            <Box className="view-more-btn">
              <Button className="btn">
                <KeyboardArrowLeftIcon 
                  style={{color:' rgba(26, 28, 29, 1)'}}
                  className="swiper-best-prev"
                />
              </Button>
              <Button className="btn">
                <KeyboardArrowRightIcon 
                  style={{color:' rgba(26, 28, 29, 1)'}}
                  className="swiper-best-next"
                />
              </Button>
            </Box>
          </Stack>

          <Stack
            className="cards-frame"
          // sx={{ width: "165px", height: "225px" }}
          >
            <Swiper
              modules={[Navigation, Pagination]}
              className="swiper-best"
              spaceBetween={30}
              slidesPerView={4}
              navigation={{
                nextEl: '.swiper-best-next',
                prevEl: '.swiper-best-prev',
              }}
              pagination={{ el: '.view-more-btn', clickable: true }}
            >
              {highBestsellers.length !== 0 ? (
                highBestsellers.map((product: Product, index) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`
                  return (
                    <SwiperSlide className="best-card-slide" key={index}>
                      <BestsellerCard imagePath={imagePath} product={product}/>
                    </SwiperSlide>
                    
                  );
                })
              ) : (
                <Box>New Arrivals are not available!</Box>
              )}
            </Swiper>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
