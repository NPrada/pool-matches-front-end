import React, { Component } from 'react';
import * as assets from '../assets/assetCatalog';
import '../App.css';

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={assets.reactLogo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
