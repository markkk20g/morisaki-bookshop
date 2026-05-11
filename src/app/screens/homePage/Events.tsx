import React from "react";
import EventCard from "../../components/common/EventCard";
import { Container, Stack } from "@mui/material";
import "../../../css/cards/eventCard.css";


export default function Events() {
  return (
    <div className="event-frame">
      <Container className="event-sect">
        <Stack className="event-main">
          <Stack className="title">
            <span>Upcoming Events</span>
            <p>Join the dialogue at our exclusive literary gatherings.</p>
          </Stack>
          <Stack className="cards">
            <EventCard />
          </Stack>
        </Stack>
      </Container> 
    </div>
  );
}