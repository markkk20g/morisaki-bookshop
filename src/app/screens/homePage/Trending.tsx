import { Box, Container, Stack } from "@mui/material";
import { useState } from "react";
import TrendCard from "../../components/common/TrendCard";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveBestSellers } from "./selector";
import { useSelector } from "react-redux";
import { Product } from "../../../libs/types/product";
import { serverApi } from "../../../libs/config";

const bestsellersRetriever = createSelector(
  retrieveBestSellers, 
  (bestsellers) => ({bestsellers})
)

const Trending = () => {
  const { bestsellers } = useSelector(bestsellersRetriever);
  const trending = bestsellers.slice(8, 11);

  // const [trending, setTrending] = useState<number[]>([1, 2, 3])
  return (
    <div className="trend-page">
      <Container className="trend-container">
        <Stack className="trend-frame">
          <Stack className="trend-head">
            <span>Trending Now</span>
            <p>Trending books fresh for our customers</p>
          </Stack>
          <Stack className="trend-main">
            {trending.length !== 0 ? (
              trending.map((product: Product, index) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`
                return <TrendCard product={product} imagePath={imagePath} key={index}/>
              })
            ) : (
              <Box>New Arrivals are not available!</Box>
            )}
            {/* {trending.map((product: Product, index) => {
              return (
                <TrendCard key={index}/>
              )
            })} */}
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}

export default Trending;