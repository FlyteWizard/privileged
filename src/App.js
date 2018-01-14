import React, { Component } from 'react';
import privileged from './privileged.png';
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
          <img src={privileged} className="App-logo" alt="logo" />
          <p className="App-nav">About</p>
          
          <Switch>
                <Route exact path='/' component={Landing}/>
                <Route exact path='/start' component={Start}/>
                <Route exact path='/question' component={Questions}/>
           </Switch>
          
          
        </header>
      </div>
    );
  }
}

export default App;