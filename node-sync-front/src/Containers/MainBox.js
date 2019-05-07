import React from "react";
import Nav from "./Nav";
import NotesBox from "./NotesBox";
import WorkingBox from "./WorkingBox";

export default class MainBox extends React.Component {
  state = {
    scripts: [],
    users: []
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
  }

  render() {
    return (
      <div className="mainContainer" style={{ color: "#898989" }}>
        <Nav hideMainBox = {this.props.hideMainBox}/>
        <NotesBox scripts={this.state.scripts} users={this.state.users} />
        <WorkingBox scripts={this.state.scripts} users={this.state.users} />
      </div>
    );
  }
}
