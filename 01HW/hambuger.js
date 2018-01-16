//***************CLASSES*********************
Hamburger.SIZE_SMALL = 1;
Hamburger.SIZE_BIG = 2;
Hamburger.STUFFING_CHEESE = 1;
Hamburger.STUFFING_SALAD = 2;
Hamburger.STUFFING_POTATO = 3;
Hamburger.TOPPING_MAYO = 1;
Hamburger.TOPPING_SPICE = 2;

function Hamburger(size, stuffing) {
  this.toppings = [];

  switch (size) {
    case Hamburger.SIZE_SMALL:
      this.price = 50;
      this.calories = 20;
      break;
    case Hamburger.SIZE_BIG:
      this.price = 100;
      this.calories = 40;
      break;
  }
  this.size = size;

  switch(stuffing) {
    case Hamburger.STUFFING_CHEESE:
      this.price += 10;
      this.calories += 20;
      break;
    case Hamburger.STUFFING_SALAD:
      this.price += 20;
      this.calories += 5;
      break;
    case Hamburger.STUFFING_POTATO:
      this.price += 15;
      this.calories += 10;
      break;
  }
  this.stuffing = stuffing;
}

Hamburger.prototype.addTopping = function(topping) {
  switch (topping) {
    case Hamburger.TOPPING_MAYO:
      this.toppings.push(Hamburger.TOPPING_MAYO);
      this.price += 20;
      this.calories += 5;
      break;
    case Hamburger.TOPPING_SPICE:
      this.toppings.push(Hamburger.TOPPING_SPICE);
      this.price += 15;
      this.calories += 0;
      break;
  }
}

Hamburger.prototype.calculatePrice = function() {
  return this.price;
}

Hamburger.prototype.calculateCalories = function() {
  return this.calories;
}

//***************ONLOAD INIT*********************

window.onload = init;

//***************MAIN CODE*********************
function init() {
  document.getElementById('form-burger').addEventListener('submit', calculateBurger);
}

function calculateBurger(event) {
  event.preventDefault();

  var burger = new Hamburger(+this.burgerSize.value, +this.burgerStuff.value);
  if (this.burgerTopMayo.checked) {
    burger.addTopping(Hamburger.TOPPING_MAYO);
  }
  if (this.burgerTopSpice.checked) {
    burger.addTopping(Hamburger.TOPPING_SPICE);
  }
  
  var resultElem = document.getElementById('div-result');
  resultElem.innerHTML = '<p>Price = ' + burger.calculatePrice() + ', calories = ' +
                          burger.calculateCalories() + '</p>';
}

