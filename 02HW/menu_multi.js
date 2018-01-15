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
  // should generate menuItems = {0: m_item0, 1: m_item1, 2: m_item2, 3: m_item3, 4: m_item4}
  // m_item = new MenuItem('/', 'Home')
  // OR
  // m_item = new SubMenu('submenu2', 'submenu-item', s_items, 'Women Sub')
  // s_items = {0: s_item0, 1: s_item1}
  // s_item0 = new MenuItem('/catalog/women/ss1', 'SS1')

  console.log(menuJSONData);
  // for (var item in menuJSONData) {
  //   console.log('item = ', item, ' and data = ', menuJSONData[item], ' and submenu = ',
  //               (typeof menuJSONData[item]['submenu'] === 'undefined'));
  // }

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


  // var ss_item0 = new MenuItem('/catalog/women/ss1', 'SS1');
  // var ss_item1 = new MenuItem('/catalog/women/ss2', 'SS2');
  // var ss_items = {0: ss_item0, 1: ss_item1};
  // var ssubmenu = new SubMenu('submenu2', 'submenu-item', ss_items, 'Women Sub');

  // var s_item0 = new MenuItem('/catalog/men', 'Men');
  // var s_item1 = ssubmenu;
  // var s_items = {0: s_item0, 1: s_item1};
  // var submenu = new SubMenu('submenu1', 'submenu-item', s_items, 'submenu1');

  // var m_item0 = new MenuItem('/', 'Home');
  // var m_item1 = new MenuItem('/catalog', 'Catalog');
  // var m_item2 = submenu;
  // var m_item3 = new MenuItem('/gallery', 'Gallery');
  // var m_item4 = new MenuItem('/contacts', 'Contacts');

  // var mItems = {0: m_item0, 1: m_item1, 2: m_item2, 3: m_item3, 4: m_item4};
  // console.log(mItems);
  console.log(menuItems);

  return menuItems;
}

  

