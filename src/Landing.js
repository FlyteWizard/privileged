import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from './fire';
import { Transition } from 'react-transition-group';

for (var i = 0; i < 12; i++) {
    var str = "q" + i;
    console.log(str);
    fire.database().ref("questionsums/" + str + "/ignore").set("ignore");
}


const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  //padding: 20,
  //display: 'inline-block',
  //backgroundColor: '#8787d8'
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};


class Landing extends Component {
    render() {
        localStorage.setItem("username", this.username);
        return (
            <Transition appear={true} in={true} timeout={duration}>
                {(state) => (
                <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                    <h1 className="App-title">Privilege Walk</h1>
                    <p className="App-intro">
                      This activity forces participants to confront the ways in which society privileges some individuals over others.
                      Privilege is often invisible, yet it has the potential to shape every aspect our everyday lives.
                      As our lives become increasingly intertwined with technology, there is a growing need to raise awareness about these issues in the tech community.
                    </p>


                    <Link to='/start' className="App-button">Start my walk</Link>
                    
                </div>)}
            </Transition>
        
        );
    }
}

export default Landing;
