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
        <div className="App">
            <form onSubmit={this.addUser.bind(this)}>
                <input type="text" ref={ el => this.inputEl = el }/>
                <input type="submit" value="Start my walk"/>
            </form>
        <button onClick={() => this.answerQuestion(1)}>testbutton</button>
        <button onClick={() => this.answerQuestion(2)}>testbutton</button>
        </div>

    );
    }
}

export default Start;