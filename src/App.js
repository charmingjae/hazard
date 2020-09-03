// Reference
// velog.io/@bearsjelly
import React, { Component } from "react";
import Mapcomp from "./MapComp/mapComp";
import Header from "./Header/Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Map",
    };
  }
  render() {
    return (
      <>
        <div className="Head">
          <Header />
        </div>
        <div className="Body">{this.state.page === "Map" && <Mapcomp />}</div>
      </>
    );
  }
}

export default App;
