import React, { Component } from 'react';
import fire from './fire';
import { Redirect } from 'react-router-dom';

var usersinroom;

class Start extends Component {
   constructor(props) {
        super(props);
        this.state = { 
            users: [],
            fireRedirect: false
        }; // <- set up react state
    }
    
    componentWillMount(){
        /* Create reference to users in Firebase Database */
        var usersRef = fire.database().ref("users");
        var username = "";
        
    }
      
    submitForm = (e) => {
       e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref("users/" + this.inputEl.value).set(
            {
                username: this.inputEl.value,
            });
        
        this.username = this.inputEl.value;
        this.inputEl.value = ''; // <- clear the input
        console.log(this.username);
        localStorage.setItem("username", this.username);
        console.log(e);

        this.setState({ fireRedirect: true })
    }

  render() {
      
      // Add ourselves to presence list when online.
      var listRef = fire.database().ref("usersinroom");
      var presenceRef = fire.database().ref("usersinroom/" + localStorage.getItem("username"));
      if (localStorage.getItem("username") != "undefined") {
          var currentUser = presenceRef.push(localStorage.getItem("username"));
      }
      
      presenceRef.on("value", function(snap) {
          console.log(snap.val());
          presenceRef.onDisconnect().remove();
      });
      listRef.on("value", function(snap) {
          console.log("Online:" + snap.numChildren());
          usersinroom = snap.numChildren();
      });
      
      /*
      fire.database().ref("usersinroom").on('value', function(snapshot) {
            usersinroom = snapshot.val();
          console.log(usersinroom);
        });
        console.log(usersinroom);
        if (usersinroom == 10) {
            console.log("ten users reached, ready to start");
        }
      */
      
      const { from } = this.props.location.state || '/'
      const { fireRedirect } = this.state

    return (
        
        <div className="Start">
            <div className="start-card">
                <h3 className="card-title">Waiting for others</h3>
                <p className="card-intro">Need 10 participants</p>

                <h1 className="num-participants"> X {usersinroom} </h1>


                    <form className="start-form" onSubmit={this.submitForm.bind(this)}>
                        <input className="start-name" type="text" placeholder="Your display name" ref={ el => this.inputEl = el }/>
                        <input className ="start-button" type="submit" value="Start"/>
                    </form>

                    {fireRedirect && (
                      <Redirect to={from || '/questions'}/>
                    )}
                </div>
            </div>

        );
    }
}

export default Start;
