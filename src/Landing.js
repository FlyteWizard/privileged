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
                    <h1 className="App-title">Privileged.tech</h1>
                    <p className="App-intro">
                      Privileged.tech is a web application that enables groups of individuals to conduct a <a className="pinklink" href="https://edge.psu.edu/workshops/mc/power/privilegewalk.shtml">‘privilege walk’</a> from their web-connected devices in real time. The questions in the walk aim to expose the privileges present in the tech community, and provoke participants to reflect on their position in the walk.
                    </p>


                    <Link to='/start' className="App-button">Start my walk</Link>

                </div>)}
            </Transition>

        );
    }
}


export default Landing;
