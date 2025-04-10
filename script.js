// global variables
let expression='';
let input='';
let finalExpression;
let count=0;
let divByZero=false;
// function to calculate sum
function sum(num1,num2){
    let total= checkDecimal(num1+num2);
    populateDisplay(total);
}

// function to calculate difference
function difference(num1,num2){
    let diff= checkDecimal(num1-num2);
    populateDisplay(diff);
}

// function to calculate quotient
function divide(num1,num2){
    if(isFinite(num1/num2)){ // returns true if not NaN or +_infinity
        let quotient= checkDecimal(num1/num2);
        populateDisplay(quotient);
    }
    else{
        divByZero=true;
        const display=document.querySelector("input#display");
        display.value="Cannot divide by Zero!";
        

    }
    
}

// function to calculate product
function product(num1,num2){
    let prod=checkDecimal(num1*num2);
    populateDisplay(prod);
}

//function to check if a number has a decimal place/is a whole number
function checkDecimal(num){
    return num%1!=0? (+(num.toFixed(4))):num; //Round string to 4 decimal places & return as number.    
}

// function to select type of operation for numbers
function operate(num1,operator, num2){
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

// function to Display input or results
function populateDisplay(inputVal){
   if (!divByZero){
    const display=document.querySelector("input#display");
    expression+=inputVal;  
    console.log(expression); 
    if (inputVal==="")
        display.value=inputVal;
    else 
       display.value+=inputVal;
   }
   
}

function calculateFinalExpression(){
    for (item of expression){
        if (!isNaN(item)|| item==='.')
            input+=item;
        else 
        input +=' '+item+' ';
    }
     
    finalExpression=input.split(' ').map(item=>isNaN(item)?item:+item);
   
    expression='';
    populateDisplay("");
    operate(...finalExpression);
    input='';  
}

//Main function
function calculator(){
    // Select number input buttons
    let buttons=document.querySelectorAll('.input-button button');
    buttons=Array.from(buttons);
    buttons.filter(item=> !item.id).forEach((btn)=>{
        btn.addEventListener('click', (e)=>{
            let inputVal=e.target.textContent;
            if ( '+-/*'.includes(inputVal))
                count+=1;
            if (count===2){ 
                calculateFinalExpression();
                count-=1;
            }
            populateDisplay(inputVal);
            console.log(count);
        }
        );
    });

    // Select "equal" button
    const eqaulsBtn=document.querySelector("#result");
    eqaulsBtn.addEventListener('click',()=>{
        if (count===1){
            count-=1;
            for (item of expression){
                if (!isNaN(item)|| item==='.')
                    input+=item;
                else 
                input +=' '+item+' ';
            }
            
            finalExpression=input.split(' ').map(item=>isNaN(item)?item:+item);
            
            expression='';
            console.log(finalExpression);
            populateDisplay("");
            operate(...finalExpression);
            input='';   // prevent input from appending over in next expression
        }
    })

    // Select display clear button
    const clearBtn=document.querySelector("#clear");
    clearBtn.addEventListener('click',()=>{
        expression='';
        divByZero=false;
        populateDisplay("");
       
    });
   
}

calculator();

 

