// =================================================================
// TỔNG CHỈ HUY: FILE NÀY KẾT NỐI MỌI THỨ CHO TRANG MENU
// =================================================================

// 1. IMPORT CÁC MODULE (CÁC CÔNG CỤ ĐÃ TÁCH)
import { fetchProducts } from './products.js';       // Tải dữ liệu
import { initHamburger } from './hamburger.js';      // Menu mobile
import { initStickyHeader } from './stickyheader.js';// Header dính
import { initSearch } from './search.js';            // Tìm kiếm
import { initNavbar } from './navbar.js';            // Active link menu
import { initCart, addToCart } from './cart.js';     // Giỏ hàng
import { initCategoryEvents, loadCategory, loadHomePage } from './category.js'; // SPA Logic & Breadcrumb
import { initScrollTop } from './scroll.js';      // Nút scroll to top

// 2. KHỞI CHẠY KHI TRANG HTML ĐÃ LOAD XONG
document.addEventListener('DOMContentLoaded', async () => {

    // --- A. TẢI DỮ LIỆU (QUAN TRỌNG NHẤT) ---
    // Phải chờ (await) tải xong dữ liệu bánh kẹo thì mới làm việc khác được
    const isLoaded = await fetchProducts();
    
    if (!isLoaded) {
        console.error("Lỗi: Không tải được dữ liệu sản phẩm.");
        return; // Dừng chương trình nếu không có dữ liệu
    }

    // --- B. KHỞI TẠO GIAO DIỆN (UI) ---
    initHamburger();      // Kích hoạt nút 3 sọc
    initStickyHeader();   // Kích hoạt cuộn header
    initSearch();         // Kích hoạt thanh tìm kiếm
    initNavbar();         // Xử lý link menu active
    initScrollTop();      // Kích hoạt nút scroll
    
    // --- C. KHỞI TẠO LOGIC NGHIỆP VỤ ---
    initCart();           // Kích hoạt logic giỏ hàng (nút +/-, xóa...)
    initCategoryEvents(); // Kích hoạt sự kiện click vào 5 icon tròn và nút "Discover"

    // --- D. XỬ LÝ SỰ KIỆN "THÊM VÀO GIỎ" (CHO SẢN PHẨM ĐỘNG) ---
    // Vì sản phẩm được sinh ra bằng JS (SPA), ta phải bắt sự kiện từ thằng cha (product-grid-area)
    const gridArea = document.getElementById('product-grid-area');
    if (gridArea) {
        gridArea.addEventListener('click', (e) => {
            // Tìm xem người dùng có click vào nút "Add to Cart" (hoặc icon bên trong nó) không
            const btn = e.target.closest('.btn-add-to-cart');
            
            if (btn) {
                // Nếu đúng, tìm thẻ sản phẩm cha để lấy ID
                const card = e.target.closest('.product-card');
                if (card) {
                    const productId = card.dataset.id;
                    addToCart(productId); // Gọi hàm thêm vào giỏ từ cart.js
                }
            }
        });
    }

    // --- E. KIỂM TRA URL (ĐỂ GIỮ TRẠNG THÁI KHI RELOAD) ---
    // Ví dụ: Người dùng vào link "menu.html?category=Bread"
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category'); // Lấy chữ 'Bread'

    if (categoryParam) {
        // Nếu có tham số trên URL -> Tải đúng danh mục đó (SPA mode)
        loadCategory(categoryParam);
    } else {
        // Nếu không có -> Tải giao diện trang chủ Menu mặc định
        loadHomePage();
    }

});