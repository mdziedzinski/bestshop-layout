const products = document.querySelector("#products");

const orders = document.querySelector("#orders");

const packages = document.querySelector("#package");
const selectInput = document.querySelector(".select__input");
const selectDropdown = document.querySelector(".select__dropdown");
const packagesList = document.querySelectorAll("#package>ul>li");

const accounting = document.querySelector("#accounting");
const terminal = document.querySelector("#terminal");
const summaryItems = document.querySelectorAll("[data-id]");
let ordersPrice = 5;
let productsPrice = 10;
const showTotal = document.querySelector("#total-price");
let updateTotal = document.querySelector(".total__price");
let arrTotal = {
  quantity: 0,
  months: 0,
  package: 0,
  accounting: 0,
  rental: 0,
};
const form = document.querySelector(".calc__form");
let sumTotal = 0;

console.log(summaryItems[1].getAttribute("data-id"));

//products quantity
function calculatorInputProducts(event) {
  showTotal.classList.add("open");
  summaryItems.forEach(function (el) {
    if (this.event.target.id === el.getAttribute("data-id")) {
      el.classList.add("open");
      el.children[1].innerText = `${this.event.target.value} x $${productsPrice}`;
      el.children[2].innerText = `$ ${this.event.target.value * productsPrice}`;
      arrTotal.quantity = this.event.target.value;
    }
  });
}

//estimated orders
function calculatorInputOrders(event) {
  summaryItems.forEach(function (el) {
    if (this.event.target.id === el.getAttribute("data-id")) {
      el.classList.add("open");
      el.children[1].innerText = `${this.event.target.value} x $${ordersPrice}`;
      el.children[2].innerText = `$ ${this.event.target.value * ordersPrice}`;
      arrTotal.months = this.event.target.value;
    }
  });
}

console.log("test");

//choose package

function calculatorChoice(event) {
  if (selectDropdown.style.display === "none") {
    selectDropdown.style.display = "block";
  } else {
    selectDropdown.style.display = "none";
  }
  packagesList.forEach(function (el) {
    el.addEventListener("click", function () {
      let packageData = this.getAttribute("data-value");
      packages.setAttribute("data-id", `${packageData}`);
      for (element of summaryItems) {
        if (element.getAttribute("data-id") === "package") {
          element.classList.add("open");
          element.children[1].innerText = packageData;
          if (element.children[1].innerText === "basic") {
            element.children[2].innerText = "$10";
            arrTotal.package = 10;
          }
          if (element.children[1].innerText === "professional") {
            element.children[2].innerText = "$20";
            arrTotal.package = 20;
          }
          if (element.children[1].innerText === "premium") {
            element.children[2].innerText = "$30";
            arrTotal.package = 30;
          }
          selectInput.innerText = packageData;
        }
      }
    });
  });
}

//accounting and rental checkbox

function calculatorCheck(event) {
  if (this.checked) {
    summaryItems.forEach(function (el) {
      if (this.event.target.id === el.getAttribute("data-id")) {
        el.classList.add("open");
        arrTotal.accounting = 10;
      }
    });
  } else {
    summaryItems.forEach(function (el) {
      if (this.event.target.id === el.getAttribute("data-id")) {
        el.classList.remove("open");
        arrTotal.accounting = 0;
      }
    });
  }
}
function calculatorCheck2(event) {
  if (this.checked) {
    summaryItems.forEach(function (el) {
      if (this.event.target.id === el.getAttribute("data-id")) {
        el.classList.add("open");
        arrTotal.rental = 10;
      }
    });
  } else {
    summaryItems.forEach(function (el) {
      if (this.event.target.id === el.getAttribute("data-id")) {
        el.classList.remove("open");
        arrTotal.rental = 0;
      }
    });
  }
}

products.addEventListener("input", calculatorInputProducts);
orders.addEventListener("input", calculatorInputOrders);

accounting.addEventListener("change", calculatorCheck);
terminal.addEventListener("change", calculatorCheck2);

packages.addEventListener("click", calculatorChoice);

function totalCost() {
  //   console.log(arrTotal);
  const sum =
    arrTotal.package * arrTotal.quantity * arrTotal.months +
    arrTotal.rental +
    arrTotal.accounting;

  updateTotal.innerText = sum;
}
form.addEventListener("change", totalCost);
