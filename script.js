class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = '0'
        this.previousOperand = ''
        this.operation = undefined
    }
    
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        
        if (this.currentOperand === '0' && number !== ('.')) {
            this.currentOperand = number.toString()
        } else {
            this.currentOperand += number.toString()
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '0') return;
    
        if (this.previousOperand !== '') {
            this.compute()
        }

        if (this.currentOperand === '' && this.previousOperand !== '') {
            if (operation !== "-") {
                this.previousOperand = this.previousOperand.slice(0, -1) + operation;
            } else {
                this.previousOperand = this.previousOperand + operation
                this.currentOperand = '-' + this.currentOperand
            }
            return;
        }
        if(this.previousOperand.slice(-1) === '-' && this.currentOperand.slice(-1) === '-') {
            this.currentOperand = this.previousOperand.slice(0, -2)
        }
        this.operation = operation
        this.previousOperand = this.currentOperand += this.operation
        this.currentOperand = '' 
    }

    compute() {
        let result
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                result = prev + current
                break;
            case '-':
                result = prev - current
                break;
            case '×':
                result = prev * current
                break;
            case '÷':
                result = prev / current
                break;
            default:
                return 
        }
        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay() {
        this.previousOperandTextElement.innerText = this.previousOperand
        this.currentOperandTextElement.innerText = this.currentOperand
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allclearButton = document.querySelector('[data-allclear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

allclearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})
