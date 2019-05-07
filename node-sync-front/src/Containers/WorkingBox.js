import React from "react";
import { JSHINT } from "jshint";
import { Container } from "semantic-ui-react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import SocketHandler from "../SocketHandler";
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/jsx/jsx");
require("codemirror/addon/edit/closebrackets");
require("codemirror/addon/edit/closetag");
require("codemirror/addon/hint/show-hint");
require("codemirror/addon/hint/javascript-hint");
require("codemirror/addon/lint/lint");
require("codemirror/addon/lint/javascript-lint");

window.JSHINT = JSHINT;

export default class WorkingBox extends React.Component {
  state = {
    scripts: [],
    initalValue: ""
  };
  componentDidMount() {
    this.setState({ scripts: this.props.scripts });
  }

  handleCodeChange = newCode => {
    this.setState({
      scripts: newCode
    });
  };

  render() {
    const options = {
      lineNumbers: true,
      mode: "jsx",
      autoCloseBrackets: true,
      autoCloseTags: true,
      gutters: ["CodeMirror-lint-markers"],
      theme: "oceanic-next"
    };

    if (options.mode === "javascript") {
      options.lint = { esversion: 9 };
    }

    return (
      <Container
        style={{
          resize: "both",
          position: "absolute",
          left: `280px`,
          top: "0px",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#262626",
          color: "white",
          overflowY: "auto"
        }}
        onClick={SocketHandler.testEmit}
      >
        <CodeMirror value="" options={options} />
      </Container>
    );
  }
}
