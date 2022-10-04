const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttonsKeys = document.querySelectorAll('.calculator-keys button');



class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation =  "";
  }
  // insert operation digits in the screen
  btnDisplay(key) {
    // check if current operation have a dot
    if(key === '.' && this.currentOperationText.innerText.includes('.')) {
      return;     
    };
    this.currentOperation = key;
    this.updateScreen();
  };

  // process all operations
  processOperation(operation) {
    // check if current is empty
    if(currentOperationText.innerText === '') {
      // change operation
      if(this.previousOperationText.innerText !== '') {
        this.changeOperation(operation)
      }
      return;
    }
    // get current and previous values
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(' ')[0];
    const current = +this.currentOperationText.innerText;

    switch(operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operation, operationValue, previous, current);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operation, operationValue, previous, current);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operation, operationValue, previous, current);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operation, operationValue, previous, current);
        break;
        case "DEL":
          this.processDelOperator();
          break;
        case "CE":
          this.processClearCurrentOperator();
          break;
        case "C":
          this.processClearOperator();
          break;
        case "=":
          this.processEqualOperator();
          break;      
      default:
        return;
    }

  }


  // Change values of display
  updateScreen(operation = null, operationValue = null, previous = null, current = null) {

    if(operationValue === null) {
    this.currentOperationText.innerText += this.currentOperation;
    } else {
      // Check if value is zero, if is just add current value
      if(previous === 0) {
        operationValue = current
      }
      // Add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }


  };

  // Change math operation
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }
    // Delete a digit
    processDelOperator() {
      this.currentOperationText.innerText =
        this.currentOperationText.innerText.slice(0, -1);
    }
  
    // Clear current operation
    processClearCurrentOperator() {
      this.currentOperationText.innerText = "";
    }
  
    // Clear all operations
    processClearOperator() {
      this.currentOperationText.innerText = "";
      this.previousOperationText.innerText = "";
    }
  
    // Process an operation
    processEqualOperator() {
      let operation = this.previousOperationText.innerText.split(" ")[1];
  
      this.processOperation(operation);
    }

};

const calc = new Calculator(previousOperationText, currentOperationText);

buttonsKeys.forEach((btn) => {

  btn.addEventListener('click', (e) => {
    const value = e.target.innerText;

    if(+value >= 0 || value === '.'){
      calc.btnDisplay(value);
    } else {
      calc.processOperation(value);
    }



  });



});




// keys.addEventListener ('click', e => {
//   if (e.target.matches('button')) {

//     const key = e.target;
//     const action = key.dataset.action;
//     const keyContent = key.textContent
//     const displayedNum = display.textContent
//     const previousKeyType = calculator.dataset.previousKeyType

//     const calculate = (n1, operator, n2) => {
//       let result = ''
      
//       if (operator === 'add') {
//         result = parseFloat(n1) + parseFloat(n2)
//       } else if (operator === 'subtract') {
//         result = parseFloat(n1) - parseFloat(n2)
//       } else if (operator === 'multiply') {
//         result = parseFloat(n1) * parseFloat(n2)
//       } else if (operator === 'divide') {
//         result = parseFloat(n1) / parseFloat(n2)
//       }
      
//       return parseFloat(result)
//     }

//     if (!action) {
//       if (displayedNum === '0' || previousKeyType === 'operator') {
//         display.textContent = keyContent
//       } else {
//         display.textContent = displayedNum + keyContent
//       }
//       Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
//       calculator.dataset.previousKeyType = 'number'

//     } 
    
//     if (
//       action === 'add' ||
//       action === 'subtract' ||
//       action === 'multiply' ||
//       action === 'divide'
//     ) {
//       const firstValue = calculator.dataset.firstValue
//       const operator = calculator.dataset.operator
//       const secondValue = displayedNum

//       if (
//         firstValue &&
//         operator &&
//         previousKeyType !== 'operator'
//       ) {
//         const calcValue = calculate(firstValue, operator, secondValue)
//         display.textContent = calcValue
        
//       // Atualizar o valor calculado como firstValue
//         calculator.dataset.firstValue = calcValue

//       } else {
//         // Se não houver cálculo, definir displayedNum como o firstValue
//         calculator.dataset.firstValue = displayedNum
//       }

//       key.classList.add('is-depressed')

//       // Adiciona um atributo personalizado
//       calculator.dataset.previousKeyType = 'operator'  
//       calculator.dataset.firstValue = displayedNum    
//       calculator.dataset.operator = action
//     } 

//     if (action === 'decimal') {
//       // Não fazer nada se a string já tiver um ponto
//       if (!displayedNum.includes('.')) {
//         display.textContent = displayedNum + '.'
//       } else if (previousKeyType === 'operator') {
//         display.textContent = '0.'
//       }
//       calculator.dataset.previousKeyType = 'decimal'
//     } 

    
//     if (action === 'clear') {
//       if (key.textContent === 'AC') {
//         calculator.dataset.firstValue = ''
//         calculator.dataset.modValue = ''
//         calculator.dataset.operator = ''
//         calculator.dataset.previousKeyType = ''
//       } else {
//         key.textContent = 'AC'
//       }
      
//       display.textContent = 0
//       calculator.dataset.previousKeyType = 'clear'
//     } 


//     if (action === 'calculate') {
//       const firstValue = calculator.dataset.firstValue
//       const operator = calculator.dataset.operator
//       const secondValue = displayedNum
      

//       display.textContent = calculate(firstValue, operator, secondValue)

//       calculator.dataset.previousKeyType = 'calculate'
//     }

//   }

// })

