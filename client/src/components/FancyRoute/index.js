import React from "react";
import { Route } from "react-router-dom";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

import "./fancyRoute.css";

class FancyRoute extends React.Component {
  componentWillMount() {
    nprogress.start();
  }

  componentDidMount() {
    nprogress.done();
  }

  render() {
    const { component, ...rest } = this.props;
    const renderMergedProps = (component, ...rest) => {
      const finalProps = Object.assign({}, ...rest);
      return React.createElement(component, finalProps);
    };
    return (
      <Route
        {...rest}
        render={routeProps => {
          return renderMergedProps(component, routeProps, rest);
        }}
      />
    );
  }
}

export default FancyRoute;
