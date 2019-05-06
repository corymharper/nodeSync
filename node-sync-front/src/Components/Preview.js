import React from "react";
import {
  Container,
  Segment,
  Label,
  Image,
  Icon,
  List,
  ListItem
} from "semantic-ui-react";

export default class Preview extends React.Component {
  render() {
    return (
      <div
        style={{
          height: "9%",
          position: "relative"
        }}
      >
        <Segment
          vertical
          style={{
            position: "absolute",
            left: "0px",
            width: "30%",
            height: "100%",
            textAlign: "center",
            wordWrap: "normal"
          }}
        >
          <List>
            <ListItem>
              <Label
                style={{
                  width: "50%",
                  padding: "0px",
                  border: "solid 1px black"
                }}
              >
                CH
              </Label>
            </ListItem>
            <ListItem>
              <Label
                style={{
                  width: "50%",
                  padding: "0px",
                  border: "solid 1px black"
                }}
              >
                CH
              </Label>
            </ListItem>
          </List>
        </Segment>
        <Segment
          vertical
          style={{
            position: "absolute",
            left: "30%",
            borderBottom: "solid black 1px",
            width: "70%",
            height: "100%",
            textAlign: "left",
            wordWrap: "normal"
          }}
        >
          <h4 style={{ color: "white" }}>{this.props.title}</h4>
          <p>{this.props.category}</p>
        </Segment>
      </div>
    );
  }
}
