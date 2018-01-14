import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Start from './Start';

class Landing extends Component {
    render() {
        return (
        <div>

            <h1 className="App-title">Privilege Walk</h1>
            <p className="App-intro">
              This activity forces participants to confront the ways in which society privileges some individuals over others.
              Seasonal the wisdom of your body rebirthing crystal essence rain dance open-minded one taste deep tissue, somatic radical acceptance solstice. Watsu marinese closing circle fasting elder paleo diet, reflexology papasan.
            </p>
            
            <Link to='/start' className="App-button">Start my walk</Link>
            
        </div>
        );
    }
}

export default Landing;