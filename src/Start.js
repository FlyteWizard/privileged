import React, { Component } from 'react';
import fire from './fire';
import { Redirect } from 'react-router-dom';
import { Transition } from 'react-transition-group';

var usersinroom = 0;

var placeholdercounter = 0;

fire.database().ref("usersinroom").on("value", function(snap) {
    console.log("Online:" + snap.numChildren());
    placeholdercounter = snap.numChildren();
});

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
        fire.database().ref("usersinroom/placeholder" + placeholdercounter).set({donotdelete: "donotdelete"});
        placeholdercounter++;

    }

    componentDidMount() {
        this.interval = setInterval(() => this.update(), 3000);
    }

    update() {
        this.setState({
            smallValue: usersinroom
        });
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
      if (localStorage.getItem("username") !== "undefined") {
          fire.database().ref("usersinroom/placeholder" + placeholdercounter).remove();
      }

      presenceRef.on("value", function(snap) {
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
         <Transition appear={true} in={true} timeout={duration}>
            {(state) => (
                <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }} className="Start">

                <div className="start-card">
                    <h3 className="card-title">There are currently:</h3>


                    <h1 className="num-participants"> {usersinroom} </h1>

                        <form className="start-form" onSubmit={this.submitForm.bind(this)}>
                            <input className="start-name" type="text" placeholder="Your display name*" ref={ el => this.inputEl = el } required/>

                            <input className ="start-button" type="submit" value="Start"  />
                        </form>

                        {fireRedirect && (
                          <Redirect to={from || '/questions'}/>
                        )}
            </div>
            </div>)}
        </Transition>

        );
    }
}

export default Start;
