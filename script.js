document.addEventListener('DOMContentLoaded', function () {
    const inputDisplay = document.querySelector('.input-display');
    const buttons = document.querySelectorAll('.calc-button');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const buttonText = e.target.textContent;
            const isNumber = /^[0-9]$/.test(buttonText);
            const isOperator = ['+', '-', '*', '/', '%', '**'].includes(buttonText);

            if (isNumber) currentInput += buttonText;
            else if (buttonText === '.' && !currentInput.includes('.')) currentInput += buttonText;
            else if (isOperator) {
                if (previousInput === '') {
                    previousInput = currentInput;
                    currentInput = '';
                    operator = buttonText;
                } else {
                    previousInput = operate(previousInput, currentInput, operator);
                    currentInput = '';
                    operator = buttonText;
                }
            } else if (buttonText === '=') {
                if (previousInput !== '' && operator !== '' && currentInput !== '') {
                    currentInput = operate(previousInput, currentInput, operator);
                    previousInput = '';
                    operator = '';
                }
            } else if (buttonText === 'AC') {
                currentInput = '';
                previousInput = '';
                operator = '';
            } else if (buttonText === 'DL') currentInput = currentInput.slice(0, -1);

            inputDisplay.textContent = `${previousInput} ${operator} ${currentInput}`;
        });
    });

    function operate(a, b, operator) {
        const operations = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => (b === 0 ? 'Error' : a / b),
            '%': (a, b) => (a * b) / 100,
            '**': (a, b) => Math.pow(a, b),
        };

        return (operations[operator] || ((a, b) => 'Error'))(parseFloat(a), parseFloat(b));
    }
});
