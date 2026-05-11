import { Box, Stack } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import "../../../css/cards/eventCard.css";


export default function EventCard() {
  return (
    <Stack className="event-card">
      <Box className="image">
        <img src="/img/event1.png" alt="" />
      </Box>
      <Stack className="event-info">
        <Stack className="header">
          <span>JUN 15 • 11 : 00</span>
        </Stack>
        <strong>Ethics in Digital Curation</strong>
        <p>A lively debate on the role of AI in personalizing literary 
          recommendations.
        </p>
        <Stack className="location">
          <div className="icon">
            <LocationOnOutlinedIcon />
          </div>
          <Stack className="address">
            <span>The Central Atrium</span>
            <p>422 Literature Lane, Manhattan, NY</p>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}