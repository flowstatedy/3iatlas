document.addEventListener('DOMContentLoaded', () => {

    // 1. ระบบ Scroll แอนิเมชันเมื่อเลื่อนหน้าจอ (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // แสดงผลเมื่อส่วนนั้นโผล่เข้ามาในจอ 10%
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // ให้แอนิเมชันเล่นแค่ครั้งเดียว
            }
        });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-section');
    fadeSections.forEach(section => {
        observer.observe(section);
    });

    // 2. ระบบ Smooth Scrolling เวลากดเมนู Navbar
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // คำนวณระยะเผื่อความสูงของ Navbar
                const navHeight = document.querySelector('nav').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
