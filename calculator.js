// Initialize variables to store calculator state
let runningTotal = 0;
let buffer = "0";
let previousOperator;

// Get a reference to the calculator screen
const screen = document.querySelector(".screen");

// Function to handle button clicks
function buttonClick(value) {
  // Check if the input value is a number or a symbol
  if (isNaN(parseInt(value))) {
    // If it's a symbol, handle it accordingly
    handleSymbol(value);
  } else {
    // If it's a number, handle it as a digit
    handleNumber(value);
  }

  // Update the calculator display
  rerender();
}

// Function to handle digit input
function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

// Function to handle mathematical operations
function handleMath(value) {
  if (buffer === "0") {
    return; // Do nothing if the buffer is empty
  }

  const intBuffer = parseInt(buffer);

  // Perform the operation based on the previous operator
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = "0";
}

// Function to perform the operation and update the running total
function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

// Function to handle symbol input (e.g., C, =, ←, +, -, ×, ÷)
function handleSymbol(value) {
  switch (value) {
    case "C":
      // Clear the buffer and reset the running total
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        return; // Need two numbers to perform an operation
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal.toString();
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(value);
      break;
  }
}

// Function to update the calculator screen with the buffer value
function rerender() {
  screen.innerText = buffer;
}

// Function to initialize the calculator
function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

// Initialize the calculator
init();
