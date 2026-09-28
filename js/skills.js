/* ============================================
   SKILLS JS - skills.js
   Animates skill bars + counting numbers
   ============================================ */

(function () {
  const items = document.querySelectorAll('.skill-bar-item');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const item    = entry.target;
        const fill    = item.querySelector('.skill-bar-fill');
        const label   = item.querySelector('.skill-percent');
        const target  = parseInt(item.getAttribute('data-percent'), 10);

        if (!fill || !label || isNaN(target)) return;

        // Animasi bar mengisi
        requestAnimationFrame(function () {
          fill.style.width = target + '%';
        });

        // Animasi angka naik dari 0 ke target
        const duration = 2000; // ms — sama dengan transisi CSS
        const startTime = performance.now();

        function countUp(currentTime) {
          const elapsed  = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Easing: ease-out cubic
          const eased    = 1 - Math.pow(1 - progress, 3);
          const current  = Math.round(eased * target);

          label.textContent = current + '%';

          if (progress < 1) {
            requestAnimationFrame(countUp);
          } else {
            label.textContent = target + '%';
          }
        }

        requestAnimationFrame(countUp);

        observer.unobserve(item);
      });
    },
    { threshold: 0.2 }
  );

  items.forEach(function (item) {
    // Reset bar ke 0 dan angka ke 0%
    const fill  = item.querySelector('.skill-bar-fill');
    const label = item.querySelector('.skill-percent');
    if (fill)  fill.style.width = '0%';
    if (label) label.textContent = '0%';

    observer.observe(item);
  });
})();
