const BASE_URL =
  "https://v6.exchangerate-api.com/v6/787c23abe4d49fd9d283294b/latest/USD";

const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropDowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const getExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtValue = amount.value;
  if (amtValue === "" || amtValue < 1) {
    amtValue = 1;
    amount.value = 1;
  }
  const URL = `${BASE_URL}`;
  let response = await fetch(URL);
  let data = await response.json();
  let fromCurrRate = data.conversion_rates[fromCurr.value];
  let toCurrRate = data.conversion_rates[toCurr.value];

  let finalAmount = (amtValue/fromCurrRate) * toCurrRate;

  msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount.toFixed(3)} ${
    toCurr.value
  }`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  getExchangeRate();
});

window.addEventListener("load", () => {
    getExchangeRate();
});
