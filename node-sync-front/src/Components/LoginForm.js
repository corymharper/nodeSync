import React from "react";
import socketIO from "socket.io-client";
import {
  Button,
  Form,
  Message,
  Container,
  Header,
  Icon
} from "semantic-ui-react";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";

export default class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    usernameError: "",
    passwordError: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleClick = () => {
    console.log("click");
    this.props.renderSignUp();
  };

  handleSubmit = event => {
    event.preventDefault();
    let username = event.target.querySelector("#username");
    let password = event.target.querySelector("#password");
    if (username.value === "") {
      this.setState({ usernameError: "error field" });
    } else {
      this.setState({ usernameError: "" });
    }
    if (password.value === "") {
      this.setState({ passwordError: "error field" });
    } else {
      this.setState({ passwordError: "" });
    }
    if (username.value === "" || password.value === "") {
      return;
    } else {
      //call fetchData
      this.fetchData();
    }
  };

  fetchData = () => {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(user => {
        console.log(user);
        //to make sessions
        localStorage.setItem("username", user.username);
        localStorage.setItem("userid", user.id);
        localStorage.setItem("token", user.token);
        console.log(localStorage);
        //call render mainbox
        this.props.renderMainBox();
      });
  };

  render() {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#262626"
        }}
      >
        <div
          style={{
            position: "relative",
            top: "30%",
            left: "30%",
            height: "40%",
            width: "40%",
            border: "solid 1px black",
            backgroundColor: "#151515",
            borderRadius: "5px"
          }}
        >
          <Container
            style={{
              position: "absolute",
              marginLeft: "0px",
              marginRight: "0px",
              right: "50%",
              padding: "15px",
              width: "50%",
              height: "100%",
              textAlign: "center"
            }}
          >
            <Message
              style={{
                backgroundColor: "#0c0c0c",
                height: "100%"
              }}
            >
              <Header
                as="div"
                style={{
                  fontSize: "28px",
                  color: "#586e77",
                  position: "absolute",
                  height: "173px",
                  width: "136.34px",
                  left: "50%",
                  marginLeft: "-68.17px",
                  top: "50%",
                  marginTop: "-86.5px"
                }}
                icon
              >
                <Icon name="sync alternate" />
                <Typist
                  className="MyTypist"
                  avgTypingDelay={70}
                  avgTypingSpeed={40}
                  startDelay={2000}
                >
                  nodeSync
                </Typist>
                <Header.Subheader
                  style={{ color: "#8c8c8c", fontSize: "14px" }}
                >
                  Collaborative text editing
                </Header.Subheader>
              </Header>
            </Message>
          </Container>
          <Container
            style={{
              position: "absolute",
              left: "50%",
              top: "0%",
              padding: "15px",
              height: "100%",
              width: "50%",
              overflow: "auto",
              textAlign: "left"
            }}
          >
            <Message
              style={{
                backgroundColor: "#8c8c8c"
              }}
            >
              <Form size={"tiny"} key={"tiny"} onSubmit={this.handleSubmit}>
                <Form.Field>
                  <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                    id="username"
                    className={this.state.usernameError}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    className={this.state.passwordError}
                    id="password"
                  />
                </Form.Field>
                <Button type="submit">
                  Log In <Icon name="right chevron" />
                </Button>
              </Form>
            </Message>
            <Message
              style={{
                position: "relative",
                backgroundColor: "#8c8c8c",
                bottom: "0%"
              }}
            >
              <Message.Header>Not a registered user?</Message.Header>
              <p>Click this button to sign up.</p>
              <Button onClick={this.handleClick}>
                Sign Up <Icon name="right chevron" />
              </Button>
            </Message>
          </Container>
        </div>
      </div>
    );
  }
}
