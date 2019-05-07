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
// import { getEnabledCategories } from "trace_events";

export default class NewScriptForm extends React.Component {
  state = {
    title: "",
    language: "",
    category: "",
    collaborators: [],
    users: []
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    console.log(this.state);
    event.preventDefault();
    //call fetchData here
    let newUsers = [];
    // newUsers.push(this.props.user.id);
    this.setState({ users: newUsers }).then(this.fetchData());
  };

  fetchData = () => {
    console.log("function is running");
    fetch("http://localhost:3001/scripts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        //sending this.state
        title: this.state.title,
        language: this.state.language,
        category: this.state.category,
        users: this.state.users,
        collaborators: this.state.collaborators
      })
    })
      // .then(res => res.json())
      .then(res => res.json())
      .then(user => {
        console.log(user);
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

        this.props.renderMainBox();
      });
  };

  categoryOptions = () => {
    let categories = this.props.scripts.map(script => {
      return script.category;
    });
    let uniqueCategories = [...new Set(categories)];

    return uniqueCategories;
  };

  render() {
    return (
      <Form size={"small"} key={"small"} onSubmit={this.handleSubmit}>
        <Form.Field>
          <Form.Input
            label="Title"
            placeholder="Enter a title for your script"
            name="title"
            onChange={this.handleChange}
            id="title"
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            label="Category"
            list="categories"
            placeholder="Enter or select an existing category describing your script"
            name="category"
            id="category"
            onChange={this.handleChange}
          />
          <datalist id="categories">
            <option value="English" />
            <option value="Chinese" />
            <option value="Dutch" />
          </datalist>
        </Form.Field>
        <Form.Field>
          <Form.Input
            label="Last Name"
            placeholder="Last Name"
            name="language"
            id="language"
            onChange={this.handleChange}
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
        <Button type="submit">
          Start typing <Icon name="chevron right" />
        </Button>
      </Form>
    );
  }
}
