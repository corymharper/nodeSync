import React from "react";
import Cover from "./Cover";
import MainBox from "./Containers/MainBox";
import "./App.css";
import { userInfo } from "os";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";

let userLoggedIn = false;

function conditionalRender() {
  if (userLoggedIn) {
    return <MainBox />;
  } else {
    return <LoginForm />;
  }
}

function App() {
  return <div className="App">{conditionalRender()}</div>;
}

export default App;
