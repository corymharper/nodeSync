import React from "react";
import socketIO from "socket.io-client";
import { Button, Checkbox, Form } from "semantic-ui-react";

export default class SignUpForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    userName: "",
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
        firstName: e.target[0].value,
        lastName: e.target[1].value,
        username: e.target[2].value, 
        password: e.target[3].value 
      })
    })
      .then(res => res.json())
      .then(user => {
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
          < input placeholder = "username"
          name = "username"
          type = "text"
          value = {
            this.state.userName
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
