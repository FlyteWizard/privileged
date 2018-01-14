import React, { Component } from 'react';
import fire from './fire';

class Start extends Component {
   constructor(props) {
        super(props);
        this.state = { users: [] }; // <- set up react state
          this.username = "";
          this.answerQuestion = this.answerQuestion.bind(this);
        }

      componentWillMount(){
        /* Create reference to users in Firebase Database */
        var usersRef = fire.database().ref("users");

    }

    addUser(e){
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref("users/" + this.inputEl.value).set(
            {
                username: this.inputEl.value,
                q1: '',
                q2: ''
            });
          this.username = this.inputEl.value;
        this.inputEl.value = ''; // <- clear the input
          console.log(this.username);
          console.log(e);
      }
        answerQuestion(questionNumber) {
            console.log(questionNumber);
    }

    render() {

    return (
        <div className="Start">
            <div className="start-card">
                <h3 className="card-title">Waiting for others</h3>
                <p className="card-intro">Need 10 participants</p>

                <h1 className="num-participants"> X </h1>

                <form className="start-form" onSubmit={this.addUser.bind(this)}>
                    <input className="start-name" type="text" placeholder="Your display name" ref={ el => this.inputEl = el }/>
                    <input className ="start-button" type="submit" value="Start"/>
                </form>
            </div>


        </div>

    );
    }
}

export default Start;
