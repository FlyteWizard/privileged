import React, { Component } from 'react';
import fire from './fire';

class Questions extends Component {
    constructor(props) {
        super(props);
        this.answerQuestion = this.answerQuestion.bind(this);
    }
    
    answerQuestion(questionNumber, answer) {
        console.log(questionNumber);
        fire.database().ref("users/" + localStorage.getItem("username") + "/q" + questionNumber).set(answer);
    }
    
    
    render() {
        
        
        
        return (
            
            <div className="App">
                 <button onClick={() => this.answerQuestion(1, "yes")}>yes</button>
                 <button onClick={() => this.answerQuestion(1, "no")}>no</button>
            </div>
        
        
        );
        
    }
    
}

export default Questions;