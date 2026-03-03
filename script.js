// --- Scroll-triggered animations (IntersectionObserver) ---
document.addEventListener('DOMContentLoaded', () => {

      const animatedElements = document.querySelectorAll('.animate-on-scroll');

      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      animatedElements.forEach(el => observer.observe(el));

      // --- Sticky header background on scroll ---
      const header = document.getElementById('header');
      let lastScroll = 0;

      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 60) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
      }, { passive: true });

      // --- Mobile menu toggle ---
      const menuToggle = document.getElementById('menuToggle');
      const navMenu = document.getElementById('navMenu');

      menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close menu on link click
      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

      // --- Smooth scroll for anchor links ---
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;

          const target = document.querySelector(targetId);
          if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });

  });