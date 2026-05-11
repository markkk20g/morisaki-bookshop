// import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import "../../../css/card.css";
import "../../../css/orders.css";

export default function PauseOrders() {
  return (
    <TabPanel value="1">
      <Stack className="content-card">
        <Stack className="content">
          <Stack className="names"></Stack>
          <Stack className="numbers"></Stack>
        </Stack>
      </Stack>
    </TabPanel>
  )
}