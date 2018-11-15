import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Action from "./pages/Action";

import FancyRoute from "./components/FancyRoute";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <FancyRoute exact path="/" component={Home} />
        <FancyRoute exact path="/register" component={Register} />
        <FancyRoute exact path="/login" component={Login} />
        <FancyRoute path="/t" component={Action} />
      </Switch>
    );
  }
}

export default Routes;
