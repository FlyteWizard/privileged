import React, { Component } from 'react';
import p from './p.png';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Start from './Start';
import Landing from './Landing';
import Questions from './Questions';


class App extends Component {
  render() {
    return (
      <div className="App">
        
        <header className="App-header">
          <img src={p} className="App-logo" alt="logo" />
          <p className="App-nav">About</p>
        </header>
      
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/start' component={Start}/>
          <Route exact path='/questions' component={Questions}/>
        </Switch>

      </div>
    );
  }
}

export default App;