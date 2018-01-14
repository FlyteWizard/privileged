import React, { Component } from 'react';
import privileged from './privileged.png';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Start from './Start';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={privileged} className="App-logo" alt="logo" />
          <p className="App-nav">About</p>
        </header>
        <h1 className="App-title">Privilege Walk</h1>
        <p className="App-intro">
          This activity forces participants to confront the ways in which society privileges some individuals over others.
        </p>
        
        
        <Switch>
            <Route exact path ='/start' component={Start}/>
        </Switch>
        
        <Link to='/start'>Start my walk</Link>
        // <a className="App-button" href="url">Start my walk</a>
      </div>
    );
  }
}

export default App;
