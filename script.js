let buttons = Array.from(document.querySelectorAll(".buttons"));
let uprDisplay = document.querySelector(".uprDisplay");
let lwrDisplay = document.querySelector(".lwrDisplay");
let firstVal,
  secVal = null;
let oper;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.textContent === "C") clearDisplay();
    else if (e.target.classList.contains("oper")) {
      oper = e.target.textContent;
      firstVal = lwrDisplay.textContent;
      uprDisplay.textContent = firstVal + e.target.textContent;
      lwrDisplay.textContent = "";
    } else if (e.target.textContent === "=") {
      let res = operate(firstVal, secVal, oper);
    } else lwrDisplay.textContent += e.target.textContent;
  });
});

function clearDisplay() {
  uprDisplay.textContent = "";
  lwrDisplay.textContent = "";
}

function operate(firstVal, secVal, oper) {
  switch (oper) {
    case "+":
      return firstVal + secVal;
    case "-":
      return firstVal - secVal;
    case "*":
      return firstVal * secVal;
    case "/":
      if (secVal == 0) return "ERROR";
      else return firstVal / secVal;
  }
}
