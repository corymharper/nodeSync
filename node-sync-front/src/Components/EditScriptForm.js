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

export default class EditScriptForm extends React.Component {
  state = {
    title: this.props.script.title,
    language: this.props.script.language,
    category: this.props.script.category,
    open: false,
    languageOptions: [
      { key: "Ruby", text: "Ruby", value: "Ruby" },
      { key: "Javascript", text: "Javascript", value: "Javascript" },
      { key: "JSX", text: "JSX", value: "JSX" },
      { key: "Python", text: "Python", value: "Python" }
    ]
  };


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    this.emitData();
    this.setState({ open: false });
  };

  emitData = () => {
    SocketHandler.emit("script.edit", {
      id: this.props.script.id,
      title: this.state.title,
      language: this.state.language,
      category: this.state.category
    });
  };

  deleteScript = () => {
    this.setState({ open: false });
    SocketHandler.emit("script.delete", {
      script_id: this.props.script.id,
      user_id: localStorage.getItem("userid")
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

  render() {
    return (
      <Modal
        trigger={
          <Icon
            style={{
              position: "absolute",
              top: "10%",
              right: "0%",
              color: "#898989"
            }}
            name="ellipsis vertical"
            onClick={() => this.setState({ open: true })}
          />
        }
        open={this.state.open}
      >
        <Modal.Header
          style={{
            backgroundColor: "#1d1d1d",
            color: "white"
          }}
        >
          Edit Script
          <Button
            onClick={() => this.setState({ open: false })}
            style={{ position: "absolute", right: "3%" }}
            icon
          >
            <Icon name="x" />
          </Button>
        </Modal.Header>
        <Modal.Content
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
                  placeholder={
                    this.state.title
                      ? this.state.title
                      : "Enter a title for your script"
                  }
                  name="title"
                  onChange={this.handleChange}
                  id="title"
                />
              </Form.Field>

              <Form.Field>
                <Form.Select
                  label="Language"
                  placeholder={
                    this.state.language
                      ? this.state.language
                      : "Select a programming language for your script"
                  }
                  name="language"
                  id="language"
                  onChange={(e, { value }) =>
                    this.setState({
                      language: value
                    })
                  }
                  options={this.state.languageOptions}
                />
              </Form.Field>

              <Form.Field>
                <Form.Input
                  label="Category"
                  list="categories"
                  placeholder={
                    this.state.category
                      ? this.state.category
                      : "Enter or select an existing category describing your script"
                  }
                  name="category"
                  id="category"
                  onChange={this.handleChange}
                />
                <datalist id="categories">{this.categoryOptions()}</datalist>
              </Form.Field>

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
                closeIcon
              >
                <Modal.Content>
                  <p>Are you sure that you want to delete this script?</p>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="red" inverted onClick={this.deleteScript}>
                    <Icon name="remove" /> Delete Script
                  </Button>
                </Modal.Actions>
              </Modal>
            </Form>
          </Modal.Description>
        </Modal.Content>
        {/* <Modal.Actions>
              <Button primary>
                Proceed <Icon name="chevron right" />
              </Button>
            </Modal.Actions> */}
      </Modal>
    );
  }
}
