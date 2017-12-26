function Container() {
  this.id = '';
  this.className = '';
  this.htmlCode = '';
}

Container.prototype.render = function() {
  return this.htmlCode;
}

function Menu(my_id, my_class, my_items) {
  Container.call(this);
  this.id = my_id;
  this.className = my_class;
  this.items = my_items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function() {
  var result = '<ul class='+this.className+'" id="'+this.id+'">';
  for (var item in this.items) {
    if(this.items[item] instanceof MenuItem) {
      result += this.items[item].render();
    }
  }
  result += '</ul>';
  return result;
}

function MenuItem(my_href, my_name) {
  Container.call(this);
  this.className = 'menu-item';
  this.href = my_href;
  this.name = my_name;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function() {
  return '<li class="'+this.className+'" href="'+this.href+'">'+this.name+'</li>';
}

var m_item1 = new MenuItem('/', 'Home');
var m_item2 = new MenuItem('/catalog', 'Catalog');
var m_item3 = new MenuItem('/gallery', 'Gallery');
var m_items = {0: m_item1, 1: m_item2, 2: m_item3};

console.log(m_item1.render());

var menu = new Menu('my_menu', 'menu_class', m_items);

console.log(menu);

var menu_rendered = menu.render();
console.log(menu_rendered);
var div = document.write(menu_rendered);

