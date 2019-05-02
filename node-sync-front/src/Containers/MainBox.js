import React from "react";
import Nav from "./Nav";
import NotesBox from "./NotesBox";
import WorkingBox from "./WorkingBox";

export default class MainBox extends React.Component {
  state = {
    notes: [
      { title: "Note 1", content: "This is Note 1's content" },
      { title: "Note 2", content: "This is Note 2's content" },
      { title: "Note 3", content: "This is Note 3's content" },
      { title: "Note 4", content: "This is Note 4's content" },
      { title: "Note 5", content: "This is Note 5's content" },
      { title: "Note 1", content: "This is Note 1's content" },
      { title: "Note 2", content: "This is Note 2's content" },
      { title: "Note 3", content: "This is Note 3's content" },
      { title: "Note 4", content: "This is Note 4's content" },
      { title: "Note 5", content: "This is Note 5's content" },
      { title: "Note 1", content: "This is Note 1's content" },
      { title: "Note 2", content: "This is Note 2's content" },
      { title: "Note 3", content: "This is Note 3's content" },
      { title: "Note 4", content: "This is Note 4's content" },
      { title: "Note 5", content: "This is Note 5's content" }
    ]
  };

  render() {
    return (
      <div className="mainContainer" style={{ color: "#898989" }}>
        <Nav />
        <NotesBox notes={this.state.notes} />
        <WorkingBox />
      </div>
    );
  }
}
