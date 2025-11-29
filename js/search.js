// search.js
// ==============================================================
// FILE: THANH TÌM KIẾM
// ==============================================================

export function initSearch() {
    // Tìm các thành phần của thanh search
    const searchWrapper = document.querySelector('.search .search-bar-wrapper');
    const searchInput = searchWrapper ? searchWrapper.querySelector('.search-input') : null;
    const searchIconBtn = searchWrapper ? searchWrapper.querySelector('.search-toggle-btn') : null;

    // Chỉ chạy khi tìm thấy đủ bộ phận
    if (searchWrapper && searchInput && searchIconBtn) {
        
        // Sự kiện click icon kính lúp
        searchIconBtn.addEventListener('click', function (e) {
            e.preventDefault();
            // Toggle class 'active' để kích hoạt CSS mở rộng ô input
            const isActive = searchWrapper.classList.toggle('active');
            
            // Nếu vừa mở ra, tự động focus con trỏ vào ô nhập liệu sau 400ms (chờ hiệu ứng chạy xong)
            if (isActive) {
                setTimeout(() => searchInput.focus(), 400);
            }
        });

        // Xử lý "Click Outside": Bấm ra ngoài thì đóng thanh search
        document.addEventListener('click', function (e) {
            // Nếu click KHÔNG nằm trong searchWrapper VÀ searchWrapper đang mở
            if (!searchWrapper.contains(e.target) && searchWrapper.classList.contains('active')) {
                searchWrapper.classList.remove('active');
            }
        });
    }
}