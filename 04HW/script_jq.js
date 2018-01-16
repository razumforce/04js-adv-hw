"use strict";

$(document).ready(function() {
  $('.tab').on('click', function() {
    $('.tab.active').removeClass('active');
    $('.tab-content.active').removeClass('active');
    $(this).addClass('active');
    $('#' + $(this).attr('id') + '-content').addClass('active');
  })
});
