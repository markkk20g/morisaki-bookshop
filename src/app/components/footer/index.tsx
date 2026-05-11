import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Divider from "../divider";

const Footers = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  background: #343434;
  background-size: cover;
  box-sizing: bordex-box;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container sx={{ boxSizing: " border-box" }}>
        <Stack flexDirection={"row"} sx={{ mt: "47px" }} className="foot-frame">
          <Stack flexDirection={"column"}>
            <Box className="foot-logo">
              <img src="/icons/white1.png" className="foot-logo" alt="brand logo"/>
            </Box>
            <Box className="footer-store-desc">
              Discover a world of stories. From new releases to timeless
              classics, find your next great escape in our cozy local shop.
            </Box>
            <Box sx={{ mt: "40px" }}>+82 10 1020 3040</Box>
            <Box sx={{ mt: "10px" }}>moonlightbooks@gmail.com</Box>
            <Box sx={{ mt: "100px" }}>
              <img src={"/icon/mastercard-pay.png"} />
              <img src={"/icon/mastercard-pay.png"} />
              <img src={"/icon/mastercard-pay.png"} />
              <img src={"/icon/mastercard-pay.png"} />
            </Box>
          </Stack>

          <Stack className="foot-second-col">
            <Box className="foot-title">Contact Info</Box>
            <Box className="contact-info-details">
              123 Street Name, Region City Name
            </Box>
            <Box className="work-hours">
              Monday - Friday: 9:00 - 20: 00 Saturday: 10:00 - 16:00
            </Box>
          </Stack>

          <Stack className="foot-third-col">
            <Box className="foot-title">Explore</Box>
            <Box className="foot-links">
              <Link to="/">Home</Link>
              <Link to="/">Books</Link>
              <Link to="/">Events</Link>
              {authMember && <Link to="/">Orders</Link>}
              {authMember && <Link to="/">MyPage</Link>}
              <Link to="/">Help</Link>
            </Box>
          </Stack>

          <Stack className="foot-forth-col">
            <Box className="foot-title">Subscribe</Box>
            <Box className="marketing-txt">
              Get exclusive Publishing & Marketing to help you create and sell
              your books more effectively! You can unsubscribe at any time
            </Box>
            <Box></Box>
          </Stack>
        </Stack>
      </Container>
    </Footers>
  );
}
