import React, { Component } from 'react';
import fire from './fire';
import { Line } from 'react-chartjs-2';
import { Link, BrowserRouter } from 'react-router-dom';

var userCounter = 0;

const data = {
    labels: [],
    datasets: [
        {
          label: 'View data',
          backgroundColor: "#222",
          borderColor: '#555',
          pointBackgroundColor: "#82A19A",
          pointRadius: 10,
          hoverBackgroundColor: '',
          hoverBorderColor: '#fff',
          data: [],
          hover: {mode: null},
          borderWidth: 1,
        }
    ]
};

// update chart when data is added to the database
fire.database().ref("users").on("value", function(snapshot) {
    // only set chart data after the user has set their username, so that we can print "you" in the chart
    if (localStorage.getItem("username") !== "undefined") {
        data.datasets[0].data = []; // clear any existing data
        snapshot.forEach(function(childSnapshot) {
            var mysum = childSnapshot.val().sum;
            var username = childSnapshot.val().username;
            if (userCounter < snapshot.numChildren()) {
                if (username === localStorage.getItem("username")) {
                    data.labels.push("you");
                    console.log("you!");
                } else {
                    data.labels.push(userCounter);
                }
            }
            userCounter++;
            data.datasets[0].data.push(mysum); 
        });
    }
});

// the class of the chart so that we can update its state which causes it to update in the render
class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    
    componentDidMount() {
        let currentComponent = this;
        fire.database().ref("users").on("value", function(snapshot) {
            console.log("componentdidmount");
            currentComponent.setState({
              date: new Date()
            });
        });
    }
    
    render() {
        return (
            <Line data={data} />
        );
    }
}

class Compare extends Component {
    render() {    
        return (
            <div className="Compare">
                <div className="overview-text">
                    <div className="overview-inline">
                        <h1 className="overview-title">Compare</h1>
                        <p className="App-intro">
                            Where do you stand?
                            The higher on the screen you are, the more privileges you have been afforded in this specific context. 
                            Take some time to consider those ahead of you, as well as those behind you.
                        </p>
                    </div>
                    <div className ="overview-inline">
                        <Link to='/recap' className="App-button compare-button">Recap</Link>
                    </div>
                </div>
                <Chart />
            </div>
        );
    }
}

export default Compare;