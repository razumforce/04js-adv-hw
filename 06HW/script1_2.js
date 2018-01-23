"use strict";

$(function() {
  $("#inputDate").datepicker();
});

$(function() {
  $("#formDialog-message").dialog({
    autoOpen: false,
    modal: true,
    buttons: {
      Ok: function() {
        $(this).dialog('close');
      }
    }
  });
});

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
  var $elemName = $('#inputName');
  var $elemTel = $('#inputTel');
  var $elemEmail = $('#inputEmail');
  var $elemCity = $('#inputCity');
  var $elemText = $('#inputText');

  console.log($elemName.val(), $elemTel.val(), $elemEmail.val());

  var regName = /^[a-zа-яё]+$/ig;
  var regTel = /^\+\d\(\d{3}\)\d{3}\-\d{4}$/ig;
  var regEmail = /^([\w]+(\.|\-)){0,1}[\w]+@[\w]+(\.[a-z]{2,6})$/ig;
  var regText = /.+/ig;
  var regCity = /^[a-zа-яё]+(\-{0,1}[\d]{1,3}){0,1}$/ig;

  if (!(regName.test($elemName.val()))) {
    $elemName.css('border-color', 'red');
    $elemName.effect('bounce');
  }

  if (!(regTel.test($elemTel.val()))) {
    $elemTel.css('border-color', 'red');
    $elemTel.effect('bounce');
  }

  if (!(regEmail.test($elemEmail.val()))) {
    $elemEmail.css('border-color', 'red');
    $elemEmail.effect('bounce');
  }

  if (!(regText.test($elemText.val()))) {
    $elemText.css('border-color', 'red');
    $elemText.effect('bounce');
  }

  if (!(regCity.test($elemCity.val()))) {
    $elemCity.css('border-color', 'red');
    $elemCity.effect('bounce');
  }

  $("#formDialog-message").dialog('open');  
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