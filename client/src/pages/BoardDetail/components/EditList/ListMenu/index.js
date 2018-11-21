import React, { Component } from "react";
import styled from "styled-components";
import Menu from "./Menu";
const MenuWrapper = styled.div`
  position: relative;
`;

export default class ListMenu extends Component {
  state = {
    showMenu: false
  };

  showMenu = () => {
    this.setState({ showMenu: true });
  };

  hideMenu = () => {
    this.setState({ showMenu: false });
  };

  render() {
    const { list } = this.props;
    const { showMenu } = this.state;
    return (
      <MenuWrapper>
        <i
          className="fas fa-ellipsis-h"
          id={list._id}
          onClick={this.showMenu}
        />
        {showMenu && (
          <Menu boardId={list.boardId} id={list._id} hideMenu={this.hideMenu} />
        )}
      </MenuWrapper>
    );
  }
}
