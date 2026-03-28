// SVFF Tiffin Hotel — home page (frontend only)

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

  function loadTodaysSpecial() {
    var container = document.getElementById('todaySpecialContainer');
    if (!container) return;

    var menu = getMenu();
    var specialItems = menu.filter(function (i) { return i.isTodaysSpecial; });
    if (specialItems.length === 0) {
      specialItems = menu.slice(0, 1);
    }

    if (specialItems.length === 0) {
      container.innerHTML =
        '<div class="text-center py-4" style="color:var(--text-light);">' +
        '<div style="font-size:3rem;">🍽️</div>' +
        '<p class="mt-2">Today\'s special will be announced soon!</p></div>';
      return;
    }

    var item = specialItems[0];
    var name = escapeHtml(item.itemName);
    var desc = escapeHtml(item.description || 'A delicious South Indian classic prepared fresh every day.');
    var price = escapeHtml(String(item.price));
    var img = escapeHtml(item.imageUrl || 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=80');

    container.innerHTML =
      '<div class="special-card">' +
      '<div class="row g-0 align-items-center">' +
      '<div class="col-md-5">' +
      '<img src="' + img + '" alt="' + name + '" class="special-img" />' +
      '</div>' +
      '<div class="col-md-7 p-4 p-lg-5">' +
      '<div class="special-badge-pill">⭐ Today\'s Special</div>' +
      '<h2 style="font-family:\'Playfair Display\',serif;font-size:2.5rem;font-weight:800;margin-bottom:0.8rem;">' + name + '</h2>' +
      '<p style="opacity:0.85;line-height:1.8;margin-bottom:1.5rem;">' + desc + '</p>' +
      '<div class="mb-3">' +
      '<span class="special-tag">🌿 Pure Veg</span>' +
      '<span class="special-tag">✨ Fresh Today</span>' +
      '<span class="special-tag">🔥 Chef\'s Pick</span>' +
      '</div>' +
      '<div class="special-price">₹' + price + '<small style="font-size:1rem;font-weight:400;"> / plate</small></div>' +
      '<div class="special-price-note">Available only until stock lasts</div>' +
      '<a href="menu.html" class="btn-outline-custom mt-3 d-inline-block" style="border-color:rgba(255,255,255,0.5);color:white;">View Full Menu →</a>' +
      '</div></div></div>';
  }

  function createMenuCard(item) {
    var name = escapeHtml(item.itemName);
    var cat = item.category ? '<span class="card-category-badge">' + escapeHtml(item.category) + '</span>' : '';
    var special = item.isTodaysSpecial ? '<span class="special-star">⭐ Special</span>' : '';
    var imgSrc = escapeHtml(item.imageUrl || 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=500&q=80');
    var desc = escapeHtml(item.description || 'Freshly prepared South Indian tiffin item.');
    var price = escapeHtml(String(item.price));
    var avail = item.isAvailable ? '✅ Available' : '❌ Unavailable';

    return (
      '<div class="col-sm-6 col-lg-4">' +
      '<div class="menu-card">' +
      '<div class="menu-card-img-wrap">' +
      '<img src="' + imgSrc + '" alt="' + name + '" loading="lazy"/>' +
      '<div class="menu-card-overlay"></div>' + cat + special +
      '</div><div class="menu-card-body">' +
      '<h5>' + name + '</h5>' +
      '<p>' + desc + '</p>' +
      '<div class="menu-card-footer"><div>' +
      '<span class="price">₹' + price + '</span>' +
      '<span class="price-note d-block">per plate</span></div>' +
      '<span style="background:var(--light-bg);color:var(--primary);padding:6px 14px;border-radius:50px;font-size:0.78rem;font-weight:600;">' + avail +
      '</span></div></div></div></div>');
  }

  function loadFeaturedItems() {
    var container = document.getElementById('featuredItemsContainer');
    if (!container) return;

    var items = getMenu();
    if (items.length === 0) {
      container.innerHTML =
        '<div class="col-12 text-center" style="color:var(--text-light);padding:3rem 0;">No menu items available right now.</div>';
      return;
    }

    var displayItems = items.slice(0, 6);
    container.innerHTML = displayItems.map(createMenuCard).join('');

    var countEl = document.getElementById('heroItemCount');
    if (countEl) countEl.textContent = items.length + '+';
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadTodaysSpecial();
    loadFeaturedItems();

    var nav = document.querySelector('.navbar');
    var onScroll = function () {
      if (!nav) return;
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(26,26,46,0.98)';
        nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
      } else {
        nav.style.background = 'rgba(26,26,46,0.95)';
        nav.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  });
})();
