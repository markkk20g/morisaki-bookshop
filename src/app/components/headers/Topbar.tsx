import { Box, Container, Stack } from "@mui/material"
import { NavLink } from "react-router-dom"
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const Topbar = () => {
  const authMember = true;

  return (
    <div className="topbar-frame">
      <Container className="topbar-container">
        <Box className="left">
          <NavLink to={'/'}>
            <img className="brand-logo" src="/icons/logo/mori1.png" alt=""/>
          </NavLink>
        </Box>
        <Stack className="right">
          <Box className="top-links">
            <NavLink to="/" activeClassName="underline">Home</NavLink>
          </Box>
          <Box className="top-links">
            <NavLink to="/products" activeClassName="underline">Books</NavLink>
          </Box>
          {authMember ? (
            <Box className="top-links">
              <NavLink to="/orders" activeClassName="underline">Orders</NavLink>
            </Box>
          ) : null}
          {authMember ? (
            <Box className="top-links">
              <NavLink to="/member-page" activeClassName="underline">My Page</NavLink>
            </Box>
          ) : null}
          <Box className="top-links">
            <NavLink to="/help" activeClassName="underline">Help</NavLink>
          </Box>

          <div className="divider"></div>
          <ShoppingCartIcon />
          {authMember ? (
            <Box className="top-avatar">
              <AccountBoxIcon />
            </Box>
          ) : (
            <Box className="login">
              <NavLink to={'/'} style={{color: '#fff'}}>LOGIN</NavLink>
            </Box>
          )}
        </Stack>
        
        
      </Container>
    </div>
  )
}

export default Topbar;