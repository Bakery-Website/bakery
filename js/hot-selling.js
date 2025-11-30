// --- 1. KHỞI TẠO CÁC BIẾN CẦN THIẾT ---
const track = document.getElementById('track'); // Thanh trượt chứa các bánh
const items = document.querySelectorAll('.slider-item'); // Danh sách các bánh
const prevBtn = document.getElementById('prevBtn'); // Nút lùi
const nextBtn = document.getElementById('nextBtn'); // Nút tiến
const dotsContainer = document.getElementById('dotsContainer'); // Chỗ chứa dấu chấm

let currentIndex = 0; // Đang xem ở vị trí số mấy (Bắt đầu là 0)
let itemsPerView = 1; // Mặc định hiển thị 1 bánh (sẽ thay đổi theo màn hình)
let gap = 20;         // Khoảng cách giữa các bánh (pixel)
let autoPlayInterval; // Biến để lưu đồng hồ tự động chạy

// --- 2. HÀM XỬ LÝ RESPONSIVE (CO GIÃN MÀN HÌNH) ---
function updateResponsiveMetrics() {
    const width = window.innerWidth;
    
    // Kiểm tra độ rộng màn hình để set số lượng bánh hiển thị
    if (width >= 1024) {
        itemsPerView = 3; // Desktop: Hiện 3 bánh
        gap = 30;
    } else if (width >= 768) {
        itemsPerView = 2; // Tablet: Hiện 2 bánh
        gap = 30;
    } else {
        itemsPerView = 1; // Mobile: Hiện 1 bánh
        gap = 20;
    }

    // Sau khi tính toán xong thì cập nhật lại slider và dấu chấm ngay lập tức
    updateCarousel();
    createDots();
}

// --- 3. HÀM CHÍNH ĐỂ DI CHUYỂN SLIDER ---
function updateCarousel() {
    const totalItems = items.length; // Tổng số bánh
    
    // Tính vị trí tối đa có thể trượt để không bị lòi khoảng trắng ở cuối
    // Ví dụ: Có 5 bánh, hiện 3 bánh => Chỉ được trượt đến vị trí số 2
    const maxIndex = totalItems - itemsPerView; 
    
    // Xử lý vòng lặp (Loop):
    if (currentIndex > maxIndex) currentIndex = 0; // Nếu bấm Next quá đà -> Về đầu
    if (currentIndex < 0) currentIndex = maxIndex; // Nếu bấm Prev quá đà -> Về cuối

    // Tính toán khoảng cách cần dịch chuyển (px)
    // Công thức: (Chiều rộng 1 bánh + khoảng cách) * vị trí hiện tại
    const itemWidth = items[0].offsetWidth; 
    const moveAmount = (itemWidth + gap) * currentIndex;
    
    // Dùng CSS Transform để di chuyển thanh trượt
    track.style.transform = `translateX(-${moveAmount}px)`;

    // Cập nhật màu đỏ cho dấu chấm tương ứng
    updateDots();
}

// --- 4. HÀM TẠO DẤU CHẤM TRÒN ---
function createDots() {
    dotsContainer.innerHTML = ''; // Xóa sạch các chấm cũ (để tạo lại nếu resize)

    // Tính số lượng chấm cần thiết
    // Chỉ tạo đủ số chấm để trượt hết danh sách, không tạo dư
    const maxIndex = items.length - itemsPerView;
    const dotCount = maxIndex + 1;

    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot'); // Thêm class CSS
        
        // Nếu là chấm đang chọn thì thêm class active (màu đỏ)
        if (i === currentIndex) dot.classList.add('active');
        
        // Khi bấm vào chấm -> Trượt đến vị trí đó
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
            resetAutoPlay(); // Đặt lại bộ đếm giờ (để không bị trượt loạn)
        });
        dotsContainer.appendChild(dot);
    }
}

// Hàm cập nhật trạng thái Active (màu đỏ) cho dấu chấm
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

// --- 5. SỰ KIỆN CHO NÚT BẤM (MŨI TÊN) ---
nextBtn.addEventListener('click', () => {
    currentIndex++;   // Tăng chỉ số
    updateCarousel(); // Cập nhật giao diện
    resetAutoPlay();  // Reset bộ đếm giờ
});

prevBtn.addEventListener('click', () => {
    currentIndex--;   // Giảm chỉ số
    updateCarousel(); // Cập nhật giao diện
    resetAutoPlay();  // Reset bộ đếm giờ
});

// --- 6. TỰ ĐỘNG CHẠY (AUTOPLAY) ---
function startAutoPlay() {
    // Cứ 3 giây thì tự bấm Next một lần
    autoPlayInterval = setInterval(() => {
        currentIndex++;
        updateCarousel();
    }, 3000); 
}

// Hàm này dùng để khởi động lại bộ đếm giờ khi người dùng tương tác
function resetAutoPlay() {
    clearInterval(autoPlayInterval); // Xóa bộ đếm cũ
    startAutoPlay(); // Bắt đầu bộ đếm mới
}

// --- 7. KHỞI CHẠY LẦN ĐẦU ---
// Khi người dùng co giãn cửa sổ trình duyệt -> Tính lại kích thước
window.addEventListener('resize', updateResponsiveMetrics);

// Chờ 50ms để đảm bảo HTML/CSS tải xong rồi mới tính toán kích thước
setTimeout(() => {
     updateResponsiveMetrics(); 
     startAutoPlay();
}, 50);