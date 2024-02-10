function populateDisplay(n) {
  let display = document.querySelector(".display");
  display.textContent += n;
}

function operate(oper, a, b) {
  switch (oper) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return multiply(a, b);
    default:
      return null;
  }
}

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
