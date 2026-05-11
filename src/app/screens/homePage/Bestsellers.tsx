import { Box, Button, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import BookCard from "../../components/common/Card";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BestsellerCard from "../../components/common/BestsellerCard";

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

  const [bestsellers, setBestsellers] = useState<number[]>([1, 2, 3, 4,])
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
              <Button className="btn"><KeyboardArrowLeftIcon style={{color:' rgba(26, 28, 29, 1)'}}/></Button>
              <Button className="btn"><KeyboardArrowRightIcon style={{color:' rgba(26, 28, 29, 1)'}}/></Button>
            </Box>
          </Stack>

          <Stack
            className="cards-frame"
          // sx={{ width: "165px", height: "225px" }}
          >
            {bestsellers.length !== 0 ? (
              bestsellers.map((ele, index) => {
                return (
                  // <Stack className="card">
                  //   <Box sx={{ bgcolor: "white", borderRadius: "md" }}>
                  //     <img src={ele.imagePath} />
                  //   </Box>
                  //   <Stack className="card-info">
                  //     <Box>{ele.productName}</Box>
                  //     <Box>John Keyhan</Box>
                  //     <Box>$29</Box>
                  //     <Box>$29</Box>
                  //   </Stack>
                  // </Stack>
                  <BestsellerCard key={index}/>
                );
              })
            ) : (
              <Box>New Arrivals are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
