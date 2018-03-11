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
    var currRef = baseRef.ref(localStorage.getItem("room") + "/questionsums/q" + i);
    currRef.on("value", function(snapshot) {
        var x = snapshot.numChildren() - 1;
        console.log(x);
        data.datasets[0].data.push(x / totalUsers);
    });
}

// the class of the chart so that we can update its state which causes it to update in the render
class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        let currentComponent = this;
        fire.database().ref(localStorage.getItem("room") + "/questionsums").on("value", function(snapshot) {
            data.datasets[0].data = []; // clear existing data
            for (var i = 0; i < 12; i++) {
                var currRef = baseRef.ref(localStorage.getItem("room") + "/questionsums/q" + i);
                currRef.on("value", function(snapshot) {
                    var x = snapshot.numChildren() - 1;
                    console.log(x);
                    data.datasets[0].data.push(x / totalUsers);
                });
            }
            console.log("componentdidmount");
            currentComponent.setState({
              date: new Date()
            });
        });
    }

    render() {
        return (
            <HorizontalBar data={data} />
        );
    }
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
                        <div className="overview-inline">
                            <h1 className="overview-title">Overview</h1>
                            <p className="App-intro">
                              Not all privileges are made equal. Some are more common than others, especially among members of the tech community.
                              The graph below displays the ratio of participants who benefited from each of the privileges presented today.
                            </p>
                        </div>
                        <div className="overview-inline">
                            <Link to='/compare' className="App-button compare-button">Compare</Link>
                        </div>
                    </div>
                    <Chart />
                </div>)}
            </Transition>
        );
    }
}

export default End;
