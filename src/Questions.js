import React, { Component } from 'react';
import fire from './fire';
import { Redirect } from 'react-router-dom';

var yesCounter = 0;
var count = 0;

const questionList = [
    'Do you have a personal computer and/or phone?',
    'Were you ever discouraged from academics or jobs because of race, class, ethnicity, gender, or sexual orientation?',
    'Were you ever offered a good job because of your association with a friend or family member?',
    'Did/Do your parent(s) pay for your post-secondary education?',
    'Were you ever ashamed or embarrassed of your clothes, computer, mobile phone, etc.?',
    'Have you ever tried to change your appearance, mannerisms, or behavior to avoid being judged or ridiculed, or to gain more credibility?',
    'Have you ever felt or were told that you should work twice as hard as others to succeed in school or career because of your background?',
    'Do you have a disability?',
    'Did your parent(s) attended college?',
    'Do you have internet access at home?',
    'Are you a cis-gendered male?',
    "Have you been mistaken for a non-developer?"
];

class Questions extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            question: questionList[0], 
            counter: 0,
            yesCounter: 0,
        }
    }

    handleClick = (answer) => {
        // Ouput Count
        console.log(count);
        count++;
        
        // If yes add to counter
        if (answer === "yes") {
            yesCounter++;
            fire.database().ref("questionsums/q" + count).push(answer);
        }

        // Send
        this.setState({ question: questionList[count] });
        fire.database().ref("users/" + localStorage.getItem("username") + "/q" + count).set(answer);

        fire.database().ref("questionsums/q" + count).on("value", function(snap) {
            console.log("Sum of question" + count + ": " + snap.numChildren());
        });

        // When done - Restart
        if (count === 12) {
            this.setState({ fireRedirect: true });
            count = 0;

            fire.database().ref("users/" + localStorage.getItem("username") + "/sum").set(yesCounter);
            yesCounter = 0;
        }
    };


    render() {
        

        const { from } = this.props.location.state || '/'
        const { question } = this.state;
        const { fireRedirect } = this.state

        return (


            <div className="Questions">
                <div className="questions-container">
                    {question && <h1 className="question">{question}</h1>}
                    <div className="button-container">

                        <button className="answer yes" onClick={() => this.handleClick("yes")}>Yes</button>
                        <button className="answer no" onClick={() => this.handleClick("no")}>No</button>
                    </div>
                </div>


                {fireRedirect && (
                    <Redirect to={from || '/end'}/>
                )}


            </div>





        );

    }

}

export default Questions;
