import React from "react";
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

function App() {
  const location = useLocation()
  return (
    <div>
      {location.pathname === '/'
        ? <HomeNavbar />
        : <OtherNavbar />
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
    </div>
  );
}

export default App;
