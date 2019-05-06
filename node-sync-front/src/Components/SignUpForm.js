import React from "react";
import socketIO from "socket.io-client";
import { Button, Checkbox, Form } from "semantic-ui-react";

export default class SignUpForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    //call fetchData here?
    // this.fetchData(event)
  }

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
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>First Name</label>
          < input placeholder = "First Name"
          name = "firstName"
          type = "text"
          value = {
            this.state.firstName
          }
          onChange = {
            event => this.handleChange(event)
          }
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          < input placeholder = "Last Name"
          name = "lastName"
          type = "text"
          value = {
            this.state.lastName
          }
          onChange = {
            event => this.handleChange(event)
          }
          />
        </Form.Field>
        <Form.Field>
          <label>Username</label>
          < input placeholder = "User Name"
          name = "userName"
          type = "text"
          value = {
            this.state.username
          }
          onChange = {
            event => this.handleChange(event)
          }
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          < input placeholder = "Password"
          name = "password"
          type = "text"
          value = {
            this.state.password
          }
          onChange = {
            event => this.handleChange(event)
          }
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}
