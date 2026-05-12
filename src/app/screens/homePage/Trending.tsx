import { Container, Stack } from "@mui/material";
import { useState } from "react";
import TrendCard from "../../components/common/TrendCard";

const Trending = () => {
  const [trending, setTrending] = useState<number[]>([1, 2, 3])
  return (
    <div className="trend-page">
      <Container className="trend-container">
        <Stack className="trend-frame">
          <Stack className="trend-head">
            <span>Trending Now</span>
            <p>Trending books fresh for our customers</p>
          </Stack>
          <Stack className="trend-main">
            {/* <Stack className="trend-card"></Stack> */}
            {trending.map((ele, index) => {
              return (
                <TrendCard key={index}/>
              )
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}

export default Trending;