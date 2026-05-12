import { Box, Stack } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import "../../../css/cards/eventCard.css";


export default function EventCard() {
  return (
    <Stack className="event-card">
      <Box className="image">
        <Box className="type">networking</Box>
        <img src="/img/event1.png" alt="" />
      </Box>
      <Stack className="event-info">
        <Stack className="header">
          <CalendarMonthOutlinedIcon style={{color:' #bc0100', width: '17px' }} />
          <span>JUN 15</span>
        </Stack>
        <strong>Ethics in Digital Curation</strong>
        <p>An evening of networking for the city's finest digital minds. 
          Cocktails, music, and impromptu design discussions.
        </p>
        <Stack className="location">
          <Stack className="time">
            <AccessTimeOutlinedIcon 
              style={{color:' #bc0100', width: '17px' }}
            />
            <span>6:00 PM - 9:00 PM</span>
          </Stack>
          <Stack className="time">
            <LocationOnOutlinedIcon 
              style={{color:' #bc0100', width: '20px', marginLeft: '-1.8px' }}
            />
            <span style={{marginLeft: '-1px'}}>The Central Atrium</span>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}