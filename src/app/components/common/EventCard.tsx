import { Box, Stack } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import "../../../css/cards/eventCard.css";
import { events } from "../../../libs/data/events";


export default function EventCard({ event }: any) {
  return (
    <Stack className="event-card">
      <Box className="image">
        <Box className="type">{event.type}</Box>

        <img src={event.img} alt="" />
      </Box>

      <Stack className="event-info">
        <Stack className="top-part">
          <Stack className="header">
            <CalendarMonthOutlinedIcon
              style={{
                color: "#bc0100",
                width: "17px",
              }}
            />

            <span>{event.date}</span>
          </Stack>

          <strong>{event.title}</strong>

          <p>{event.desc}</p>
        </Stack>

        <Stack className="location">

          <Stack className="time">
            <AccessTimeOutlinedIcon
              style={{
                color: "#bc0100",
                width: "17px",
              }}
            />

            <span>{event.time}</span>
          </Stack>

          <Stack className="time">
            <LocationOnOutlinedIcon
              style={{
                color: "#bc0100",
                width: "20px",
                marginLeft: "-1.8px",
              }}
            />

            <span style={{ marginLeft: "-1px" }}>
              {event.location}
            </span>
          </Stack>

        </Stack>
      </Stack>
    </Stack>
  );
}