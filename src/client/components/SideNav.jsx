import React, { Component } from 'react';

import Auth from './Auth';

export default class extends Component {
  componentDidMount() {
    this.initSideNav();
  }

  componentDidUpdate() {
    this.initSideNav();
  }

  initSideNav = () => {
    document.addEventListener('DOMContentLoaded', () => {
      M.Sidenav.init(document.querySelectorAll('.sidenav'), null);
    });
  }

  render() {
    return (
      <div className="col">
        <a href="#!" data-target="slide-out" className="black-text sidenav-trigger">
          <i style={{ marginTop: '2rem' }} className="material-icons">menu</i>
        </a>
        <div id="slide-out" className="sidenav">
          <Auth />
        </div>
      </div>
    );
  }
}
