import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Button, Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../libs/types/common";
import { Messages } from "../../../libs/config";
import { LoginInput, MemberInput } from "../../../libs/types/member";
import { sweetErrorHandling } from "../../../libs/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import MemberService from "../../services/MemberService";

import "../../../css/login-signup.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  // width: auto;
  height: fit;
  border-radius: 10px;
  background: #000;
  // margin-top: 9px;
  // margin: 10px;
  object-fit: cover;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
  handleSignupOpen: () => void;
  handleLoginOpen: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { 
    signupOpen, 
    loginOpen, 
    handleSignupClose, 
    handleLoginClose, 
    handleSignupOpen, 
    handleLoginOpen
  } = props;
  const classes = useStyles();

  const [memberNick, setMemberNick] = useState<string>('');
  const [memberPhone, setMemberPhone] = useState<string>('');
  const [memberPassword, setMemberPassword] = useState<string>('');

  const { setAuthMember } = useGlobals();
  
  /** HANDLERS **/

  const handleUsername = (e: T) => {
    setMemberNick(e.target.value);
  };
  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };
  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };

  const handlePasswordKeyDown = (e: T) => {
    if(e.key === 'Enter' && signupOpen) {
      handleSignupRequest().then();
    } else if(e.key === 'Enter' && loginOpen) {
      handleLoginRequest().then();
    }
  };

  const handleSignupRequest = async () => {
    try {
      const isFulfill = 
        memberNick !== '' && memberPhone !== '' && memberPassword !== '';
      if(!isFulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      // Context will be used
      // Saving Authenticated user
      setAuthMember(result);
      handleSignupClose();
    } catch(err) {
      console.log(err)
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFulfill = 
        memberNick !== '' && memberPassword !== '';
      if(!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      // Context will be used
      // Saving Authenticated user
      setAuthMember(result);
      handleLoginClose();
    } catch(err) {
      console.log(err)
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };
  

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "800px" }}
          >
            <Box className="image-frame">
              {/* <ModalImg className="img" src={"/icons/logo/morisaki-edited.jpg"} alt="camera" /> */}
              <img className="img" src={"/icons/logo/morisaki-edite.jpg"} alt="camera"/>
            </Box>
            <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
              <h2>Signup Form</h2>
              <TextField
                sx={{ marginTop: "7px" }}
                id="outlined-basic"
                label="username"
                variant="outlined"
                onChange={handleUsername}
              />
              <TextField
                sx={{ my: "17px" }}
                id="outlined-basic"
                label="phone number"
                variant="outlined"
                onChange={handlePhone}
              />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ marginTop: "30px", width: "120px" }}
                variant="extended"
                color="primary"
                onClick={handleSignupRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      {/*********   LOGIN FORM   **********/}
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            // className={classes.paper}
            className="login-container"
            direction={"row"}
            // sx={{ width: "700px" }}
          >
            <Box className="image-frame">
              <div className="tent"></div>
              <ModalImg className="img" src={"/icons/logo/books.jpg"} alt="camera" />
              {/* <img className="img" src={"/icons/logo/books.jpg"} alt="camera"/> */}
            </Box>
            <Stack
              className="login-form"
              // sx={{
              //   marginLeft: "65px",
              //   marginTop: "25px",
              //   alignItems: "center",
              // }}
            >
              <Stack className="headings">
                <span>Login</span>
                <p>Welcome back to Morisaki bookshop</p>
              </Stack>
              {/* <h2>Login Form</h2> */}
              <Stack className="forms">
                <Stack className="input-data">
                  <span>username</span>
                  <input
                    className="input"
                    type="text"
                    onChange={handleUsername}
                  />
                </Stack>

                <Stack className="input-data">
                  <span>password</span>
                  <input
                    className="input"
                    type="password"
                    onChange={handlePassword}
                    onKeyDown={handlePasswordKeyDown}
                  />
                </Stack>

                <Button className="button" onClick={handleLoginRequest}>Login</Button>

                <Stack className="footer-link">
                  <span>Don't have an account?</span>
                  <Button
                    variant="text"
                    size="small"
                    onClick={handleSignupOpen}
                    sx={{
                      textTransform: 'none',
                      minWidth: 'auto',
                      p: 0,
                      verticalAlign: 'baseline',
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
              </Stack>
              {/* <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                sx={{ my: "10px" }}
                onChange={handleUsername}
              />
              <TextField
                id={"outlined-basic"}
                label={"password"}
                variant={"outlined"}
                type={"password"}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ marginTop: "27px", width: "120px" }}
                variant={"extended"}
                color={"primary"}
                onClick={handleLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab> */}
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}