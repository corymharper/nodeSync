import React from "react";
import Nav from "./Nav";
import NotesBox from "./NotesBox";
import WorkingBox from "./WorkingBox";
import SocketHandler from "../SocketHandler";

import socketIO from "socket.io-client";

export default class MainBox extends React.Component {
  constructor() {
    super();
    SocketHandler.connect(localStorage.getItem("token"));
  }

  state = {
    scripts: [],
    users: [],
    activeScript: null
  };

  componentDidMount() {
    fetch(`http://localhost:3001/users/${localStorage.userid}/scripts`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({ scripts: data });
      })
      .then(() => {
        this.setState({ activeScript: this.state.scripts.slice(-1)[0] });
      });

    fetch("http://localhost:3001/users")
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({ users: data });
      });

    // SocketHandler.connect(localStorage.getItem("token"));

    SocketHandler.registerSocketListener("scriptCreated", savedScript => {
      console.log("success!");
      this.setState({
        scripts: [...this.state.scripts, savedScript],
        activeScript: savedScript
      });
      SocketHandler.emit("activeScriptChange", {
        userid: localStorage.getItem("userid"),
        activeScript: savedScript
      });
    });

    SocketHandler.registerSocketListener("activeScriptChanged", user => {
      this.setState({
        users: this.state.users.map(u => {
          if (u.id === user.id) {
            return { ...u, activeScript_id: user.activeScript_id };
          } else {
            return u;
          }
        })
      });
    });

    // SocketHandler.registerSocketListener("activeScript.updated", script => {
    //   this.setState({
    //     users: this.state.scripts.map(s => {
    //       if (s.id === script.id) {
    //         return { ...s, content: script.content };
    //       } else {
    //         return s;
    //       }
    //     })
    //   });
    // });
  }

  updateMainBox = () => {
    this.forceUpdate();
  };

  setActiveScript = script => {
    this.setState({ activeScript: script });
    SocketHandler.emit("activeScriptChange", {
      userid: localStorage.getItem("userid"),
      activeScript: script
    });
  };

  checkState = () => {
    console.log(this.state);
  };

  saveLocalActiveScriptContent = newContent => {
    console.log("test 1");
    this.setState({
      scripts: this.state.scripts.map(s => {
        if (s.id === this.state.activeScript.id) {
          console.log("test 2");
          return { ...s, content: newContent };
        } else {
          return s;
        }
      }),
      activeScript: { ...this.state.activeScript, content: newContent }
    });
  };

  render() {
    return (
      <div
        className="mainContainer"
        style={{ color: "#898989" }}
        onClick={this.checkState}
      >
        <Nav hideMainBox={this.props.hideMainBox} />
        <NotesBox
          scripts={this.state.scripts}
          users={this.state.users}
          updateMainBox={this.updateMainBox}
          setActiveScript={this.setActiveScript}
          activeScript={this.state.activeScript}
        />
        <WorkingBox
          users={this.state.users}
          activeScript={this.state.activeScript}
          saveLocalActiveScriptContent={this.saveLocalActiveScriptContent}
          key={this.state.activeScript ? this.state.activeScript.id : null}
        />
      </div>
    );
  }
}
