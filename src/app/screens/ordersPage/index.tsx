// import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import PauseOrders from "./PauseOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FInishedOrders";
import "../../../css/card.css";
import "../../../css/orders.css";
import { Dispatch } from "@reduxjs/toolkit";
import { Order, OrderInquery } from "../../../libs/types/order";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { useDispatch } from "react-redux";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { OrderStatus } from "../../../libs/enums/order.enum";
import OrderService from "../../services/OrderService";
import { serverApi } from "../../../libs/config";

import "../../../css/card.css";
import "../../../css/orders.css";

/****************************************
              REDUX SLICE
*****************************************/
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } = actionDispatch(useDispatch());
  const { authMember, orderBuilder } = useGlobals();

  const [value, setValue] = useState('1');
  const history = useHistory();

  const [orderInquiry, setOrderInquiry] = useState<OrderInquery>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order.getMyOrders({...orderInquiry, orderStatus: OrderStatus.PAUSE})
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order.getMyOrders({...orderInquiry, orderStatus: OrderStatus.PROCESS})
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order.getMyOrders({...orderInquiry, orderStatus: OrderStatus.FINISH})
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder])

  /*********** HANDLERS *************/

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if(!authMember) history.push('/');

  return (
    <div className="orders-page">
      <Container className="orders-screen">
        <Stack className="left-side">
          <Stack className="user-info">
            <div className="overlay"></div>
            <Stack className="user-card">
              <div className="avatar">
                <img 
                  src={authMember?.memberImage 
                  ? `${serverApi}/${authMember.memberImage}` 
                  : "/img/avatar.jpg"} alt="user image"
                />
              </div>
              <span>{authMember?.memberNick}</span>
              <p>
                {authMember?.memberAddress ? authMember.memberAddress : "no address given yet"}
              </p>
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
                    className="tablist"
                    aria-label="lab API tabs example"
                    TabIndicatorProps={{style: {display: 'none'}}}
                  >
                    <Tab 
                      label="Paused"
                      value="1"
                      className="tab"
                      // color={'#bc0100'}
                    />
                    <Tab label="process" value="2" className="tab"/>
                    <Tab label="finished" value="3" className="tab"/>
                  </TabList>
                </Box>
                <Stack className="box-content">
                  <PauseOrders setValue={setValue} />
                  <ProcessOrders setValue={setValue} />
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
              <p style={{marginTop: '-14px', fontWeight: '600'}}>morisaki-lib@gmail.com</p>
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