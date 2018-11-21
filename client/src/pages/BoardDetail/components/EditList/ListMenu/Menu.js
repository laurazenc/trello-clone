import React from "react";
import styled from "styled-components";
import DeleteItemList from "./DeleteItemList";

const MenuComponent = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  width: 250px;
  background-color: white;
  box-shadow: 0px 6px 15px 2px rgba(154, 160, 166, 0.2);
  border-radius: 3px;
`;

const MenuTitle = styled.div`
  padding: 16px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  line-height: 16px;
  align-items: center;

  span {
    color: ${props => props.theme.secondaryTextColor};
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.iconColor};
`;

const MenuList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  min-height: 50px;
`;

export default class Menu extends React.Component {
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.hideMenu();
    }
  };

  render() {
    const { hideMenu, id, boardId } = this.props;

    return (
      <MenuComponent ref={this.setWrapperRef}>
        <MenuTitle>
          <span>List Actions</span>
          <i className="fas fa-times" onClick={hideMenu} />
        </MenuTitle>
        <MenuList>
          <DeleteItemList boardId={boardId} id={id} />
        </MenuList>
        <Divider />
      </MenuComponent>
    );
  }
}
