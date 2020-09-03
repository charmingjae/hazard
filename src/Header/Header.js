/* eslint-disable jsx-a11y/accessible-emoji */
// Header

import React, { Component } from "react";
import "../css/header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="divHead">
        <div className="top-Head">
          <b> 안녕하세요! </b>
        </div>
        <div className="main-Head">
          <div className="content-Head">
            <span>
              <a href="/">haZard</a>
            </span>
            <ul className="ul-menu">
              <li class="li-menu">
                <a href="/">Menu 1</a>
              </li>
              <li class="li-menu">
                <a href="/">Menu 2</a>
              </li>
              <li class="li-menu">
                <a href="/">Menu 3</a>
              </li>
              <li class="li-menu">
                <a href="/">Menu 4</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
