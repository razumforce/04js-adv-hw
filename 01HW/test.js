function Car() {
  this.vinCode = 'somevincode';
}

Car.prototype.setVin = function(my_vin) {
  this.vinCode = my_vin;
  alert('Vin = ' + this.vinCode);
}

var c1 = new Car();
c1.setVin('vin1');
console.log(c1);
var c2 = new Car();
c2.setVin('vin2');
console.log(c2);
