import React from "react";
import { Container } from "semantic-ui-react";

export default class Nav extends React.Component {
  render() {
    return (
      <Container
        style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          height: window.innerHeight,
          width: "7%",
          backgroundColor: "#353535",
          //   backgroundColor: "#515151",
          color: "white",
          borderRight: "solid black 1px"
        }}
      >

      </Container>
    );
  }
}
