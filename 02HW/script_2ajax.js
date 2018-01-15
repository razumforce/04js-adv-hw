"use strict";

window.onload = init;


function init() {

  var xhr = new XMLHttpRequest();

  document.getElementById('btn-success').addEventListener('click', function() {
    xhr.open('GET', './2ajax_success.json', true);
    xhr.send();
  });

  document.getElementById('btn-error').addEventListener('click', function() {
    xhr.open('GET', './2ajax_error.json', true);
    xhr.send();
  });


  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status !== 200) {
      console.log('Error async', xhr.status, xhr.statusText);
    } else {
      console.log('OK ASYNC!');
      var result = JSON.parse(xhr.responseText);
      showAjaxResult(result);
    }
  }

}

function showAjaxResult(result) {
  var elem = document.getElementById('div-result');

  if (result['result'] === 'success') {
    elem.style.color = 'blue';
  } else {
    elem.style.color = 'red';
  }

  elem.innerHTML = result['result'];
}