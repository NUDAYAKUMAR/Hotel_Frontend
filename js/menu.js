// SVFF Tiffin Hotel — menu page (frontend only)

(function () {
  'use strict';

  function getMenu() {
    return window.SVFF_MENU_ITEMS || [];
  }

  function escapeHtml(text) {
    if (text == null) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  var allMenuItems = [];

  function renderMenu(items) {
    var grid = document.getElementById('menuGrid');
    var noItems = document.getElementById('noItems');
    if (!grid || !noItems) return;

    if (items.length === 0) {
      grid.innerHTML = '';
      noItems.style.display = 'block';
      return;
    }

    noItems.style.display = 'none';
    grid.innerHTML = items.map(function (item) {
      var name = escapeHtml(item.itemName);
      var cat = item.category ? escapeHtml(item.category) : '';
      var desc = escapeHtml(item.description || 'A delicious South Indian tiffin classic.');
      var price = escapeHtml(String(item.price));
      var img = escapeHtml(item.imageUrl || 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=500&q=80');
      var catBadge = item.category ? '<span class="card-category-badge">' + cat + '</span>' : '';
      var special = item.isTodaysSpecial ? '<span class="special-star">⭐ Special</span>' : '';
      var stockColor = item.isAvailable ? 'var(--primary)' : '#ff6b6b';
      var stockLabel = item.isAvailable ? '✅ Available' : '❌ Sold Out';

      return (
        '<div class="col-sm-6 col-lg-4 menu-item-card" data-category="' + (item.category || 'all') + '" data-special="' + !!item.isTodaysSpecial + '">' +
        '<div class="menu-card">' +
        '<div class="menu-card-img-wrap">' +
        '<img src="' + img + '" alt="' + name + '" loading="lazy"/>' +
        '<div class="menu-card-overlay"></div>' + catBadge + special +
        '</div><div class="menu-card-body">' +
        '<h5>' + name + '</h5><p>' + desc + '</p>' +
        '<div class="menu-card-footer"><div>' +
        '<span class="price">₹' + price + '</span>' +
        '<span class="price-note d-block">per plate</span></div>' +
        '<span style="background:var(--light-bg);color:' + stockColor + ';padding:6px 14px;border-radius:50px;font-size:0.78rem;font-weight:600;">' + stockLabel +
        '</span></div></div></div></div>');
    }).join('');
  }

  function loadMenuItems() {
    var grid = document.getElementById('menuGrid');
    if (!grid) return;

    allMenuItems = getMenu().slice();

    if (allMenuItems.length === 0) {
      grid.innerHTML =
        '<div class="col-12 text-center py-5" style="color:var(--text-light);">No menu items to display.</div>';
      var noItems = document.getElementById('noItems');
      if (noItems) noItems.style.display = 'block';
      return;
    }

    renderMenu(allMenuItems);
  }

  window.filterMenu = function (btn, filter) {
    document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');

    var filtered;
    if (filter === 'all') {
      filtered = allMenuItems;
    } else if (filter === 'special') {
      filtered = allMenuItems.filter(function (i) { return i.isTodaysSpecial; });
    } else {
      filtered = allMenuItems.filter(function (i) { return i.category === filter; });
    }

    renderMenu(filtered);
  };

  document.addEventListener('DOMContentLoaded', loadMenuItems);
})();
