import { Box, Button, Stack } from "@mui/material";


export default function NewArrivalCard() {
  return (
    <Stack className="new-card">
      <Box className="new-frame">
        <img src="/img/new/buy-then-build.jpg" alt=""/>
      </Box>
      <Stack className="new-content">
        <Stack className="titles">
          <span>Buy Then Build</span>
          <p>Walker Daibebl</p>
        </Stack>
        <Stack className="new-footer">
          <span>$19.50</span>
          <Button className="butt">🛒 Add</Button>
        </Stack>
      </Stack>
    </Stack>
  )
}