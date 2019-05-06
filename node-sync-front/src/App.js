import React from "react";
import MainBox from "./Containers/MainBox";
import "./App.css";
import { userInfo } from "os";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import { ifError } from "assert";

export default class App extends React.Component {
  state = { mainbox: false, signup: false };

  renderSignUp = () => {
    this.setState({ signup: true });
  };

  renderMainBox = () => {
    this.setState({ mainbox: true });
  };

  conditionalRender() {
    if (this.state.mainbox) {
      return <MainBox />;
    } else if (this.state.signup) {
      return <SignUpForm renderMainBox={this.renderMainBox} />;
    } else {
      return (
        <LoginForm
          renderMainBox={this.renderMainBox}
          renderSignUp={this.renderSignUp}
        />
      );
    }
  }

  render() {
    return <div className="App">{this.conditionalRender()}</div>;
  }
}
