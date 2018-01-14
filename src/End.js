import React, { Component } from 'react';
import fire from './fire';
import { Link } from 'react-router-dom';
import { HorizontalBar } from 'react-chartjs-2';
import { Transition } from 'react-transition-group';


var totalUsers = 10.0;
var baseRef = fire.database();


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



const data = {

  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  datasets: [
    {
      label: "View Data",
      backgroundColor: [
        "#82A19A",
        "#B5CDBF ",
        "#E77171 ",
        "#F39998 ",
        "#EAADAC ",
        "#C8D4A4 ",
        "#F6ECB7",
        "#82A19A",
        "#B5CDBF ",
        "#E77171 ",
        "#F39998 ",
        "#EAADAC ",
        "#C8D4A4 ",
        "#F6ECB7" ],
      borderColor: 'none',
      hoverBackgroundColor: '#fff',
      hoverBorderColor: 'none',
      data: [],
      borderWidth: 1,
    }
  ]

};


for (var i = 0; i < 12; i++) {
    var currRef = baseRef.ref("questionsums/q" + i);
    currRef.on("value", function(snapshot) {
        var x = snapshot.numChildren() - 1;
        console.log(x);
        data.datasets[0].data.push(x / totalUsers);
    });
}


class End extends Component {

    render() {
        return (
            <Transition appear={true} in={true} timeout={duration}>
                {(state) => (
                    <div style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }} className="Overview">
                    
                        <div className="overview-text">
                            <div class="overview-inline">
                                <h1 className="overview-title">Overview</h1>
                                <p className="App-intro">
                                  This activity forces participants to confront the ways in which society privileges some individuals over others.
                                </p>
                            </div>
                            
                            <div class="overview-inline">
                                <Link to='/compare' className="App-button compare-button">Compare</Link>
                            </div>
                        
                        </div>

                    <HorizontalBar data={data} />
                </div>)}
            </Transition>
        );
    }

}

export default End;
