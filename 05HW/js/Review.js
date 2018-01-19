function Review(root) {
    Container.call(this, 'review');

    this.lastId = 1;

    this.reviewComments = [];
    this.collectComments(root); // Загружаем комментарии, которые уже сделаны. status: 0 - ожидает модерации, 1 - ОК
}

Review.prototype = Object.create(Container.prototype);
Review.prototype.constructor = Review;

Review.prototype.render = function(root) {
  var reviewDiv = $('<div />', {
      id: this.id,
      text: 'Комментарии'
  });

  var reviewCommentsDiv = $('<div />', {
      id: this.id + '_comments'
  });

  reviewCommentsDiv.appendTo(reviewDiv);
  reviewDiv.appendTo(root);

//
// ТУТ (ниже) СДЕЛАЛ ТАКИМ ПУТЕМ, насколько верно/неверно - не знаю.
// вернее - работать-то работает, но может есть другой путь?
// у меня задача стояла передать контекст (объект Review) внутрь функции (обработчик события),
// которая сработает по клику на некий тег в тексте
// но при клике - в нее передается контекст this, который является элементом DOM
// а к объекту экземпляра класса по this уже доступа нет. и вызвать его метод изнутри не получается.
// вот я его их привязал bind-ом к функции (deleteItem и submitItem), которую вызываю внутри обработчика события
//

  deleteItem = this.delete.bind(this);
  submitItem = this.submit.bind(this);

  $('#review_comments').on('click', 'span', function() {
    regexpDel = /^commentDel/;
    regexpSub = /^commentSub/;

    if (regexpDel.test($(this).attr('id'))) {
      var comment = $(this).attr('id').split('-')[1];
      deleteItem(comment);
    } else if (regexpSub.test($(this).attr('id'))) {
      var comment = $(this).attr('id').split('-')[1];
      submitItem(comment);
    }
  });

}

Review.prototype.refresh = function() {
  var $reviewCommentsDiv = $('#review_comments');
  $reviewCommentsDiv.empty();
  for (var i = 0; i < this.reviewComments.length; i++) {
    commentLine = '<div><span>' + this.reviewComments[i]['id_comment'] + ': ' + this.reviewComments[i]['text'] +
                  ' | ' + '</span><span id="commentDel-' + i + '"> X </span>';
    if (this.reviewComments[i]['status'] === 0) {
      commentLine += '<span id="commentSub-' + i + '"> M </span>';
    }
    commentLine += '</div>';

    $reviewCommentsDiv.append(commentLine);
  }
}

Review.prototype.add = function(text) {
  var newComment = {
    "id_comment": ++this.lastId,
    "text": text,
    "status": 0
  };

  this.reviewComments.push(newComment);

  this.refresh();
}

Review.prototype.delete = function(comment) {
  this.reviewComments.splice(comment, 1);
  this.refresh();
}

Review.prototype.submit = function(comment) {
  this.reviewComments[comment]['status'] = 1;
  this.refresh();
}

Review.prototype.collectComments = function(root) {

  $.get({
      url: './comments.json',
      dataType: 'json',
      success: function (data) {

          for (var index in data.comments) {
              this.reviewComments.push(data.comments[index]);
          }
          this.lastId = data.lastId;
          console.log(this.reviewComments);
          console.log(this.lastId);
          this.render(root);
          this.refresh();
      },
      context: this
  });
};