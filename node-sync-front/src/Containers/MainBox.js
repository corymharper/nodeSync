import React from "react";
import Nav from "./Nav";
import NotesBox from "./NotesBox";
import WorkingBox from "./WorkingBox";

export default class MainBox extends React.Component {
  state = { notes: [{ title: "Note 1", content: "This is Note 1's content" }] };

  render() {
    return (
      <div className="mainBox">
        <Nav />
        <NotesBox />
        <WorkingBox />
      </div>
    );
  }
}
