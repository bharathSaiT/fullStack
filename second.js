var sendObj = {
    method: "GET"
}

function callBack (res){
    // console.log(res.status);

    res.json().then(
        (result)=>{console.log(result)}
    )
}

fetch("http://localhost:3000/?count=1",sendObj).then(callBack);