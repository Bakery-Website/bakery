const swiper = new Swiper('.swiper', {
      // --- Cấu hình cơ bản ---
      direction: 'horizontal', // Hướng trượt
      loop: true, // Lặp lại vô hạn
      
      // --- Tự động trượt (Autoplay) ---
      // Đây là phần bạn muốn
      autoplay: {
        delay: 3000, // 3000ms = 3 giây
        disableOnInteraction: false, // Không tắt autoplay khi người dùng tương tác
      },

      // --- Nút bấm (Navigation) ---
      // Đây là phần bạn muốn
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // --- Dấu chấm (Pagination) ---
      pagination: {
        el: '.swiper-pagination',
        clickable: true, // Cho phép bấm vào dấu chấm để chuyển slide
      },
      
      // --- Hiển thị số lượng slide (Responsive) ---
      slidesPerView: 1, // Mặc định hiển thị 1 slide (cho mobile)
      spaceBetween: 20, // Khoảng cách giữa các slide
      
      // Cấu hình cho các kích thước màn hình khác nhau
      breakpoints: {
        // Khi màn hình rộng từ 768px trở lên
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        // Khi màn hình rộng từ 1024px trở lên
        1024: {
          slidesPerView: 3, // Hiển thị 3 slide giống như ảnh của bạn
          spaceBetween: 30
        }
      }
    });