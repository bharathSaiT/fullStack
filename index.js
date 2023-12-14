const express = require('express')
const app = express()
const port = 3000

function calculateSum(req, res){
    var sum =0;
    for(var i =0;i<100;i++){
        sum+=i;
    }
    // return sum;
    res.send('Hello World! the sum is :' + sum);
}

// when request method GET 
//default route '/'
app.get('/', calculateSum);


function startListening(){
    console.log(`Example app listening on port ${port}`)
}

//this line of code- makes this an active httpserver listening on port
app.listen(port, startListening(port));

//these few lines can run a  potential website , you can buy a domain , host it on internet.
// add some  UI
//do some backend process : as per usecase 
//you have your application ready

