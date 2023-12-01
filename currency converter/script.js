const urlApi =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const currencyInput = document.getElementById("select-currency-input");
const currencyOutput = document.getElementById("select-currency-output");

const numberInput = document.getElementById("number-currency-input");
const numberOutput = document.getElementById("number-currency-output");

const exchangeRate = document.getElementById("exchange-rate");
const swapBtn = document.getElementById("swap-btn");

function calMoney() {
  let inputCurrency = currencyInput.value.toLowerCase();
  let outputCurrency = currencyOutput.value.toLowerCase();
  fetch(urlApi + inputCurrency + ".json")
    .then((res) => res.json())
    .then((res) => {
      let rate = +res[inputCurrency][outputCurrency].toFixed(2);
      exchangeRate.innerText = `1 ${inputCurrency} = ${rate} ${outputCurrency}`;
      numberOutput.value = (numberInput.value * rate).toFixed(2);
    })
    .catch((err) => console.log(err));
}

function swapCurrency() {
  let temp = currencyInput.value;
  currencyInput.value = currencyOutput.value;
  currencyOutput.value = temp;
  calMoney();
}

function init() {
  fetch("./Dropdown.txt")
    .then((res) => res.text())
    .then((res) => {
      currencyInput.innerHTML = res;
      currencyInput.children[44].selected = true;
      currencyOutput.innerHTML = res;
      currencyOutput.children[48].selected = true;
      calMoney();
    });
}
currencyInput.addEventListener("change", calMoney);
currencyOutput.addEventListener("change", calMoney);

numberInput.addEventListener("input", calMoney);
numberOutput.addEventListener("input", calMoney);

swapBtn.addEventListener("click", swapCurrency);

init();
