// ==============================================================
// FILE: HIỆU ỨNG HEADER DÍNH
// ==============================================================

export function initStickyHeader() {
    const stickyHeader = document.getElementById('sticky-header');
    
    // Nếu trang không có sticky header thì dừng luôn, tránh lỗi
    if (!stickyHeader) return;

    // Lắng nghe sự kiện cuộn chuột (scroll) của cửa sổ
    window.addEventListener('scroll', function () {
        const scrollThreshold = 100; // Khoảng cách cuộn (px) để kích hoạt
        
        if (window.pageYOffset > scrollThreshold) {
            // Đã cuộn xuống -> Hiện header
            stickyHeader.classList.add('visible');
            stickyHeader.classList.remove('hidden');
        } else {
            // Đã cuộn lên đầu trang -> Ẩn header
            stickyHeader.classList.add('hidden');
            stickyHeader.classList.remove('visible');
            
            // Tiện tay đóng luôn menu mobile nếu đang mở (Logic phụ trợ)
            const sideMenu = document.getElementById('sideMenu');
            if (sideMenu && sideMenu.classList.contains('show')) {
                // Gọi trực tiếp DOM để đóng cho nhanh gọn
                sideMenu.classList.remove('show');
                document.getElementById('overlay').classList.remove('active');
                document.getElementById('hamburger').style.opacity = '1';
            }
        }
    });
}