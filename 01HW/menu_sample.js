window.onload = init;

//===========Class Container=====================
function Container() {
  this.id = '';
  this.className = '';
  this.htmlCode = '';
}

Container.prototype.render = function() {
  return this.htmlCode;
}

// remove element from DOM - ЗАДАНИЕ №1
Container.prototype.remove = function() {
    var elem = document.getElementById(this.id);
    if (elem) {
      elem.parentNode.removeChild(elem);
    }
}

//===========Class Menu=====================
function Menu(my_id, my_class, my_items) {
  Container.call(this);
  this.id = my_id;
  this.className = my_class;
  this.items = my_items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function() {
  var result = '<ul class="'+this.className+'" id="'+this.id+'">';
  for (var item in this.items) {
    if (this.items[item] instanceof MenuItem || this.items[item] instanceof SubMenu) {
      result += this.items[item].render();
    }
  }
  result += '</ul>';
  return result;
}

//===========Class SubMenu=====================
function SubMenu(my_id, my_class, my_items) {
  Menu.call(this, my_id, my_class, my_items);
}

SubMenu.prototype = Object.create(Menu.prototype);
SubMenu.prototype.constructor = SubMenu;

SubMenu.prototype.render = function() {
  return '<li>' + Menu.prototype.render.call(this) + '</li>';
}


//===========Class MenuItem=====================
function MenuItem(my_href, my_name) {
  Container.call(this);
  this.className = 'menu-item';
  this.href = my_href;
  this.name = my_name;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function() {
  return '<li class="'+this.className+'"><a href="'+this.href+'">'+this.name+'</a></li>';
}


//***************MAIN CODE*********************
function init() {
// initialize MENU DATA
  var s_item0 = new MenuItem('/catalog/men', 'Men');
  var s_item1 = new MenuItem('/catalog/women', 'Women');
  var s_items = {0: s_item0, 1: s_item1};
  var submenu = new SubMenu('submenu', 'submenu_class', s_items);

  var m_item0 = new MenuItem('/', 'Home');
  var m_item1 = new MenuItem('/catalog', 'Catalog');
  var m_item2 = submenu;
  var m_item3 = new MenuItem('/gallery', 'Gallery');
  var m_item4 = new MenuItem('/contacts', 'Contacts');
  var m_items = {0: m_item0, 1: m_item1, 2: m_item2, 3: m_item3, 4: m_item4};

  var menu = new Menu('my_menu', 'menu_class', m_items);

// Initial render of MENU
  renderMenu(menu);

// set EVENT HANDLERS for buttons
  document.getElementById('btn-render').addEventListener('click', function () {
    renderMenu(menu);
  });
  document.getElementById('btn-remove').addEventListener('click', function () {
    removeMenu(menu);
  });
}

function renderMenu(menu) {
  var menu_rendered = menu.render();
  var renderTo = document.getElementById('menu-block');
  renderTo.innerHTML = menu_rendered;
}

function removeMenu(menu) {
  menu.remove();
}
