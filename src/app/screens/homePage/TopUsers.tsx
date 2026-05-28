import { Container, Stack } from "@mui/material";
import React from "react";
import TopUsersCard from "../../components/common/TopUsersCard";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveTopUsers } from "./selector";
import { useSelector } from "react-redux";
import { Member } from "../../../libs/types/member";

/********** REDUX SELECTOR **********/

const topUsersRetriever = createSelector(
  retrieveTopUsers, 
  (topUsers) => ({topUsers})
);

export default function TopUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className="top-users-page">
      <Container className="top-users-cont">
        <Stack className="top-users-screen">
          <Stack className="title">
            <span>Top Users</span>
            <p>Our most active readers leading the community</p>
          </Stack>
          <Stack className="top-main">
            {topUsers?.map((member: Member) => {
              return (
                <TopUsersCard key={member._id} member={member} />
              );
            })}
             
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}