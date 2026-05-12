import React, { useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductCard from "../../components/common/ProductCard";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SearchIcon from '@mui/icons-material/Search';
import "../../../css/products.css";
import "../../../css/card.css";

export default function Products() {
  const [products, setProducts] = useState<number[]>([1, 2, 3, 4, 5, 6,])

  return (
    <div className="products-screen-frame">
      <Container className="products-screen">
        <Stack className="sidebar-filter">
          <Stack className="sidebar-category">
            <Box className="category-title">CATEGORIES /
              GENRE</Box>
            <Stack className="category-list">
              <a className="list-item active">
                <p className="category-name">Fiction</p>
                <p className="category-total">248</p>
              </a>
              <a className="list-item">
                <p className="category-name">Business & Economics</p>
                <p className="category-total">78</p>
              </a>
              <a className="list-item">
                <p className="category-name">Self-help & Improvement</p>
                <p className="category-total">109</p>
              </a>
              <a className="list-item">
                <p className="category-name">Technology & Science</p>
                <p className="category-total">49</p>
              </a>
              <a className="list-item">
                <p className="category-name">Kids Literature</p>
                <p className="category-total">46</p>
              </a>
              <a className="list-item">
                <p className="category-name">Magazines & Journals</p>
                <p className="category-total">27</p>
              </a>
            </Stack>
          </Stack>
          <Stack className="sidebar-sorting">
            <Box className="category-title">SORTED BY</Box>
            <Box className="sorting-tool" flexDirection={"row"}>
              <p>Relevance</p>
              <ExpandMoreIcon />
            </Box>
            <Box>
              <select>
                <option>Relevance</option>
                <option>Newest Arrivals</option>
                <option>Oldest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
              </select>
            </Box>
          </Stack>
        </Stack>


        <Stack className="main-frame">
          <Stack className="main-frame-info">
            <Stack className="collect-title">
              <span>Our Products</span>
            </Stack>
            <Stack className="collect-search">
              <input 
                type="search"
                placeholder="Search products..."
                // value={""}
              />
              <Button className="search-btn">
                Search
                <SearchIcon fontSize="small" />
              </Button>
            </Stack>
          </Stack>
          <Stack className="main-frame-items">
            {products.map((product, index) => {
              return <ProductCard key={index} />
            })}
          </Stack>
          <Stack className="main-frame-pagination"></Stack>
          <Stack className="main-frame-location">
            <Stack className="location-frame">
              <Stack className="location-info">
                <Stack className="title-desc">
                  <span>Find us in person</span>
                  <p>Our physical locations are more than just shops. 
                    They are curated spaces designed for discovery. 
                    Visit us for exclusive events, author signings, 
                    and a hand-picked physical archive.
                  </p>
                </Stack>
                <Stack className="addresses">
                  <Stack className="address1">
                    <div className="icon"><LocationOnOutlinedIcon /></div>
                    <Stack className="address-txt">
                      <span>The Central Atrium</span>
                      <p>422 Literature Lane, Manhattan, NY</p>
                    </Stack>
                  </Stack>
                  <Stack className="address1">
                    <div className="icon"><LocationOnOutlinedIcon /></div>
                    <Stack className="address-txt">
                      <span>The Central Atrium</span>
                      <p>422 Literature Lane, Manhattan, NY</p>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              <Stack className="location-visuals">
                <div className="main-img">
                  <img src="/img/interior.jpg"/>
                </div>
                <div className="tag">
                  <p>Curated Events</p>
                  <p>Every Thursday</p>
                </div>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

      </Container>
    </div>
  );
}