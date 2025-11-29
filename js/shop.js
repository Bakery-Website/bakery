// state.js
// ==============================================================
// FILE: QUẢN LÝ TRẠNG THÁI (STATE MANAGEMENT)
// ==============================================================

// Biến lưu trữ toàn bộ danh sách sản phẩm tải từ JSON
// Export để các file khác (như cart.js, category.js) có thể đọc được.
export let PRODUCTS = [];

// Biến lưu trữ giỏ hàng hiện tại
export let cart = [];

/**
 * Hàm cập nhật danh sách sản phẩm.
 * Tại sao cần hàm này? Để đảm bảo tính toàn vẹn dữ liệu.
 * Các file khác không được gán trực tiếp PRODUCTS = [...] mà phải qua hàm này.
 */
export function setProducts(data) {
    // Xóa sạch mảng cũ và thêm dữ liệu mới vào
    // Dùng splice để giữ nguyên tham chiếu bộ nhớ (quan trọng!)
    PRODUCTS.splice(0, PRODUCTS.length, ...data);
}

/**
 * Hàm định dạng tiền tệ (Helper Function)
 * Dùng chung cho cả Cart và Product List để hiển thị giá giống nhau.
 */
export function formatMoney(amount) {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}