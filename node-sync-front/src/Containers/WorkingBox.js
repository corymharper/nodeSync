import React from "react";
import { JSHINT } from 'jshint'
import { Container } from "semantic-ui-react";
import CodeMirror from "react-codemirror";
import SocketHandler from '../SocketHandler'
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/jsx/jsx');
require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/edit/closetag');
require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/javascript-hint');
require('codemirror/addon/lint/lint');
require('codemirror/addon/lint/javascript-lint');

window.JSHINT = JSHINT

export default class WorkingBox extends React.Component {

  state = {
    code: ""
  }

  handleCodeChange = (newCode) => {
    this.setState({
      code: newCode
    })
  }


  render() {
    const options = {
      lineNumbers: true,
      mode: 'javascript',
      autoCloseBrackets: true,
      autoCloseTags: true,
      gutters: ['CodeMirror-lint-markers'],
      theme: 'oceanic-next',
    }

    if(options.mode === "javascript"){
      options.lint = { esversion: 9 }
    }

    return (
      <Container
        style={{
          position: "absolute",
          left: "18%",
          top: "0px",
          width: "82%",
          height: window.innerHeight,
          backgroundColor: "#262626",
          color: "white"
        }}
        onClick={SocketHandler.testEmit}
      >
        <CodeMirror value={this.state.code} onChange={this.handleCodeChange}  options={options} />
       </Container>
    );
  }
}
