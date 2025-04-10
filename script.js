// global variables
let expression='';
let input='';
let finalExpression='';
let count=0;
let divByZero=false;
let equalBtnFlag=false; // After result, pressing a new digit should clear the result and start.

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
        populateDisplay("Cannot divide by Zero!");   
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
    const display=document.querySelector("input#display");
    if (!divByZero){
        if (inputVal===""){
            expression=inputVal;
            display.value=inputVal;
        }
        else{
            expression+=inputVal;
            display.value+=inputVal;
        }
        console.log(expression); 
    }
    else{
        display.value=inputVal; // cannot divide by zero
        divByZero=false;
    }
}

function calculateFinalExpression(){
    equalBtnFlag=false;
    for (item of expression){
        if (!isNaN(item)|| item==='.')
            input+=item;
        else 
            input +=' '+item+' ';
    }
     
    finalExpression=input.split(' ').map(item=>isNaN(item)?item:+item);

    populateDisplay("");
    operate(...finalExpression);
    input='';  
}

//Main function
function calculator(){

    //Select dot(.) button
    const dotBtn=document.querySelector("#dotbutton");
    dotBtn.addEventListener('click',(e)=>{
        let inputVal=e.target.textContent;
        populateDisplay(inputVal);
        dotBtn.disabled=true;
    });

    // Select number input buttons
    let buttons=document.querySelectorAll('.input-button button');
    buttons=Array.from(buttons);
    buttons.filter(item=> !item.id).forEach((btn)=>{
        btn.addEventListener('click', (e)=>{

            let inputVal=e.target.textContent;
            if(equalBtnFlag && inputVal.match(/\w/g)){
                
                populateDisplay('');
                equalBtnFlag=false;
                populateDisplay(inputVal);
            }
            else{
                
                if ( '+-/*'.includes(inputVal))
                {   equalBtnFlag=false;
                    count+=1;
                    dotBtn.disabled=false;
                }
                if (count===2){ 
                    equalBtnFlag=false;
                    calculateFinalExpression();
                    count-=1;
                }
                populateDisplay(inputVal)
        }
    });
    });

    // Select "equal" button
    const equalsBtn=document.querySelector("#result");
    equalsBtn.addEventListener('click',()=>{
        equalBtnFlag=true;
        dotBtn.disabled=false;
        
        if (count===1){
            count-=1;
            for (item of expression){
                if (!isNaN(item)|| item==='.')
                    input+=item;
                else 
                    input +=' '+item+' ';
            }
            
            finalExpression=input.split(' ').map(item=>isNaN(item)?item:+item);
        
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
        input='';
        finalExpression='';
        count=0;
        divByZero=false;
        equalBtnFlag=false;
        dotBtn.disabled=false;
        populateDisplay("");
    });

    //Select backspace button
    const backspaceBtn=document.querySelector('#backspace');
    backspaceBtn.addEventListener('click',(btn)=>{
        
        expression=expression.split('');
        expression.splice(-1);
        let remaining=expression.join('');
        populateDisplay('');
        populateDisplay(remaining);
        dotBtn.disabled=false;
        
        console.log(expression);
    });
}

calculator();

 

