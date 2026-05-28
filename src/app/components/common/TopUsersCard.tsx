import { Box, Button, Stack } from "@mui/material";
import { Product } from "../../../libs/types/product";
import StarIcon from '@mui/icons-material/Star';

interface TopUsersProps {

}

export default function TopUsersCard(props: TopUsersProps) {
  const { } = props;

  return (
    <Stack className="top-card">
      <Box className="top-card-frame">
        <img src={"/img/avatar.jpg"} alt=""/>
      </Box>
      <Stack className="top-card-content">
        <Stack className="top-card-titles">
          <span>Akex</span>
          <p>Description</p>
        </Stack>
        <Stack className="top-card-footer">
          <Box className="icon">
            <StarIcon sx={{mt: '4px'}} fontSize="small" />
          </Box>
          <span>177 PTS</span>
        </Stack>
      </Stack>
    </Stack>
  )
}