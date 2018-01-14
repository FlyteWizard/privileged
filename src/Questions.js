import React, { Component } from 'react';
import fire from './fire';
import { Redirect } from 'react-router-dom';

var counter = 0;
var yesCounter = 0;

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

/* If yes means that you are privileged, then we map to a 1, otherwise map to 0 */
const yesMap = [
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
        this.state = {
            question: 'Do you have a personal computer and/or phone?',
        }
    }

    handleClick = (answer) => {
        console.log(counter);
        counter++;
        if (answer === "yes") {
            yesCounter++;
        }

        this.setState({ question: questionList[counter] });
        fire.database().ref("users/" + localStorage.getItem("username") + "/q" + counter).set(answer);

        if (counter === questionList.length) {
            this.setState({ fireRedirect: true })
        }

        fire.database().ref("users/" + localStorage.getItem("username") + "/sum").set(yesCounter);
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
