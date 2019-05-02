import React from "react";
import { Container, Header, Icon, List } from "semantic-ui-react";

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
        <Header style={{ marginTop: "10px" }} as="h4" icon>
          <Icon name="code" />
          NodeSync
        </Header>

        <div
          className="categories"
          style={{ textAlign: "left", marginLeft: "5px" }}
        >
          <h5>Categories:</h5>
          <List bulleted>
            <List.Item>Categories you create will go here.</List.Item>
          </List>
        </div>

        <div
          className="collaborators"
          style={{ textAlign: "left", marginLeft: "5px" }}
        >
          <h5>Collaborators:</h5>
          <List bulleted>
            <List.Item>Categories you create will go here.</List.Item>
          </List>
        </div>
      </Container>
    );
  }
}
