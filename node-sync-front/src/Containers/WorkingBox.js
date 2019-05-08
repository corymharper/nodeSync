import React from "react";
import { JSHINT } from "jshint";
import { Container } from "semantic-ui-react";
import DiffMatchPatch from 'diff-match-patch';
import socketIO from 'socket.io-client'
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
SocketHandler.connect(localStorage.getItem("token"));
const dmp = new DiffMatchPatch();
let diff;
let patch;
let applyPatch;

export default class WorkingBox extends React.Component {
  state = {
    scripts: [],
    value: "",
  };

  componentDidMount() {
    this.setState({ scripts: this.props.scripts });
    SocketHandler.registerSocketListener('client.update', payload => {
      if(localStorage.getItem("userid") != payload.id){
      let cursPos = this.state.instance.getCursor()
      console.log('we are in here')
      diff = dmp.diff_main(this.state.value, payload.serverText)
      patch = dmp.patch_make(this.state.value, diff)
      applyPatch = dmp.patch_apply(patch, this.state.value)
      this.setState({
          ...this.state,
          value: applyPatch[0],
      });
      console.log(cursPos.line, payload.changeData.from.line, cursPos.ch, payload.changeData.from.ch)
      if(cursPos.line >= payload.changeData.from.line && cursPos.ch > payload.changeData.from.ch){
        this.state.instance.setCursor({line: cursPos.line + payload.changeData.text.length - 1, ch: payload.changeData.text[payload.changeData.text.length-1] ? cursPos.ch + payload.changeData.text[payload.changeData.text.length-1].length : cursPos.ch - payload.changeData.text[payload.changeData.text.length-1].length - 1})
      }
    } else {
      return
    }
    });
  }

  handleCodeChange = newCode => {
    this.setState({
      scripts: newCode
    });
  };

  displayCode = () => {
    //SHOW Script.content here?
  }

  setCursorPos = (lineNum, charNum, value) => {
    switch(value){
      case "{":
        this.state.instance.setCursor({line: lineNum, ch: charNum + 2})
        break;
      case "(":
        this.state.instance.setCursor({line: lineNum, ch: charNum + 2})
        break;
    }
  }

//assign code to the script content we have
  render() {  
    console.log(localStorage.getItem("userid")) 
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
        autoCursor={false}
        onBeforeChange={(editor, data, value) => {
            let cursPos = this.state.instance.getCursor()
            diff = dmp.diff_main(this.state.value, value)
            patch = dmp.patch_make(this.state.value, diff)
            applyPatch = dmp.patch_apply(patch, this.state.value)
            SocketHandler.emit('editor.update', {
              changeData: data,
              patch: patch,
              id: localStorage.getItem("userid")
              })
            console.log(data)
            this.setState({
                ...this.state,
                value: applyPatch[0]
                });
                  this.state.instance.setCursor({line: cursPos.line + data.text.length - 1, ch: data.text[data.text.length-1] ? cursPos.ch + data.text[data.text.length-1].length : cursPos.ch - data.text[data.text.length-1].length - 1})
        }}
        editorDidMount={editor => { 
          this.setState({
            ...this.state,
            instance: editor
          })
            }
        }
        onChange={(editor, data, value) => {
        }}
      />
      </Container>
    );
  }
}
