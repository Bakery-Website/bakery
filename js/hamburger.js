// ==============================================================
// FILE: MENU MOBILE (HAMBURGER)
// ==============================================================

export function initHamburger() {
    // Cache các phần tử DOM liên quan
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');
    const hamburgerButton = document.getElementById('hamburger');
    const closeButton = document.getElementById('closeBtn');

    // Hàm mở menu: Thêm class CSS để hiện menu và ẩn nút 3 sọc
    function openMenu() {
        if (sideMenu) sideMenu.classList.add('show');
        if (overlay) overlay.classList.add('active');
        if (hamburgerButton) hamburgerButton.style.opacity = '0';
    }

    // Hàm đóng menu: Gỡ class CSS và hiện lại nút 3 sọc
    function closeMenu() {
        if (sideMenu) sideMenu.classList.remove('show');
        if (overlay) overlay.classList.remove('active');
        if (hamburgerButton) hamburgerButton.style.opacity = '1';
    }

    // Gán sự kiện click (chỉ gán nếu phần tử tồn tại)
    if (hamburgerButton) hamburgerButton.addEventListener('click', openMenu);
    if (closeButton) closeButton.addEventListener('click', closeMenu);
    
    // Click vào vùng tối (overlay) cũng đóng menu
    if (overlay) overlay.addEventListener('click', closeMenu);
}