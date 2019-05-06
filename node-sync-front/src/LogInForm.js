import React from "react";
import socketIO from "socket.io-client";
import {
  Button,
  Checkbox,
  Form,
  Message,
  Container,
  Segment,
  Grid,
  Divider
} from "semantic-ui-react";

export default class LoginForm extends React.Component {
  fetchData = e => {
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: e.target[0].value, //replace this by event target value
        password: e.target[1].value //replace this by event target value
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
              bottom: "0%",
              padding: "15px",
              width: "50%",
              textAlign: "left"
            }}
          >
            <Form inverted>
              <Form.Field>
                <label>Email</label>
                <input placeholder="Email" />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder="Password" />
              </Form.Field>
              <Button type="submit">Log In</Button>
            </Form>
          </Container>
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "0%",
              padding: "15px",
              width: "50%",
              textAlign: "left"
            }}
          >
            <Message>
              <Message.Header>Not a registered user?</Message.Header>
              <p>Click this button to sign up.</p>
              <Button>Sign Up</Button>
            </Message>
          </div>
        </div>
      </div>
    );
  }
}
