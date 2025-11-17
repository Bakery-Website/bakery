// =======================================================
// PHẦN 1: DỮ LIỆU GIẢ LẬP (MOCK DATA)
// =======================================================
// Khai báo một biến (let) tên là 'PRODUCTS', khởi tạo là một mảng rỗng.
let PRODUCTS = [];

// Khai báo một biến (let) tên là 'cart', khởi tạo là một mảng rỗng.
// Biến này sẽ lưu trữ "trạng thái" của giỏ hàng, chứa các sản phẩm mà người dùng đã thêm vào.
let cart = [];

// =======================================================
// PHẦN 2: CACHING CÁC THAM CHIẾU DOM (DOM REFERENCES)
// =======================================================
// Mục đích: Lấy các phần tử HTML (elements) từ trang web và lưu vào các biến.
// Việc này giúp tăng hiệu suất vì chúng ta chỉ cần tìm kiếm (query) DOM 1 lần duy nhất khi trang tải,
// thay vì tìm lại mỗi khi cần dùng đến.

// --- Các khối nội dung chính của trang (cho Single Page Application - SPA) ---
// Dùng document.getElementById() để tìm 1 phần tử DUY NHẤT có ID tương ứng.
const mainContent = document.getElementById('main-content-area');
const breadBlock = document.getElementById('bread');
const pastryBlock = document.getElementById('pastry');
const cakeBlock = document.getElementById('cake');
const storyBlock = document.getElementById('story');
const productGridArea = document.getElementById('product-grid-area'); // Khu vực sẽ chứa lưới sản phẩm

// --- Thanh Breadcrumb (ví dụ: Home > Menu > Bread) ---
const breadcrumbBar = document.getElementById('breadcrumbBar');
// Dùng document.querySelector() để tìm phần tử ĐẦU TIÊN khớp với CSS selector.
const breadcrumbContent = document.querySelector('#breadcrumbBar .breadcrumb-content');

// --- Navigation & Menu (Header chính và Side Menu) ---
// Dùng document.querySelectorAll() để tìm TẤT CẢ các phần tử khớp, trả về một NodeList.
const navLinks = document.querySelectorAll('.primary .nav-links li a'); // Lấy tất cả link <a> trong nav chính
const menuLink = document.querySelector('.primary .nav-links li a[href*="menu-page"]'); // Tìm link "Menu"
const sideMenu = document.getElementById('sideMenu'); // Menu trượt (dành cho mobile)
const overlay = document.getElementById('overlay'); // Lớp mờ (dành cho side menu)
const hamburgerButton = document.getElementById('hamburger'); // Nút 3 sọc

// --- Cart Sidebar (Giỏ hàng trượt từ bên phải) ---
// Cache (lưu) tất cả các phần tử liên quan đến giỏ hàng
const cartToggleBtn = document.getElementById('cartToggleBtn'); // Nút icon giỏ hàng
const cartSidebar = document.getElementById('cartSidebar'); // Toàn bộ khối giỏ hàng
const cartCloseBtn = document.getElementById('cartCloseBtn'); // Nút đóng giỏ hàng (X)
const cartOverlay = document.getElementById('cartOverlay'); // Lớp mờ (dành cho giỏ hàng)

const cartBody = document.querySelector('.cart-sidebar .cart-body'); // Khu vực chứa các item trong giỏ hàng
const cartTotalPriceEl = document.getElementById('cartTotalPrice'); // Phần tử hiển thị tổng tiền
const cartItemCountEl = document.querySelector('.cart-item-count'); // "Số" màu đỏ trên icon giỏ hàng


// =======================================================
// PHẦN 3: ĐỊNH NGHĨA CÁC HÀM XỬ LÝ
// =======================================================
// Định nghĩa các hàm (functions) sẽ thực hiện các tác vụ cụ thể.

// --- XỬ LÝ SIDE MENU (MENU 3 SỌC) ---

/**
 * Hàm mở Side Menu (menu trượt) và hiển thị lớp mờ.
 */
function openMenu() {
    // Kiểm tra xem phần tử 'sideMenu' có tồn tại không (đã cache thành công ở PHẦN 2).
    if (sideMenu) sideMenu.classList.add('show'); // Thêm class 'show' để CSS (styles.css) làm nó hiện ra.
    if (overlay) overlay.classList.add('active'); // Thêm class 'active' để CSS hiện lớp mờ.
    if (hamburgerButton) hamburgerButton.style.opacity = '0'; // Ẩn nút 3 sọc đi.
}

/**
 * Hàm đóng Side Menu và ẩn lớp mờ.
 */
function closeMenu() {
    if (sideMenu) sideMenu.classList.remove('show'); // Xóa class 'show' để CSS ẩn menu.
    if (overlay) overlay.classList.remove('active'); // Xóa class 'active' để CSS ẩn lớp mờ.
    if (hamburgerButton) hamburgerButton.style.opacity = '1'; // Cho nút 3 sọc hiện lại.
}


// --- LOGIC XỬ LÝ GIỎ HÀNG (CART) ---

/**
 * Hàm "Tổng" (Master Function) để cập nhật toàn bộ giỏ hàng.
 * Mỗi khi có thay đổi (thêm, xóa, sửa), chỉ cần gọi hàm này.
 */
function updateCart() {
    renderCartItems(); // 1. Vẽ lại danh sách sản phẩm trong giỏ hàng.
    renderCartTotal(); // 2. Tính toán và hiển thị lại tổng tiền.
    updateCartCount(); // 3. Cập nhật lại "số" trên icon giỏ hàng.
}

/**
 * Hàm vẽ lại giao diện của các sản phẩm trong giỏ hàng.
 */
function renderCartItems() {
    // Kiểm tra xem mảng 'cart' có rỗng không.
    if (cart.length === 0) {
        // Nếu rỗng, hiển thị thông báo.
        cartBody.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    // Nếu giỏ hàng không rỗng:
    // Dùng hàm .map() để lặp qua mảng 'cart'.
    // Với mỗi 'item' trong 'cart', tạo ra một chuỗi HTML (template literal) cho item đó.
    cartBody.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <div class="cart-item-controls">
                    <button class="btn-qty-decrease"><img src="images/menu/minus.png" alt="-"></button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="btn-qty-increase"><img src="images/menu/plus.png" alt="+"></button>
                    <button class="cart-item-remove"><img src="images/menu/trash.png" alt="X"></button>
                </div>
            </div>

            <div class="cart-item-price-total">
                ${(item.price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
            
        </div>
    `).join(''); // Dùng .join('') để nối tất cả các chuỗi HTML lại thành 1 chuỗi lớn.
    // Ghi đè chuỗi HTML này vào 'cartBody'.
}

/**
 * Hàm tính toán và hiển thị tổng số tiền.
 */
function renderCartTotal() {
    // Dùng hàm .reduce() để tính tổng tiền.
    // 'sum' là giá trị tích lũy (bắt đầu từ 0).
    // 'item' là từng phần tử trong mảng 'cart'.
    const total = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity); // Cộng dồn (giá * số lượng) vào 'sum'.
    }, 0); // 0 là giá trị khởi tạo của 'sum'.

    // Dùng .toLocaleString() để định dạng số tiền (vd: $1,234.56).
    cartTotalPriceEl.textContent = total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

/**
 * Hàm cập nhật "số" trên icon giỏ hàng.
 */
function updateCartCount() {
        // Dùng .reduce() để tính tổng SỐ LƯỢNG (quantity) của tất cả item.
    const totalCount = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0); // 0 là giá trị khởi tạo.

    // 1. Cập nhật con số
    cartItemCountEl.textContent = totalCount;

    // 2. Hiển thị hoặc ẩn bằng cách thêm/xóa class 'visible'
    if (totalCount > 0) {
        // Nếu có hàng, thêm class 'visible' (CSS sẽ làm nó hiện ra với hiệu ứng).
        cartItemCountEl.classList.add('visible');
    } else {
        // Nếu không có hàng, gỡ class 'visible' (CSS sẽ ẩn nó đi).
        cartItemCountEl.classList.remove('visible');
    }
}

/**
 * (DATA) Hàm thêm sản phẩm vào mảng 'cart'.
 * @param {string} productId - ID của sản phẩm cần thêm.
 */
function addToCart(productId) {
    // 1. Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa.
    // Dùng .find() để tìm item trong 'cart' có 'id' trùng với 'productId'.
    const existingItem = cart.find(item => item.id === productId);

    // 2. Nếu đã có (existingItem không phải null)
    if (existingItem) {
        existingItem.quantity++; // Chỉ tăng số lượng lên 1.
    } else {
        // 3. Nếu chưa có
        // 3a. Tìm thông tin đầy đủ của sản phẩm từ mảng PRODUCTS.
        const product = PRODUCTS.find(p => p.id === productId);
        // 3b. Nếu tìm thấy sản phẩm
        if (product) {
            // 3c. Thêm sản phẩm mới vào mảng 'cart'.
            // Dùng spread syntax ({ ...product }) để copy tất cả thuộc tính của 'product'
            // và thêm thuộc tính 'quantity: 1'.
            cart.push({ ...product, quantity: 1 });
        }
    }
    // 4. Sau khi thay đổi dữ liệu, gọi hàm "Master" để cập nhật giao diện.
    updateCart();
}

/**
 * (DATA) Hàm xóa hoàn toàn một sản phẩm khỏi mảng 'cart'.
 * @param {string} productId - ID của sản phẩm cần xóa.
 */
function removeFromCart(productId) {
    // Dùng .filter() để tạo một mảng MỚI.
    // Mảng mới này sẽ chứa tất cả 'item' KHÁC với 'productId' được truyền vào.
    cart = cart.filter(item => item.id !== productId);

    // Cập nhật giao diện.
    updateCart();
}

/**
 * (DATA) Hàm cập nhật số lượng (tăng/giảm) của một sản phẩm.
 * @param {string} productId - ID của sản phẩm.
 * @param {number} newQuantity - Số lượng mới.
 */
function updateCartQuantity(productId, newQuantity) {
    // 1. Tìm sản phẩm trong giỏ hàng.
    const itemInCart = cart.find(item => item.id === productId);

    // 2. Nếu tìm thấy
    if (itemInCart) {
                // 3. Nếu số lượng mới là 0 hoặc âm
        if (newQuantity <= 0) {
                // Thì gọi hàm xóa sản phẩm.
            removeFromCart(productId);
        // 4. Nếu số lượng mới > 0
        } else {
            // Cập nhật số lượng cho sản phẩm đó.
            itemInCart.quantity = newQuantity;
            // Cập nhật giao diện.
            updateCart();
        }
    }
}
// ===================================================
// --- SPA (SINGLE PAGE APPLICATION) ---
// Logic để thay đổi nội dung trang mà không cần tải lại.

/**
 * Cập nhật và hiển thị thanh breadcrumb.
 * @param {string} category - Tên category (Bread, Cake, ...)
 */
function renderBreadcrumb(category) {
    // Tạo chuỗi HTML bằng Template Literal (dấu `), cho phép chèn biến ${category}.
    const breadcrumbHtml = `
        <nav class="breadcrumb">
            <ul>
                <li><a href="index.html">Home</a></li> 
                <li><a href="javascript:void(0)" onclick="loadHomePage()">Menu</a></li> 
                <li>${category}</li>
            </ul>
        </nav>
    `;

    // Ghi đè nội dung HTML của 'breadcrumbContent' (đã cache ở PHẦN 2).
    if (breadcrumbContent) breadcrumbContent.innerHTML = breadcrumbHtml;
    // Hiển thị thanh breadcrumb bằng cách xóa class 'hidden'.
    if (breadcrumbBar) breadcrumbBar.classList.remove('hidden');

    // Xử lý gạch chân "active" cho link menu trên header:
    // 1. Lặp qua TẤT CẢ các link nav.
    navLinks.forEach(a => a.classList.remove('active-page')); // Xóa gạch chân của tất cả.
    // 2. Thêm gạch chân CHỈ cho link "Menu".
    if (menuLink) menuLink.classList.add('active-page');
}

/**
 * Tải và hiển thị nội dung cho một category sản phẩm cụ thể (Bread, Cake...).
 * Đây là hàm chính của logic SPA.
 * @param {string} category - Tên category (Bread, Cake, ...)
 */
function loadCategory(category) {
    // 1. Cập nhật breadcrumb (ví dụ: "Home > Menu > Bread").
    renderBreadcrumb(category);

    // 2. Ẩn tất cả các khối nội dung tĩnh của trang chủ (Story, các khối giới thiệu...).
    if (breadBlock) breadBlock.classList.add('hidden');
    if (pastryBlock) pastryBlock.classList.add('hidden');
    if (cakeBlock) cakeBlock.classList.add('hidden');
    if (storyBlock) storyBlock.classList.add('hidden');

    // 3. Hiển thị khối 'productGridArea' (đây là khối rỗng để chuẩn bị chứa sản phẩm).
    if (productGridArea) productGridArea.classList.remove('hidden');

    // 4. Cập nhật trạng thái 'active' cho thanh 5-icon category (hiệu ứng phóng to).
    const categoryLinks = document.querySelectorAll('.list a'); // Lấy tất cả 5 icon.
    categoryLinks.forEach(link => { // Lặp qua từng icon.
        // Lấy tên class đầu tiên (vd: 'bread')
        const rawCategory = link.classList[0];
        // Chuyển 'bread' thành 'Bread' để so sánh.
        const linkCategory = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

        // Xóa 'category-active' (trạng thái phóng to) khỏi TẤT CẢ icon.
        link.classList.remove('category-active');
        // Nếu tên category của icon này KHỚP với category đang tải
        if (linkCategory === category) {
            link.classList.add('category-active'); // Thêm class 'active' cho 1 icon duy nhất.
        }
    });

    // 5. Lọc dữ liệu: Lấy sản phẩm từ mảng PRODUCTS.
    // Dùng .filter() để tạo mảng mới chỉ chứa các sản phẩm có 'category' khớp.
    const filteredProducts = PRODUCTS.filter(p => p.category === category);

    // 6. Tạo chuỗi HTML cho lưới sản phẩm.
    // Bắt đầu chuỗi HTML (khung lớn).
    let contentHtml = `
        <section class="product-listing my-overlock">
            <div class="product-grid">
 `;

    // Dùng .map() lặp qua mảng 'filteredProducts' để tạo HTML cho từng thẻ (card) sản phẩm.
            const productCardsHtml = filteredProducts.map(product => `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image-container">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price">${product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                        <button class="btn btn-add-to-cart">ADD TO CART
                            <img src="images/menu/cart.png" >
                        </button>
                    </div>
                </div>
                `).join(''); // Nối tất cả các thẻ (card) lại thành 1 chuỗi HTML.

    // Thêm chuỗi HTML (các thẻ sản phẩm) vào "khung lớn".
    contentHtml += productCardsHtml;

    // Đóng các thẻ HTML của "khung lớn".
    contentHtml += `
      </div>
    </section>
  `;

    // 7. Ghi đè toàn bộ HTML vừa tạo vào khối 'productGridArea'.
    if (productGridArea) productGridArea.innerHTML = contentHtml;
}

/**
 * Hàm tải (reset) lại nội dung trang chủ SPA (trang "Menu" ban đầu).
 */
function loadHomePage() {
    // 1. Ẩn breadcrumb (vì đang ở trang chủ, không cần).
    if (breadcrumbBar) breadcrumbBar.classList.add('hidden');

    // 2. Hiển thị lại tất cả các khối nội dung tĩnh (Story, giới thiệu...).
    if (breadBlock) breadBlock.classList.remove('hidden');
    if (pastryBlock) pastryBlock.classList.remove('hidden');
    if (cakeBlock) cakeBlock.classList.remove('hidden');
    if (storyBlock) storyBlock.classList.remove('hidden');

    // 3. Ẩn khu vực lưới sản phẩm (vì đang ở trang chủ).
    if (productGridArea) productGridArea.classList.add('hidden');

    // 4. Reset trạng thái 'active' của 5-icon category (bỏ phóng to).
    document.querySelectorAll('.list a').forEach(link => {
        link.classList.remove('category-active');
    });
}


// =======================================================
// PHẦN 4: KHỞI TẠO CÁC TRÌNH LẮNG NGHE SỰ KIỆN
// =======================================================
// Gán các hàm (đã định nghĩa ở PHẦN 3) vào các sự kiện (click, scroll...).

// Thêm một trình lắng nghe sự kiện 'DOMContentLoaded' cho 'document'.
// Code bên trong chỉ chạy sau khi toàn bộ tài liệu HTML đã được tải và phân tích xong.
// Đảm bảo rằng tất cả các phần tử (như 'hamburgerButton') đã tồn tại.
document.addEventListener('DOMContentLoaded', async () => {

    // === BƯỚC A: TẢI DỮ LIỆU SẢN PHẨM ===
    // Sử dụng 'try...catch' để bắt lỗi nếu file JSON bị hỏng
    try {
        // 1. Bắt đầu 'fetch' và 'await' (chờ) cho đến khi nó xong
        const response = await fetch('/products.json');
        
        // 2. Kiểm tra xem 'fetch' có thành công không
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // 3. GÁN dữ liệu đã fetch vào biến PRODUCTS toàn cục (đã khai báo ở PHẦN 1)
        PRODUCTS = await response.json();

    } catch (error) {
        // Nếu không tải được file JSON, báo lỗi và dừng
        console.error("Không thể tải file products.json:", error);
        alert("Error: Cannot Load Products. Please Try Again.");
        return; // Dừng, không chạy phần còn lại
    }

    // === BƯỚC B: GÁN SỰ KIỆN ===

    // --- I. SỰ KIỆN SIDE MENU (MENU 3 SỌC) ---
    const closeButton = document.getElementById('closeBtn'); // Cache nút X (close)
    
    // Nếu nút 3 sọc tồn tại, gán hàm 'openMenu' cho sự kiện 'click' của nó.
    if (hamburgerButton) hamburgerButton.addEventListener('click', openMenu);
    // Nếu nút X tồn tại, gán hàm 'closeMenu' cho sự kiện 'click' của nó.
    if (closeButton) closeButton.addEventListener('click', closeMenu);
    // Nếu lớp mờ tồn tại, gán hàm 'closeMenu' khi click vào lớp mờ.
    if (overlay) overlay.addEventListener('click', closeMenu);


    // --- II. SỰ KIỆN STICKY HEADER (HEADER DÍNH KHI CUỘN) ---
    const stickyHeader = document.getElementById('sticky-header'); // Cache header dính
    if (stickyHeader) {
        // Gán sự kiện 'scroll' cho toàn bộ cửa sổ (window).
        window.addEventListener('scroll', function () {
            const scrollThreshold = 100; // Ngưỡng cuộn: 100px từ đỉnh
            
            // 'window.pageYOffset' là vị trí cuộn dọc hiện tại.
            if (window.pageYOffset > scrollThreshold) {
                // Nếu đã cuộn qua 100px
                stickyHeader.classList.add('visible'); // Hiện header dính
                stickyHeader.classList.remove('hidden');
            } else {
                // Nếu cuộn ngược lại (gần đầu trang)
                stickyHeader.classList.add('hidden'); // Ẩn header dính
                stickyHeader.classList.remove('visible');
                closeMenu(); // Tự động đóng side menu (nếu nó đang mở)
            }
        });
    }

    // --- III. SỰ KIỆN THANH SEARCH (TÌM KIẾM) ---
    const searchWrapper = document.querySelector('.search .search-bar-wrapper'); // Toàn bộ khối search
    const searchInput = searchWrapper ? searchWrapper.querySelector('.search-input') : null; // Ô input
    const searchIconBtn = searchWrapper ? searchWrapper.querySelector('.search-toggle-btn') : null; // Nút icon kính lúp


    // Chỉ chạy nếu tìm thấy đủ 3 thành phần
    if (searchWrapper && searchInput && searchIconBtn) {

        // Gán sự kiện 'click' cho icon kính lúp
        searchIconBtn.addEventListener('click', function (e) {
            // 'e.preventDefault()' ngăn hành vi mặc định (ví dụ: submit form).
            e.preventDefault();

            // 'toggle' tự động thêm/xóa class 'active'.
            // 'isActive' sẽ là 'true' nếu class vừa được THÊM, 'false' nếu vừa được XÓA.
            const isActive = searchWrapper.classList.toggle('active');

            if (isActive) { // Nếu thanh search vừa được BẬT (thêm class)
                // 'setTimeout' chạy code sau một khoảng trễ (400ms).
                // Cần trễ vì phải chờ hiệu ứng (transition) 0.4s trong CSS chạy xong.
                setTimeout(() => {
                    searchInput.focus(); // Tự động trỏ con trỏ chuột vào ô input.
                }, 400);
            }
        });

        // Xử lý "click outside" (bấm ra ngoài để đóng thanh search).
        // Gán sự kiện 'click' cho toàn bộ tài liệu (document).
        document.addEventListener('click', function (e) {
            // 'e.target' là phần tử bị click.

            // Điều kiện:
            // 1. KHÔNG click vào bên trong 'searchWrapper' (!searchWrapper.contains(e.target))
            // 2. VÀ 'searchWrapper' đang mở (có class 'active')
            if (!searchWrapper.contains(e.target) && searchWrapper.classList.contains('active')) {
                searchWrapper.classList.remove('active'); // Đóng thanh search.
            }
        });
    }

    // --- IV. SỰ KIỆN ĐIỀU HƯỚNG SPA (SPA NAVIGATION) ---

    // 1. Gán sự kiện cho 5 icon category (Bread, Cake...)
    // Lấy tất cả link (thẻ <a>) trong '.list' và lặp qua chúng
    document.querySelectorAll('.list a').forEach(link => {
        // Gán sự kiện 'click' cho mỗi link
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Ngăn trình duyệt tải lại trang (hành vi mặc định của <a>).

            // Lấy class đầu tiên của link (ví dụ: 'bread', 'cake')
            const categoryClass = link.classList[0];
            // Chuyển chữ cái đầu thành viết hoa (ví dụ: 'bread' -> 'Bread')
            const categoryName = categoryClass.charAt(0).toUpperCase() + categoryClass.slice(1);

            // Gọi hàm tải nội dung SPA với tên category đã chuẩn hóa.
            loadCategory(categoryName);
        });
    });

    // 2. Gán sự kiện cho link "Menu" (Header chính)
    // Lặp qua các link trong nav chính
    navLinks.forEach(link => {
        // Kiểm tra xem link có phải là link "Menu" không
        if (link.textContent.trim() === 'Menu' && link.href.includes('menu-page')) {
            // Gán sự kiện 'click'
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Ngăn tải lại trang
                loadHomePage(); // Gọi hàm reset về trang chủ SPA.
            });
        }
    });

    // 3. Gán sự kiện cho các nút "Discover more" (trong các khối giới thiệu)
    // Định nghĩa danh sách các nút và category tương ứng của chúng.
    const discoverButtons = [
        { selector: '.btn.bread-link', category: 'Bread' },
        { selector: '.btn.pastry-link', category: 'Pastry' },
        { selector: '.btn.cake-link', category: 'Cake' }
    ];

    // Cache lại thanh 5-icon (để cuộn lên)
    const categoryBar = document.querySelector('.category-bar');

    // Lặp qua danh sách 3 nút
    discoverButtons.forEach(item => {
        // Tìm nút trong tài liệu dựa trên CSS selector
        const button = document.querySelector(item.selector);

        if (button) { // Nếu nút tồn tại
            // Gán sự kiện 'click' cho nút
            button.addEventListener('click', (e) => {
                e.preventDefault(); // Ngăn hành vi mặc định

                // 1. Tải nội dung category tương ứng (ví dụ: 'Bread')
                loadCategory(item.category);

                // 2. Cuộn (scroll) mượt lên thanh 5-icon category
                if (categoryBar) { 
                    // Yêu cầu trình duyệt cuộn đến 'categoryBar'
                    categoryBar.scrollIntoView({
                        behavior: 'smooth', // Cuộn mượt
                        block: 'start'      // Căn lề trên cùng của 'categoryBar' với lề trên của màn hình
                    });
                }
            });
        }
    });

    // --- V. SỰ KIỆN GIỎ HÀNG (CART) ---

    // 1. BẮT SỰ KIỆN "ADD TO CART" (THÊM VÀO GIỎ)
    // Dùng "Event Delegation" (Ủy thác sự kiện).
    // Thay vì gán sự kiện cho từng nút (tốn kém), ta gán 1 sự kiện cho khối CHA ('productGridArea').
    // Các nút "ADD TO CART" được tạo động (bởi 'loadCategory') nên phải dùng kỹ thuật này.
    if (productGridArea) {
        productGridArea.addEventListener('click', (e) => {
            // 1. Kiểm tra xem phần tử BỊ CLICK (e.target) có nằm BÊN TRONG một nút "ADD TO CART" không.
            // 'e.target.closest(...)' sẽ tìm chính nó hoặc cha gần nhất khớp với selector.
            const cartButton = e.target.closest('.btn-add-to-cart');
            
            // 2. Nếu đúng là bấm vào nút "ADD TO CART" (cartButton không phải null)
            if (cartButton) {
                // 3. Lấy thẻ (card) sản phẩm cha gần nhất.
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    // 4. Lấy 'productId' từ 'data-id' của thẻ (card) sản phẩm.
                    const productId = productCard.dataset.id;
                    // 5. Gọi hàm thêm vào giỏ hàng.
                    addToCart(productId);
                    // 6. (Tùy chọn) Tự động mở giỏ hàng để người dùng thấy.
                    openCart(); 
                }
            }
        });
    }

    // 2. SỰ KIỆN MỞ/ĐÓNG GIỎ HÀNG (CART SIDEBAR)
    // (Định nghĩa 2 hàm trợ giúp nhỏ)
    function openCart() {
        if (cartSidebar) cartSidebar.classList.add('active'); // Hiện giỏ hàng
        if (cartOverlay) cartOverlay.classList.add('active'); // Hiện lớp mờ
    }

    function closeCart() {
        if (cartSidebar) cartSidebar.classList.remove('active'); // Ẩn giỏ hàng
        if (cartOverlay) cartOverlay.classList.remove('active'); // Ẩn lớp mờ
    }

    // (Gán các hàm này vào sự kiện click)
    // (Các biến cartToggleBtn, cartCloseBtn, cartOverlay đã được cache ở PHẦN 2)
    if (cartToggleBtn) { // Click icon giỏ hàng
        cartToggleBtn.addEventListener('click', openCart);
    }
    if (cartCloseBtn) { // Click nút X (close)
        cartCloseBtn.addEventListener('click', closeCart);
    }
    if (cartOverlay) { // Click vào lớp mờ
        cartOverlay.addEventListener('click', closeCart);
    }

    // 3. BẮT SỰ KIỆN BÊN TRONG GIỎ HÀNG (Tăng/Giảm/Xóa)
    // Dùng "Event Delegation" một lần nữa vì các nút +, -, X được tạo động.
    // Gán 1 sự kiện 'click' cho toàn bộ 'cartSidebar'.
    if (cartSidebar) {
        
        // Dùng Event Delegation cho tất cả các nút
        cartSidebar.addEventListener('click', (e) => {
            const target = e.target; // Phần tử được click (có thể là <img> hoặc <button>)

            // Dùng .closest() để tìm đúng nút CHA (phòng trường hợp bấm trúng <img> bên trong)

            // (Tìm nút cha gần nhất, phòng trường hợp bấm trúng <img>)
            const removeBtn = target.closest('.cart-item-remove'); // Nút thùng rác
            const increaseBtn = target.closest('.btn-qty-increase'); // Nút +
            const decreaseBtn = target.closest('.btn-qty-decrease'); // Nút -
            
            // Tìm 'cart-item' (sản phẩm) cha gần nhất
            const cartItem = target.closest('.cart-item');
            if (!cartItem) return;// Nếu bấm ra ngoài (không phải 3 nút trên, ví dụ bấm vào tên) thì dừng hàm.
            
            // Lấy 'productId' từ 'data-id' của 'cartItem'.
            const productId = cartItem.dataset.id;
            
            // Lấy thông tin item từ mảng 'cart' (để lấy số lượng hiện tại).
            const item = cart.find(i => i.id === productId);
            if (!item) return; // Không tìm thấy, dừng hàm.

            // 1. Nếu bấm nút XÓA (Thùng rác)
            if (removeBtn) {
                removeFromCart(productId); // Gọi hàm xóa
                return; // Dừng xử lý
            }

            // 2. Nếu bấm nút TĂNG (+)
            if (increaseBtn) {
                // Gọi hàm cập nhật với số lượng + 1
                updateCartQuantity(productId, item.quantity + 1);
                return; // Dừng xử lý
            }

            // 3. Nếu bấm nút GIẢM (-)
            if (decreaseBtn) {
                // Gọi hàm cập nhật với số lượng - 1
                // (Hàm 'updateCartQuantity' sẽ tự động xóa nếu số lượng về 0)
                updateCartQuantity(productId, item.quantity - 1);
                return; // Dừng xử lý
            }
        });
        
        // (Chúng ta không cần sự kiện 'change' nữa vì đã bỏ ô input)
    }

    // --- VI. KHỞI CHẠY TRANG ---
// 1. Lấy các tham số từ URL (ví dụ: ?category=Bread)
const urlParams = new URLSearchParams(window.location.search);
const categoryToLoad = urlParams.get('category'); // Sẽ là 'Bread', 'Cake', hoặc null

// 2. Kiểm tra xem có category từ URL không
if (categoryToLoad) {
    // Nếu CÓ (ví dụ: ?category=Bread):
    // Tải thẳng category đó (hàm này cũng tự động xử lý breadcrumb và active link)
    loadCategory(categoryToLoad);
} else {
    // Nếu KHÔNG có tham số:
    // Tải trang chủ SPA (các khối story, intro) như bình thường
    loadHomePage();
}

// 3. Khởi tạo số lượng giỏ hàng (luôn chạy, bất kể tải trang nào)
updateCartCount();


});