import React from "react";
import FancyRoute from "./../FancyRoute";
import { Redirect, Route } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

class AuthRoute extends React.PureComponent {
  render() {
    const ME_QUERY = gql`
      {
        me {
          result {
            email
          }
          errors {
            path
            message
          }
        }
      }
    `;
    const { needsAuth } = this.props;
    return (
      <Query query={ME_QUERY}>
        {({ loading, data }) => {
          if ((!data && !data.me) || loading) {
            return null;
          }

          if (!data.me.result && needsAuth) {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { next: this.props.path }
                }}
              />
            );
          }
          const sessionInfo = data.me.result || {};
          return <FancyRoute sessionInfo={sessionInfo} {...this.props} />;
        }}
      </Query>
    );
  }
}

export default AuthRoute;
