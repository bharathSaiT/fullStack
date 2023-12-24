const express = require("express");
const app = express();
const fs = require("fs");

const port = 3000;

//get list of all file names
app.get('/files',(req,res)=>{
    // console.log("hey man , build that Saas fast.")
    var list = fs.readdirSync(__dirname+ '/files');
    console.log(list);
    res.status(200).json(list);
})

//post a file in the file directory
app.get('/files/:filename',(req,res)=>{
    var name = req.params.filename;
    var list = fs.readdirSync(__dirname+'/files');
    if(list.includes(name)){
        // var response = fs.readFileSync(__dirname+'/files/'+name,'utf-8');

        fs.readFile(__dirname+'/files/'+name,'utf-8',(err,data)=>{
            if (err) {
            // Handle file read error
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(data);
        }
        })
        // res.send(response);
    }
    else{
        res.status(404).send("file not found");
    }
   

})

app.use((req,res,next)=>{
    res.sendStatus(404);
})


app.listen(port,()=>{
    console.log(`started listening at ${port}`);
}) // string , variable assignment in logs - js/jsx?