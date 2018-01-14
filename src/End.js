import React, { Component } from 'react';
import fire from './fire';
import { HorizontalBar } from 'react-chartjs-2';

var totalUsers = 10.0;
var baseRef = fire.database();


const data = {

  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  datasets: [
    {
      label: 'View data',
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
      hoverBackgroundColor: '',
      hoverBorderColor: '#fff',
      data: [],
      hover: {mode: null},
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
            <div className="Overview">
                <h1 className="overview-title">Overview</h1>
                <p className="App-intro">
                  This activity forces participants to confront the ways in which society privileges some individuals over others.
                </p>

                <HorizontalBar data={data} />
            </div>
        );

    }

}

export default End;
