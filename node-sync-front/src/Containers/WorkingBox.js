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
    initialValue: '//Write your code here! For Example: \n const a = 0; \n const b = 1; \n const c = a + b;',
    code: null
  };

  componentDidMount() {
    this.setState({ scripts: this.props.scripts });
  }

  handleCodeChange = newCode => {
    this.setState({
      scripts: newCode
    });
  };

  displayCode = () => {
    //SHOW Script.content here?
  }

//assign code to the script content we have
  render() {   
    const options = {
      lineNumbers: true,
      mode: "javascript",
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
      >
      
       < CodeMirror value = { this.state.code === null ? this.state.initialValue : this.state.code}
       options = {
         options
       }
       />
      </Container>
    );
  }
}
