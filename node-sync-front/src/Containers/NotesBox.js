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
          left: `${(window.innerWidth / 100) * 8}px`,
          top: "0px",
          height: "100vh",
          width: `${(window.innerWidth / 100) * 11}px`,
          backgroundColor: "#262626",
          borderRight: "solid black 1px",
          overflowY: "auto"
        }}
      >
        {this.props.notes.map(note => {
          return <Preview {...note} />;
        })}
      </Container>
    );
  }
}
