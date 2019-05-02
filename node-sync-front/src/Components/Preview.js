import React from "react";
import { Container, Segment } from "semantic-ui-react";

export default class Preview extends React.Component {
  render() {
    return (
      <Segment
        vertical
        style={{
          //   position: "absolute",
          //   left: "20%",
          //   top: "0px",
          //   width: "80%",
          //   height: window.innerHeight,
          //   backgroundColor: "#262626",
          //   color: "white"
          height: "10%",
          borderBottom: "solid black 1px"
        }}
      >
        <p>Note Preview</p>
      </Segment>
    );
  }
}
