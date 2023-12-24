const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const users = [{
    username: "check",
    password: "mate"
},
{
    username: "blind",
    password: "date"
}];
app.use(bodyParser.json());

app.post('/signup',(req,res)=>{
    var check = users.find((e)=>{
        if(e.username == req.body.username){
            res.status(400).send("username needs to be unique");
            return e;
        }

    })
    console.log(check);
    if(check == undefined){
        var newUser = {
            username : req.body.username,
            password: req.body.password,
            id : Math.floor(Math.random() * 1000000)
        }
    
        users.push(newUser);
        res.status(200).json(users);
    }
    
    
})

app.post('/login',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;

    var check = users.find((element)=>{
        if(element.username == username && element.password == password){
            res.send(element);
            return element;
        }
    })
    if(check == undefined){
        res.status(401).send("who are you?");
    }
})

app.get('/data',(req,res)=>{

    //check headers for username and password.
    var username = req.headers.username;
    var password = req.headers.password;

    var check = users.find((element)=>{
        console.log(element);
        if(element.username == username && element.password == password){
            console.log("enter the dragon");
            res.status(200).send(users);
            return element;
        }
    })
    if(check == undefined){
        res.status(401).send("who are you?");
    }

})

app.listen(port,()=>{
    console.log( `sever started on ${port} , sail on it until the winds blew it down`);
})

//get
//getting password from headers without any encryption - intercepted request ka security is compromised
//the way of checking username and password - is kind of O(n) - need more effcient way to cross check and verify.


// post
//same as above get

//appropriate messages to the invoker as in - signup successful , loggeed in , invalid creds. , etc..
