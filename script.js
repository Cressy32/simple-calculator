let display = document.getElementById('display');
let currentInput = '';
let shouldResetDisplay = false;

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    
    // Prevent multiple operators at the start
    if (display.value === '' && isOperator(value) && value !== '-') {
        return;
    }
    
    // Prevent multiple decimals
    if (value === '.' && display.value.includes('.')) {
        const parts = display.value.split(/[\+\-\*\/]/);
        if (parts[parts.length - 1].includes('.')) {
            return;
        }
    }
    
    display.value += value;
}

function clearDisplay() {
    display.value = '';
    currentInput = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Evaluate the expression
        const result = eval(display.value);
        
        // Handle division by zero and other errors
        if (result === Infinity || result === -Infinity) {
            display.value = 'Error';
        } else {
            display.value = result.toString();
        }
        
        shouldResetDisplay = true;
    } catch (error) {
        display.value = 'Error';
        shouldResetDisplay = true;
    }
}

function isOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});