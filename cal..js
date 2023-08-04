class Calculator {
    constructor (preButton,curButton){
        this.preButton = preButton;
        this.curButton = curButton;
        this.clear();
    }
    clear(){
        this.curOperand = '';
        this.preOperand = '';
        this.operation = undefined;
    }
    delete(){

    }
    appendNnumber(number){
        if (number === '.' && this.curOperand.includes('.')) return;
        this.curOperand = this.curOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if (this.curOperand === "") return;
        if (this.preOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.preOperand = this.curOperand;
        this.curOperand = '';
    }
    compute(){
        let computation;
        const prev = parseFloat(this.preOperand);
        const current = parseFloat(this.curOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;
            default:
                return;
        }
        this.curOperand = computation;
        this.operation = undefined;
        this.preOperand = "";
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0 });
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.curButton.innerText = this.getDisplayNumber(this.curOperand);
        if(this.operation != null){
            this.preButton.innerText = `${this.getDisplayNumber(this.preOperand)} ${this.operation}`;          
        }else {
            this.preButton.innerText = '';
        }
    }
}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const ceButton = document.querySelector('[data-ce]');
const delButton = document.querySelector('[data-del]');
const preButton = document.querySelector('[data-pre-operand]');
const curButton = document.querySelector('[data-cur-operand]');

const cal = new Calculator(preButton,curButton);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        cal.appendNnumber(button.innerText);
        cal.updateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        cal.chooseOperation(button.innerText);
        cal.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    cal.compute();
    cal.updateDisplay();
})
ceButton.addEventListener('click', button => {
    cal.clear();
    cal.updateDisplay();
})
delButton.addEventListener('click', button => {
    cal.clear();
    cal.updateDisplay();
})