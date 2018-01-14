import React, { Component } from 'react';
import fire from './fire';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

var counter = 1;

const data = {

  labels: [],
  datasets: [
    {
      label: 'View data',
      backgroundColor: "#222",
      borderColor: '#555',
      pointBackgroundColor: [
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
      pointRadius: 10,
      hoverBackgroundColor: '',
      hoverBorderColor: '#fff',
      data: [],
      hover: {mode: null},
      borderWidth: 1,
    }
  ]

};

// Loop through users in order with the forEach() method. The callback
// provided to forEach() will be called synchronously with a DataSnapshot
var indexofmybar = -1;

var query = fire.database().ref("users");
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var mysum = childSnapshot.val().sum;
        var username = childSnapshot.val().username;
        console.log(username + mysum);

        if (username === localStorage.getItem("username")) {
            data.labels.push("you");
        } else {
            data.labels.push(counter);
            counter++;
        }

        data.datasets[0].data.push(mysum);
  });
});

console.log("index of mine: " + indexofmybar);


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
                <Line data={data} />
            </div>
        );

    }

}

export default Compare;
