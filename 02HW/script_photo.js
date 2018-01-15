"use strict";

window.onload = init;


function init() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', './photo.json', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status !== 200) {
      console.log('Error async', xhr.status, xhr.statusText);
    } else {
      console.log('OK ASYNC!', xhr.statusText, xhr.responseText);
      var jsonResult = JSON.parse(xhr.responseText);
      var gallery = document.getElementById('photo-gallery');

      for (var i = 0; i < jsonResult['photo'].length; i++) {
        var outerElem = document.createElement('a');
        outerElem.href = jsonResult['photo'][i];
        outerElem.style.color = 'black';
        outerElem.target = '_blank';
        gallery.appendChild(outerElem);
        var image = document.createElement('img');
        image.src = jsonResult['photo'][i];
        image.style.display = 'inline-block';
        image.style.border = 'solid';
        image.style.margin = '5px';
        image.height = '150';
        image.alt = 'image-gallery' + i;
        outerElem.appendChild(image);
      }
    }
    

  }

  xhr.send();
}