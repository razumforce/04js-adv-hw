"use strict";

window.onload = init;


function init() {
  var text = "This is a test. and 2 people are talking: 'hey, my friend! how are you?' isn't it great???\n\
              And another example 'let's go and eat something!' - how is it?";

console.log('НАЧАЛЬНАЯ СТРОКА: ');
console.log(text);
// Это первое задание
  var regExp1 = /\'/g;
  console.log('\nМОДИФИКАЦИЯ №1: ');
  console.log(text.replace(regExp1, '"'));

// Это второе задание. Пока не додумался как сделать все в одну строчку. надо изучать RegExp
  var regExpL = /\s\'/g;
  var regExpR = /\'\s/g;
  text = text.replace(regExpL, ' "')
  text = text.replace(regExpR, '" ')
  console.log('\nМОДИФИКАЦИЯ №2 (ПОЛНОЕ РЕШЕНИЕ): ');
  console.log(text);

// Это третье задание

  document.getElementById('form-submit').addEventListener('submit', validateForm);

}

function validateForm(event) {
  event.preventDefault();
  var elemName = document.getElementById('inputName');
  var elemTel = document.getElementById('inputTel');
  var elemEmail = document.getElementById('inputEmail');
  var elemText = document.getElementById('inputText');

  console.log(elemName.value, elemTel.value, elemEmail.value);

  var elemError = document.getElementById('form-error');

  var regName = /^[a-zа-яё]+$/ig;
  var regTel = /^\+\d\(\d{3}\)\d{3}\-\d{4}$/ig;
  var regEmail = /^([\w]+(\.|\-)){0,1}[\w]+@[\w]+(\.[a-z]{2,6})$/ig;
  var regText = /.+/ig;

  if (!(regName.test(elemName.value))) {
    elemName.style.borderColor = 'red';
    elemError.style.visibility = 'visible';
  }

  if (!(regTel.test(elemTel.value))) {
    elemTel.style.borderColor = 'red';
    elemError.style.visibility = 'visible';
  }

  if (!(regEmail.test(elemEmail.value))) {
    elemEmail.style.borderColor = 'red';
    elemError.style.visibility = 'visible';
  }

  if (!(regText.test(elemText.value))) {
    elemText.style.borderColor = 'red';
    elemError.style.visibility = 'visible';
  }

}