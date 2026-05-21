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
            className="signup-container"
            direction={"row"}
          >
            <Box className="image-frame">
              <div className="tent"></div>
              <ModalImg className="img" src={"/icons/logo/books.jpg"} alt="camera" />
            </Box>
            <Stack className="signup-login-form">
              <Stack className="headings">
                <span>Sign Up</span>
                <p>Register now and become member of Morisaki bookshop</p>
              </Stack>
              <Stack className="forms">
                <Stack className="input-data">
                  <span>username</span>
                  <input
                    className="input"
                    type="text"
                    placeholder="username"
                    onChange={handleUsername}
                  />
                </Stack>
                <Stack className="input-data">
                  <span>phone number</span>
                  <input
                    className="input"
                    type="text"
                    placeholder="01012345678"
                    onChange={handlePhone}
                  />
                </Stack>
                <Stack className="input-data">
                  <span>password</span>
                  <input
                    className="input"
                    type="password"
                    placeholder="*********"
                    onChange={handlePassword}
                    onKeyDown={handlePasswordKeyDown}
                  />
                </Stack>

                <Button className="button" onClick={handleSignupRequest}>Sign Up</Button>

                <Stack className="footer-link">
                  <span>Don't have an account?</span>
                  <Button
                    variant="text"
                    size="small"
                    onClick={handleLoginOpen}
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
            className="login-container"
            direction={"row"}
          >
            <Box className="image-frame">
              <div className="tent"></div>
              <ModalImg className="img" src={"/icons/logo/books.jpg"} alt="camera" />
            </Box>
            <Stack className="signup-login-form">
              <Stack className="headings">
                <span>Login</span>
                <p>Welcome back to Morisaki bookshop</p>
              </Stack>
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
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}