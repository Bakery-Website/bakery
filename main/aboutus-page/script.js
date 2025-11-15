// =======================================================
// PHẦN 1: CACHING CÁC THAM CHIẾU DOM (DOM REFERENCES)
// =======================================================
// Lưu trữ các phần tử DOM vào biến để tăng hiệu suất.
// Thay vì tìm kiếm (query) DOM mỗi lần cần, chúng ta chỉ tìm 1 lần lúc tải trang.

// --- Navigation & Menu ---
// 'querySelectorAll' tìm TẤT CẢ phần tử khớp, trả về một NodeList.
const navLinks = document.querySelectorAll('.primary .nav-links li a');
// Tìm link "Menu" bằng cách kết hợp CSS selector (tìm thẻ <a> có href chứa "menu-page").
const menuLink = document.querySelector('.primary .nav-links li a[href*="menu-page"]'); 
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');
const hamburgerButton = document.getElementById('hamburger');


// =======================================================
// PHẦN 2: ĐỊNH NGHĨA CÁC HÀM XỬ LÝ
// =======================================================
// Định nghĩa các hàm (functions) để tái sử dụng logic.

// --- SIDE MENU ---

/**
 * Hiển thị side menu và lớp phủ (overlay).
 */
function openMenu() {
    // 'if (sideMenu)' kiểm tra xem biến có tồn tại (khác null) không trước khi sử dụng.
    if (sideMenu) sideMenu.classList.add('show'); // Thêm class 'show' để CSS hiển thị menu
    if (overlay) overlay.classList.add('active'); // Thêm class 'active' để CSS hiển thị lớp mờ
    if (hamburgerButton) hamburgerButton.style.opacity = '0'; // Ẩn nút 3 sọc
}

/**
 * Ẩn side menu và lớp phủ (overlay).
 */
function closeMenu() {
    if (sideMenu) sideMenu.classList.remove('show'); // Xóa class 'show' để ẩn menu
    if (overlay) overlay.classList.remove('active'); // Xóa class 'active' để ẩn lớp mờ
    if (hamburgerButton) hamburgerButton.style.opacity = '1'; // Hiện lại nút 3 sọc
}

// --- SPA (SINGLE PAGE APPLICATION) ---

/**
 * Cập nhật và hiển thị thanh breadcrumb.
 * @param {string} category - Tên category (Bread, Cake, ...)
 */
function renderBreadcrumb(category) {
    // Sử dụng template literals (dấu `) để chèn biến ${category} vào chuỗi HTML.
    const breadcrumbHtml = `
        <nav class="breadcrumb">
            <ul>
                <li><a href="../home-page/index.html">Home</a></li> 
                <li><a href="javascript:void(0)" onclick="loadHomePage()">Menu</a></li> 
                <li>${category}</li>
            </ul>
        </nav>
    `; 
    
    // Ghi đè nội dung HTML của phần tử breadcrumbContent.
    if (breadcrumbContent) breadcrumbContent.innerHTML = breadcrumbHtml;
    // Hiển thị thanh breadcrumb.
    if (breadcrumbBar) breadcrumbBar.classList.remove('hidden'); 
    
    // Xóa gạch chân 'active-page' khỏi tất cả link nav.
    navLinks.forEach(a => a.classList.remove('active-page'));
    // Thêm gạch chân 'active-page' cho link "Menu".
    if (menuLink) menuLink.classList.add('active-page'); 
}

/**
 * Tải và hiển thị nội dung cho một category sản phẩm cụ thể.
 * @param {string} category - Tên category (Bread, Cake, ...)
 */
function loadCategory(category) {
    // 1. Gọi hàm để tạo breadcrumb
    renderBreadcrumb(category);

    // 2. Ẩn tất cả các khối nội dung tĩnh của trang chủ
    if (breadBlock) breadBlock.classList.add('hidden');
    if (pastryBlock) pastryBlock.classList.add('hidden');
    if (cakeBlock) cakeBlock.classList.add('hidden');
    if (storyBlock) storyBlock.classList.add('hidden');
    if (bannerBlock) bannerBlock.classList.add('hidden');
    
    // 3. Hiển thị khu vực (trống) sẽ chứa sản phẩm
    if (productGridArea) productGridArea.classList.remove('hidden');

    // 4. Cập nhật trạng thái 'active' cho thanh category (hiệu ứng phóng to)
    const categoryLinks = document.querySelectorAll('.list a');
    categoryLinks.forEach(link => {
        // Lấy class đầu tiên (vd: 'bread')
        const rawCategory = link.classList[0]; 
        // Chuyển 'bread' thành 'Bread'
        const linkCategory = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);
        
        // Xóa 'category-active' (trạng thái phóng to) khỏi tất cả
        link.classList.remove('category-active');
        // Chỉ thêm 'category-active' cho link được click
        if (linkCategory === category) {
            link.classList.add('category-active');
        }
    });

    // 5. Lọc mảng 'PRODUCTS' để chỉ lấy sản phẩm thuộc category này
    const filteredProducts = PRODUCTS.filter(p => p.category === category);
    
    // Tạo HTML (mẫu) cho danh sách sản phẩm
    let contentHtml = `
        <section class="product-listing" style="min-height: 500px; padding: 40px; background-color: #FBF3E3;">
            <h2 class="category-title my-overlock" style="font-size: 35px; color: #4C5332; margin-bottom: 30px;">
                ${category} Collection
            </h2>
            <p style="font-family: 'Overlock', cursive; font-size: 18px;">
                Đã tải danh mục <strong>${category}</strong>. Số sản phẩm tìm thấy: ${filteredProducts.length}.
            </p>
        </section>
    `;
    
    // Đưa HTML vừa tạo vào khu vực sản phẩm
    if (productGridArea) productGridArea.innerHTML = contentHtml;
}

/**
 * Tải (reset) lại nội dung trang chủ SPA (gồm các khối story).
 */
function loadHomePage() {
    // 1. Ẩn breadcrumb (vì đang ở trang chủ, không cần)
    if (breadcrumbBar) breadcrumbBar.classList.add('hidden');

    // 2. Hiển thị lại các khối nội dung tĩnh
    if (breadBlock) breadBlock.classList.remove('hidden');
    if (pastryBlock) pastryBlock.classList.remove('hidden');
    if (cakeBlock) cakeBlock.classList.remove('hidden');
    if (storyBlock) storyBlock.classList.remove('hidden');
    if (bannerBlock) bannerBlock.classList.remove('hidden');
    
    // 3. Ẩn khu vực sản phẩm (vì đang ở trang chủ)
    if (productGridArea) productGridArea.classList.add('hidden');
    
    // 4. Reset trạng thái 'active' của thanh category
    document.querySelectorAll('.list a').forEach(link => {
        link.classList.remove('category-active');
    });

    // 5. Đặt trạng thái 'active' cho link "Menu" trên header chính
    navLinks.forEach(a => a.classList.remove('active-page'));
    if (menuLink) menuLink.classList.add('active-page'); 
}


// =======================================================
// PHẦN 3: KHỞI TẠO CÁC TRÌNH LẮNG NGHE SỰ KIỆN
// =======================================================
// Gán các hàm xử lý cho sự kiện (click, scroll) sau khi DOM đã tải xong.

// 'DOMContentLoaded' là sự kiện bắn ra khi HTML đã được tải và phân tích xong.
// Code bên trong chỉ chạy sau khi trang đã sẵn sàng.
document.addEventListener('DOMContentLoaded', () => {
    
    // --- I. SỰ KIỆN SIDE MENU ---
    const closeButton = document.getElementById('closeBtn'); // Cache nút đóng
    // Gán hàm 'openMenu' cho sự kiện 'click' của nút 3 sọc
    if (hamburgerButton) hamburgerButton.addEventListener('click', openMenu);
    // Gán hàm 'closeMenu' cho sự kiện 'click' của nút X
    if (closeButton) closeButton.addEventListener('click', closeMenu);
    // Gán hàm 'closeMenu' cho sự kiện 'click' của lớp phủ
    if (overlay) overlay.addEventListener('click', closeMenu); 

    
    // --- II. SỰ KIỆN STICKY HEADER ---
    const stickyHeader = document.getElementById('sticky-header'); // Cache header
    if (stickyHeader) {
        // Gán sự kiện 'scroll' cho cửa sổ (window)
        window.addEventListener('scroll', function() {
            const scrollThreshold = 100; // Ngưỡng cuộn (px)
            // 'window.pageYOffset' là vị trí cuộn dọc hiện tại
            if (window.pageYOffset > scrollThreshold) {
                // Nếu đã cuộn qua 100px
                stickyHeader.classList.add('visible'); // Hiện header
                stickyHeader.classList.remove('hidden');
            } else {
                // Nếu cuộn ngược lại (gần đầu trang)
                stickyHeader.classList.add('hidden'); // Ẩn header
                stickyHeader.classList.remove('visible');
                closeMenu(); // Tự động đóng side menu
            }
        });
    }
    

    
    // --- III. SỰ KIỆN ĐIỀU HƯỚNG SPA ---
     // 1. Gán sự kiện cho link "About Us" (Header chính)
    // Lặp qua các link trong nav chính
 
    // 2. Khởi chạy trang (Hiển thị nội dung trang chủ SPA khi tải)
    // Đây là hàm chạy đầu tiên, thiết lập trạng thái ban đầu của trang.
    loadHomePage();
});