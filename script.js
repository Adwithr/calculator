// let buttons = Array.from(document.querySelectorAll(".buttons"));
// let uprDisplay = document.querySelector(".uprDisplay");
// let lwrDisplay = document.querySelector(".lwrDisplay");
// let firstVal, secVal, oper;

// buttons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     if (e.target.textContent === "C") clearDisplay();
//     else if (e.target.classList.contains("oper")) {
//       if (uprDisplay.textContent.match(/[+\-\/\*]/)) {
//       } else {
//         oper = e.target.textContent;
//         firstVal = +lwrDisplay.textContent;
//         uprDisplay.textContent += firstVal + e.target.textContent;
//         lwrDisplay.textContent = "";
//       }
//     } else if (e.target.textContent === "=") calc();
//     else if (e.target.classList.contains("backspace"))
//       lwrDisplay.textContent = lwrDisplay.textContent.slice(0, -1);
//     else lwrDisplay.textContent += e.target.textContent;
//   });
// });

// function clearDisplay() {
//   uprDisplay.textContent = "";
//   lwrDisplay.textContent = "";
//   firstVal = 0;
//   secVal = 0;
//   oper = "";
// }

// function operate(firstVal, secVal, oper) {
//   switch (oper) {
//     case "+":
//       return firstVal + secVal;
//     case "-":
//       return firstVal - secVal;
//     case "*":
//       return firstVal * secVal;
//     case "/":
//       if (secVal == 0) return "oooof";
//       else return firstVal / secVal;
//   }
// }

// function calc() {
//   secVal = +lwrDisplay.textContent;
//   uprDisplay.textContent += secVal;
//   let res = operate(firstVal, secVal, oper);
//   lwrDisplay.textContent = `= ${res}`;
// }

let operator = "",
  previousVal = "",
  currentVal = "";

let numbers = document.querySelectorAll(".num");
let oper = document.querySelectorAll(".oper");
let clear = document.querySelector(".clear");
let backspace = document.querySelector(".backspace");
let equals = document.querySelector(".equals");
let uprDisplay = document.querySelector(".uprDisplay");
let lwrDisplay = document.querySelector(".lwrDisplay");

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
    lwrDisplay.textContent = currentVal;
  });
});

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

equals.addEventListener("click", () => {
  if (currentVal === "" || previousVal === "") return;
  uprDisplay.textContent += currentVal;
  lwrDisplay.textContent = `=${operate(previousVal, currentVal, operator)}`;
});

clear.addEventListener("click", () => {
  operator = "";
  previousVal = "";
  currentVal = "";
  uprDisplay.textContent = "";
  lwrDisplay.textContent = "";
});

backspace.addEventListener("click", () => {
  lwrDisplay.textContent = lwrDisplay.textContent.slice(0, -1);
});

function handleNumber(num) {
  if (currentVal.length < 7) currentVal += num;
}

function handleOperator(op) {
  operator = op;
  previousVal = currentVal;
  currentVal = "";
  uprDisplay.textContent = `${previousVal}${operator}`;
  lwrDisplay.textContent = currentVal;
}

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
  return Math.round(ans * 1000) / 1000;
}
