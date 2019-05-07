import React from "react";
import socketIO from "socket.io-client";
import {
  Button,
  Form,
  Message,
  Container,
  Header,
  Icon,
  Select
} from "semantic-ui-react";
// import { getEnabledCategories } from "trace_events";

export default class NewScriptForm extends React.Component {
  state = {
    title: "",
    language: "",
    category: "",
    userid: localStorage.getItem("userid")
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    console.log(this.state);
    event.preventDefault();
    //call fetchData here?
    this.fetchData();
  };

  fetchData = () => {
    console.log("function is running");
    fetch("http://localhost:3001/scripts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        //sending this.state
        title: this.state.title,
        language: this.state.language,
        category: this.state.category,
        userid: this.state.userid
      })
    });
  };

  categoryOptions = () => {
    let categories = this.props.scripts.map(script => {
      return script.category;
    });
    let uniqueCategories = [...new Set(categories)];

    return uniqueCategories.map(category => {
      return <option value={category} />;
    });
  };

  languageOptions = () => {
    return [
      { key: "Ruby", text: "Ruby", value: "Ruby" },
      { key: "Javascript", text: "Javascript", value: "Javascript" },
      { key: "JSX", text: "JSX", value: "JSX" },
      { key: "Python", text: "Python", value: "Python" }
    ];
  };

  render() {
    return (
      <Form size={"small"} key={"small"}>
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
          <Form.Select
            label="Language"
            placeholder="Select a programming language for your script"
            name="language"
            id="language"
            onChange={this.handleChange}
            options={this.languageOptions()}
          />
        </Form.Field>

        {/* <Form.Field>
          <Form.Input
            label="Category"
            list="categories"
            placeholder="Enter or select an existing category describing your script"
            name="category"
            id="category"
            onChange={this.handleChange}
          />
          <datalist id="categories">{this.categoryOptions()}</datalist>
        </Form.Field> */}

        <Button type="submit" onClick={this.handleSubmit}>
          Start typing <Icon name="chevron right" />
        </Button>
      </Form>
    );
  }
}
