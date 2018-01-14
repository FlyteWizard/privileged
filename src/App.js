import React, { Component } from 'react';
import privileged from './privileged.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={privileged} className="App-logo" alt="logo" />
          <p className="App-nav">About</p>
        </header>
        <h1>Privilege Walk</h1>
        <p className="App-intro">
          This activity forces participants to confront the ways in which society privileges some individuals over others.
        </p>
      </div>
    );
  }
}

export default App;
