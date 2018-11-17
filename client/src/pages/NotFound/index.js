import React, { Component } from "react";
import withFullScreenLayout from "./../../layouts/FullScreenLayout";
import styled from "styled-components";

import { Oops } from "./../../components/EmptyState/Oops";

const Container = styled.div`
  height: 100vh;
`;

class NotFound extends Component {
  render() {
    return (
      <Container>
        <Oops />
      </Container>
    );
  }
}

export default withFullScreenLayout(NotFound);
