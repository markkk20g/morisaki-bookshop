import { Box, Container, Stack } from "@mui/material";

const Statistic = () => {
  return (
    <div className="stats-page">
      <Container className="stats-container">
        <Stack className="stats-frame">
          <Stack className="stats-item">
            <img src="/icons/stat/bookstore-red.png" alt="" />
            <Stack className="text">
              <span>1991</span>
              <p>In business since</p>
            </Stack>
          </Stack>
          <Stack className="stats-item">
            <img src="/icons/stat/checkout-red.png" alt="" />
            <Stack className="text">
              <span>500K +</span>
              <p>Books sold</p>
            </Stack>
          </Stack>
          <Stack className="stats-item">
            <img src="/icons/stat/book-red.png" alt="" />
            <Stack className="text">
              <span>10K +</span>
              <p>unique books</p>
            </Stack>
          </Stack>
          <Stack className="stats-item">
            <img src="/icons/stat/customer-red.png" alt="" />
            <Stack className="text">
              <span>700K +</span>
              <p>customers served</p>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default Statistic;