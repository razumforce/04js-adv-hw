"use strict";

var citiesList = [];

window.onload = init;


function init() {

// Это третье задание

  document.getElementById('form-submit').addEventListener('submit', validateForm);

// ЭТО УРОК 4 - ЗАДАНИЕ ПО АВТОПОДГРУЗКЕ НАЗВАНИЯ ГОРОДА
  $.ajax({
    url: './cities.json',
    dataType: 'json',
    success: function(data, textStatus) {
      $.each(data, function(i, val) {
        for (var i = 0; i < val.length; i++) {
          citiesList.push(val[i]);
        }
        citiesList.sort();
        console.log(citiesList);
        $('#inputCity').on('focusout', function() {
          if ($('#autoCity').is(':active')) {
            
          } else {
            $('#autoCity').css('display', 'none');
          }
        });
        $('#inputCity').on('keyup', autoCompleteCity);
        $('#autoCity').on('click', "span", function() {
          chooseCity($(this));
        });
      });
    }
  });

}

function validateForm(event) {
  event.preventDefault();
  var elemName = document.getElementById('inputName');
  var elemTel = document.getElementById('inputTel');
  var elemEmail = document.getElementById('inputEmail');
  var elemCity = document.getElementById('inputCity');
  var elemText = document.getElementById('inputText');

  console.log(elemName.value, elemTel.value, elemEmail.value);

  var elemError = document.getElementById('form-error');

  var regName = /^[a-zа-яё]+$/ig;
  var regTel = /^\+\d\(\d{3}\)\d{3}\-\d{4}$/ig;
  var regEmail = /^([\w]+(\.|\-)){0,1}[\w]+@[\w]+(\.[a-z]{2,6})$/ig;
  var regText = /.+/ig;
  var regCity = /^[a-zа-яё]+(\-{0,1}[\d]{1,3}){0,1}$/ig;

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

  if (!(regCity.test(elemCity.value))) {
    elemCity.style.borderColor = 'red';
    elemError.style.visibility = 'visible';
  }
}

function autoCompleteCity() {
  var cityPart = $('#inputCity').val();
  var parentElem = $('#autoCity');
  if (cityPart.length < 3) {
    parentElem.css('display', 'none');
    return false;
  }
  var regCityList = new RegExp('^' + cityPart, 'i');
  parentElem.html('');
  var showAutoCity = false;
  for (var i = 0; i < citiesList.length; i++) {
    if (regCityList.test(citiesList[i])) {
      parentElem.append('<span id="autoCity-' + i + '">' + citiesList[i] + '</span>');
      showAutoCity = true;
    }
  }
  if (showAutoCity) {
    parentElem.css('display', 'block');
  } else {
    parentElem.css('display', 'none');
  }
  return true;
}

function chooseCity(elem) {
  console.log(elem);
  $('#inputCity').val(citiesList[elem.attr('id').split('-')[1]]);
  $('#autoCity').css('display', 'none');
}