//todo application server
const bodyparser = require("body-parser");
const express = require("express");
//how does require work?
//how are we able to use the  packages installed in parent directory ,in this folder?
const app = express();
//what does the above line of code , do ? intiate "WHAT" in the constant app?
const port = 3000;

app.use(bodyparser.json());
//why this port is always 3000 - is it like a dummy port available for development?
app.get('/' , (req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

var todos= [];

var findIndex = function( index) {
    for ( let i =0;i< todos.length ;i++)
    //diffrebce between var , let and const??
    {
        if(todos[i].id == index)
            return i;
    }

    return -1;
}

app.get('/todos/:id',(req,res)=>{
    //iterate and match with provided id , send the object.
    var isIndex = findIndex(req.params.id);
    if(isIndex == -1){
        res.sendStatus(404);
    }

    res.send(todos[isIndex]);

})

app.get('/todos',(req,res)=>{
    res.send(todos);
})

app.post('/todos',(req,res)=>{
    var newTodo = {
        id : Math.floor(Math.random() * 1000000),// how does id generation work , different ways to do it , 
        //and how does MAth . random work- ways of using it.
        title : req.body.title,
        description : req.body.description
    }

    todos.push(newTodo);
    res.status(201).send(todos);
    //status codes and meanings
})

app.put('/todos/:id',(req,res)=>{
    var isIndex = findIndex(req.params.id);
    if(isIndex == -1)
    {
        res.sendStatus(401);
    }
    const updatedTodo = {
        id : Math.floor(Math.random() * 1000000),
        title : req.body.title,
        description : req.body.description
    }
    //when sending via postman ,we are supposed to use quotes for objects - why are we free from quotes here in js object
    todos[isIndex] = updatedTodo;
    res.send(todos[isIndex]);
})

var removeIndex = function (index){
    for(let i =0;i<todos.length;i++)
    {
        if(todos[i].id== index){
            todos.splice(i , 1);
            return 0;
        }
    }
    return -1;
}
app.delete('/todos/:id',(req,res)=>{
    var checkIndex = removeIndex(req.params.id);
    if(checkIndex == -1){
        res.sendStatus(404);
    }
    res.send(todos);
})

app.listen(3000, ()=>{
    console.log("started");
})

// todos

//making those functions more efficient
//clearing questions in this file
//connecting with front end.
//arrays in javascript .