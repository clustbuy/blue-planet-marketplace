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
  
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });
  
  setInterval(() => {
    showSlide((current + 1) % slides.length);
  }, 4000);
}

/* ===== Tabs ===== */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  if (!tabBtns.length) return;
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
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
    
    minusBtn.addEventListener('click', () => {
      let val = parseInt(valEl.textContent) || 1;
      if (val > 1) valEl.textContent = val - 1;
      updateCartTotal();
    });
    
    plusBtn.addEventListener('click', () => {
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
  let subtotal = 0;
  let oldTotal = 0;
  let count = 0;
  
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
  const totalPriceEl = document.getElementById('summary-total-price');
  const oldPriceEl = document.getElementById('summary-old-price');
  const savingsEl = document.getElementById('summary-savings');
  const finalEl = document.getElementById('summary-final');
  
  if (countEl) countEl.textContent = count;
  if (totalPriceEl) totalPriceEl.textContent = formatPrice(oldTotal);
  if (savingsEl) savingsEl.textContent = '-' + formatPrice(savings);
  if (finalEl) finalEl.textContent = formatPrice(subtotal);
}

function checkEmptyCart() {
  const items = document.querySelectorAll('.cart-item');
  if (items.length === 0) {
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

/* ===== Format Price ===== */
function formatPrice(num) {
  return new Intl.NumberFormat('ru-RU').format(num) + ' ₽';
}

/* ===== Mobile Menu ===== */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-inner');
  if (!toggle || !nav) return;
  
  toggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
  });
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', () => {
  initBannerCarousel();
  initTabs();
  initQuantity();
  initCartRemove();
  initMobileMenu();
});
