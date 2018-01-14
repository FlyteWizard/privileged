import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Start from './Start';

class Landing extends Component {
    render() {
        return (
        <div className="App">
            <h1 className="App-title">Privilege Walk</h1>
            <p className="App-intro">
              This activity forces participants to confront the ways in which society privileges some individuals over others.
            </p>
            
            
            <Link to='/start' className="App-button">Start my walk</Link>
        </div>
        );
    }
}

export default Landing;