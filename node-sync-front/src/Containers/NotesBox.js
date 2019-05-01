import React from "react";
import { Container } from "semantic-ui-react";

export default class NotesBox extends React.Component {
  render() {
    return (
      <Container
        style={{
          position: "absolute",
          left: "7%",
          top: "0px",
          height: window.innerHeight,
          width: "11%",
          backgroundColor: "#262626",
          color: "white",
          borderRight: "solid black 1px"
        }}
      >
        <p>text preview</p>
      </Container>
    );
  }
}
