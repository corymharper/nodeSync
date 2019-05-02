import React from "react";
import { Container } from "semantic-ui-react";
import CodeMirror from "react-codemirror";
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/jsx/jsx');
require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/edit/closetag');
require('codemirror/addon/hint/javascript-hint');
require('codemirror/addon/lint/lint');
require('codemirror/addon/lint/javascript-lint');

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
      lint: true,
      theme: 'oceanic-next',
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
      >
        <CodeMirror value={this.state.code} onChange={this.handleCodeChange} options={options} />
       </Container>
    );
  }
}
