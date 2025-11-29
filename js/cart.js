// cart.js
// ==============================================================
// FILE: LOGIC GIỎ HÀNG (CORE)
// ==============================================================

import { cart, PRODUCTS, formatMoney } from './shop.js'; // Lấy dữ liệu từ kho

// Cache DOM Elements
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartBody = document.querySelector('.cart-sidebar .cart-body');
const cartTotalPriceEl = document.getElementById('cartTotalPrice');
const cartItemCountEl = document.querySelector('.cart-item-count');

// -----------------------------------------------------------
// A. CÁC HÀM XỬ LÝ DỮ LIỆU & RENDER (HIỂN THỊ)
// -----------------------------------------------------------

// Hàm Master: Cập nhật toàn bộ giao diện giỏ hàng
export function updateCart() {
    renderCartItems();
    renderCartTotal();
    updateCartCount();
}

// Vẽ danh sách item ra HTML
function renderCartItems() {
    if (cart.length === 0) {
        cartBody.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    // Dùng .map() để biến mảng dữ liệu thành mảng chuỗi HTML
    cartBody.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <div class="cart-item-controls">
                    <button class="btn-qty-decrease"><img src="images/menu/minus.png" alt="-"></button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="btn-qty-increase"><img src="images/menu/plus.png" alt="+"></button>
                    <button class="cart-item-remove"><img src="images/menu/trash.png" alt="X"></button>
                </div>
            </div>
            <div class="cart-item-price-total">${formatMoney(item.price * item.quantity)}</div>
        </div>
    `).join('');
}

// Tính tổng tiền
function renderCartTotal() {
    // Dùng .reduce() tính tổng: Tổng = Cũ + (Giá * Số lượng)
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPriceEl.textContent = formatMoney(total);
}

// Cập nhật số đỏ đỏ trên icon giỏ hàng
export function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItemCountEl.textContent = totalCount;
    // Toggle class 'visible': Nếu > 0 thì thêm class, ngược lại xóa class
    cartItemCountEl.classList.toggle('visible', totalCount > 0);
}

// -----------------------------------------------------------
// B. CÁC HÀM THAO TÁC DỮ LIỆU (ACTIONS)
// -----------------------------------------------------------

export function addToCart(productId) {
    // Tìm xem sản phẩm đã có chưa
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++; // Có rồi thì tăng số lượng
    } else {
        // Chưa có thì lấy thông tin từ kho PRODUCTS và thêm vào giỏ
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
            // Tạo object mới, copy dữ liệu product và thêm quantity: 1
            cart.push({ ...product, quantity: 1 });
        }
    }
    updateCart(); // Vẽ lại giao diện
    openCart();   // Tự động mở giỏ hàng cho khách thấy
}

export function removeFromCart(productId) {
    // Tìm vị trí của item cần xóa
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart.splice(index, 1); // Xóa khỏi mảng gốc
    }
    updateCart();
}

export function updateQuantity(productId, newQty) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    
    if (newQty <= 0) {
        removeFromCart(productId); // Nếu giảm về 0 thì xóa luôn
    } else {
        item.quantity = newQty;
        updateCart();
    }
}

// -----------------------------------------------------------
// C. QUẢN LÝ SỰ KIỆN & UI MỞ/ĐÓNG
// -----------------------------------------------------------

export function openCart() {
    if (cartSidebar) cartSidebar.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
}

export function closeCart() {
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
}

// Hàm khởi tạo lắng nghe sự kiện (Được gọi từ main.js)
export function initCart() {
    // 1. Nút mở/đóng bên ngoài
    const toggleBtn = document.getElementById('cartToggleBtn');
    const closeBtn = document.getElementById('cartCloseBtn');
    
    if (toggleBtn) toggleBtn.addEventListener('click', openCart);
    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // 2. Sự kiện BÊN TRONG giỏ hàng (Quan trọng: Event Delegation)
    // Thay vì gán click cho hàng trăm nút +/-, ta gán cho cha 'cartSidebar'
    if (cartSidebar) {
        cartSidebar.addEventListener('click', (e) => {
            // Kiểm tra xem người dùng click vào nút nào
            const btnRemove = e.target.closest('.cart-item-remove');
            const btnInc = e.target.closest('.btn-qty-increase');
            const btnDec = e.target.closest('.btn-qty-decrease');
            
            // Tìm item cha chứa nút đó để lấy ID
            const itemEl = e.target.closest('.cart-item');
            if (!itemEl) return; // Bấm linh tinh thì bỏ qua
            
            const id = itemEl.dataset.id;
            const item = cart.find(i => i.id === id);

            if (btnRemove) removeFromCart(id);
            else if (btnInc) updateQuantity(id, item.quantity + 1);
            else if (btnDec) updateQuantity(id, item.quantity - 1);
        });
    }
    
    // Khởi tạo hiển thị số lượng ban đầu (thường là 0)
    updateCartCount();
}