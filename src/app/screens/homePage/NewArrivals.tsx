import { Box, Container, Stack } from "@mui/material";
import React, { useState } from "react";

import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import { CssVarsProvider } from "@mui/joy/styles";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Swiper, SwiperSlide } from "swiper/react";

import CardCover from "@mui/joy/CardCover";
import BookCard from "../../components/common/Card";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NewArrivalCard from "../../components/common/NewArrivalsCard";


export default function NewArrivals() {
  // const newArrivals = [
  //   {
  //     productName: "Attached",
  //     imagePath: "/img/new/attached.jpg",
  //     author: "Amir Levine",
  //     price: 18,
  //   },
  //   {
  //     productName: "Buy Then Build",
  //     imagePath: "/img/new/buy-then-build.jpg",
  //     author: "Walker Deibel",
  //     price: 23,
  //   },
  //   {
  //     productName: "Don't Open Your Eyes",
  //     imagePath: "/img/new/dont-open-your-eyes.jpg",
  //     author: "Liv Constantine",
  //     price: 20,
  //   },
  //   {
  //     productName: "Good To Great",
  //     imagePath: "/img/new/good-to-great.jpg",
  //     author: "Jim Collins",
  //     price: 19,
  //   },
  //   {
  //     productName: "Lie To Me",
  //     imagePath: "/img/new/lie-to-me.webp",
  //     author: "J.T. Ellison",
  //     price: 18,
  //   },
  //   // {
  //   //   productName: "Man's Search For Meaning",
  //   //   imagePath: "/img/new/mans-search-for-meaning.jpg",
  //   // },
  //   // { productName: "Night Owl", imagePath: "/img/new/night-owl.jpg" },
  //   // {
  //   //   productName: "The Power Of Now",
  //   //   imagePath: "/img/new/the-power-of-now.jpg",
  //   // },
  // ];

  const [newArrivals, setNewArrivalss] = useState<number[]>([1, 2, 3, 4, 5,]);
  return (
    <div className="new-arrivals-frame">
      <Container>
        <Stack className="new-arrivals-section">
          <Stack className="section-title">
            <Box className="section-title-txt">
              <span>New Arrivals</span>
              <p>Fresh from the press, curated for the modern intellectual.</p>
            </Box>
            <Box className="view-more-btn">
              <a href="/" className="butt">
                <span>
                  VIEW MORE
                </span>
                <ArrowForwardIcon style={{color:' rgb(187 1 0)'}}/>
              </a>
            </Box>
          </Stack>
          <Stack
            className="cards-frame"
          // sx={{ width: "165px", height: "225px" }}
          >
            {newArrivals.length !== 0 ? (
              newArrivals.map((ele, index) => {
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
                  <NewArrivalCard key={index}/>
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
