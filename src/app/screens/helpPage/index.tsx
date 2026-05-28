
import React, { useId } from "react";
import GavelIcon from '@mui/icons-material/Gavel';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import { Box, Button, Container, Stack } from "@mui/material";

// import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

import "../../../css/help.css";
import { faq } from "../../../libs/data/faq";


export default function HelpPage() {
  const id = useId();
  return (
    <div className="help-page">
      <Container className="help-screen">
        <Stack className="terms-faq">
          <Stack className="terms">
            <Stack className="title">
              <GavelIcon />
              <span>TERMS OF SERVICE</span>
            </Stack>
            <Stack className="terms-con">
              <Box className="rules">
                <span>1. Introduction</span>
                <p>Welcome to The Digital Curator. By accessing our editorial 
                  services, you agree to comply with and be bound by the 
                  following terms and conditions of use, which together with 
                  our privacy policy govern our relationship with you.
                </p>
              </Box>
              <Box className="rules">
                <span>2. Intellectual Property</span>
                <p>The content, layout, design, data, databases and graphics 
                  on this website are protected by United Kingdom and other 
                  international intellectual property laws and are owned by 
                  The Digital Curator. Unless expressly permitted in writing, 
                  no part of the website may be reproduced.
                </p>
              </Box>
              <Box className="rules">
                <span>3. User Conduct</span>
                <p>You must not use our website in any way that causes, or may 
                  cause, damage to the website or impairment of the availability 
                  or accessibility of the website; or in any way which is 
                  unlawful, illegal, fraudulent or harmful.
                </p>
              </Box>
              <Box className="rules">
                <span>4. Subscription Services</span>
                <p>Our curated monthly bundles are subject to availability. We 
                  reserve the right to modify the selection of titles based 
                  on editorial standards and publisher stock. Pricing is subject
                  to change with a 30-day notice period.
                </p>
              </Box>
              <Box className="rules">
                <span>5. Liability</span>
                <p>We do not guarantee that the information on this website is 
                  correct, we do not warrant its completeness or accuracy; 
                  nor do we commit to ensuring that the website remains 
                  available or that the material on the website is kept up-to-date.
                </p>
              </Box>
            </Stack>
          </Stack>
          <Stack className="faq">
            <Stack className="title">
              <HelpCenterOutlinedIcon />
              <span>FAQ</span>
            </Stack>
            <Stack className="faq-con">
              {faq.map((value, number) => {
                return (
                  <Accordion 
                    key={number} 
                    className="accor-frame"
                    sx={{
                      '&:before': {
                        display: 'none',
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreOutlinedIcon />}
                      aria-controls={`${id}-panel1-content`}
                      id={`${id}-panel1-header`}
                      className="accor-quest"
                      sx={{
                        '& .MuiAccordionSummary-content': {
                          margin: 0,
                          width: '100%',
                        },
                      }}
                    >
                      <Typography component={'span'}>{value.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="accor-ans">
                      <Typography>
                        {value.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
              
            </Stack>
          </Stack>
        </Stack>
        <Stack className="contact-sec">
          <Stack className="form-con">
            <div className="shape">
            </div>
            <Stack className="form">
              <Stack className="header">
                <span>Contact Our Team</span>
                <p>Need specialized assistance? Send us a message and a 
                  member of our team will respond within 24 hours.
                </p>
              </Stack>
              <Stack className="main">
                <Box className="form-in">
                  <span>your name</span>
                  <input 
                    placeholder="Elias Thorne"
                  />
                </Box>
                <Box className="form-in">
                  <span>email address</span>
                  <input 
                    placeholder="elias@example.com"
                  />
                </Box>
                <Box className="form-in">
                  <span>subject</span>
                  <select name="general">
                    <option value={'general'}>General</option>
                    <option value={'general'}>Shipping</option>
                    <option value={'general'}>Privacy</option>
                  </select>
                </Box>
                <Box className="form-in">
                  <span>message</span>
                  <textarea name="message" rows={5} placeholder="How can we help?">
                    
                  </textarea>
                </Box>
                <Box>
                  <Button className="button">Send Message</Button>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}