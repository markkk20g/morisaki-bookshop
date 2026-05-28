import { Container, Stack } from "@mui/material";
import React from "react";

export default function TopUsers() {
  return (
    <div className="top-users-page">
      <Container className="top-users-cont">
        <Stack className="top-users-screen">
          <Stack className="title">
            <span>Top Users</span>
            <p>Our most active readers leading the community</p>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}