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
          <Link to='/'><img src={p} className="App-logo" alt="logo" /></Link>
          <a href="https://github.com/FlyteWizard/whatthetech" target="_blank" className="App-nav Link">Github</a>
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