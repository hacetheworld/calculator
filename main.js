// Author : Ajay Meena
// Email  : majay1638@gmail.com
// Github : https://github.com/hacetheworld
// https://github.com/hacetheworld/calculator.git

class Calculator {
    constructor(expression) {
        this.expression = expression;
        this.operators = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2
        };
    }
    // Method to tokenize the input string
    tokenize() {
        const regex = /(\d+\.?\d*|\+|\-|\*|\/|\(|\))/g;
        return this.expression.match(regex);
    }
    // Convert infix to postfix 
    toPostfix(expression) {
        const output = [];
        const stack = [];

        expression.forEach(token => {
            if (token in this.operators) {
                // Handle operators
                while (stack.length) {
                    if (this.operators[token] < this.operators[stack[stack.length - 1]]) {
                        output.push(stack.pop());
                    } else if ("*/".includes(token) && "*/".includes(this.operators[stack[stack.length - 1]])) {
                        output.push(stack.pop());

                    } else {
                        break;
                    }
                }
                stack.push(token);
            } else if (token === '(') {
                // Handle left parenthesis
                stack.push(token);
            } else if (token === ')') {
                // Handle right parenthesis
                while (stack.length && stack[stack.length - 1] !== '(') {
                    output.push(stack.pop());
                }
                stack.pop(); // Pop the '('
            } else {
                output.push(token);
            }
        });

        // Pop remaining operators from the stack
        while (stack.length) {
            output.push(stack.pop());
        }

        return output;
    }

    // Evaluate the postfix expression
    evaluatePostfix(postfix) {
        const stack = [];

        postfix.forEach(token => {
            if (!isNaN(token)) {
                // Push numbers to the stack
                stack.push(parseFloat(token));
            } else {
                // Pop the last two numbers and apply the operator
                const b = stack.pop();
                const a = stack.pop();
                switch (token) {
                    case '+':
                        stack.push(a + b);
                        break;
                    case '-':
                        stack.push(a - b);
                        break;
                    case '*':
                        stack.push(a * b);
                        break;
                    case '/':
                        stack.push(a / b);
                        break;
                }
            }
        });

        return stack.pop();
    }

    // Main method to calculate the result
    calculate() {
        const expression = this.tokenize(this.expression);
        const postfix = this.toPostfix(expression);
        return this.evaluatePostfix(postfix);
    }
}

// Linking UI with Calculator
const displayElement = document.getElementById('display');
let expression = '';

document.querySelectorAll('.btn').forEach(button => {
    console.log("dfg");
    
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('clear')) {
            expression = '';
            displayElement.textContent = '0';
        } else if (button.classList.contains('equal')) {
            try {
                const calculator = new Calculator(expression);
                const result = calculator.calculate();
                displayElement.textContent = result;
                expression = result.toString();
            } catch (error) {
                displayElement.textContent = 'Error';
                expression = '';
            }
        } else {
            expression += value;
            displayElement.textContent = expression;
        }
    });
});
