document.addEventListener("DOMContentLoaded", function() {

  // --- PHẦN 1: XỬ LÝ MENU TRƯỢT (SIDE MENU) ---
  
  // 1. Tìm các phần tử
  const hamburgerButton = document.getElementById('hamburger');
  const sideMenu = document.getElementById('sideMenu');
  const closeButton = document.getElementById('closeBtn');
  const overlay = document.getElementById('overlay');

  // Kiểm tra lỗi (thêm `if` để tránh lỗi 'null')
  if (!hamburgerButton || !sideMenu || !closeButton || !overlay) {
    console.warn("Cảnh báo: Không tìm thấy đủ các phần tử menu (hamburger, sideMenu, closeBtn, overlay).");
  }

  // 2. Hàm để MỞ menu
  function openMenu() {
    if (sideMenu) sideMenu.classList.add('show');
    if (overlay) overlay.classList.add('active'); 
    if (hamburgerButton) hamburgerButton.style.opacity = '0'; 
  }

  // 3. Hàm để ĐÓNG menu
  function closeMenu() {
    if (sideMenu) sideMenu.classList.remove('show');
    if (overlay) overlay.classList.remove('active'); 
    if (hamburgerButton) hamburgerButton.style.opacity = '1'; 
  }

  // 4. Gán sự kiện click (chỉ gán nếu tìm thấy)
  if (hamburgerButton) {
    hamburgerButton.addEventListener('click', openMenu);
  }
  if (closeButton) {
    closeButton.addEventListener('click', closeMenu);
  }
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // --- PHẦN 2: XỬ LÝ HEADER CUỘN (STICKY HEADER) ---

  // 1. Tìm phần tử
  const stickyHeader = document.getElementById('sticky-header');

  // Chỉ chạy nếu tìm thấy stickyHeader
  if (stickyHeader) {
    // 2. Lắng nghe sự kiện cuộn chuột của trang
    window.addEventListener('scroll', function() {
      // Nếu người dùng cuộn xuống quá 100px
      if (window.pageYOffset > 100) {
        stickyHeader.classList.add('visible');
        stickyHeader.classList.remove('hidden');
      } else {
        // Khi ở gần đỉnh
        stickyHeader.classList.add('hidden');
        stickyHeader.classList.remove('visible');
        
        // **TỰ ĐỘNG ĐÓNG MENU (ĐÃ THÊM)**
        closeMenu(); 
      }
    });
  } else {
    console.warn("Cảnh báo: Không tìm thấy #sticky-header.");
  }

});




document.addEventListener("DOMContentLoaded", function() {

  // --- PHẦN 1: XỬ LÝ MENU TRƯỢT (SIDE MENU) ---
  
  // 1. Tìm các phần tử
  const hamburgerButton = document.getElementById('hamburger');
  const sideMenu = document.getElementById('sideMenu');
  const closeButton = document.getElementById('closeBtn');
  const overlay = document.getElementById('overlay');

  // 2. Hàm để MỞ menu
  function openMenu() {
    sideMenu.classList.add('show');
    overlay.classList.add('active'); 
    hamburgerButton.style.opacity = '0'; /* THÊM DÒNG NÀY (ẩn nút gốc) */
  }

  // 3. Hàm để ĐÓNG menu
  function closeMenu() {
    sideMenu.classList.remove('show');
    overlay.classList.remove('active'); 
    hamburgerButton.style.opacity = '1'; /* THÊM DÒNG NÀY (hiện nút gốc) */
  }

  // 4. Gán sự kiện click
  if (hamburgerButton) {
    hamburgerButton.addEventListener('click', openMenu);
  }
  
  if (closeButton) {
    closeButton.addEventListener('click', closeMenu);
  }
  
  if (overlay) {
    overlay.addEventListener('click', closeMenu); // Nhấn ra ngoài để đóng
  }

  // --- PHẦN 2: XỬ LÝ HEADER CUỘN (STICKY HEADER) ---

  // 1. Tìm phần tử
  const stickyHeader = document.getElementById('sticky-header');

  // 2. Lắng nghe sự kiện cuộn chuột của trang
  window.addEventListener('scroll', function() {
    // Nếu người dùng cuộn xuống quá 100px (bạn có thể đổi số này)
    if (window.pageYOffset > 100) {
      stickyHeader.classList.add('visible');
      stickyHeader.classList.remove('hidden');
    } else {
      stickyHeader.classList.add('hidden');
      stickyHeader.classList.remove('visible');
    }
  });

});