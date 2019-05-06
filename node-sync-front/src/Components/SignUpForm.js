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
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let inputs = event.target.querySelectorAll("input");
    let password = event.target.querySelector("#password");
    let confirmPassword = event.target.querySelector("#confirmPassword");
    inputs.forEach(input => {
      if (!input.value) {
        console.log(input);
        return;
      }
    });
    if (password.value !== confirmPassword.value) {
      return;
    }
    //call fetchData here?
    this.fetchData(event);
  };

  fetchData = e => {
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
                  <label>Username</label>
                  <input
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>First Name</label>
                  <input
                    placeholder="First Name"
                    name="firstName"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input
                    placeholder="Last Name"
                    name="lastName"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    id="password"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Confirm Password</label>
                  <input
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={this.handleChange}
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
