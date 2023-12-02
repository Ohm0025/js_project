const balance = document.getElementById("transaction-balance");
const expense = document.getElementById("transaction-expense");
const income = document.getElementById("transaction-income");
const title = document.getElementById("transaction-title");
const amount = document.getElementById("transaction-amount");
const type = document.getElementById("transaction-type");
const list = document.getElementById("transaction-list");
const btn = document.querySelector("button");

let expenseAll = 0;
let incomeAll = 0;

function formatNumber(x) {
  let parts = x.toFixed(2).toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function updateTransaction() {
  expense.innerText = `฿${formatNumber(expenseAll)}`;
  income.innerText = `฿${formatNumber(incomeAll)}`;
  balance.innerText = `฿${formatNumber(incomeAll - expenseAll)}`;
}

function createTransaction(title, amount, type) {
  let newTransaction = document.createElement("li");
  newTransaction.innerHTML = `<span>${title}</span><span>${amount}</span>`;
  newTransaction.classList.add("list-item-" + type, "position-relative");
  let removeBtn = document.createElement("button");
  removeBtn.innerText = "x";
  removeBtn.classList.add(
    "btn",
    "btn-danger",
    "d-none",
    "position-absolute",
    "remove-btn"
  );
  newTransaction.prepend(removeBtn);
  newTransaction.addEventListener("mouseover", function () {
    removeBtn.classList.remove("d-none");
    removeBtn.classList.add("z-2");
    removeBtn.addEventListener("click", function (e) {
      console.dir(this);
      this.parentElement.remove();
    });
  });
  newTransaction.addEventListener("mouseout", function () {
    removeBtn.classList.remove("z-1");
    removeBtn.classList.add("d-none");
  });
  list.prepend(newTransaction);
}

function addTransaction() {
  if (type.value === "expense") {
    expenseAll += +amount.value;
    createTransaction(title.value, amount.value, type.value);
  } else if (type.value === "income") {
    incomeAll += +amount.value;
    createTransaction(title.value, amount.value, type.value);
  }
  updateTransaction();
  title.value = "";
  amount.value = "";
}

btn.addEventListener("click", addTransaction);
