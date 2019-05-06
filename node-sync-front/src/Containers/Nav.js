import React from "react";
import {
  Container,
  Header,
  Icon,
  List,
  Button,
  Segment,
  Menu,
  Dropdown
} from "semantic-ui-react";
import MenuSpace from "../Components/MenuSpace";

export default class Nav extends React.Component {
  render() {
    return (
      <Container
        style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          height: "100vh",
          width: `${(window.innerWidth / 100) * 8}px`,
          backgroundColor: "#353535",
          //   backgroundColor: "#515151",
          borderRight: "solid black 1px",
          overflowY: "auto"
        }}
      >
        <div
          style={{
            position: "relative",
            top: "0px",
            height: "50px",
            borderBottom: "1px solid black",
            color: "#586e77"
          }}
        >
          <Icon
            name="sync alternate"
            style={{
              position: "absolute",
              right: "70%",
              top: "30%",
              fontSize: "20px"
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "30%",
              top: "40%",
              fontSize: "16px"
            }}
          >
            NodeSync
          </div>
          {/* <Button
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
            <Icon name="setting" />
          </Button> */}
        </div>
        <MenuSpace />
      </Container>
    );
  }
}
