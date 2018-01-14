import React, { Component } from 'react';
import fire from './fire';
import { Redirect } from 'react-router-dom';
import AnimatedNumber from 'react-animated-number';

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
        fire.database().ref("usersinroom/placeholder").set({donotdelete: "donotdelete"});

    }
    
    componentDidMount() {
        this.interval = setInterval(() => this.update(), 3000);
    }
    
    update() {
        const {updates} = this.state;

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
      if (localStorage.getItem("username") != "undefined") {
          var currentUser = presenceRef.push(localStorage.getItem("username"));
          fire.database().ref("usersinroom/placeholder").remove();
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
      const { fireRedirect, smallValue } = this.state
      

    return (

        <div className="Start">
            <div className="start-card">
                <h3 className="card-title">Waiting for others</h3>
                <p className="card-intro">Need 10 participants</p>


                <AnimatedNumber
                        style={{
                            transition: '0.8s ease-out',
                            transitionProperty:
                                'background-color, color'
                        }}
                        frameStyle={perc => (
                            perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
                        )}
                        stepPrecision={0}
                        value={smallValue}
                        formatValue={n => 'Animated numbers are ${n} ' +
                            'times more awesome than regular ones'}/>
                    
                    
                <h1 className="num-participants"> {usersinroom} </h1>


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
