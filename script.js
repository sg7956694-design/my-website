let currvalue = "";
let prvvalue = "";
let operator = null;

const prevDisplay = document.querySelector(".previous");
const currDisplay = document.querySelector(".current");

function updateDisplay() {
  prevDisplay.innerText =
    prvvalue && operator ? `${prvvalue} ${operator}` : "";

  if (currvalue === "") {
    currDisplay.innerText = operator ? "" : "0";
  } else {
    currDisplay.innerText = currvalue;
  }
}

document.addEventListener("click", (e) => {
  const btn = e.target;
  if (!btn.classList.contains("btn")) return;

  if (btn.dataset.number) handleNumber(btn.dataset.number);
  if (btn.dataset.operator) handleOperator(btn.dataset.operator);
  if (btn.dataset.decimal !== undefined) handleDecimal();
  if (btn.dataset.equal !== undefined) handleEquals();
  if (btn.dataset.clear !== undefined) handleClear();
  if (btn.dataset.delete !== undefined) handleDelete();
  if (btn.dataset.percent !== undefined) handlePercent();
});

function handleNumber(num) {
  if (currvalue === "0") currvalue = "";
  currvalue += num;
  updateDisplay();
}

function handleOperator(op) {
  if (currvalue === "" && prvvalue !== "") {
    operator = op;
    updateDisplay();
    return;
  }

  if (currvalue === "") return;

  prvvalue = currvalue;
  operator = op;
  currvalue = "";
  updateDisplay();
}

function handleEquals() {
  if (!operator || currvalue === "") return;

  const result = calculate(
    Number(prvvalue),
    Number(currvalue),
    operator
  );

  currvalue = String(result);
  prvvalue = "";
  operator = null;
  updateDisplay();
}

function calculate(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? "Error" : a / b;
}

function handleDecimal() {
  if (currvalue.includes(".")) return;
  currvalue = currvalue === "" ? "0." : currvalue + ".";
  updateDisplay();
}

function handleClear() {
  currvalue = "";
  prvvalue = "";
  operator = null;
  updateDisplay();
}

function handleDelete() {
  currvalue = currvalue.slice(0, -1);
  updateDisplay();
}

function handlePercent() {
  if (currvalue === "") return;
  currvalue = String(Number(currvalue) / 100);
  updateDisplay();
}
