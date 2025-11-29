// js/breadcrumb.js
// ==============================================================
// FILE: BREADCRUMB (THANH ĐIỀU HƯỚNG)
// ==============================================================

// Import loadHomePage để khi bấm vào chữ "Menu" thì quay về
// (Lưu ý: Import vòng tròn này được JS hỗ trợ tốt với hàm)
import { loadHomePage } from './category.js'; 

const breadcrumbBar = document.getElementById('breadcrumbBar');
const breadcrumbContent = document.querySelector('#breadcrumbBar .breadcrumb-content');

export function renderBreadcrumb(category) {
    // 1. Tạo HTML
    const html = `
        <nav class="breadcrumb">
            <ul>
                <li><a href="index.html">Home</a></li> 
                <li><a href="#" id="br-menu-link">Menu</a></li> 
                <li>${category}</li>
            </ul>
        </nav>`;
    
    // 2. Gán vào DOM
    if (breadcrumbContent) breadcrumbContent.innerHTML = html;
    
    // 3. Hiển thị thanh Breadcrumb (xóa class hidden)
    if (breadcrumbBar) breadcrumbBar.classList.remove('hidden');

    // 4. Gán sự kiện cho link "Menu" vừa sinh ra
    const menuLink = document.getElementById('br-menu-link');
    if (menuLink) {
        menuLink.addEventListener('click', (e) => {
            e.preventDefault();
            loadHomePage(); // Gọi hàm quay về trang chủ
        });
    }
}

export function hideBreadcrumb() {
    if (breadcrumbBar) breadcrumbBar.classList.add('hidden');
}