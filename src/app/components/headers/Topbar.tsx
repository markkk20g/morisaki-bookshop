import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material"
import { NavLink } from "react-router-dom"
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartItem } from "../../../libs/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import Basket from "./Basket";
import { Logout } from "@mui/icons-material";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void; 
  onRemove: (item: CartItem) => void; 
  onDelete: (item: CartItem) => void; 
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export const Topbar = (props: HomeNavbarProps) => {
  const { 
    cartItems, 
    onAdd, 
    onRemove, 
    onDelete, 
    onDeleteAll, 
    setSignupOpen, 
    setLoginOpen,
    handleLogoutClick,
    anchorEl, 
    handleCloseLogout,
    handleLogoutRequest,
  } = props;

  // const authMember = true;
  const { authMember } = useGlobals();

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
          {/* <ShoppingCartIcon /> */}
          <Basket 
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll} 
          />

          {authMember ? (
            <Box className="top-avatar">
              <AccountBoxIcon />
            </Box>
          ) : (
            <Box className="login">
              {/* <NavLink to={'/'} style={{color: '#fff'}}>LOGIN</NavLink> */}
              <Button 
                  variant="contained" 
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
            </Box>
          )}

          <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: 'blue' }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
        </Stack>
        
        
      </Container>
    </div>
  )
}

export default Topbar;