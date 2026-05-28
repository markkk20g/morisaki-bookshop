import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Divider from "../divider";
import "../../../css/footer.css";
import { useGlobals } from "../../hooks/useGlobals";


const Footers = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  background: #1d1c1e;
  background-size: cover;
  box-sizing: bordex-box;
`;

export default function Footer() {
  const { authMember } = useGlobals();

  return (
    <div className="footer-div">
      <Container className="foot-cont">
        <Stack className="foot-frame">
          <Stack className="logo-desc">
            <Box className="foot-logo">
              <img src="/icons/logo/mori2.png" alt="brand logo"/>
            </Box>
            <Box className="foot-desc">
              Discover a world of stories. From new releases to timeless
              classics, find your next great escape in our cozy local shop.
            </Box>
            <span>+82 10 1020 3040</span>
            <p>morisaki-lib@gmail.com</p>
            <Box className="pay-methods">
              {/* <img src={"/icons/visa-pay.webp"} />
              <img src={"/icons/mastercard-pay.png"} />
              <img src={"/icons/paypal-pay.webp"} />
              <img src={"/icons/american-pay.webp"} /> */}
            </Box>
          </Stack>
              
          <Stack className="second-col">
            <Box className="col-title">Contact Info</Box>
            <span style={{marginTop: '8px', marginBottom: '-5px'}}>
              58 Warren St, New York, NY 10007
            </span>
            <span>
              143 7th Ave, Brooklyn, NY 11215
            </span>
            <p>
              Monday - Friday: 9:00 - 19: 00, 
              Saturday: 10:00 - 16:00
            </p>
          </Stack>
          
          <Stack className="third-col">
            <Box className="col-title">Explore</Box>
            <Box className="foot-links">
              <Link to="/">Home</Link>
              <Link to="/products">Books</Link>
              {authMember && <Link to="/orders">Orders</Link>}
              {authMember && <Link to="/my-page">MyPage</Link>}
              <Link to="/help">Help</Link>
            </Box>
          </Stack>

          <Stack className="forth-col">
            <Box className="col-title">Subscribe</Box>
            <Stack className="subscribe">
              <input 
                type="text"
                placeholder="your email"
              />
              <Button className="button">Subscribe</Button>
            </Stack>
            <span>
              Get exclusive Publishing & Marketing to help you create and sell
              your books more effectively! You can unsubscribe at any time
            </span>
            
          </Stack>
        </Stack>
      </Container>
    </div>

    // <Footers>
    //   <Container sx={{ boxSizing: " border-box" }}>
    //     <Stack flexDirection={'row'} sx={{ mt: "47px" }} className="foot-frame">
    //       <Stack flexDirection={"column"} className="logo-desc">
    //         <Box className="foot-logo">
    //           <img src="/icons/logo/mori2.png" className="foot-logo" alt="brand logo"/>
    //         </Box>
    //         <Box className="footer-store-desc">
    //           Discover a world of stories. From new releases to timeless
    //           classics, find your next great escape in our cozy local shop.
    //         </Box>
    //         <Box sx={{ mt: "40px" }}>+82 10 1020 3040</Box>
    //         <Box sx={{ mt: "10px" }}>moonlightbooks@gmail.com</Box>
    //         <Box sx={{ mt: "100px" }}>
    //           {/* <img src={"/icons/visa-pay.webp"} />
    //           <img src={"/icons/mastercard-pay.png"} />
    //           <img src={"/icons/paypal-pay.webp"} />
    //           <img src={"/icons/american-pay.webp"} /> */}
    //         </Box>
    //       </Stack>

    //       <Stack className="foot-second-col">
    //         <Box className="foot-title">Contact Info</Box>
    //         <Box className="contact-info-details">
    //           123 Street Name, Region City Name
    //         </Box>
    //         <Box className="work-hours">
    //           Monday - Friday: 9:00 - 20: 00 Saturday: 10:00 - 16:00
    //         </Box>
    //       </Stack>

    //       <Stack className="foot-third-col">
    //         <Box className="foot-title">Explore</Box>
    //         <Box className="foot-links">
    //           <Link to="/">Home</Link>
    //           <Link to="/">Books</Link>
    //           <Link to="/">Events</Link>
    //           {authMember && <Link to="/">Orders</Link>}
    //           {authMember && <Link to="/">MyPage</Link>}
    //           <Link to="/">Help</Link>
    //         </Box>
    //       </Stack>

          // <Stack className="foot-forth-col">
          //   <Box className="foot-title">Subscribe</Box>
          //   <Box className="marketing-txt">
          //     Get exclusive Publishing & Marketing to help you create and sell
          //     your books more effectively! You can unsubscribe at any time
          //   </Box>
          //   <Box></Box>
          // </Stack>
    //     </Stack>
    //   </Container>
    // </Footers>
  );
}
