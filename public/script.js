/* ===== Banner Carousel ===== */
function initBannerCarousel() {
  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.banner-dot');
  if (!slides.length) return;
  let current = 0;
  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    current = index;
  }
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
  setInterval(() => showSlide((current + 1) % slides.length), 4000);
}

/* ===== Tabs ===== */
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      const parent = btn.closest('.tabs') || document;
      parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });
}

/* ===== Auth Tabs ===== */
function initAuthTabs() {
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.panel;
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });
}

/* ===== Quantity Controls ===== */
function initQuantity() {
  document.querySelectorAll('.qty-control').forEach(control => {
    const minusBtn = control.querySelector('.qty-minus');
    const plusBtn = control.querySelector('.qty-plus');
    const valEl = control.querySelector('.qty-val');
    if (!minusBtn || !plusBtn || !valEl) return;
    minusBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let val = parseInt(valEl.textContent) || 1;
      if (val > 1) valEl.textContent = val - 1;
      updateCartTotal();
    });
    plusBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let val = parseInt(valEl.textContent) || 1;
      valEl.textContent = val + 1;
      updateCartTotal();
    });
  });
}

/* ===== Cart Remove ===== */
function initCartRemove() {
  document.querySelectorAll('.cart-item__remove').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.cart-item')?.remove();
      updateCartTotal();
      checkEmptyCart();
    });
  });
}

function updateCartTotal() {
  const items = document.querySelectorAll('.cart-item');
  let subtotal = 0, oldTotal = 0, count = 0;
  items.forEach(item => {
    const price = parseInt(item.dataset.price) || 0;
    const oldPrice = parseInt(item.dataset.oldprice) || price;
    const qty = parseInt(item.querySelector('.qty-val')?.textContent) || 1;
    subtotal += price * qty;
    oldTotal += oldPrice * qty;
    count += qty;
    const priceEl = item.querySelector('.cart-item__price');
    if (priceEl) priceEl.textContent = formatPrice(price * qty);
    const oldEl = item.querySelector('.cart-item__old');
    if (oldEl && oldPrice > price) oldEl.textContent = formatPrice(oldPrice * qty);
  });
  const savings = oldTotal - subtotal;
  const countEl = document.getElementById('summary-count');
  const savingsEl = document.getElementById('summary-savings');
  const finalEl = document.getElementById('summary-final');
  if (countEl) countEl.textContent = count;
  if (savingsEl) savingsEl.textContent = '-' + formatPrice(savings);
  if (finalEl) finalEl.textContent = formatPrice(subtotal);
}

function checkEmptyCart() {
  if (document.querySelectorAll('.cart-item').length === 0) {
    const cartLayout = document.querySelector('.cart-layout');
    if (cartLayout) {
      cartLayout.innerHTML = `
        <div class="empty-state" style="width:100%">
          <div class="empty-icon">🛒</div>
          <h2 class="empty-title">Корзина пуста</h2>
          <p class="empty-desc">Добавьте товары, чтобы оформить заказ</p>
          <a href="catalog.html" class="btn btn--primary">Перейти в каталог</a>
        </div>`;
    }
  }
}

function formatPrice(num) {
  return new Intl.NumberFormat('ru-RU').format(num) + ' ₽';
}

/* ===== Catalog Dropdown ===== */
function initCatalogDropdown() {
  const toggle = document.getElementById('catalogToggle');
  const dropdown = document.getElementById('catalogDropdown');
  const overlay = document.getElementById('catalogOverlay');
  if (!toggle || !dropdown) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
    overlay?.classList.toggle('open');
  });
  overlay?.addEventListener('click', () => {
    dropdown.classList.remove('open');
    overlay.classList.remove('open');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.classList.remove('open');
      overlay?.classList.remove('open');
    }
  });

  // Category hover to show subcategories
  const catItems = dropdown.querySelectorAll('.catalog-dropdown__cat-item');
  const subcatPanels = dropdown.querySelectorAll('.subcat-panel');
  catItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      catItems.forEach(c => c.classList.remove('active'));
      subcatPanels.forEach(p => p.style.display = 'none');
      item.classList.add('active');
      const panel = document.getElementById(item.dataset.subcats);
      if (panel) panel.style.display = 'grid';
    });
  });
}

/* ===== Product Gallery Swiper (Ozon-style) ===== */
function initGallery() {
  const mainEl = document.querySelector('.gallery-main-swiper');
  const thumbsEl = document.querySelector('.gallery-thumbs-swiper');
  if (!mainEl || !thumbsEl) return;

  const isMobile = window.innerWidth < 768;

  const prevBtn = document.querySelector('.thumbs-nav--prev');
  const nextBtn = document.querySelector('.thumbs-nav--next');

  const thumbsSwiper = new Swiper(thumbsEl, {
    direction: isMobile ? 'horizontal' : 'vertical',
    spaceBetween: 8,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
    navigation: (!isMobile && prevBtn && nextBtn) ? {
      prevEl: prevBtn,
      nextEl: nextBtn,
    } : false,
    on: {
      init: function() { updateThumbsNav(this); },
      resize: function() { updateThumbsNav(this); },
      slidesLengthChange: function() { updateThumbsNav(this); },
    },
  });

  // Sync thumbs column height to main image height
  function syncThumbsHeight() {
    const mainWrap = document.querySelector('.gallery-main-swiper-wrap');
    const thumbsWrap = document.querySelector('.gallery-thumbs-swiper-wrap');
    if (!mainWrap || !thumbsWrap || isMobile) return;
    const mainH = mainWrap.offsetHeight;
    thumbsWrap.style.height = mainH + 'px';
  }

  function updateThumbsNav(swiper) {
    if (!prevBtn || !nextBtn || isMobile) return;
    syncThumbsHeight();
    const wrapH = swiper.el.clientHeight;
    // Each thumb has 3:4 ratio; width=64px so height=64/0.75=85.33px + 8px gap
    const slideH = 85.33 + 8;
    const totalH = swiper.slides.length * slideH - 8;
    const needNav = totalH > wrapH;
    prevBtn.classList.toggle('visible', needNav);
    nextBtn.classList.toggle('visible', needNav);
  }

  // Also sync on window resize
  window.addEventListener('resize', syncThumbsHeight);
  requestAnimationFrame(syncThumbsHeight);

  const mainSwiper = new Swiper(mainEl, {
    spaceBetween: 0,
    navigation: {
      nextEl: '.gallery-main-swiper .swiper-button-next',
      prevEl: '.gallery-main-swiper .swiper-button-prev',
    },
    pagination: {
      el: '.gallery-pagination',
      clickable: true,
    },
    thumbs: {
      swiper: thumbsSwiper,
    },
  });
}

/* ===== Radio Options ===== */
function initRadioOptions() {
  document.querySelectorAll('.radio-group').forEach(group => {
    group.querySelectorAll('.radio-option').forEach(option => {
      option.addEventListener('click', () => {
        group.querySelectorAll('.radio-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        option.querySelector('input[type="radio"]').checked = true;
      });
    });
  });
}

/* ===== INN Validation ===== */
function initINNCheck() {
  const innInput = document.getElementById('companyINN');
  const innResult = document.getElementById('innResult');
  if (!innInput || !innResult) return;

  innInput.addEventListener('input', () => {
    const val = innInput.value.replace(/\D/g, '');
    innInput.value = val;
    if (val.length === 10 || val.length === 12) {
      innResult.className = 'inn-check valid';
      innResult.textContent = '✓ ИНН найден: ООО «' + (val.length === 10 ? 'Компания' : 'ИП Иванов') + '»';
    } else if (val.length > 0) {
      innResult.className = 'inn-check invalid';
      innResult.textContent = '✕ Введите 10 или 12 цифр ИНН';
    } else {
      innResult.textContent = '';
      innResult.className = 'inn-check';
    }
  });
}

/* ===== Phone mask ===== */
function initPhoneMask() {
  document.querySelectorAll('.phone-input').forEach(input => {
    input.addEventListener('input', () => {
      let val = input.value.replace(/\D/g, '');
      if (val.length > 10) val = val.substring(0, 10);
      let formatted = '';
      if (val.length > 0) formatted += '(' + val.substring(0, 3);
      if (val.length > 3) formatted += ') ' + val.substring(3, 6);
      if (val.length > 6) formatted += '-' + val.substring(6, 8);
      if (val.length > 8) formatted += '-' + val.substring(8, 10);
      input.value = formatted;
    });
  });
}

/* ===== Search ===== */
function initSearch() {
  document.querySelectorAll('.search-bar').forEach(bar => {
    const input = bar.querySelector('input');
    const btn = bar.querySelector('.search-btn');
    if (!input || !btn) return;
    const doSearch = () => {
      const q = input.value.trim();
      if (q) window.location.href = 'search.html?q=' + encodeURIComponent(q);
    };
    btn.addEventListener('click', doSearch);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') doSearch(); });
  });
}

/* ===== Mobile Menu ===== */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-inner');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('nav-open'));
}

/* ===== Card Hover Gallery (Ozon-style) ===== */
function initCardGallery() {
  document.querySelectorAll('.product-card__img-wrap[data-images]').forEach(wrap => {
    let images;
    try { images = JSON.parse(wrap.dataset.images); } catch(e) { return; }
    if (!images || images.length <= 1) return;

    // Create segment indicators bar
    const segments = document.createElement('div');
    segments.className = 'card-gallery__segments';
    images.forEach((_, i) => {
      const seg = document.createElement('div');
      seg.className = 'card-gallery__seg' + (i === 0 ? ' active' : '');
      segments.appendChild(seg);
    });
    wrap.appendChild(segments);

    const img = wrap.querySelector('.product-card__img');
    let currentIndex = 0;

    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const ratio = x / rect.width;
      const index = Math.min(Math.floor(ratio * images.length), images.length - 1);
      if (index !== currentIndex) {
        currentIndex = index;
        img.src = images[index];
        segments.querySelectorAll('.card-gallery__seg').forEach((s, i) => {
          s.classList.toggle('active', i === index);
        });
      }
    });

    wrap.addEventListener('mouseleave', () => {
      currentIndex = 0;
      img.src = images[0];
      segments.querySelectorAll('.card-gallery__seg').forEach((s, i) => {
        s.classList.toggle('active', i === 0);
      });
    });
  });
}

/* ===== Mobile Bottom Nav ===== */
function initMobileBottomNav() {
  const nav = document.querySelector('.mobile-bottom-nav');
  if (!nav) return;
  // Highlight active link based on current page
  const path = window.location.pathname.split('/').pop() || 'home.html';
  const links = nav.querySelectorAll('.mobile-bottom-nav__item');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && path === href) {
      link.classList.add('active');
    }
  });
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', () => {
  initBannerCarousel();
  initTabs();
  initAuthTabs();
  initQuantity();
  initCartRemove();
  initCatalogDropdown();
  initGallery();
  initRadioOptions();
  initINNCheck();
  initPhoneMask();
  initSearch();
  initMobileMenu();
  initCardGallery();
  initMobileBottomNav();
});
