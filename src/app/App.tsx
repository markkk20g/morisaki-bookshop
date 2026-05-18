import React, { useState } from "react";
import "../css/index.css";
import "../css/topbar.css";
import "../css/navbar.css";
import "../css/footer.css";

import Footer from "./components/footer";
import HomeNavbar from "./components/headers/HomeNavbar";
import HomePage from "./screens/homePage";
import { Route, Switch, useLocation } from "react-router-dom";
import OtherNavbar from "./components/headers/OtherNavbar";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UsersPage from "./screens/usersPage";
import HelpPage from "./screens/helpPage";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../libs/sweetAlert";
import MemberService from "./services/MemberService";
import { Messages } from "../libs/config";
import { useGlobals } from "./hooks/useGlobals";
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./components/auth";

function App() {
  const location = useLocation()

  const { setAuthMember } = useGlobals();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();

  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /** HANDLERS **/

  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseLogout = () => setAnchorEl(null);
  const handleLogoutRequest = async () => {
    try{ 
      const member = new MemberService();
      await member.logout();

      await sweetTopSuccessAlert('Success', 700);
      setAuthMember(null);
    } catch(err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
    }
  };
  
  return (
    <div>
      {location.pathname === '/'
        ? <HomeNavbar 
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
            setSignupOpen={setSignupOpen}
            setLoginOpen={setLoginOpen}
            anchorEl={anchorEl}
            handleLogoutClick={handleLogoutClick}
            handleCloseLogout={handleCloseLogout}
            handleLogoutRequest={handleLogoutRequest}
          />
        : <OtherNavbar 
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
            setSignupOpen={setSignupOpen}
            setLoginOpen={setLoginOpen}
            anchorEl={anchorEl}
            handleLogoutClick={handleLogoutClick}
            handleCloseLogout={handleCloseLogout}
            handleLogoutRequest={handleLogoutRequest}
          />
      }
      <Switch>
        <Route path={'/products'}>
          <ProductsPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UsersPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path={'/'}>
          <HomePage />
        </Route>
      </Switch>
      <Footer />

      <AuthenticationModal 
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleSignupClose={handleSignupClose}
        handleLoginClose={handleLoginClose}
      />
    </div>
  );
}

export default App;
