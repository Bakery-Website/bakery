// js/scroll.js
// =========================================================
// MODULE: NÚT CUỘN LÊN ĐẦU TRANG
// =========================================================

export function initScrollTop() {
    const btn = document.getElementById('scrollToTopBtn');

    // Nếu không tìm thấy nút trong HTML thì dừng
    if (!btn) return;

    // 1. Xử lý sự kiện cuộn (Hiện/Ẩn nút)
    window.addEventListener('scroll', () => {
        // Nếu cuộn xuống quá 300px thì hiện nút
        if (window.pageYOffset > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    // 2. Xử lý sự kiện click (Cuộn mượt lên trên)
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Cuộn từ từ rất đẹp
        });
    });
}