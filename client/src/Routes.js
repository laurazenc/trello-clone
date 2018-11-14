import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact to="/" component={Home} />
      </Switch>
    );
  }
}

export default Routes;
