import React, { Component } from "react";
import {
  Menu,
  Header,
  List,
  Label,
  ListItem,
  Icon,
  Modal
} from "semantic-ui-react";
import Moment from "react-moment";
import moment from "moment";
import EditScriptForm from "./EditScriptForm";

export default class ScriptMenu extends Component {
  state = {
    activeItem: "home",
    displayedScripts: [],
    collaborators: []
  };

  handleItemClick = script => {
    this.props.setActiveScript(script);
    this.props.handleCollaborators();
  }

  // getCollaborators = (script) => {
  //     fetch(`http://localhost:3001/scripts/${script.id}/users`)
  //     .then(resp => resp.json())
  //     .then(users => {
  //       let collaborators = users.map(user => user.username)
  //       this.setState({collaborators: collaborators})
  //     })
  // }
  
  static getDerivedStateFromProps(props, state) {
    return {
      displayedScripts:
        props.filtered.length === 0 ? props.scripts : props.filtered
    };
  }

  render() {
    const activeItem = this.props.activeScript
      ? this.props.activeScript.id
      : null;
    console.log(this.props.scripts);

    let moment = require("moment-shortformat");

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
        {this.state.displayedScripts
          .slice()
          .reverse()
          .map(script => {
            return (
              <Menu.Item
                id={script.id}
                name={script.title}
                active={activeItem === script.id}
                onClick={() => this.handleItemClick(script)}
              >
                <EditScriptForm scripts={this.props.scripts} script={script} />

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
                    {/* <ListItem>
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
                    </ListItem> */}
                    <ListItem style={{ color: "#898989" }}>
                      <h5>
                        {moment(script.createdAt)
                          .short()
                          .replace("ago", "")}
                      </h5>
                    </ListItem>
                  </List>
                </div>
                <div
                  style={{
                    position: "relative",
                    left: "30%",
                    width: "70%",
                    height: "100%",
                    textAlign: "left"
                  }}
                >
                  <Header
                    style={{
                      color: "rgba(255,255,255,.85)",
                      marginBottom: "7px",
                      width: "100%",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {script.title ? script.title : "Unnamed script"}
                  </Header>
                  <List style={{ fontSize: "12px" }}>
                    <List.Item
                      style={{
                        color: "#898989",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {script.language
                        ? script.language
                        : "Unspecified language"}
                    </List.Item>
                    <List.Item
                      style={{
                        color: "#898989",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {script.category
                        ? script.category
                        : "Unspecified category"}
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
