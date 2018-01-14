import React, { Component } from 'react';
import fire from './fire';
import { Redirect } from 'react-router-dom';

var steps = 0;
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
    'Did your parent(s) attend college?',
    'Do you have internet access at home?',
    'Are you a cis-gendered male?',
    "Have you been mistaken for a non-developer?"
];

const questionType = [
    1,
    0,
    1, 
    1,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    0
];


class Questions extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        count = 0;
        steps = 0;
        this.state = {
            question: questionList[0],
        }
    }

    handleClick = (answer) => {
        // Ouput Count
        // if user doesn't finish quiz, the counter is never reset.
        console.log(count);
        
        if ( ((questionType[count] === 1) && (answer === "yes")) || 
                    ((questionType[count] === 0) && (answer === "no")) ) { // Then take a step forward
            steps++;
            // Increment the user sum
            fire.database().ref("users/" + localStorage.getItem("username") + "/sum").set(steps);
            // Add an entry so that we can keep track of
            // how many people are privileged based on the question
            fire.database().ref("questionsums/q" + count).push(answer);
        }
        
        
        count++;
        
        
        this.setState({ question: questionList[count] });
        fire.database().ref("users/" + localStorage.getItem("username") + "/q" + count).set(answer);

        // This sends out twice during the second round
        fire.database().ref("questionsums/q" + count).on("value", function(snap) {
            console.log("Sum of question" + count + ": " + snap.numChildren());
        });
        
        // When done - Restart
        if (count === questionList.length) {
            this.setState({ fireRedirect: true });
            count = 0;
            fire.database().ref("users/" + localStorage.getItem("username") + "/sum").set(steps);
            steps = 0;
        }
    };


    render() {
        

        const { from } = this.props.location.state || '/';
        const { question } = this.state;
        const { fireRedirect } = this.state;

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
