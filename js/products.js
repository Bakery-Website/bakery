// products.js
// ==============================================================
// FILE: TẢI DỮ LIỆU SẢN PHẨM
// ==============================================================

import { setProducts } from './shop.js'; // Import hàm setter từ kho dữ liệu

/**
 * Hàm async tải file JSON
 * Trả về true nếu thành công, false nếu thất bại
 */
export async function fetchProducts() {
    try {
        // Gửi yêu cầu lấy file products.json
        const response = await fetch('/products.json');
        
        // Kiểm tra lỗi HTTP (ví dụ 404 Not Found)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        // Chờ đọc dữ liệu và chuyển thành JSON
        const data = await response.json();
        
        // Lưu dữ liệu vào State chung
        setProducts(data);
        
        return true; // Báo hiệu đã tải xong
    } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
        alert("Không thể tải sản phẩm. Vui lòng thử lại.");
        return false;
    }
}