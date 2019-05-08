import React from "react";
import { JSHINT } from "jshint";
import { Container } from "semantic-ui-react";
import DiffMatchPatch from "diff-match-patch";
import socketIO from "socket.io-client";
import { Controlled as CodeMirror } from "react-codemirror2";
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
const dmp = new DiffMatchPatch();
let diff;
let patch;
let applyPatch;

export default class WorkingBox extends React.Component {
  state = {
    activeScript: this.props.activeScript,
    value: this.props.activeScript ? this.props.activeScript.content : ""
  };
  componentDidMount() {
    SocketHandler.registerSocketListener("client.update", serverText => {
      diff = dmp.diff_main(this.state.value, serverText);
      patch = dmp.patch_make(this.state.value, diff);
      applyPatch = dmp.patch_apply(patch, this.state.value);
      this.setState({
        value: applyPatch[0]
      });
      console.log(applyPatch[0]);
      this.props.saveLocalActiveScriptContent(applyPatch[0]);
    });

    this.setState({
      activeScript: this.props.activeScript,
      value: this.props.activeScript ? this.props.activeScript.content : ""
    });
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
        <CodeMirror
          value={this.state.value}
          options={options}
          onBeforeChange={(editor, data, value) => {
            diff = dmp.diff_main(this.state.value, value);
            patch = dmp.patch_make(this.state.value, diff);
            applyPatch = dmp.patch_apply(patch, this.state.value);
            SocketHandler.emit("editor.update", patch);
            console.log("we made it here");
            this.setState({
              value: applyPatch[0]
            });
            this.props.saveLocalActiveScriptContent(applyPatch[0]);
          }}
          editorDidMount={editor => {
            this.setState({
              ...this.state,
              instance: editor
            });
          }}
          // onChange={(editor, data, value) => {
          //   console.log(value);
          // }}
        />
      </Container>
    );
  }
}
