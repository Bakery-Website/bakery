// ==============================================================
// FILE: QUẢN LÝ DANH MỤC & SPA
// ==============================================================

import { PRODUCTS, formatMoney } from './shop.js';
import { setActiveNavLink } from './navbar.js';
import { renderBreadcrumb, hideBreadcrumb } from './breadcrumb.js'; // <--- IMPORT MỚI

// Cache các khu vực hiển thị
const productGridArea = document.getElementById('product-grid-area');

// Các khối nội dung tĩnh cần ẩn/hiện
const staticBlocks = [
    document.getElementById('bread'),
    document.getElementById('pastry'),
    document.getElementById('cake'),
    document.getElementById('story')
];

// Hàm Chính: Tải nội dung 1 danh mục (Bread, Cake...)
export function loadCategory(category) {
    
    renderBreadcrumb(category); // <--- GỌI HÀM TỪ FILE BREADCRUMB.JS
    
    setActiveNavLink(true); 

    // Ẩn tất cả khối tĩnh
    staticBlocks.forEach(b => b && b.classList.add('hidden'));
    
    // Hiện khu vực lưới sản phẩm
    if (productGridArea) productGridArea.classList.remove('hidden');

    // Highlight icon 5 món
    document.querySelectorAll('.list a').forEach(link => {
        const catClass = link.classList[0]; 
        const catName = catClass.charAt(0).toUpperCase() + catClass.slice(1);
        link.classList.toggle('category-active', catName === category);
    });

    // Lọc và Vẽ sản phẩm
    const filtered = PRODUCTS.filter(p => p.category === category);
    
    const gridHtml = filtered.map(p => `
        <div class="product-card" data-id="${p.id}">
            <div class="product-image-container">
                <img src="${p.image}" alt="${p.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-name">${p.name}</h3>
                <p class="product-price">${formatMoney(p.price)}</p>
                <button class="btn btn-add-to-cart">ADD TO CART <img src="images/menu/cart.png"></button>
            </div>
        </div>
    `).join('');

    if (productGridArea) {
        productGridArea.innerHTML = `
            <section class="product-listing my-overlock">
                <div class="product-grid">${gridHtml}</div>
            </section>`;
    }
}

// Hàm Reset về trang chủ SPA
export function loadHomePage() {
    
    hideBreadcrumb(); // <--- GỌI HÀM ẨN BREADCRUMB
    
    setActiveNavLink(false);

    staticBlocks.forEach(b => b && b.classList.remove('hidden'));
    if (productGridArea) productGridArea.classList.add('hidden');
    document.querySelectorAll('.list a').forEach(l => l.classList.remove('category-active'));
}

export function initCategoryEvents() {
    document.querySelectorAll('.list a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const catClass = link.classList[0];
            const catName = catClass.charAt(0).toUpperCase() + catClass.slice(1);
            loadCategory(catName);
        });
    });

    const buttons = [
        { sel: '.btn.bread-link', cat: 'Bread' },
        { sel: '.btn.pastry-link', cat: 'Pastry' },
        { sel: '.btn.cake-link', cat: 'Cake' }
    ];
    
    buttons.forEach(btn => {
        const el = document.querySelector(btn.sel);
        if (el) {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                loadCategory(btn.cat);
                const bar = document.querySelector('.category-bar');
                if (bar) bar.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    });
}