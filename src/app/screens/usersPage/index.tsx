import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import "../../../css/users.css";
import "../../../css/card.css";

export default function UsersPage() {
  const authMember = null;
  return (
    <div className="my-page">
      <Container className="my-screen">
        <Stack className="user-details">
          <Box className="avatar">
            <div className="shape"></div>
            <img src="/img/avatar.jpg" alt=""/>
          </Box>
          <Stack className="user-info">
            <Stack className="name-type">
              <p>USER</p>
              <span>Alex Walker</span>
            </Stack>
            <Stack className="address">
              <span>Manhattan NY</span>
              <p>Classical novels lover and enthusiast</p>
            </Stack>
          </Stack>
        </Stack>
        <Stack className="order-details">
          <Stack className="buttons">
            <div className="icon"><ListAltOutlinedIcon /></div>
            <Stack className="detail">
              <span>View All Orders</span>
              <p>Track and manage history</p>
            </Stack>
          </Stack>
          <Stack className="buttons">
            <div className="icon"><PaymentsOutlinedIcon /></div>
            <Stack className="detail">
              <span>Payment Methods</span>
              <p>Manage cards & bills</p>
            </Stack>
          </Stack>
          <Stack className="buttons">
            <div className="icon"><FmdGoodOutlinedIcon /></div>
            <Stack className="detail">
              <span>Addresses</span>
              <p>Default shipping & pickup</p>
            </Stack>
          </Stack>
        </Stack>
        <Stack className="form-history">
          <Stack className="form-frame">
            <Stack className="header">
              <span>Account Settings</span>
              <p>UPDATE YOUR USER PROFILE</p>
            </Stack>
            <Stack className="form">
              <Stack className="img-upload">
                <Box className="img-frame">
                  <img src={authMember ? '' : '/img/avatar.jpg'} alt=""/>
                </Box>
                <Stack className="upload-form">
                  <form>
                    <span>Upload Image</span>
                    
                    <input 
                      type="file"
                      accept="image/*"
                      
                    />
                  </form>
                </Stack>
              </Stack>
              <Stack className="input-areas">
                <Box className="form-in">
                  <span>username</span>
                  <input 
                    // placeholder="Alex Walker"
                    value={'Alex Walker'}
                  />
                </Box>
                <Box className="form-in">
                  <span>phone</span>
                  <input 
                    // placeholder="+82 10 1234-5678"
                    value={'+82 10 1234 5678'}
                  />
                </Box>
                <Box className="form-in">
                  <span>address</span>
                  <textarea name="message" rows={4} placeholder="221B Baker Street, London, UK">
                    
                  </textarea>
                </Box>
                <Box className="form-in">
                  <span>Description</span>
                  <textarea name="message" rows={4} placeholder="Tell us about you">
                    
                  </textarea>
                </Box>
                <Box>
                  <Button className="button">Save Changes</Button>
                </Box>
              </Stack>
            </Stack>
          </Stack>
          <Stack className="order-history">
            <Stack className="header">
              <Stack className="title">
                <span>Recent Orders</span>
                <p>YOUR RECENTLY ACQUIRED PRODUCTS</p>
              </Stack>
              <a href="/orders">VIEW ALL</a>
            </Stack>
            <Stack className="orders">
              
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}