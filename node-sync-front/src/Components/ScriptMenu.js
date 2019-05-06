import React, { Component } from "react";
import { Menu, Header, List, Label, ListItem } from "semantic-ui-react";

export default class ScriptMenu extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu
        inverted
        vertical
        style={{
          position: "relative",
          width: "100%",
          top: "0%",
          margin: "0px"
        }}
      >
        {this.props.scripts.map(script => {
          return (
            <Menu.Item
              name={script.title}
              active={activeItem === script.title}
              onClick={this.handleItemClick}
            >
              <div
                style={{
                  position: "absolute",
                  left: "0px",
                  width: "30%",
                  height: "100%",
                  textAlign: "center",
                  wordWrap: "normal"
                }}
              >
                <List style={{ width: "100%" }}>
                  <ListItem>
                    <Label
                      style={{
                        position: "relative",
                        right: "25%",
                        width: "50%",
                        padding: "0px",
                        margin: "0px",
                        color: "#262626"
                        // border: "solid 1px rgba(255, 255, 255, 0.08)"
                      }}
                    >
                      CH
                    </Label>
                  </ListItem>
                  <ListItem>
                    <Label
                      style={{
                        position: "relative",
                        right: "25%",
                        width: "50%",
                        padding: "0px",
                        margin: "0px",
                        color: "#262626"
                        // border: "solid 1px rgba(255, 255, 255, 0.08)"
                      }}
                    >
                      +2
                    </Label>
                  </ListItem>
                  <ListItem style={{ color: "#898989" }}>
                    <h5>7d</h5>
                  </ListItem>
                </List>
              </div>
              <div
                style={{
                  position: "relative",
                  left: "30%",
                  width: "70%",
                  height: "100%",
                  textAlign: "left",
                  wordWrap: "normal"
                }}
              >
                <Header
                  as="h5"
                  style={{
                    color: "rgba(255,255,255,.85)",
                    marginBottom: "7px"
                  }}
                >
                  {script.title}
                </Header>
                <List style={{ fontSize: "12px" }}>
                  <List.Item style={{ color: "#898989" }}>
                    {script.language}
                  </List.Item>
                  <List.Item style={{ color: "#898989" }}>
                    {script.category}
                  </List.Item>
                </List>
              </div>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}
