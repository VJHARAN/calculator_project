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
        populateDisplay("Error!");   
    } 
}

// function to calculate product
function product(num1,num2){
    let prod=checkDecimal(num1*num2);
    populateDisplay(prod);
}

// function to calculate percentage
function percentage(num1,num2){
    let percent=(num1*num2)/100;
    populateDisplay(percent);
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
        case '%': percentage(num1,num2);             
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
        // console.log(expression); 
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
            if(equalBtnFlag && inputVal.match(/[0-9]|\./g)){
                
                populateDisplay('');
                equalBtnFlag=false;
                populateDisplay(inputVal);
            }
            else{
                
                if ( '+-/*%'.includes(inputVal))
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

    const allBtn=document.querySelectorAll("button");
    allBtn.forEach((button)=>{
        button.addEventListener('mouseover',()=>{
            button.style.cssText=" border:5px solid#333333; padding:10px; border-style:outset; ";
            
        })
        button.addEventListener('mouseout',()=>{
            
            button.style.cssText=" ";
        })
    })

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
        
            // console.log(finalExpression);
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
        let val=expression.splice(-1);
        if ('+-/*%'.includes(val))
            count-=1;
        let remaining=expression.join('');
        populateDisplay('');
        populateDisplay(remaining);
        dotBtn.disabled=false;
        
        // console.log(expression);
    });

    //Add keyboard support
    const textbox=document.querySelector("#display");
    textbox.addEventListener('keyup',(e)=>{
        //  console.log(e.key);
        if (e.key.match(/Shift/g)){
            ;  //passiton   
        }
        else {
            let inputTxt=e.key.match(/[0-9]|[+-/*%]/g);
            if ( '+-/*%'.includes(inputTxt)){   
                count+=1;
            }
            if (count===2){ 
                calculateFinalExpression();
                populateDisplay(inputTxt);
                count-=1;
            }
            else{
                if(e.key.match(/Enter/g)&& expression.match(/([0-9]+[.]?[0-9]*[+-/*%]{1}[0-9]+[.]?[0-9]*)/g)){
                    calculateFinalExpression();
                    // console.log(expression);
                    count-=1;
                }
                else if(e.key.match(/Backspace/g)){
                    expression=expression.split('');
                    expression.splice(-1);
                    expression=expression.join('');
                }
                else if(!inputTxt){
                    expression='';
                    input='';
                    finalExpression='';
                    count=0;
                    divByZero=false;
                    equalBtnFlag=false;
                    dotBtn.disabled=false;
                    document.querySelector("input#display").value="";
                    populateDisplay("Error!");
                }
               
                else{   
                    expression+=inputTxt; 
                    console.log(expression)  
                    
                }
            }
        }
    });

    window.onload = function() {
        document.querySelector("#display").focus();
      }

   
    //Shrink input text size if overflow occurs 
    var myInput = document.querySelector('input#display');
    myInput.addEventListener('keypress',changeFontSize);
    myInput.addEventListener('change',changeFontSize);

    function changeFontSize() {
        if(isOverflown(myInput)) {
            while (isOverflown(myInput)){
                currentFontSize--;
                myInput.style.fontSize = currentFontSize + 'px';
            }
        }
        else {
            currentFontSize =60;
            myInput.style.fontSize = currentFontSize + 'px';
            while (isOverflown(myInput)){
                currentFontSize--;
                myInput.style.fontSize = currentFontSize + 'px';
            }
        }	
    }
    function isOverflown(element) {
        return element.scrollWidth > element.clientWidth;
        
    }
}

calculator();

 //unable to add continuoes stream of data using keyboard 
 //eg: 1+2+34-7 shows only 1+2 ie 3.

