import React from "react";
import { Container } from "semantic-ui-react";
import CodeMirror from "react-codemirror";
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/jsx/jsx");
require("codemirror/addon/edit/closebrackets");
require("codemirror/addon/edit/closetag");
require("codemirror/addon/hint/javascript-hint");
require("codemirror/addon/lint/lint");
require("codemirror/addon/lint/javascript-lint");

export default class WorkingBox extends React.Component {
  state = {
    code: ""
  };

  handleCodeChange = newCode => {
    this.setState({
      code: newCode
    });
  };

  render() {
    const options = {
      lineNumbers: true,
      mode: "jsx",
      autoCloseBrackets: true,
      autoCloseTags: true,
      lint: true,
      theme: "oceanic-next"
    };

    return (
      <Container
        style={{
          resize: "both",
          position: "absolute",
          left: `${(window.innerWidth / 100) * 19}px`,
          top: "0px",
          width: "82%",
          height: "100vh",
          backgroundColor: "#262626",
          color: "white",
          overflowY: "auto"
        }}
      >
        <CodeMirror
          className="CodeMirror"
          value={this.state.code}
          onChange={this.handleCodeChange}
          options={options}
        />
      </Container>
    );
  }
}
