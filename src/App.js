import React, { Component } from 'react';
import p from './p.png';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';

import Start from './Start';
import Landing from './Landing';
import Questions from './Questions';
import End from './End';


class App extends Component {
  render() {
    return (
      <div className="App">
        
        <header className="App-header">
          <Link to='/'><img src={p} className="App-logo" alt="logo" /></Link>
          <p className="App-nav">About</p>
        </header>
      
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/start' component={Start}/>
          <Route exact path='/questions' component={Questions}/>
          <Route exact path='/end' component={End}/>
          
        </Switch>

      </div>
    );
  }
}

export default App;