import React from "react";
import { Container, Button, Icon } from "semantic-ui-react";
import Preview from "../Components/Preview";
import ScriptMenu from "../Components/ScriptMenu";

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
        <div
          style={{
            position: "relative",
            top: "0px",
            height: "50px",
            width: "100%",
            borderBottom: "solid black 1px"
          }}
        >
          <Button
            style={{
              position: "absolute",
              top: "20%",
              bottom: "20%",
              right: "7px",
              padding: "5px",
              width: "30px",
              height: "30px",
              margin: "0px",
              backgroundColor: "#898989"
            }}
            icon
          >
            <Icon name="edit" />
          </Button>
        </div>
        {/* {this.props.scripts.map(script => {
          return <Preview {...script} />;
        })} */}
        <ScriptMenu scripts={this.props.scripts} />
      </Container>
    );
  }
}
