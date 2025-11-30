// js/aboutus.js
// =========================================================
// ENTRY POINT CHO TRANG ABOUT US
// Chỉ nạp các hiệu ứng giao diện (Menu & Header)
// =========================================================

// 1. Import đúng 2 món bạn cần
import { initHamburger } from './hamburger.js';
import { initStickyHeader } from './stickyheader.js';
import { initScrollReveal } from './scrollReveal.js';
import { initScrollTop } from './scroll.js';

// 2. Khởi chạy khi web tải xong
document.addEventListener('DOMContentLoaded', () => {
    
    initHamburger();    // Kích hoạt menu 3 sọc mobile
    initStickyHeader(); // Kích hoạt header dính khi cuộn
    initScrollReveal(); // Kích hoạt hiệu ứng scroll mới thêm của bạn 2 yêu cầu
    initScrollTop();    // Kích hoạt nút scroll

});