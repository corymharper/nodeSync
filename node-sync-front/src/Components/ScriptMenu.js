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
import EditScriptForm from "./EditScriptForm";

export default class ScriptMenu extends Component {
  state = {
    activeItem: "home"
  };

  handleItemClick = script => {
    this.setState({ activeItem: script.title });
    this.props.setActiveScript(script);
  };

  // displayCode = (e, { name }) => {
  //   this.setState({ activeItem: name });
  //   //communicate with workingBox, show script.content inside workingbox
  //   //render workingbox, set code value as script.content
  // }

  render() {
    const { activeItem } = this.state;
    console.log(this.props.scripts);
    console.log(this.state.reverseScripts);

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
        {this.props.scripts
          .slice()
          .reverse()
          .map(script => {
            return (
              <Menu.Item
                id={script.id}
                name={script.title}
                active={activeItem === script.title}
                onClick={() => this.handleItemClick(script)}
              >
                <Modal
                  trigger={
                    <Icon
                      style={{
                        position: "absolute",
                        top: "10%",
                        right: "0%",
                        color: "#898989"
                      }}
                      name="ellipsis vertical"
                    />
                  }
                  blurring
                >
                  <Modal.Header>Edit Script</Modal.Header>
                  <Modal.Content scrolling>
                    <Modal.Description>
                      <EditScriptForm
                        updateMainBox={this.props.updateMainBox}
                      />
                    </Modal.Description>
                  </Modal.Content>
                  {/* <Modal.Actions>
              <Button primary>
                Proceed <Icon name="chevron right" />
              </Button>
            </Modal.Actions> */}
                </Modal>
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
                      <h5>
                        <Moment fromNow ago>
                          {script.createdAt}
                        </Moment>
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
                      fontSize: "12px",
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
