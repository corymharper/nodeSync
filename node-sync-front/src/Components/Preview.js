import React from "react";
import { Container, Segment, Label, Image, Icon } from "semantic-ui-react";

export default class Preview extends React.Component {
  render() {
    return (
      <div
        style={{
          height: "10%"
        }}
      >
        <Segment
          vertical
          style={{
            position: "absolute",
            left: "0px",
            width: "30%",
            textAlign: "center",
            wordWrap: "normal"
          }}
        >
          <Label style={{ width: "60%", padding: "0px" }}>CH</Label>
          <Label style={{ width: "60%", padding: "0px" }}>JC</Label>
        </Segment>
        <Segment
          vertical
          style={{
            position: "absolute",
            left: "30%",
            borderBottom: "solid black 1px",
            width: "70%",
            textAlign: "left",
            wordWrap: "normal"
          }}
        >
          <h4 style={{ color: "white" }}>Script Preview</h4>
          <p>this is a preview of the script</p>
        </Segment>
      </div>
    );
  }
}
