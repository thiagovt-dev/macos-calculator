// universal variables
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetScreen = false;
let isAddingPercentage = false;
// variables for getting html elements
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calc-content');
const calculatorScreen = document.getElementById("content");

// define calculatorScreen with '0' as default
calculatorScreen.textContent = "0"

 // function that controls input of numbers
function addNumber(number) {
  if (shouldResetScreen) {
    resetScreen();
  };
  if (calculatorScreen.textContent === "0") {
    calculatorScreen.textContent = number;// calculatorScreen receive parameter number
    document.getElementById('js-ac-btn').innerHTML = "C"; // turn "ac" into "C" when input numbers
  } else {
    calculatorScreen.textContent += number; // add the parameter number in the variable calculatorScreen
  };
  
};

// function that controls decimal numbers
function addDecimal() {
  if (shouldResetScreen) resetScreen();
  if (calculatorScreen.textContent === "") calculatorScreen.textContent = "0";
  if (calculatorScreen.textContent.includes(".")) return;
  calculatorScreen.textContent += ".";
};

// This function reset the screen
function resetScreen() {
  calculatorScreen.textContent = "";
  shouldResetScreen = false;
};

//function controls the add operator in the calculation
function addOperation(operator) {
  if (currentOperator !== null) {
    operate();//checks if there is already a pending operation
  }
  firstNumber = calculatorScreen.textContent; // receive input first number from calculatorScreen
  currentOperator = operator; // define the current operator specified by operator parameter
  shouldResetScreen = true; // shouldResetScreen is true, resetting the screen
};

// this function execute the pending operation between first and second number
function operate() {
  if (currentOperator === null || shouldResetScreen) return; //checks if there is an operation pending and if the calculator display should be reset.
  if (currentOperator === "÷" && calculatorScreen.textContent === "0") {
    calculatorScreen.textContent = 'Error';
    return;
  }; //checks if the operation is a division and if the second number is zero.

  secondNumber = calculatorScreen.textContent; // receive input second number from calculatorScreen
  const result = calculateResult(); // receive and call calculateResult function
  resetScreen(); // call the function for execution between first and second numbers and return result
  calculatorScreen.textContent = result; // show the result in the calculator screen
  firstNumber = result; // first number receive result so result becomes the first number and is used in the new calculation
  currentOperator = null; // finally redefines the current operator for null because not have more operation pending
};

// function controls the percents calculation
function addPercentage() {
        if(firstNumber !== ""){ 
        return parseFloat(calculatorScreen.textContent) ;
        }else{
            return parseFloat(calculatorScreen.textContent)/100;
        }; //checks if there is a defined first number. If yes, it means that the user previously entered a number and is now adding a percentage to it. if there is no first number defined, it means that the user has just entered a number and wants to calculate its percentage.
};

// this function, in brief , execute all calculations.
function calculateResult() {
  const number1 = parseFloat(firstNumber);
  const number2 = parseFloat(secondNumber);
  const percentage = addPercentage();
  
  switch (currentOperator) {
    case "+":
        if (isAddingPercentage) {
            return number1 + (number1 * percentage)/100;
          } else {
            return number1 + number2;
          }    
    case "-":
      if (isAddingPercentage) {
        return number1 - (number1 * percentage)/100;
      }else{
      return number1 - number2;
      }
    case "x":
      return number1 * number2;
          
    case "÷":
      return number1 / number2;
          
    default:
      return; 
  }
};

// function for reset all calculator variables
function resetCalculator() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  resetScreen();
};

// add a dot for calculation with decimal number
function addDot() {
  if (shouldResetScreen) resetScreen();
  if (calculatorScreen.textContent === "") calculatorScreen.textContent = "0";
  if (calculatorScreen.textContent.includes(".")) return;
  calculatorScreen.textContent += ".";
};

// clean calculator screen
function clearScreen() {
  calculatorScreen.textContent = "0";
  document.getElementById('js-ac-btn').innerHTML = "AC";
};

// rest all information in calculator
function clearAll() {
  resetCalculator();
  clearScreen();
};

// execute the sinal change 
function plusMinus(){
  calculatorScreen.textContent = calculatorScreen.textContent * -1
  console.log(calculatorScreen.textContent);
};

// this function change font size depending on length characters
function screenLength(){
  const screenLength = calculatorScreen.textContent.length;
  if(screenLength >= 10){
    let fontSize = 50;
    for(let i = 9 ; i <= screenLength ; i += 2){
      fontSize -= 4.5;
    }
    calculatorScreen.style.fontSize = `${fontSize}px`;
  }
};

// this function define font size screen
function screenFontSize(){
  calculatorScreen.style.fontSize = "60px"
};

// this event listener is call when there are button click defined by the class and id
document.querySelector(".calculator").addEventListener("click", event => {
  if (event.target.matches(".number")) {
    addNumber(event.target.textContent);
    screenLength();

  }

  if (event.target.matches("#js-operation-btn")) {
    addOperation(event.target.textContent);
    isAddingPercentage = false;
  }

  if (event.target.matches("#js-ac-btn")) {
    clearAll();
    screenFontSize();
  }

  if (event.target.matches("#js-dot-btn")) {
    addDot();
  }

  if (event.target.matches("#js-percent-btn")) {
    isAddingPercentage = true;
    calculatorScreen.textContent = addPercentage();
    screenLength();
  }
  if (event.target.matches("#js-equal-btn")) {
    operate();
    calculateResult();
    screenLength();
  }
    
  if (event.target.matches("#js-change-btn")){
    plusMinus();
  }
});


// this listener allows input using the keyboards key 
document.addEventListener('keydown', k => {
  const key = k.key;
  const allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '/', '*', '-', '+', 'Delete', 'Enter', '='];

  if (allowedKeys.includes(key)) {
    const keyEl = keys.querySelector(`button[data-key="${key}"]`);
    keyEl.click();
  }
   if (key === 'Backspace') { // código da tecla backspace
      k.preventDefault(); // impede que a tecla backspace execute sua ação padrão (voltar para a página anterior)
      let text = calculatorScreen.textContent; // obtém o texto atual do elemento com o id "texto"
      calculatorScreen.textContent = text.slice(0, -1); // remove o último caractere do texto e atualiza o elemento com o novo texto
      if (calculatorScreen.textContent.length < 1){
        calculatorScreen.textContent = '0';

      };

  };
});

// document.addEventListener("keydown", function(event) {
//   if (event.key === 'Backspace') { // 8 é o código da tecla backspace
//     event.preventDefault(); // impede que a tecla backspace execute sua ação padrão (voltar para a página anterior)
//     let text = calculatorScreen.textContent; // obtém o texto atual do elemento com o id "texto"
//     calculatorScreen.textContent = text.slice(0, -1); // remove o último caractere do texto e atualiza o elemento com o novo texto
//   }
// });
