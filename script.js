let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetScreen = false;
let isAddingPercentage = false;

const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calc-content');
const calculatorScreen = document.getElementById("content");

calculatorScreen.textContent = "0"

function addNumber(number) {
  if (shouldResetScreen) {
    resetScreen();
  }
  if (calculatorScreen.textContent === "0") {
    calculatorScreen.textContent = number;
    document.getElementById('js-ac-btn').innerHTML = "C";
  } else {
    calculatorScreen.textContent += number;
  }
  
}

function addDecimal() {
  if (shouldResetScreen) resetScreen();
  if (calculatorScreen.textContent === "") calculatorScreen.textContent = "0";
  if (calculatorScreen.textContent.includes(".")) return;
  calculatorScreen.textContent += ".";
}

function resetScreen() {
  calculatorScreen.textContent = "";
  shouldResetScreen = false;
}

function addOperation(operator) {
  if (currentOperator !== null) {
    operate();
  }
  firstNumber = calculatorScreen.textContent;
  currentOperator = operator;
  shouldResetScreen = true;
}

function operate() {
  if (currentOperator === null || shouldResetScreen) return;
  if (currentOperator === "÷" && calculatorScreen.textContent === "0") {
    calculatorScreen.textContent = 'Error';
    return;
  }

  secondNumber = calculatorScreen.textContent;
  const result = calculateResult();
  resetScreen();
  calculatorScreen.textContent = result;
  firstNumber = result;
  currentOperator = null;
}

function addPercentage() {
        if(firstNumber !== ""){
        return parseFloat(calculatorScreen.textContent) ;
        }else{
            return parseFloat(calculatorScreen.textContent)/100;
        }
}

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
  
  
}

function resetCalculator() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  resetScreen();
}


function addDot() {
  if (shouldResetScreen) resetScreen();
  if (calculatorScreen.textContent === "") calculatorScreen.textContent = "0";
  if (calculatorScreen.textContent.includes(".")) return;
  calculatorScreen.textContent += ".";
}

function clearScreen() {
  calculatorScreen.textContent = "0";
  document.getElementById('js-ac-btn').innerHTML = "AC";
}

function clearAll() {
  resetCalculator();
  clearScreen();

}
function plusMinus(){
  calculatorScreen.textContent = calculatorScreen.textContent * -1
  console.log(calculatorScreen.textContent);
}

function screenLength(){
  const screenLength = calculatorScreen.textContent.length;
  if(screenLength >= 7){
    let fontSize = 40;
    for(let i = 9 ; i <= screenLength ; i += 2){
      fontSize -= 4.5;
    }
    calculatorScreen.style.fontSize = `${fontSize}px`;
  }
}
function screenFontSize(){
  calculatorScreen.style.fontSize = "50px"
}

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



document.addEventListener('keydown', k => {
  const key = k.key;
  const allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '/', '*', '-', '+', 'Delete', 'Enter', '='];

  if (allowedKeys.includes(key)) {
    const keyEl = keys.querySelector(`button[data-key="${key}"]`);
    keyEl.click();
  }
});