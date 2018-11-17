import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Action from "./pages/Action";

import AuthRoute from "./components/AuthRoute";
import FancyRoute from "./components/FancyRoute";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <AuthRoute needsAuth exact path="/" component={Home} />
      <FancyRoute exact path="/register" component={Register} />
      <FancyRoute exact path="/login" component={Login} />
      <FancyRoute exact path="/forgot-password" component={ForgotPassword} />
      <FancyRoute
        exact
        path="/change-password/:key"
        component={ChangePassword}
      />
      <FancyRoute path="/t" component={Action} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
