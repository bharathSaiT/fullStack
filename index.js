// function expression
// var calculateSum = function (){
//     var sum =0;
//     for(int i =0;i<100;i++){
//         sum+=i;
//     }
//     return sum;
// }

//function declaration
 function calculateSum(){
    var sum =0;
    for(var i =0;i<100;i++){
        sum+=i;
    }
    return sum;
}

var dispaly = calculateSum();
console.log(dispaly);
