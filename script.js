
function sum(num1,num2){
    total= num1+num2;
    console.log("Sum= ",total);
}

function difference(num1,num2){
    diff= num1-num2;
    console.log("Difference= ",diff);
}

function divide(num1,num2){
    quotient= num1/num2;
    console.log("Quotient= ",quotient);
}

function product(num1,num2){
    prod=num1*num2;
    console.log("Product= ",prod);
}

function operate(operator,num1, num2){
    switch(operator){
        case '+': sum(num1,num2);
                    break;
        case '-': difference(num1,num2);
                    break;
        case '/': divide(num1,num2);
                    break;
        case '*': product(num1,num2);
                    break;
    }
}

 
const expression=prompt("Input expression: ");
// console.log(expression);

let input='';
for (item of expression){
    if (!isNaN(item))
        input+=item;
    else 
     input +=' '+item+' ';
}
// console.log(input);

finalExpression=input.split(' ').map(item=>isNaN(item)?item:+item);
const [num1,operator,num2]=finalExpression;

// console.log(typeof num1, typeof num2, typeof operator);

operate(operator,num1,num2);