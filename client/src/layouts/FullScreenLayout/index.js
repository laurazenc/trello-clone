import React, { Component } from "react";
import styled from "styled-components";

const logoSvg = require("./../../assets/trim-logo.svg");

const FullLayout = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
`;

const Header = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
`;

const withFullScreenLayout = ChildComponent => {
  class FullScreenLayout extends Component {
    render() {
      return (
        <FullLayout>
          <Header>
            <a href="/">
              <Logo src={logoSvg} alt="logo" />
            </a>
          </Header>
          <Content>
            <ChildComponent {...this.props} />
          </Content>
        </FullLayout>
      );
    }
  }
  return FullScreenLayout;
};

export default withFullScreenLayout;
