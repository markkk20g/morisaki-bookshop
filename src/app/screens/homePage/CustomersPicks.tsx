import { Box, Container, Stack } from "@mui/material";
import React from "react";

export default function CustomersPicks() {
  return (
    <div className="customer-frame">
      <Container className="customer-container">
        <Stack className="customer-item">
          <Box className="customer-blur"></Box>
          <Stack className="item-card">
            <Box className="item-data"><img src="/img/book1.jpg" /></Box>
            <Stack className="item-details">
              <Box sx={{ fontSize: '25px', fontWeight: '700', mb: '25px' }}>5 starts</Box>
              <Box sx={{ fontSize: '20px', fontWeight: '700', mb: '15px', mt: '10px' }}>Think and Grow Rich</Box>
              <Box sx={{ fontSize: '17px', fontWeight: '600' }}>Napoleon Hill</Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack className="customer-item-info">
          <Box>COMMUNITY FAVORITES</Box>
          <Box>Customers' Picks</Box>
          <Box>Book's description will be written here. That's why book description is important</Box>
          <Box><a>Add basket</a></Box>
        </Stack>
      </Container>
    </div>
  );
}