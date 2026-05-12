// import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import "../../../css/card.css";
import "../../../css/orders.css";

export default function FinishedOrders() {
  return (
    <TabPanel value="3" sx={{padding: '0px'}}>
      <Stack className="content-card">
        <Stack className="content">
          <Stack className="head">
            <Stack className="title">
              <span>Order #RF-92834</span>
              <p>2026 May 12 - 19 : 50</p>
            </Stack>
            <Stack className="butts">
              {/* <Button className="verify">Verify to fulfill</Button> */}
              {/* <Button className="pay">payment</Button> */}
            </Stack>
          </Stack>
          <Stack className="orders">
            <Stack className="item">
              <Stack className="item-title">
                <Box>
                  <img src="/img/new/lie-to-me.webp" alt=""/>
                </Box>
                <Stack className="names">
                  <span>The Great Gatsby</span>
                  <p>F. Scott Fitzgerald</p>
                </Stack>
              </Stack>
              <Stack className="item-price">
                <span>$17.50</span>
                <p>Qty: 1</p>
              </Stack>
            </Stack>
            <Stack className="item">
              <Stack className="item-title">
                <Box>
                  <img src="/img/new/lie-to-me.webp" alt=""/>
                </Box>
                <Stack className="names">
                  <span>The Great Gatsby</span>
                  <p>F. Scott Fitzgerald</p>
                </Stack>
              </Stack>
              <Stack className="item-price">
                <span>$17.50</span>
                <p>Qty: 1</p>
              </Stack>
            </Stack>
            <Stack className="item">
              <Stack className="item-title">
                <Box>
                  <img src="/img/new/lie-to-me.webp" alt=""/>
                </Box>
                <Stack className="names">
                  <span>The Great Gatsby</span>
                  <p>F. Scott Fitzgerald</p>
                </Stack>
              </Stack>
              <Stack className="item-price">
                <span>$17.50</span>
                <p>Qty: 1</p>
              </Stack>
            </Stack>
            
          </Stack>
          <Stack className="sums">
            <Stack className="cost">
              <span>Subtotal (3 items)</span>
              <p>$ 52.50</p>
            </Stack>
            <Stack className="cost">
              <span>Shipping</span>
              <p>Free</p>
            </Stack>
            <Stack className="total">
              <span>Total</span>
              <p>$ 52.50</p>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </TabPanel>
  )
}