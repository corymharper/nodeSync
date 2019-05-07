import React, { Component } from "react";
import { Dropdown, Icon, Input, Menu } from "semantic-ui-react";

export default class MenuSpace extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogOut = (e, { name }) => {
    this.setState({ activeItem: name });
    localStorage.clear();
    this.props.hideMainBox();
  };
  render() {
    const { activeItem } = this.state;

    return (
      <Menu
        inverted
        vertical
        style={{
          width: "100%",
          top: "0%",
          marginTop: "0%",
          backgroundColor: "#353535",
          textAlign: "left"
        }}
      >
        <Menu.Item style={{ color: "#898989", fontSize: "12px" }}>
          Hello, {localStorage.getItem("username")}!
        </Menu.Item>
        <Menu.Item
          name="all-scripts"
          active={activeItem === "all-scripts"}
          onClick={this.handleItemClick}
        >
          All Scripts
        </Menu.Item>
        <Menu.Item name="categories">
          Categories
          <Menu.Menu>
            <Menu.Item
              name="search"
              active={activeItem === "search"}
              onClick={this.handleItemClick}
            >
              Search
            </Menu.Item>
            <Menu.Item
              name="add"
              active={activeItem === "add"}
              onClick={this.handleItemClick}
            >
              Add
            </Menu.Item>
            <Menu.Item
              name="about"
              active={activeItem === "about"}
              onClick={this.handleItemClick}
            >
              Remove
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item name="languages">
          Languages
          <Menu.Menu>
            <Menu.Item
              name="search"
              active={activeItem === "search"}
              onClick={this.handleItemClick}
            >
              Search
            </Menu.Item>
            <Menu.Item
              name="add"
              active={activeItem === "add"}
              onClick={this.handleItemClick}
            >
              Add
            </Menu.Item>
            <Menu.Item
              name="about"
              active={activeItem === "about"}
              onClick={this.handleItemClick}
            >
              Remove
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>{" "}
        <Menu.Item name="collaborators">
          Collaborators
          <Menu.Menu>
            <Menu.Item
              name="search"
              active={activeItem === "search"}
              onClick={this.handleItemClick}
            >
              Search
            </Menu.Item>
            <Menu.Item
              name="add"
              active={activeItem === "add"}
              onClick={this.handleItemClick}
            >
              Add
            </Menu.Item>
            <Menu.Item
              name="about"
              active={activeItem === "about"}
              onClick={this.handleItemClick}
            >
              Remove
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item
          active={activeItem === "settings"}
          onClick={this.handleItemClick}
        >
          Settings
        </Menu.Item>
        <Menu.Item active={activeItem === "logout"} onClick={this.handleLogOut}>
          Log Out
        </Menu.Item>
        <Menu.Item
          active={activeItem === "golive"}
          onClick={() => window.TogetherJS(window)}
        >
          Go Live
        </Menu.Item>
      </Menu>
    );
  }
}
