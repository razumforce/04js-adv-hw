"use strict";

var xhr = new XMLHttpRequest();
xhr.open('GET', './tel.json', false);
xhr.send();

if (xhr.status !== 200) {
  console.log('Error', xhr.status, xhr.statusText);
} else {
  console.log('OK!', xhr.statusText, xhr.responseText);
}

var jsonResult = JSON.parse(xhr.responseText);
console.log(jsonResult);

var strResult = JSON.stringify(jsonResult);
console.log(strResult);


var xhr2 = new XMLHttpRequest();
xhr2.open('GET', './menu.json', true);
xhr2.onreadystatechange = function() {
  if (xhr2.readyState !== 4) {
    return;
  }
  if (xhr2.status !== 200) {
    console.log('Error async', xhr2.status, xhr2.statusText);
  } else {
    console.log('OK ASYNC!', xhr2.statusText, xhr2.responseText);
  }
  var jsonResult = JSON.parse(xhr2.responseText);
  console.log(jsonResult);
  console.log(jsonResult['menu'][0]['submenu']);

}

xhr2.send();