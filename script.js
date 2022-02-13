const ButtonNumbers = document.querySelectorAll('[data-number]') 
const operationButtons = document.querySelectorAll('[data-operator]') 
const equalsButton = document.querySelector('[data-equal]')
const deleteButton= document.querySelector('[data-delete]')
const AllClearButton = document.querySelector('[data-allClear]')
const previousOperandTextElement= document.querySelector(
    '[data-previousOperand]');
const currentOperandTextElement= document.querySelector(
    '[data-currentOperand]');

class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    calculate(){
        console.log('entrou aq');
        let result;
        const _previousOperand = parseFloat(this.previousOperand)
        const _currentOperand = parseFloat(this.currentOperand)

        if(isNaN(_currentOperand) || isNaN(_previousOperand)) return;
        console.log('dkljsalkdsajldsa');
        switch(this.operation){
            case'+':
                result =  _previousOperand + _currentOperand;
            break;
            case'-':
                 result= _previousOperand - _currentOperand;
            break;
            case'*':
                 result= _previousOperand * _currentOperand;
            break;
            case'/':
                 result= _previousOperand / _currentOperand;
            break;
            default:
            return;
        }
        this.currentOperand= result;
        this.operation = undefined;
        this.previousOperand = "";
    }
    chooseOperator(operation){
        if(this.currentOperand=="") return;
        if(this.previousOperand !== ""){
            this.calculate();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand
        this.currentOperand = "";
    }
    appendNumber(number){
        if(this.currentOperand.includes(".") && number ===".") return;
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
        console.log('dlksjaaldsaj');
    }
    clear(){
        this.currentOperand = "";
        this.previousOperand="";
        this.operation=undefined;

    }
    updateDisplay(){
        this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation || ''}`;
        this.currentOperandTextElement.innerText =  this.currentOperand;
    }
    formatDisplayNumber(number) {
        const stringNumber = number.toString();
    
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
    
        let integerDisplay;
    
        if (isNaN(integerDigits)) {
          integerDisplay = "";
        } else {
          integerDisplay = integerDigits.toLocaleString("en", {
            maximumFractionDigits: 0,
            });
        }
    }
  
}
const calculator = new Calculator(
    previousOperandTextElement, 
    currentOperandTextElement
);
for(const ButtonNumber of ButtonNumbers){
    ButtonNumber.addEventListener("click", () => {
        console.log('djsadlaskdjk')
        calculator.appendNumber(ButtonNumber.innerText);
        calculator.updateDisplay();
    });
}
for(const  operationButton of operationButtons){
    operationButton.addEventListener("click", ()=>{
        calculator.chooseOperator(operationButton.innerText);
        calculator.updateDisplay();

    })
}
AllClearButton.addEventListener("click", ()=>{
    calculator.clear();
    calculator.updateDisplay();
});
equalsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
  });