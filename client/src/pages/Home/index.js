import React, { Component } from "react";
import withMainScreenLayout from "./../../layouts/MainScreenLayout";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import HomeView from "./HomeView";

const GETUSERSBOARD_QUERY = gql`
  {
    getUsersBoards {
      _id
      name
    }
  }
`;

class Home extends Component {
  render() {
    return (
      <Query query={GETUSERSBOARD_QUERY}>
        {({ data, loading, refetch }) => {
          return <HomeView data={data} loading={loading} refetch={refetch} />;
        }}
      </Query>
    );
  }
}

export default withMainScreenLayout(Home);
