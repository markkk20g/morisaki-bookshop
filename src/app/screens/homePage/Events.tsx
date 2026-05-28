import React from "react";
import EventCard from "../../components/common/EventCard";
import { Box, Container, Stack } from "@mui/material";
import "../../../css/cards/eventCard.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { events } from "../../../libs/data/events";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function Events() {
  return (
    <div className="event-frame">
      <Container className="event-sect">
        <Stack className="event-main">
          <Stack className="title">
            <span>Upcoming Events</span>
            <p>Join the dialogue at our exclusive literary gatherings.</p>
          </Stack>

          {/* <Swiper
            className={"events-info swiper-wrapper"}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={30}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,
            }}
          >
            <SwiperSlide className={"events-info-frame"}>
              <Stack className="cards">
                {events.map((event, number) => {
                 return (
                  <EventCard key={number} event={event} />
                  );
                })}
              </Stack>
            </SwiperSlide>
          </Swiper> */}
          <Swiper
            className="swiper-wrapper"
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={"auto"}
            spaceBetween={20}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,
            }}
          >
            {events.map((event, index) => (
              <SwiperSlide
                key={index}
                className="event-slide"
              >
                <EventCard event={event} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Box className={"prev-next-frame"}>
            <img
              src={"/icons/arrow.png"}
              className={"swiper-button-prev"}
              style={{ transform: "rotate(-180deg)", marginLeft: '-30px' }}
            />
            <div className={"dot-frame-pagination swiper-pagination"}></div>
            <img
              src={"/icons/arrow.png"}
              className={"swiper-button-next"}
              style={{marginRight: '-30px'}}
            />
          </Box>
        </Stack>
      </Container> 
    </div>
  );
}