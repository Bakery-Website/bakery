// ==============================================================
// FILE: ĐIỀU HƯỚNG CHÍNH (NAVBAR)
// ==============================================================

import { loadHomePage } from './category.js'; // Import hàm reset trang chủ

export function initNavbar() {
    const navLinks = document.querySelectorAll('.primary .nav-links li a');
    
    // Tìm và xử lý link "Menu" đặc biệt
    navLinks.forEach(link => {
        if (link.textContent.trim() === 'Menu' && link.href.includes('menu-page')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                loadHomePage(); // Khi bấm Menu -> Reset về giao diện gốc SPA
            });
        }
    });
}

/**
 * Hàm helper để gạch chân (active) link Menu
 * Được gọi từ file category.js khi người dùng chọn danh mục
 */
export function setActiveNavLink(isMenuPage) {
    const navLinks = document.querySelectorAll('.primary .nav-links li a');
    const menuLink = document.querySelector('.primary .nav-links li a[href*="menu-page"]');
    
    // Xóa active cũ
    navLinks.forEach(a => a.classList.remove('active-page'));
    
    // Nếu đang ở trang Menu con (SPA), thêm active cho link Menu
    if (isMenuPage && menuLink) {
        menuLink.classList.add('active-page');
    }
}