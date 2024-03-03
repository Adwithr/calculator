// Initialize variables for calculator values
let operator = "",
  previousVal = "",
  currentVal = "";

// Selecting DOM elements
let buttons = document.querySelectorAll("button");
let numbers = Array.from(document.querySelectorAll(".num"));
let oper = Array.from(document.querySelectorAll(".oper"));
let clear = document.querySelector(".clear");
let backspace = document.querySelector(".backspace");
let equals = document.querySelector(".equals");
let uprDisplay = document.querySelector(".uprDisplay");
let lwrDisplay = document.querySelector(".lwrDisplay");
let decimal = document.querySelector(".decimal");

// Handle number button clicks
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
    lwrDisplay.textContent = currentVal;
  });
});

//Handle operator button clicks
oper.forEach((op) => {
  op.addEventListener("click", (e) => {
    if (uprDisplay.textContent.match(/[+\-\/\*]/)) {
      let res = operate(previousVal, currentVal, operator);
      operator = e.target.textContent;
      currentVal = "";
      previousVal = res;
      uprDisplay.textContent = `${res}${operator}`;
      lwrDisplay.textContent = `${res}`;
    } else if (currentVal === "" && previousVal === "") return;
    else handleOperator(e.target.textContent);
  });
});

// Handle equal button click
equals.addEventListener("click", () => {
  if (currentVal === "" || previousVal === "") return;
  uprDisplay.textContent += currentVal;
  lwrDisplay.textContent = `=${operate(previousVal, currentVal, operator)}`;
});

// Clear button click resets the state
clear.addEventListener("click", () => {
  operator = "";
  previousVal = "";
  currentVal = "";
  uprDisplay.textContent = "";
  lwrDisplay.textContent = "";
});

// Backspace button removes the last digit
backspace.addEventListener("click", () => {
  lwrDisplay.textContent = lwrDisplay.textContent.slice(0, -1);
});

// Decimal button adds a decimal point
decimal.addEventListener("click", () => {
  if (!currentVal.includes(".")) {
    currentVal += ".";
    lwrDisplay.textContent += ".";
  }
});

// Handle keyboard input for simulating button clicks
document.addEventListener("keyup", (e) => {
  const operatorKey = e.key;
  if (e.key === "c") clear.click();
  else if (e.key === "Backspace") backspace.click();
  else if (e.key === "=") equals.click();
  else if (e.key === ".") decimal.click();
  else if (
    operatorKey === "+" ||
    operatorKey === "-" ||
    operatorKey === "*" ||
    operatorKey === "/"
  ) {
    const matchingButton = oper.find((button) => button.textContent === e.key);
    if (matchingButton) matchingButton.click();
  } else if (/\d/.test(e.key)) {
    const matchingButton = numbers.find(
      (button) => button.textContent === e.key
    );
    if (matchingButton) matchingButton.click();
  } else return;
});

// Play a sound effect for button clicks
buttons.forEach((button) =>
  button.addEventListener("click", () =>
    new Audio("plastic-bubble-click-1124.wav").play()
  )
);

// Function to handle number inputs
function handleNumber(num) {
  if (currentVal.length < 7) currentVal += num;
}

// Function to handle operator inputs
function handleOperator(op) {
  operator = op;
  previousVal = currentVal;
  currentVal = "";
  uprDisplay.textContent = `${previousVal}${operator}`;
  lwrDisplay.textContent = currentVal;
}

// Function to handle basic arithmetic operations
function operate(preVal, curVal, op) {
  let ans;
  preVal = Number(preVal);
  curVal = Number(curVal);
  switch (op) {
    case "+":
      ans = preVal + curVal;
      break;
    case "-":
      ans = preVal - curVal;
      break;
    case "*":
      ans = preVal * curVal;
      break;
    case "/":
      if (curVal == 0) return "oooof";
      else ans = preVal / curVal;
      break;
  }
  return Math.round(ans * 1000) / 1000; // Rounds the result to 3 decimal places
}
