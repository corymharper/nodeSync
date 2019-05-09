import React, { Component } from "react";
import { Dropdown, Icon, Input, Menu, Search } from "semantic-ui-react";

export default class MenuSpace extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogOut = (e, { name }) => {
    this.setState({ activeItem: name });
    localStorage.clear();
    this.props.hideMainBox();
  };

  handleAllScripts = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.handleAllScripts(e, { name });
  };

  handleCategories = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.handleCategories(e, { name });
  };

  handleLanguages = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.handleLanguages(e, { name });
  };

  getUniqueCategories = () => {
    let categories = this.props.scripts.map(script => script.category);
    return categories.filter(function(item, pos) {
      return categories.indexOf(item) === pos;
    });
  };

  getUniqueLanguages = () => {
    let languages = this.props.scripts.map(script => script.language);
    return languages.filter(function(item, pos) {
      return languages.indexOf(item) === pos;
    });
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
          onClick={this.handleAllScripts}
        >
          All Scripts
        </Menu.Item>
        <Menu.Item name="categories">
          Categories
          <Menu.Menu>
            {this.getUniqueCategories().map(category => {
              return (
                <Menu.Item
                  name={category}
                  active={activeItem === category}
                  onClick={this.handleCategories}
                >
                  {category}
                </Menu.Item>
              );
            })}
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item name="languages">
          Languages
          <Menu.Menu>
            {this.getUniqueLanguages().map(language => {
              return (
                <Menu.Item
                  name={language}
                  active={activeItem === language}
                  onClick={this.handleLanguages}
                >
                  {language}
                </Menu.Item>
              );
            })}
          </Menu.Menu>
        </Menu.Item>{" "}
        <Menu.Item name="collaborators">
          Collaborators
          <Menu.Menu>

          {this.props.activeScriptUsers.map(user => {
            return (
            <Menu.Item>
              {user}
            </Menu.Item>
            )
          })}
          </Menu.Menu>
        </Menu.Item>
        {/* <Menu.Item
          active={activeItem === "settings"}
          onClick={this.handleItemClick}
        >
          Settings
        </Menu.Item> */}
        <Menu.Item active={activeItem === "logout"} onClick={this.handleLogOut}>
          Log Out
        </Menu.Item>
      </Menu>
    );
  }
}
