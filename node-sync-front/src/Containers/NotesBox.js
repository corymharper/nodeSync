import React from "react";
import {
  Container,
  Button,
  Icon,
  Modal,
  Image,
  Header
} from "semantic-ui-react";
import Preview from "../Components/Preview";
import ScriptMenu from "../Components/ScriptMenu";
import NewScriptForm from "../Components/NewScriptForm";

export default class NotesBox extends React.Component {
  render() {
    return (
      <Container
        style={{
          position: "absolute",
          left: `120px`,
          top: "0px",
          height: "100vh",
          width: `160px`,
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
          <NewScriptForm scripts={this.props.scripts} />
        </div>
        <ScriptMenu
          scripts={this.props.scripts}
<<<<<<< HEAD
=======
          updateMainBox={this.props.updateMainBox}
          filtered = {this.props.filtered}
>>>>>>> 9814b863deae50a2ef9e64dfdf367da0089809ae
          setActiveScript={this.props.setActiveScript}
          activeScript={this.props.activeScript}
        />
      </Container>
    );
  }
}
