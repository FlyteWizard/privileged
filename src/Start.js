import React, { Component } from 'react';
import fire from './fire';
import { Link, Redirect } from 'react-router-dom';


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
                q1: '',
                q2: '',
                q3: '',
                q4: '',
                q5: '',
                q6: '',
                q7: '',
                q8: '',
                q9: '',
                q10: '',
                q11: '',
                q12: '',
                
            });
        
        this.username = this.inputEl.value;
        this.inputEl.value = ''; // <- clear the input
        console.log(this.username);
        localStorage.setItem("username", this.username);
        console.log(e);

        this.setState({ fireRedirect: true })
    }

  render() {
      
      const { from } = this.props.location.state || '/'
      const { fireRedirect } = this.state

    return (
        <div className="Start">
            <div className="start-card">
                <h3 className="card-title">Waiting for others</h3>
                <p className="card-intro">Need 10 participants</p>

                <h1 className="num-participants"> X </h1>

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
