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

export default class SignUpForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    usernameError: "",
    firstNameError: "",
    lastNameError: "",
    passwordError: "",
    confirmPasswordError: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let username = event.target.querySelector("#username");
    let firstName = event.target.querySelector("#firstName");
    let lastName = event.target.querySelector("#lastName");
    let password = event.target.querySelector("#password");
    let confirmPassword = event.target.querySelector("#confirmPassword");
    if (username.value === "") {
      this.setState({ usernameError: "error field" });
    } else {
      this.setState({ usernameError: "" });
    }
    if (firstName.value === "") {
      this.setState({ firstNameError: "error field" });
    } else {
      this.setState({ firstNameError: "" });
    }
    if (lastName.value === "") {
      this.setState({ lastNameError: "error field" });
    } else {
      this.setState({ lastNameError: "" });
    }
    if (password.value === "") {
      this.setState({ passwordError: "error field" });
    } else {
      this.setState({ passwordError: "" });
    }
    if (confirmPassword.value === "") {
      this.setState({ confirmPasswordError: "error field" });
    } else {
      this.setState({ confirmPasswordError: "" });
    }
    if (confirmPassword.value !== password.value) {
      this.setState({
        passwordError: "error field",
        confirmPasswordError: "error field"
      });
    }
    if (
      password.value !== confirmPassword.value ||
      username.value === "" ||
      firstName.value === "" ||
      lastName.value === "" ||
      password.value === "" ||
      confirmPassword.value === ""
    ) {
      return;
    } else {
      //call fetchData here?
      this.fetchData();
    }
  };

  fetchData = () => {
    console.log("function is running");
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        //sending this.state
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(user => {
        //use the user data to open up a socket connection
        const io = socketIO("http://localhost:8080/", {
          transportOptions: {
            pooling: {
              //send extra headers to socket-io
              extraHeaders: {
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                Authorization: `Bearer ${user.token}`
              }
            }
          }
        });
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
              right: "50%",
              padding: "15px",
              width: "50%",
              top: "25%"
            }}
          >
            <Header style={{ fontSize: "30px", color: "#586e77" }} as="h1" icon>
              <Icon name="sync alternate" />
              NodeSync
              <Header.Subheader style={{ color: "#8c8c8c" }}>
                Collaborative text editing
              </Header.Subheader>
            </Header>
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
                backgroundColor: "#8c8c8c",
                height: "100%",
                overflow: "auto"
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
                    label="First Name"
                    placeholder="First Name"
                    name="firstName"
                    id="firstName"
                    onChange={this.handleChange}
                    className={this.state.firstNameError}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    label="Last Name"
                    placeholder="Last Name"
                    name="lastName"
                    id="lastName"
                    onChange={this.handleChange}
                    className={this.state.lastNameError}
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
                <Form.Field>
                  <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    onChange={this.handleChange}
                    className={this.state.confirmPasswordError}
                    id="confirmPassword"
                  />
                </Form.Field>
                <Button type="submit">Register</Button>
              </Form>
            </Message>
          </Container>
        </div>
      </div>
    );
  }
}
