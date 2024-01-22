let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  console.log("Button Clicked:", value);
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  console.log("Buffer:", buffer);
  console.log("Running Total:", runningTotal);
  console.log("Previous Operator:", previousOperator);
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  console.log("Handling Symbol:", symbol);
  switch (symbol) {
    case "c":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        return;
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
        buffer = buffer.slice(0, -1);
      }
      break;
    case "-":
    case "*":
    case "÷":
    case "+":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  console.log("Handling Math:", symbol);
  if (buffer === "0") {
    return;
  }
  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  console.log("Flushing Operation:", previousOperator, intBuffer);
  switch (previousOperator) {
    case "+":
      runningTotal += intBuffer;
      break;
    case "-":
      runningTotal -= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    case "÷":
      if (intBuffer !== 0) {
        runningTotal /= intBuffer;
      } else {
        console.error("Cannot divide by zero");
      }
      break;
  }
}

function handleNumber(numberString) {
  console.log("Handling Number:", numberString);
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
