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
          <b> haZard를 방문 해주셔서 감사합니다. </b>
          <a href="/"> 위치 제공 여부를 확인해주세요! </a>
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
