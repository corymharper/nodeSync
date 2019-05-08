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
          <Modal
            trigger={
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
            }
            blurring
          >
            <Modal.Header>Create a New Script</Modal.Header>
            <Modal.Content scrolling>
              <Modal.Description>
                <NewScriptForm />
              </Modal.Description>
            </Modal.Content>
            {/* <Modal.Actions>
              <Button primary>
                Proceed <Icon name="chevron right" />
              </Button>
            </Modal.Actions> */}
          </Modal>
        </div>
        {/* {this.props.scripts.map(script => {
          return <Preview {...script} />;
        })} */}
        <ScriptMenu
          scripts={this.props.scripts}
          updateMainBox={this.props.updateMainBox}
          setActiveScript={this.props.setActiveScript}
        />
      </Container>
    );
  }
}
