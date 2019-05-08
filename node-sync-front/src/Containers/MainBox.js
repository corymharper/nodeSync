import React from "react";
import Nav from "./Nav";
import NotesBox from "./NotesBox";
import WorkingBox from "./WorkingBox";
import SocketHandler from "../SocketHandler";

import socketIO from "socket.io-client";

// const io = socketIO("http://localhost:8080/");
export default class MainBox extends React.Component {
  state = {
    scripts: [],
    users: [],
    activeScript: null,
    filtered: []
  };

  componentDidMount() {
    fetch(`http://localhost:3001/users/${localStorage.userid}/scripts`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({ scripts: data });
      });

    fetch("http://localhost:3001/users")
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({ users: data });
      });

    SocketHandler.connect(localStorage.getItem("token"));

    SocketHandler.registerSocketListener("scriptCreated", newScript => {
      console.log("success!");
      this.setState({
        scripts: [...this.state.scripts, newScript],
        activeScript: newScript
      });
    });
  }

  updateMainBox = () => {
    this.forceUpdate();
  };

  setActiveScript = id => {
    this.setState({ activeScript: id });
    this.forceUpdate();
  };

  checkState = () => {
    console.log(this.state);
  };

  handleCategories =(e, { name }) => {
    //add methods to show filtered array in NotesBox->ScriptMenu
    let filteredArray = this.state.scripts.filter(script => (script.category === name))
    this.setState({ filtered: filteredArray})
  };

  handleLanguages =(e, { name }) => {
    //add methods to show filtered array in NotesBox->ScriptMenu
    let filteredArray = this.state.scripts.filter(script => (script.language === name))
    this.setState({ filtered: filteredArray})
  };

  handleAllScripts =(e, { name }) => {
    //add methods to show all scripts in NotesBox->ScriptMenu
    this.setState({ filtered: this.state.scripts})
  };
  
  render() {
    return (
      <div
        className="mainContainer"
        style={{ color: "#898989" }}
        onClick={this.checkState}
      >
        <Nav 
          hideMainBox={this.props.hideMainBox} 
          scripts = {this.state.scripts} 
          handleCategories ={this.handleCategories} 
          handleLanguages={this.handleLanguages}
          handleAllScripts={this.handleAllScripts}
          filtered ={this.state.filtered}
        />
        <NotesBox
          scripts={this.state.scripts}
          users={this.state.users}
          updateMainBox={this.updateMainBox}
          setActiveScript={this.setActiveScript}
          filtered={this.state.filtered}
        />
        <WorkingBox scripts={this.state.scripts} users={this.state.users} />
      </div>
    );
  }
}
