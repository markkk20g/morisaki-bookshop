import { Box, Button, Stack } from "@mui/material";
import { Product } from "../../../libs/types/product";
import StarIcon from '@mui/icons-material/Star';
import { Member } from "../../../libs/types/member";
import { serverApi } from "../../../libs/config";

interface TopUsersProps {
  member: Member;
}

export default function TopUsersCard(props: TopUsersProps) {
  const { member } = props;

  return (
    <Stack className="top-card">
      <Box className="top-card-frame">
        <img 
          src={member.memberImage 
          ? `${serverApi}/${member.memberImage}` 
          : "/img/avatar.jpg"} 
          alt=""
        />
      </Box>
      <Stack className="top-card-content">
        <Stack className="top-card-titles">
          <span>{member.memberNick}</span>
          <p>{member.memberDesc}</p>
        </Stack>
        <Stack className="top-card-footer">
          <Box className="icon">
            <StarIcon sx={{mt: '4px'}} fontSize="small" />
          </Box>
          <span>{member.memberPoints} PTS</span>
        </Stack>
      </Stack>
    </Stack>
  )
}