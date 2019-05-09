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
import SocketHandler from "../SocketHandler";
// import { getEnabledCategories } from "trace_events";

export default class NewScriptForm extends React.Component {
  state = {
    title: "",
    language: "",
    category: "",
    userid: localStorage.getItem("userid"),
    open: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    this.setState({ open: false });
    this.emitData();
  };

  emitData = () => {
    SocketHandler.emit("script.create", {
      title: this.state.title,
      language: this.state.language,
      category: this.state.category,
      userid: this.state.userid
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
      <Modal
        trigger={
          <Button
            style={{
              position: "absolute",
              top: "20%",
              bottom: "20%",
              right: "7px",
              padding: "5px",
              width: "30px",
              height: "30px",
              margin: "0px",
              backgroundColor: "#898989"
            }}
            onClick={() => this.setState({ open: true })}
            icon
          >
            <Icon name="edit" />
          </Button>
        }
        open={this.state.open}
      >
        <Modal.Header
          style={{
            backgroundColor: "#1d1d1d",
            color: "white"
          }}
        >
          Create a New Script
          <Button
            onClick={() => this.setState({ open: false })}
            style={{ position: "absolute", right: "3%" }}
            icon
          >
            <Icon name="x" />
          </Button>
        </Modal.Header>
        <Modal.Content
          small
          scrolling
          style={{
            backgroundColor: "#262626"
          }}
        >
          <Modal.Description>
            <Form size={"small"} key={"small"} inverted>
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
                  onChange={e =>
                    this.setState({
                      language: e.target.querySelector("span").innerText
                    })
                  }
                  options={this.languageOptions()}
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
                <datalist id="categories">{this.categoryOptions()}</datalist>
              </Form.Field>

              <Button type="submit" onClick={this.handleSubmit}>
                Start typing <Icon name="chevron right" />
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
