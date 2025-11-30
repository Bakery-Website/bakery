export function initScrollReveal() {
    //tìm tất cả các phần tử có class 'reveal', 'reveal-left', 'reveal-right'
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    //tạo một observer (người quan sát)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Nếu phần tử xuất hiện trong màn hình
            if (entry.isIntersecting) {
                // Thêm class 'active' để kích hoạt CSS
                entry.target.classList.add('active');

            }
        });
    }, {
        threshold: 0.15 // Kích hoạt khi 15% phầnn tử lòi ra trong màn hình
    });

    // Gắn observer vào từng phần tử
    reveals.forEach((element) => {
        observer.observe(element);
    });
}