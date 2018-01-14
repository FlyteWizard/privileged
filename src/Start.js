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
        e.preventDefault()
        this.setState({ fireRedirect: true })
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
        <div className="App">
            <form onSubmit={this.submitForm.bind(this)}>
                <input type="text" ref={ el => this.inputEl = el }/>
                <input type="submit" value="Start"/>
            </form>

            {fireRedirect && (
                <Redirect to={from || '/questions'}/>
            )}
        </div>

    );
    }
}

export default Start;