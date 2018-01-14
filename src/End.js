import React, { Component } from 'react';
import fire from './fire';
import { HorizontalBar } from 'react-chartjs-2';


var questionSum = 0;
var totalUsers = 10.0;
var baseRef = fire.database();


const data = {
  
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  datasets: [
    {
      label: 'View data',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
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
            <div>
                <p>Overview</p>
                
                <HorizontalBar data={data} />
            </div>
        );
        
    }
    
} 

export default End;