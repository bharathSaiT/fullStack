const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const port = 3000

app.use(bodyParser.json());
function middleware1(req, res, next){
    // console.log(req.body);
    // res.send("from middleware , fuck you");
    next();
}
app.use(middleware1);
function calculateSum(req, res){
    var sum =0;
    console.log(req.query);
    var counter =  req.query.count;
    for(var i =1;i<counter;i++){
        sum+=i;
    }
    var mul = 1;
    for(var i =1;i<counter;i++){
        mul*=i;
    }
    var resobj = {
        sum : sum,
        mul : mul
    }
    // return sum;
    res.send(resobj);
}

// when request method GET 
//default route '/'
app.get('/', calculateSum);
// app.get('/',(req,res)=>{
//     res.send(`<!DOCTYPE html>
//     <head>
//         <title> 100x project
            
//         </title>
//     </head>
    
//     <body>
//         <p> hi there</p>
//     </body>`);
// })

function startListening(){
    console.log(`Example app listening on port ${port}`)
}

//this line of code- makes this an active httpserver listening on port
app.listen(port, startListening(port));

//these few lines can run a  potential website , you can buy a domain , host it on internet.
// add some  UI
//do some backend process : as per usecase 
//you have your application ready

