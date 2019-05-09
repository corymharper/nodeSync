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
    activeScript: null,
    filtered: [],
    activeScriptUsers: []
  };

  componentDidMount() {
    fetch(`${process.env.REACT_APP_FETCH_URL}/users/${localStorage.userid}/scripts`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({ scripts: data });
      })
      .then(() => {
        this.setState({ activeScript: this.state.scripts.slice(-1)[0] });
      });

    fetch(`${process.env.REACT_APP_FETCH_URL}/users`)
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

    SocketHandler.registerSocketListener("script.edited", editedScript => {
      this.setState({
        scripts: this.state.scripts.map(script => {
          if (script.id === editedScript.id) {
            return editedScript;
          } else {
            return script;
          }
        })
      });
    });

    SocketHandler.registerSocketListener("script.deleted", deletedScript => {
      this.setState({
        scripts: this.state.scripts.filter(script => {
          return script.id !== deletedScript.id;
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
  }

  handleCollaborators = () => {
     fetch(`http://localhost:3001/scripts/${this.state.activeScript.id}/users`)
      .then(resp => resp.json())
      .then(users => {
        let collaborators = users.map(user => user.username)
        let selfIndex = collaborators.indexOf(localStorage.getItem('username'))
        collaborators[selfIndex] = "Owner: Me"
        this.setState({activeScriptUsers: collaborators})
      })
  }
    
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
        <Nav 
          hideMainBox={this.props.hideMainBox} 
          scripts = {this.state.scripts} 
          handleCategories ={this.handleCategories} 
          handleLanguages={this.handleLanguages}
          handleAllScripts={this.handleAllScripts}
          filtered ={this.state.filtered}
          activeScriptUsers={this.state.activeScriptUsers}
        />
        <NotesBox
          scripts={this.state.scripts}
          users={this.state.users}
          updateMainBox={this.updateMainBox}
          setActiveScript={this.setActiveScript}
          filtered={this.state.filtered}
          activeScript={this.state.activeScript}
          handleCollaborators={this.handleCollaborators}
          activeScriptUsers={this.state.activeScriptUsers}
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
