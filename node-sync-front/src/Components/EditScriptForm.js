import React from "react";
import socketIO from "socket.io-client";
import {
  Button,
  Form,
  Message,
  Container,
  Header,
  Icon,
  Select,
  Modal
} from "semantic-ui-react";
// import { getEnabledCategories } from "trace_events";

export default class EditScriptForm extends React.Component {
  state = {
    title: "",
    language: "",
    category: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    this.fetchData();
  };

  fetchData = () => {
    console.log("function is running");
    fetch(`http://localhost:3001/scripts/${this.props.script.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        //sending this.state
        title: this.state.title,
        language: this.state.language,
        category: this.state.category
      })
    });
  };

  deleteScript = () => {
    console.log("function is running");
    fetch(`http://localhost:3001/scripts/${this.props.script.id}`, {
      method: "DELETE"
      // headers: {
      //   "Content-Type": "application/json"
      // },
      // body: JSON.stringify({
      //   //sending this.state
      //   title: this.state.title,
      //   language: this.state.language,
      //   category: this.state.category
      // })
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

        <Button type="submit" positive onClick={this.handleSubmit}>
          Confirm Edits <Icon name="checkmark" />
        </Button>

        <Modal
          trigger={
            <Button negative>
              Delete Script <Icon name="x" />
            </Button>
          }
          basic
          size="small"
        >
          <Modal.Content>
            <p>
              Are you sure that you want to delete this script? Click outside
              this message to dismiss.
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" inverted onClick={this.deleteScript}>
              <Icon name="remove" /> Delete Script
            </Button>
          </Modal.Actions>
        </Modal>
      </Form>
    );
  }
}
