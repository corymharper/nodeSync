import React from "react";
import { Container } from "semantic-ui-react";
import Preview from "../Components/Preview";

export default class NotesBox extends React.Component {
  render() {
    console.log(this.props);
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
        {this.props.notes.map(note => {
          return <Preview {...note} />;
        })}
      </Container>
    );
  }
}
