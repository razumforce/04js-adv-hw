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
function SubMenu(my_id, my_class, my_items, my_subtitle, my_href) {
  Menu.call(this, my_id, my_class, my_items);
  this.subtitle = my_subtitle;
  this.href = my_href;
}

SubMenu.prototype = Object.create(Menu.prototype);
SubMenu.prototype.constructor = SubMenu;

SubMenu.prototype.render = function() {
  return '<li class="' + this.className + '"><a href="' + this.href + '">' + this.subtitle + '</a>' +
          Menu.prototype.render.call(this) + '</li>';
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
  var xhr = new XMLHttpRequest();
  var path = './menu.json';
  xhr.open('GET', path, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status !== 200) {
      console.log('Error async', xhr.status, xhr.statusText);
    } else {
      console.log('OK ASYNC!', xhr.statusText, xhr.responseText);
      var menuJSON = JSON.parse(xhr.responseText);
      var menuItems = prepareMenuItems(menuJSON['menu']['data']);
      var menu = new Menu(menuJSON['menu']['id'], "menu-class", menuItems);
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
  }
  xhr.send();
}

function renderMenu(menu) {
  var menu_rendered = menu.render();
  var renderTo = document.getElementById('menu-block');
  renderTo.innerHTML = menu_rendered;
}

function removeMenu(menu) {
  menu.remove();
}

function prepareMenuItems(menuJSONData) {
  var menuItems = {};
  for (var item in menuJSONData) {
    if (typeof menuJSONData[item]['submenu'] === 'undefined') {
      menuItems[item] = new MenuItem(menuJSONData[item]['href'], menuJSONData[item]['title']);
    } else {
      menuItems[item] = new SubMenu(menuJSONData[item]['submenu']['id'], 'submenu-item',
                        prepareMenuItems(menuJSONData[item]['submenu']['data']),
                        menuJSONData[item]['title'], menuJSONData[item]['href']);
    }
  }
  return menuItems;
}

  

