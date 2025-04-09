
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

function populateDisplay(inputVal){
    const display=document.querySelector("input#display");
    // console.log(display);
    display.value+=inputVal;
    
}







let buttons=document.querySelectorAll('.input-button button');
buttons=Array.from(buttons);

buttons.filter(item=> !item.id).forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        let inputVal=e.target.textContent;
        // console.log(inputVal);

        populateDisplay(inputVal);

        expression+=e.target.textContent;  
        // console.log(expression);
        for (item of expression){
            if (!isNaN(item))
                input+=item;
            else 
             input +=' '+item+' ';
        }
    }
    
    );
});


























// const expression=prompt("Input expression: ");
// console.log(expression);
let expression='';
let input='';
// for (item of expression){
//     if (!isNaN(item))
//         input+=item;
//     else 
//      input +=' '+item+' ';
// }
// console.log(input);

finalExpression=input.split(' ').map(item=>isNaN(item)?item:+item);
const [num1,operator,num2]=finalExpression;

// console.log(typeof num1, typeof num2, typeof operator);

operate(operator,num1,num2);