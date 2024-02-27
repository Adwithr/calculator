let buttons = Array.from(document.querySelectorAll(".buttons"));
let uprDisplay = document.querySelector(".uprDisplay");
let lwrDisplay = document.querySelector(".lwrDisplay");
let firstVal, secVal, oper;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.textContent === "C") clearDisplay();
    else if (e.target.classList.contains("oper")) {
      if (uprDisplay.textContent.match(/[+\-\/\*]/)) calc();
      else {
        oper = e.target.textContent;
        firstVal = +lwrDisplay.textContent;
        uprDisplay.textContent += firstVal + e.target.textContent;
        lwrDisplay.textContent = "";
      }
    } else if (e.target.textContent === "=") calc();
    else if (e.target.classList.contains("backspace"))
      lwrDisplay.textContent = lwrDisplay.textContent.slice(0, -1);
    else lwrDisplay.textContent += e.target.textContent;
  });
});
function clearDisplay() {
  uprDisplay.textContent = "";
  lwrDisplay.textContent = "";
  firstVal = 0;
  secVal = 0;
  oper = "";
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
      if (secVal == 0) return "oooof";
      else return firstVal / secVal;
  }
}

function calc() {
  secVal = +lwrDisplay.textContent;
  uprDisplay.textContent += secVal;
  let res = operate(firstVal, secVal, oper);
  lwrDisplay.textContent = `= ${res}`;
}
