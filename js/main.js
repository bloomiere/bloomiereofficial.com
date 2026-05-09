/* ================================================
   BLOOMIÈRE — main.js
   All site interactivity
   ================================================ */

// ---- CART STATE ----
let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartBadge();
  openCart();
  renderCart();
}

function updateCartBadge() {
  document.getElementById('cartBadge').textContent = cart.length;
}

function renderCart() {
  const body = document.querySelector('.cart-drawer__body');
  if (cart.length === 0) {
    body.innerHTML = '<p class="cart-empty">DEIN WARENKORB IST LEER</p>';
    return;
  }
  const total = cart.reduce((s, i) => s + i.price, 0);
  body.innerHTML = `
    <div style="padding:24px 30px;width:100%">
      ${cart.map((item, i) => `
        <div style="display:flex;justify-content:space-between;padding:14px 0;border-bottom:1px solid #e5e0db;font-size:0.78rem;letter-spacing:0.06em">
          <span>${item.name}</span>
          <span>€${item.price.toFixed(2)}</span>
        </div>`).join('')}
      <div style="display:flex;justify-content:space-between;padding:20px 0;font-size:0.78rem;font-weight:400;letter-spacing:0.08em">
        <span>TOTAL</span><span>€${total.toFixed(2)}</span>
      </div>
      <button class="btn btn--black full-width" style="margin-top:8px">CHECKOUT</button>
    </div>`;
}

// ---- CART OPEN/CLOSE ----
function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('overlay').classList.add('active');
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
}

document.getElementById('cartBtn').addEventListener('click', () => {
  openCart();
  renderCart();
});
document.getElementById('cartClose').addEventListener('click', closeCart);

// ---- SEARCH OPEN/CLOSE ----
document.getElementById('searchBtn').addEventListener('click', () => {
  document.getElementById('searchOverlay').classList.add('open');
  document.querySelector('.search-input').focus();
});
document.getElementById('searchClose').addEventListener('click', () => {
  document.getElementById('searchOverlay').classList.remove('open');
});

// ---- OVERLAY CLICK ----
document.getElementById('overlay').addEventListener('click', () => {
  closeCart();
});

// ---- HEADER SCROLL ----
window.addEventListener('scroll', () => {
  const h = document.getElementById('header');
  if (window.scrollY > 20) h.classList.add('scrolled');
  else h.classList.remove('scrolled');
}, { passive: true });

// ---- HERO SLIDESHOW ----
const slides = document.querySelectorAll('.hero__slide');
let currentSlide = 0;
function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}
document.getElementById('heroNext')?.addEventListener('click', nextSlide);
setInterval(nextSlide, 5000);

// ---- PRODUCTS ----
const products = [
  { name: 'PRODUKT', price: 49.99, rating: 4.5, badge: 'NEW',
    svg: `<svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="#aaa" stroke-width="1.2"><rect x="30" y="40" width="100" height="130" rx="6"/><line x1="50" y1="40" x2="40" y2="18"/><line x1="110" y1="40" x2="120" y2="18"/><line x1="40" y1="18" x2="120" y2="18"/><rect x="55" y="70" width="50" height="6" rx="2"/><rect x="60" y="100" width="40" height="40" rx="3"/><circle cx="80" cy="122" r="10"/></g></svg>` },
  { name: 'PRODUKT', price: 49.99, rating: 4.5, badge: null,
    svg: `<svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="#aaa" stroke-width="1.2"><ellipse cx="80" cy="90" rx="65" ry="40"/><path d="M30 70 Q80 30 130 70"/><rect x="25" y="85" width="110" height="30" rx="4"/><circle cx="55" cy="100" r="12"/><circle cx="105" cy="100" r="12"/><line x1="130" y1="80" x2="170" y2="60"/></g></svg>` },
  { name: 'PRODUKT', price: 49.99, rating: 4.5, badge: null,
    svg: `<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="#aaa" stroke-width="1.2"><ellipse cx="60" cy="60" rx="50" ry="30"/><ellipse cx="60" cy="60" rx="38" ry="22"/><rect x="13" y="45" width="95" height="30" rx="15"/><ellipse cx="150" cy="60" rx="40" ry="25"/><ellipse cx="150" cy="60" rx="30" ry="18"/></g></svg>` },
  { name: 'PRODUKT', price: 49.99, rating: 4.5, badge: 'SALE',
    svg: `<svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="#aaa" stroke-width="1.2"><rect x="30" y="30" width="100" height="100" rx="4"/><path d="M30 50 Q80 20 130 50"/><rect x="50" y="50" width="60" height="4" rx="2"/><rect x="50" y="70" width="40" height="4" rx="2"/><circle cx="80" cy="100" r="15"/></g></svg>` },
];

const grid = document.getElementById('productsGrid');
if (grid) {
  grid.innerHTML = products.map(p => `
    <div class="product-card" onclick="addToCart('${p.name}', ${p.price})">
      <div class="product-card__img">
        ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
        ${p.svg}
      </div>
      <p class="product-card__name">${p.name}</p>
      <p class="product-card__price">€${p.price.toFixed(2)}</p>
      <p class="product-card__stars">★★★★☆ (${p.rating})</p>
      <button class="btn btn--black product-card__add">ADD TO CART</button>
    </div>`).join('');
}

// ---- COUNTDOWN TIMER ----
// Set your sale end date here:
const saleEnd = new Date(Date.now() + 99 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000 + 50 * 60 * 1000);

function updateCountdown() {
  const now = new Date();
  const diff = Math.max(0, saleEnd - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = n => String(n).padStart(2, '0');
  const dEl = document.getElementById('days');
  const hEl = document.getElementById('hours');
  const mEl = document.getElementById('minutes');
  const sEl = document.getElementById('seconds');
  if (dEl) dEl.textContent = pad(d);
  if (hEl) hEl.textContent = pad(h);
  if (mEl) mEl.textContent = pad(m);
  if (sEl) sEl.textContent = pad(s);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ---- ESCAPE KEY CLOSES EVERYTHING ----
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCart();
    document.getElementById('searchOverlay')?.classList.remove('open');
  }
});

console.log('%cBLOMIÈRE', 'font-size:24px;font-weight:300;letter-spacing:8px;color:#1a1a1a;');
console.log('%cWebsite coded from scratch. Ready for GitHub Pages.', 'color:#888;font-size:12px');
