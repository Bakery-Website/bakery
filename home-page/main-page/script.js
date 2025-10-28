window.addEventListener('DOMContentLoaded', function() {
  const stickyHeader = document.getElementById('sticky-header');
  const mainHeader = document.getElementById('main-header');
  const scrollThreshold = 150; // px mà để scroll

  window.addEventListener('scroll', function() {
    const scrollPos = window.scrollY || window.pageYOffset;

    if (scrollPos > scrollThreshold) {
      // Khi scroll vượt ngưỡng
      stickyHeader.classList.remove('hidden');
      stickyHeader.classList.add('visible');
      document.body.classList.add('scrolled');
    } else {
      // Khi ở gần đỉnh
      stickyHeader.classList.remove('visible');
      stickyHeader.classList.add('hidden');
      document.body.classList.remove('scrolled');
    }
  });
});

const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');

hamburger.addEventListener('click', () => {
  sideMenu.classList.add('active');
  overlay.classList.add('active'); // bật overlay
});

closeBtn.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  overlay.classList.remove('active'); // tắt overlay
});

overlay.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  overlay.classList.remove('active'); // tắt overlay khi click ngoài menu
});