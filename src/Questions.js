import React, { Component } from 'react';
import fire from './fire';

var counter = 0;

const questionList = [
    '1. If you have a personal computer/phone, take one step forward.',
    '2. If you were ever discouraged from academics or jobs because of race, class, ethnicity, gender or sexual orientation, take one step back.',
    '3. If you were ever offered a good job because of your association with a friend or family member, take one step forward.',
    '4. If your parents pay for your education college, take one step forward.',
    '5. If you were ever ashamed or embarrassed of your clothes, computer, mobile phone, etc. take one step back.',
    '6. If you ever tried to change your appearance, mannerisms, or behavior to avoid being judged or ridiculed, or to gain more credibility, take one step back.',
    '7. If you were encouraged by your parents to attend college, take one step forward.',
    '8. If you felt or were told that you should work twice as hard as others to succeed in school or career because of your background, take a step back.',
    '9. If you have a disability, take one step backward.',
    '10. If you were paid less, treated less fairly because of race, ethnicity, gender or sexual orientation, take one step back.',
    '11. If your parents attended college take one step forward.',
    '12. If you live by yourself or with a S.O., take one step forward.',
    '13. If you have internet access at home, take one step forward.',
    '14. If you are a cis-gendered male, take one step forward.',
    '15. If you haven&apost been mistaken for a non-developer, take one step forward.'
];

class Questions extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            question: '1. If you have a personal computer/phone, take one step forward.',
            questionNum: ''
        }
    }
    
    
    handleClick = (answer) => {
        console.log(counter);
        counter++;
        this.setState({ question: questionList[counter] });
        fire.database().ref("users/" + localStorage.getItem("username") + "/q" + counter).set(answer);
    };
    
    
    render() {
        
        const { question } = this.state;
        
        return (
            
            
            <div className="App">
                {question && <p>{question}</p>}
                <div>
                <button onClick={() => this.handleClick("yes")}>yes</button>
                <button onClick={() => this.handleClick("no")}>no</button>
                </div>
            </div>
        
        
        );
        
    }
    
}

export default Questions;