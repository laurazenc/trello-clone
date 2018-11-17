import React, { Component } from "react";
import styled from "styled-components";

const logoSvg = require("./../../assets/trim-logo.svg");

const MainLayout = styled.div`
  height: 100vh;
  position: relative;
  width: 100%;
`;

const Logo = styled.img`
  width: 50px;
`;

const NavBar = styled.div`
  height: 60px;
  width: 100%;
  background-color: white;
  margin: 0 auto;
  position: fixed;
  z-index: 10;
  box-shadow: ${props => props.theme.boxShadowBase};
`;

const NavBarContent = styled.div`
  height: inherit;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px;
`;

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: 60px 0 0;
`;

const Container = styled.div`
  padding: 32px;
  width: inherit;
  height: inherit;
`;

const LeftBar = styled.div``;
const RightBar = styled.div``;

const UserName = styled.div`
  color: ${props => props.theme.secondaryTextColor};
`;

const withMainScreenLayout = ChildComponent => {
  class MainScreenLayout extends Component {
    render() {
      const { sessionInfo } = this.props;
      return (
        <MainLayout>
          <NavBar>
            <NavBarContent>
              <LeftBar />
              <a href="/">
                <Logo src={logoSvg} alt="logo" />
              </a>
              <RightBar>
                <UserName>Hello, {sessionInfo.displayName}</UserName>
              </RightBar>
            </NavBarContent>
          </NavBar>
          <Content>
            <Container>
              <ChildComponent {...this.props} />
            </Container>
          </Content>
        </MainLayout>
      );
    }
  }
  return MainScreenLayout;
};

export default withMainScreenLayout;
