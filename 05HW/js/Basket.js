function Basket(root) {
    Container.call(this, 'basket');

    this.countGoods = 0;
    this.amount = 0;

    this.basketItems = [];
    this.collectBasketItems(root); // Загружаем товары, которые уже добавлены (json файл)
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

//
// TODO посмотреть метод render!
//
// в render теперь полностью рендерится корзина (включая ее нижнюю часть с данными)
//

Basket.prototype.render = function (root) { // Генерация базовой разметки
    var basketDiv = $('<div />', {
        id: this.id,
        text: 'Корзина'
    });

    var basketItemsDiv = $('<div />', {
        id: this.id + '_items'
    });

    var basketData = $('<div />', {
              id: 'basket_data'
              // text: 'Text'
          });

    
    basketItemsDiv.appendTo(basketDiv);
    basketData.appendTo(basketDiv);
    basketDiv.appendTo(root);

    deleteItem = this.delete.bind(this);

    $('#basket_items').on('click', 'span', function() {
      regexp = /^bskitemdel/;
      if (regexp.test($(this).attr('id'))) {
        var item = $(this).attr('id').split('-')[1];
        deleteItem(item);
      }
    });
};

Basket.prototype.add = function (product, quantity, price) {
    // console.log(product, quantity, price);
    var basketItems = {
      "id_product": product,
      "price": price
    };

    for (var i = 1; i <= quantity; i++) {
        this.basketItems.push(basketItems);
        this.countGoods++;
        this.amount += +price;
    }

    this.refresh();
    console.log(this.basketItems);
};

Basket.prototype.delete = function (item) {
    itemToDelete = this.basketItems[item];

    this.countGoods--;
    this.amount -= itemToDelete['price'];

    this.basketItems.splice(item, 1);
    this.refresh();

};

Basket.prototype.refresh = function () {
  var $basketItemsDiv = $('#basket_items');
  $basketItemsDiv.empty();
  for (var i = 0; i < this.basketItems.length; i++) {
    $basketItemsDiv.append('<div><span>' + (i + 1) + '. ' + this.basketItems[i]['id_product'] + ' - ' +
                            this.basketItems[i]['price'] + '</span><span id="bskitemdel-' + i + '"> X </span></div>')
  }

  var $basketDataDiv = $('#basket_data'); // тут была ошибка, вместо basket_data был basket_wrapper
  $basketDataDiv.empty();
  $basketDataDiv.append('<p>Всего товаров: ' + this.countGoods + '</p>');
  $basketDataDiv.append('<p>Сумма: ' + this.amount + '</p>');

};

Basket.prototype.collectBasketItems = function (root) {
  // УБРАЛ МНОГО НЕНУЖНОГО КОДА ОТСЮДА - collectBasketItems - все же 
  // по логике должно собирать данные корзины, а не рендерить их
  // в конце - сделал вызовы к render, и затем refresh
  // чтобы сначала разметку новой корзины создать
  // и потом - тут же обновить ее данные
  // данее уже по кликам работают методы refresh
  // КРОМЕ ТОГО - первый вывоз render лучше делать отсюда, а не из тела документа
  // так как мы должны быть уверены, что к этому моменту все загружено
  //

  $.get({
      url: './basket.json',
      dataType: 'json',
      success: function (data) {

          this.countGoods = data.basket.length;
          this.amount = data.amount;

          for (var index in data.basket) {
              this.basketItems.push(data.basket[index]);
          }

          this.render(root);
          this.refresh();
      },
      context: this
  });
};