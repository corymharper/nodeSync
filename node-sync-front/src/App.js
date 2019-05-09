import React from "react";
import MainBox from "./Containers/MainBox";
import "./App.css";
import { userInfo } from "os";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import { ifError } from "assert";
import { BrowserRouter, Router, Switch } from "react-router-dom";


const fetchUrl = "http://10.185.4.241:3001"
const socketUrl = "http://10.185.4.241:8080"

export default class App extends React.Component {
  state = { mainbox: false, signup: false };

  renderSignUp = () => {
    this.setState({ signup: true });
  };

  renderMainBox = () => {
    this.setState({ mainbox: true });
  };

  hideMainBox = () => {
    this.setState({ mainbox: false, signup: false });
  };

  conditionalRender() {
    if (!localStorage.userid) {
      if (!this.state.signup) {
        return (
          <LoginForm
            renderMainBox={this.renderMainBox}
            renderSignUp={this.renderSignUp}
          />
        );
      } else {
        return (
          <SignUpForm
            renderMainBox={this.renderMainBox}
            hideMainBox={this.hideMainBox}
          />
        );
      }
    } else {
      return <MainBox hideMainBox={this.hideMainBox} />;
    }
  }

  render() {
    return <div className="App">{this.conditionalRender()}</div>;
  }
}
