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

export default function Bestsellers() {
  const newArrivals = [
    {
      productName: "Attached",
      imagePath: "/img/new/attached.jpg",
      author: "Amir Levine",
      price: 18,
    },
    {
      productName: "Buy Then Build",
      imagePath: "/img/new/buy-then-build.jpg",
      author: "Walker Deibel",
      price: 23,
    },
    {
      productName: "Don't Open Your Eyes",
      imagePath: "/img/new/dont-open-your-eyes.jpg",
      author: "Liv Constantine",
      price: 20,
    },
    {
      productName: "Good To Great",
      imagePath: "/img/new/good-to-great.jpg",
      author: "Jim Collins",
      price: 19,
    },
    {
      productName: "Lie To Me",
      imagePath: "/img/new/lie-to-me.webp",
      author: "J.T. Ellison",
      price: 18,
    },
    // {
    //   productName: "Man's Search For Meaning",
    //   imagePath: "/img/new/mans-search-for-meaning.jpg",
    // },
    // { productName: "Night Owl", imagePath: "/img/new/night-owl.jpg" },
    // {
    //   productName: "The Power Of Now",
    //   imagePath: "/img/new/the-power-of-now.jpg",
    // },
  ];

  const [bestsellers, setBestsellers] = useState<number[]>([1, 2, 3, 4, 5, 6,])
  return (
    <div className="bestsellers-frame">
      <Container>
        <Stack className="section">
          <Stack className="section-title-info">
            <Stack className="section-title">
              <Box className="section-title-txt">Bestsellers</Box>
              <Box>The titles defining this month's cultural conversation.</Box>
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
              {bestsellers.length !== 0 ? (
                bestsellers.map((ele, index) => {
                  return (
                    <SwiperSlide className="best-card-slide" key={index}>
                      <BestsellerCard />
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
