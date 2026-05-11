// import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import PauseOrders from "./PauseOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FInishedOrders";
import "../../../css/card.css";
import "../../../css/orders.css";

export default function OrdersPage() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="orders-page">
      <Container className="orders-screen">
        <Stack className="left-side">
          <Stack className="user-info">
            <div className="overlay"></div>
            <Stack className="user-card">
              <div className="avatar">
                <img src="/img/avatar.jpg" alt=""/>
              </div>
              <span>Alex Walker</span>
              <p>Manhattan, NY</p>
            </Stack>
          </Stack>
          <Stack className="payment">
            <Box className="header">
              <span>Payment Methods</span>
            </Box>
            <Stack className="pay-ways">
              <Box className="way">
                <img src="/icons/visa-pay.webp" alt=""/>
              </Box>
              <Box className="way">
                <img src="/icons/mastercard-pay.png" alt=""/>
              </Box>
              <Box className="way">
                <img src="/icons/paypal-pay.webp" alt=""/>
              </Box>
              <Box className="way">
                <img src="/icons/american-pay.webp" alt=""/>
              </Box>
            </Stack>
            <Stack className="form">
              <Stack className="name">
                <span>card holder name</span>
                <input 
                  placeholder="Alex Walker"
                />
              </Stack>
              <Stack className="name">
                <span>card number</span>
                <input 
                  placeholder="**** **** **** 4421"
                />
              </Stack>
              <Stack className="expiry">
                <Stack className="exp">
                  <span>expiry</span>
                  <input 
                    placeholder="MM/YY"
                  />
                </Stack>
                <Stack className="exp">
                  <span>CVV</span>
                  <input 
                    placeholder="***"
                  />
                </Stack>
              </Stack>
              <Stack className="buttons">
                <Box className="btn">
                  <Button className="txt">update details</Button>
                </Box>
                <Box className="btn" style={{background: 'linear-gradient(17.60deg, #bc0100 0%,#d53e0b 100%)'}}>
                  <Button className="txt">payment</Button>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Stack className="right">
          <Stack className="header">
            <span>Orders History</span>
            <p>A chronological record of your collected works and 
              curated experiences.
            </p>
          </Stack>
          <Stack className="sections">
            <Box sx={{ width: '100%', typography: 'body1' }} className="section-box">
              <TabContext value={value}>
                <Box className="head-tabs">
                  <TabList 
                    onChange={handleChange} 
                    aria-label="lab API tabs example"
                    TabIndicatorProps={{style: {display: 'none'}}}
                  >
                    <Tab 
                      label="Item One"
                      value="1"
                      className="tab"
                    />
                    <Tab label="Item Two" value="2" className="tab"/>
                    <Tab label="Item Three" value="3" className="tab"/>
                  </TabList>
                </Box>
                <Stack className="box-content">
                  <PauseOrders />
                  <ProcessOrders />
                  <FinishedOrders />
                </Stack>
              </TabContext>
            </Box>

            {/* <Box>
              <Button>All Orders</Button>
            </Box>
            <Box>
              <Button>In Progress</Button>
            </Box>
            <Box>
              <Button>Finished</Button>
            </Box> */}
          </Stack>
          {/* <Stack className="content"></Stack> */}
          <Stack className="help">
            <Stack className="title-desc">
              <span>Need assintance?</span>
              <p>Our team ensures that your orders delivered with utmost 
                care and have filfilled any expectations of yours. 
                In case any accidents occured reach our staff members.
              </p>
              <strong>+82 10 2097 7234</strong>
              <p style={{marginTop: '-14px'}}>morisaki-lib@gmail.com</p>
            </Stack>
            <div className="main-img">
              <img src="/img/interior-n.png"/>
            </div>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}