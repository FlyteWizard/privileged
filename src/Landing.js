import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from './fire';

for (var i = 0; i < 12; i++) {
    var str = "q" + i;
    console.log(str);
    fire.database().ref("questionsums/" + str + "/ignore").set("ignore");
}

class Landing extends Component {
    render() {
        localStorage.setItem("username", this.username);
        
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