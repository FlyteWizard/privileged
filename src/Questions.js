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
                 <div>
                {[...Array(12)].map((x, i) =>
                 <div>
                    <button onClick={() => this.answerQuestion(i, "yes")}>yes</button>
                    <button onClick={() => this.answerQuestion(i, "no")}>no</button>
                </div>
                )}
            </div>
            </div>
        
        
        );
        
    }
    
}

export default Questions;