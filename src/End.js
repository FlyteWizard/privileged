import React, { Component } from 'react';
import fire from './fire';
import { Bar } from 'react-chartjs-2';


var questionSum = 0;
var totalUsers = 10.0;
var baseRef = fire.database();
var Result = [];


for (var i = 1; i < 13; i++) {
    var currRef = baseRef.ref("questionsums/q" + i);
    
    
    currRef.on("value", function(snapshot) {
        var x = snapshot.numChildren() - 1;
        console.log(x);
        Result.push(x / totalUsers);
    });
    
       
    

}


console.log(Result);


const data = {
     labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
     datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [1, 2, 3, 4],
        }
     ]
};

class End extends Component {    
    render() {
        return (
            <div>
                <p>Overview</p>
                
                <Bar 
                    data={data}
                    width={100}
                    height={500}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
        
    }
    
} 

export default End;